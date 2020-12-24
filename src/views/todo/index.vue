<template>
    <div class="todo-container">
        <div class="todo-list">
            <div class="tab">
                <div v-for="(tab, index) in tabList"
                    :key="tab.status"
                    class="tab-item"
                    :class="{ 'curr-tab': currTab === index}"
                    @click="switchTab(index)">{{ tab.title }}
                </div>
            </div>
            <list-view :showHint="showHint" :busy="busy" :noMore="noMore" :more="more">
                <el-collapse>
                    <el-collapse-item v-for="(date, dateIndex) in tabList[currTab].data" :key="date.type" :title="date.type" v-show="tabList[currTab].data.length != 0">
                        <div v-for="(item, itemIndex) in date.data" :key="item.id" class="todo-item">
                            <i class="el-icon-star-on" :class="{ 'done': item.status }" @click="modifyTodoStatus(item, dateIndex, itemIndex)"></i>
                            <div @click="editTodo(item)" class="title">{{ item.title }}</div>
                            <i class="el-icon-delete-solid" @click="removeTodo(item.id, dateIndex, itemIndex)"></i>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </list-view>
        </div>
        <div style="margin-left: 0.6rem; width: 200px;">
            <div class="add" @click="dialogVisible = true">新增待办</div>
            <el-card class="type-list" :body-style="{ 'text-align': 'center', }" shadow="never">
                <div slot="header">筛选</div>
                <div v-for="item in typeList" :key="item.type" class="type-item">{{ item.title }}</div>
                <el-popover
                    placement="right"
                    trigger="click"
                    v-model="visible"
                    width="200"
                    @show="typeName = ''">
                    <div slot="reference" class="type-item"><i class="el-icon-plus"></i></div>
                    <el-input
                        placeholder="请输入标签名称"
                        v-model="typeName"
                        maxlength="6"
                        size="mini"
                        clearable
                        show-word-limit>
                    </el-input>
                    <div style="margin-top: 10px; text-align: center;">
                        <el-button size="mini" @click="visible = false">取消</el-button>
                        <el-button size="mini" type="primary" @click="save">保存</el-button>
                    </div>
                </el-popover>
            </el-card>
        </div>
        <el-dialog :title="isNew ? '新增待办' : '编辑待办'" width="30%" :visible.sync="dialogVisible" @closed="resetForm" :close-on-click-modal="false">
            <el-form label-position="right" label-width="auto" :rules="rules" :model="todoModel" ref="todoForm">
                <el-form-item label="日期" prop="date">
                    <el-date-picker clearable placeholder="请选择日期" v-model="todoModel.date" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input clearable placeholder="请输入标题" v-model="todoModel.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input
                        clearable
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 6 }"
                        placeholder="请输入详情"
                        v-model="todoModel.content">
                    </el-input>
                </el-form-item>
                <el-form-item style="text-align: end;">
                    <el-button v-if="isNew === false" @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="isNew ? addTodo() : updateTodo()">{{ isNew ? '新增' : '保存' }}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import ListView from '@/components/ListView';
import { getList, add, remove, modifyStatus, update } from '@/api/todo';

