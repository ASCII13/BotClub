<template>
    <div style="display: flex;">
        <list-view :show-hint="showHint" :busy="busy" :no-more="noMore" :more="more" :loading="loading" style="width: 600px;">
            <div class="todo" v-for="(timeGroup, groupIndex) in todoList" :key="timeGroup.time">
                <div class="header">
                    <h3>{{ timeGroup.time }}</h3>
                    <div class="tools">
                        <div>共{{ timeGroup.todos.length }}条</div>
                        <div class="filter">
                            <button
                                v-for="(item, index) in timeGroup.filters"
                                :key="index"
                                :class="{'active': index === timeGroup.selected}"
                                @click="filterData(groupIndex, index)">{{ item.name }}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="task-list">
                    <div class="task" :class="{'checked': todo.status}" v-for="(todo, index) in timeGroup.todos" :key="todo.id">
                        <input type="checkbox" class="status" :class="{'checked': todo.status}" :checked="todo.status" @click="modifyTodoStatus(todo)" />
                        <label class="content">{{ todo.title }}</label>
                        <button class="delete" @click="removeTodo(todo.id, groupIndex, index)" />
                    </div>
                </div>
            </div>
        </list-view>
        <button class="add" @click="dialogVisible = true">新增待办</button>
        <el-dialog width="30%" :visible.sync="dialogVisible" @closed="resetForm" :close-on-click-modal="false">
            <span slot="title">新增待办</span>
            <form @submit.prevent="addTodo">
                <input type="text" placeholder="事项内容" required v-model="todoModel.title" />
                <input type="date" required :min="minDate" v-model="todoModel.date" />
                <button class="confirm">新增</button>
            </form>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getDate } from '@/utils/date';
import ListView from '@/components/ListView';
import { fetchList, add, remove, modifyStatus } from '@/api/todo';
export default {
    data() {
        return {
            todoList: [],
            busy: false,
            noMore: false,
            pageNum: 1,
            dialogVisible: false,
            todoModel: {
                title: '',
                date: '',
            },
            loading: true,
        }
    },
    created() {
        this.getTodos('init', this.pageNum);
    },
    methods: {
        removeTodo(id, groupIndex, index) {
            this.$confirm('确定删除当前事项吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                cancelButtonClass: 'box-btn',
                confirmButtonClass: 'box-btn',
                type: 'warning'
            }).then(() => {
                remove(id).then(() => {
                    let todos = this.todoList[groupIndex].todos;
                    todos.splice(index, 1);

                    if (todos.length === 0) {
                        this.removeTimeGroup(groupIndex);
                    }
                    this.$message.success('已成功删除');
                });
            });
        },
        removeTimeGroup(groupIndex) {
            this.todoList.splice(groupIndex, 1);
        },
        getTodos(type, pageNum) {
            this.busy = type !== 'init';
            fetchList(pageNum).then(res => {
                this.loading = false;

                const data = res.data;
                const todoList = data.datas;

                if (!data || !todoList || todoList.length === 0) {
                    if (type === 'init') return;
                    this.noMore = true;
                } else {
                    const timeList = this.getTimeList(todoList);
                    if (type === 'init') {
                        timeList.forEach(time => {
                            const todos = todoList.filter(todo => todo.dateStr === time);
                            this.addTimeGroup(time, todos);
                        });
                    } else {
                        timeList.forEach(time => {
                            const todos = todoList.filter(todo => todo.dateStr === time);
                            const lastGroup = this.getLastTimeGroup();
                            if (time === lastGroup.time) {
                                lastGroup.todos.push(...todos);
                            } else {
                                this.addTimeGroup(time, todos);
                            }
                        });
                        this.busy = false;
                        // 根据页数和当前数组数量 与 total 进行判断，是否 noMore == true，如当前为第三页，2 * 20 + todoList.length <= total
                        if (((pageNum - 1) * 20 + todoList.length) <= data.total) {
                            this.noMore = true;
                        }
                    }
                    this.pageNum = ++pageNum;
                }
            });
        },
        getTimeList(data) {
            const timeList = data.map(item => item.dateStr);
            return Array.from(new Set(timeList));
        },
        more() {
            this.getTodos('more', this.pageNum);
        },
        filterData(groupIndex, filterIndex) {
            let timeGroup = this.todoList[groupIndex];
            if (timeGroup.selected === filterIndex) return;

            const todos = timeGroup._todos;
            if (filterIndex === 1) {
                const done = todos.filter(todo => todo.status === 1);
                timeGroup.todos = done;
            } else if (filterIndex === 2) {
                const undone = todos.filter(todo => todo.status === 0);
                timeGroup.todos = undone;
            } else {
                timeGroup.todos = todos;
            }
            timeGroup.selected = filterIndex;
        },
        modifyTodoStatus(todo) {
            const id = todo.id;
            const status = todo.status === 0 ? 1 : 0;
            modifyStatus(id, { status }).then(() => {
                todo.status = status;
            });
        },
        resetForm() {
            Object.keys(this.todoModel).forEach(key => {
                if (key !== 'status') {
                    this.todoModel[key] = '';
                }
            });
        },
        addTodo() {
            add(this.todoModel).then(res => {
                if (res.data) {
                    this.dialogVisible = false;
                    this.insertTodo(res.data);
                }
            });
        },
        createTimeGroup(todo) {
            let todos = [];
            todos.push(todo);

            return {
                time: todo.dateStr,
                todos,
                _todos: todos,
                filters: [
                    { name: '全部' },
                    { name: '已完成' },
                    { name: '未完成' },
                ],
                selected: 0,
            }
        },
        insertTodo(todo) {
            let todoList = this.todoList;
            let timeGroup = this.createTimeGroup(todo);
            
            for (let i = 0; i < todoList.length; i++) {
                // 插入到分组数组头部
                if (i === 0 && todoList[0].time < todo.dateStr) {
                    return todoList.unshift(timeGroup);
                }
                // 插入到分组数组中
                if (todoList[i].time < todo.dateStr) {
                    return todoList.splice(i, 0, timeGroup);
                }
                // 插入到待办事项数组尾部
                if (todoList[i].time === todo.dateStr) {
                    let todos = todoList[i].todos;
                    return todos.push(todo);
                }
            }
            // 插入到分组数组尾部
            return todoList.push(timeGroup);
        },
        getLastTimeGroup() {
            return this.todoList[this.todoList.length - 1];
        },
        addTimeGroup(time, todos) {
            this.todoList.push({
                time,
                todos,
                _todos: todos,
                filters: [
                    { name: '全部' },
                    { name: '已完成' },
                    { name: '未完成' },
                ],
                selected: 0,
            });
        },
    },
    components: {
        ListView,
    },
    computed: {
        minDate() {
            return getDate();
        },
        showHint() {
            return !this.loading && (!this.todoList || this.todoList.length === 0);
        },
        ...mapGetters(['mode']),
    }
}
</script>

