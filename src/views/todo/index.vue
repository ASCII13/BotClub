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
            <list-view :showHint="showHint" :busy="busy" :noMore="noMore">
                <el-collapse>
                    <el-collapse-item v-for="date in tabList[currTab].data" :key="date.type" :title="date.type">
                        <div v-for="item in date.data" :key="item.id">
                            <div @click="dialogVisible = true">{{ item.title }}</div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </list-view>
        </div>
        <div class="right" style="margin-left: 1rem;">
            <el-card class="type-list" :body-style="{ 'text-align': 'center', }">
                <div slot="header">分类筛选</div>
                <div v-for="item in typeList" :key="item.type" class="type-item">{{ item.title }}</div>
                <el-popover
                    placement="right"
                    trigger="click"
                    v-model="visible"
                    width="200"
                    @show="typeName = ''">
                    <div slot="reference" class="type-item"><i class="el-icon-plus"></i></div>
                    <el-input
                        placeholder="请输入分类名称"
                        v-model="typeName"
                        maxlength="4"
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
        <el-dialog title="待办详情" :visible.sync="dialogVisible" width="30%">
            <el-form label-position="right" label-width="auto" :rules="rules" :model="todoModel">
                <el-form-item label="标题" prop="title">
                    <el-input clearable placeholder="请输入待办标题" v-model="todoModel.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="detail">
                    <el-input
                        clearable
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 6}"
                        placeholder="请输入待办详情"
                        v-model="todoModel.detail">
                    </el-input>
                </el-form-item>
                <el-form-item style="text-align: end;">
                    <el-button>取消</el-button>
                    <el-button type="primary">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import ListView from '@/components/ListView';
import { getList } from '@/api/todo';

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
            rules: {
                title: [
                    {
                        required: true,
                        message: '待办标题不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            todoModel: {
                title: '',
                detail: '',
            }
        }
    },
    created() {
        let currStatus = this.getCurrTabObj().status;
        this.getTodoList('init', currStatus);
    },
    components: {
        ListView,
    },
    methods: {
        getTodoList(state, status) {
            if (state === 'init') {
                let currPage = this.getCurrTabObj().currPage;
                let data = {
                    status,
                }
                getList(currPage, data).then(res => {
                    if (res.data.datas != undefined && res.data.datas.length != 0) {
                        let tmp = res.data.datas.map(item => {
                            return item.dateStr;
                        })
                        let dateList = Array.from(new Set(tmp));
                        dateList.forEach(item => {
                            let todoList = res.data.datas.filter(ele => {
                                return item === ele.dateStr;
                            });
                            let currData = this.getCurrTabObj();
                            currData.data.push({
                                type: item,
                                data: todoList
                            });
                        });
                        console.log('当前Tab数据');
                        console.log(JSON.stringify(this.getCurrTabObj()));
                    } else {
                        this.showHint = true;
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
        },
        getCurrTabObj() {
            return this.tabList[this.currTab];
        },
    }
}
</script>

<style lang="scss" scoped>
.todo-container {
    display: flex;
}

.todo-list {
    width: 600px;
}

.tab {
    text-align: end;
}

.tab-item {
    display: inline-block;
    line-height: 30px;

    &:not(:last-child)::after {
        content: '|';
        color: black;
        padding: 6px;
        box-sizing: border-box;
    }
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
    color: #59a57c;
}

.type-list {
    width: 200px;
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
</style>