export default {
    data() {
        return {
            tabList: [
                {
                    title: '进行中',
                    status: 0,
                    currPage: 1,
                    data: [],
                },
                {
                    title: '已完成',
                    status: 1,
                    currPage: 1,
                    data: [],
                },
            ],
            typeList: [
                {
                    type: 1,
                    title: '默认'
                },
            ],
            showHint: false,
            busy: false,
            noMore: false,
            currTab: 0,
            typeName: '',
            visible: false,
            dialogVisible: false,
            isNew: true,
            rules: {
                title: [
                    {
                        required: true,
                        message: '待办标题不能为空',
                        trigger: 'blur'
                    }
                ],
                date: [
                    {
                        required: true,
                        message: '日期不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            todoModel: {
                id: -1,
                type: 1,
                priority: 1,
                title: '',
                content: '',
                date: '',
            },
        }
    },
    created() {
        this.getTodoList('init', this.getCurrData().status);
    },
    components: {
        ListView,
    },
    methods: {
        getTodoList(loadType, status) {
            let currData = this.getCurrData();
            let currPage = currData.currPage;
            let data = {
                status,
            }

            if (loadType === 'init') {
                this.showHint = false;
                getList(currPage, data).then(res => {
                    if (res.data.datas != undefined && res.data.datas.length != 0) {
                        currData.data = [];
                        currPage += 1;
                        let tmp = res.data.datas.map(item => {
                            return item.dateStr;
                        })
                        let dateList = Array.from(new Set(tmp));
                        dateList.forEach(item => {
                            let todoList = res.data.datas.filter(ele => {
                                return item === ele.dateStr;
                            });
                            currData.data.push({
                                type: item,
                                data: todoList
                            });
                        });
                        // console.log('当前Tab数据');
                        // console.log(JSON.stringify(this.getCurrData()));
                    } else {
                        this.showHint = true;
                    }
                })
            }
            if (loadType === 'more') {
                this.busy = true;
                getList(currPage, data).then(res => {
                    this.busy = false;
                    if (res.data.datas != undefined && res.data.datas.length != 0) {
                        currPage += 1;
                        let tmp = res.data.datas.map(item => {
                            return item.dateStr;
                        })
                        let dateList = Array.from(new Set(tmp)); // 新数据-日期分类去重
                        dateList.forEach(date => {
                            let todoList = res.data.datas.filter(item => {
                                return date === item.dateStr;
                            });
                            currData.data.forEach(oldItem => {  //分类已存在直接push数据
                                if (date === oldItem.type) {
                                    oldItem.data.push(...todoList);
                                } else {
                                    currData.data.push({ // 不存在push对象
                                        type: date,
                                        data: todoList
                                    })
                                }
                            });
                        })
                    }
                })
            }
        },
        save() {
            for (let index = 0; index < this.typeList.length; index++) {
                if (this.typeList[index].title === this.typeName) {
                    this.$message.error('已存在相同分类名称');
                    return;
                }
            }
            let tmp = {
                type: this.typeList.length + 1,
                title: this.typeName,
            }
            this.typeList.push(tmp);
            this.visible = false;
        },
        switchTab(index) {
            if (index === this.currTab) return;
            this.currTab = index;
            this.getTodoList('init', this.getCurrData().status);
        },
        getCurrData() {
            return this.tabList[this.currTab];
        },
        editTodo(curr) {
            this.isNew = false;
            this.todoModel.id = curr.id;
            this.todoModel.type = curr.type;
            this.todoModel.priority = curr.priority;
            this.todoModel.date = curr.dateStr;
            this.todoModel.title = curr.title;
            this.todoModel.content = curr.content;
            this.dialogVisible = true;
        },
        resetForm() {
            this.isNew = true;
            this.$refs['todoForm'].resetFields();
            Object.keys(this.todoModel).forEach(key => {
                if (key === 'type' || key === 'priority') {
                    return true;
                }
                this.todoModel[key] = '';
            })
        },
        removeTodo(id, dateIndex, itemIndex) {
            this.$confirm('确定删除当前待办事项吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                cancelButtonClass: 'box-btn',
                confirmButtonClass: 'box-btn',
                type: 'warning'
            }).then(() => {
                remove(id).then(() => {
                    let currData = this.getCurrData();
                    let dateList = currData.data[dateIndex];
                    dateList.data.splice(itemIndex, 1);
                    
                    if (dateList.data.length === 0) {
                        this.removeParent(dateIndex);
                    }
                    this.$message.success('已成功删除该事项');
                })
            }).catch(err => {
                console.log(err);
            })
        },
        addTodo() {
            this.$refs['todoForm'].validate(valid => {
                if (valid) {
                    let data = {
                        title: this.todoModel.title,
                        content: this.todoModel.content,
                        date: this.todoModel.date,
                        type: 1,
                        priority: 1,
                    }
                    add(data).then((res) => {
                        this.dialogVisible = false;
                        if (res.data.id) {
                            this.$message.success('创建成功，请刷新页面后查看');   
                        }
                    })
                } else {
                    return false;
                }
            })
        },
        updateTodo() {
            let id = this.todoModel.id;
            let data = {
                title: this.todoModel.title,
                content: this.todoModel.content,
                date: this.todoModel.date,
                type: this.todoModel.type,
                priority: this.todoModel.priority
            }
            update(id, data).then(() => {
                this.dialogVisible = false;
                this.$message.info('修改成功');
            })
        },
        removeParent(dateIndex) {
            this.getCurrData().data.splice(dateIndex, 1);
        },
        more() {
            this.getTodoList('more', this.getCurrData().status);
        },
        modifyTodoStatus(currItem, dateIndex, itemIndex) {
            let status = currItem.status === 0 ? 1 : 0;
            let msg = currItem.status === 0 ? '确定将当前待办标记为已完成？' : '确定将当前待办标记为进行中？';
            this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                cancelButtonClass: 'box-btn',
                confirmButtonClass: 'box-btn',
                type: 'warning'
            }).then(() => {
                modifyStatus(currItem.id, { status: status }).then(() => {
                    let currData = this.getCurrData();
                    let dateList = currData.data[dateIndex];
                    dateList.data.splice(itemIndex, 1);
                    
                    if (dateList.data.length === 0) {
                        this.removeParent(dateIndex);
                    }
                    this.$message.success('状态修改成功');
                })
            }).catch(err => {
                console.log(err);
            })
        }
        
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.todo-container {
    display: flex;
}

.todo-list {
    width: 600px;
}

.tab {
    text-align: end;
    background-color: #E0E4E6;
}

.tab-item {
    display: inline-block;
    padding: 13px 15px;
}

.el-collapse-item {
    ::v-deep .el-collapse-item__header {
        padding-left: 8px;
        font-size: 16px;
    }

    ::v-deep .el-collapse-item__content {
        padding: 0 8px;
        font-size: 15px;
    }
}

.type-item:hover,
.curr-tab.tab-item {
    color: $primaryColor;
    background-color: #ffffff;
}

.todo-item {
    display: flex;
    align-items: center;
}

.el-icon-star-on {
    font-size: 18px;

    &.done {
        color: $primaryColor;
    }
}

.title {
    margin: 0 6px;
}

.el-icon-delete-solid {
    margin-left: auto;
}

.add {
    background-color: #ffffff;
    text-align: center;
    padding: 13px 15px;
    margin-bottom: 16px;
}

.add,
.tab-item {
    font-size: 15px;
}

.type-item {
    padding: 6px;
    font-size: 14px;
}

.el-button {
    width: 66px;
}

.el-icon-plus {
    font-weight: 500;
}

.el-date-editor.el-input {
    width: 100%;
}
</style>

<style lang="scss">
.box-btn {
    width: auto;
}
</style>