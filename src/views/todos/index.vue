<template>
    <list-view :show-hint="!todoList || todoList.length === 0" :busy="busy" :no-more="noMore" :more="more">
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
                    <input type="checkbox" class="status" :class="{'checked': todo.status}" v-model="todo.status" />
                    <label class="content">{{ todo.title }}</label>
                    <button class="delete" @click="removeTodo(todo.id, groupIndex, index)" />
                </div>
            </div>
        </div>
    </list-view>
</template>

<script>
import ListView from '@/components/ListView';
import { fetchList, remove } from '@/api/todo';
export default {
    data() {
        return {
            todoList: [],
            // showHint: false,
            busy: false,
            noMore: false,
            currPage: 0,
        }
    },
    created() {
        this.getTodos();
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
        getTodos() {
            fetchList().then(res => {
                if (res.data && res.data.datas) {
                    let datas = res.data.datas;
                    if (datas.length > 0) {
                        let timeList = this.getTimeList(datas);
                        timeList.forEach(time => {
                            const todos = datas.filter(todo => todo.dateStr === time);
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
                        });

                        console.log('---------');
                        console.log(this.todoList);
                    } else {
                        this.showHint = true;
                    }
                }
            });
        },
        getTimeList(data) {
            const timeList = data.map(item => item.dateStr);
            return Array.from(new Set(timeList));
        },
        more() {

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
    },
    components: {
        ListView,
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
.todo {
    width: 600px;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    &:not(:last-child) {
        margin-bottom: 0.5rem;
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
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='405.272' height='405.272'%3e%3cpath d='M393.401 124.425L179.603 338.208c-15.832 15.835-41.514 15.835-57.361 0L11.878 227.836c-15.838-15.835-15.838-41.52 0-57.358 15.841-15.841 41.521-15.841 57.355-.006l81.698 81.699L336.037 67.064c15.841-15.841 41.523-15.829 57.358 0 15.835 15.838 15.835 41.514.006 57.361z' fill='%23fff'/%3e%3c/svg%3e");
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
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%23dc4771' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 174.239 174.239'%3e%3cpath d='M87.12 0C39.082 0 0 39.082 0 87.12s39.082 87.12 87.12 87.12 87.12-39.082 87.12-87.12S135.157 0 87.12 0zm0 159.305c-39.802 0-72.185-32.383-72.185-72.185S47.318 14.935 87.12 14.935s72.185 32.383 72.185 72.185-32.384 72.185-72.185 72.185z'/%3e%3cpath d='M120.83 53.414c-2.917-2.917-7.647-2.917-10.559 0L87.12 76.568 63.969 53.414c-2.917-2.917-7.642-2.917-10.559 0s-2.917 7.642 0 10.559l23.151 23.153-23.152 23.154a7.464 7.464 0 000 10.559 7.445 7.445 0 005.28 2.188 7.437 7.437 0 005.28-2.188L87.12 97.686l23.151 23.153a7.445 7.445 0 005.28 2.188 7.442 7.442 0 005.28-2.188 7.464 7.464 0 000-10.559L97.679 87.127l23.151-23.153a7.465 7.465 0 000-10.56z'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-size: cover;
            cursor: pointer;
            display: none;
        }
    }
}
</style>

<style lang="scss">
.box-btn {
    width: auto;
}
</style>