<style lang="scss" scoped>
h3 {
    margin: 0 0 1rem 0;
}
button {
    border: 0;
    padding: 3px 8px;
    background: 0;
    font-size: 14px;
    line-height: 1;
    cursor: pointer;
    color: #8a9ca5;
    border-radius: 20px;
}
form {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    text-align: center;
    input {
        box-sizing: border-box;
        background-color: #eee;
        border: none;
        padding: 12px 15px;
        margin: 8px 0;
        width: 100%;
    }
}
.todo {
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    &:not(:first-child) {
        margin-top: 0.5rem;
    }
}
.header {
    padding: 1rem;
    border-bottom: 1px solid #e1e4e9;
    .tools {
        display: flex;
        align-items: center;
    }
    .filter {
        margin-left: auto;
        .active {
            color: white;
            background-color: #7996a5;
        }
    }
}
.task-list {
    max-height: 294px;
    overflow: auto;
    .task {
        display: flex;
        align-items: center;
        padding: 12px 20px;
        &:not(:last-child) {
            border-bottom: 1px solid #e1e4e9;
        }
        &:hover {
            background-color: #f6fbff;
            > .delete {
                display: block;
            }
        }
        &.checked {
            background-color: rgba(74, 206, 163, 0.1);
            text-decoration: line-through;
        }
        .status {
            appearance: none;
            width: 18px;
            height: 18px;
            cursor: pointer;
            border: 2px solid #bbbdc7;
            border-radius: 50%;
            background-color: #fff;
            margin-right: 10px;
            position: relative;
        }
        .content {
            margin-right: auto;
        }
        .checked {
            background-image: url(~@/assets/checked.svg);
            background-size: 10px;
            background-color: #69a530;
            border-color: #69a530;
            background-repeat: no-repeat;
            background-position: center;
        }
        .delete {
            width: 18px;
            height: 18px;
            padding: 0;
            margin-left: 10px;
            overflow: hidden;
            background-color: transparent;
            background-image: url(~@/assets/delete.svg);
            background-repeat: no-repeat;
            background-size: cover;
            cursor: pointer;
            display: none;
        }
    }
}
.add {
    margin-left: 0.5rem;
    width: 8rem;
    height: 2.6rem;
    background-color: white;
    color: black;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.confirm {
    border: 1px solid $primaryColor;
    background-color: $primaryColor;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
}
</style>

<style lang="scss">
.box-btn {
    width: auto;
}
</style>