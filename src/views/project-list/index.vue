<template>
    <div class="project-container">
        <list-view :busy="busy" :noMore="noMore" :showHint="showHint" :wrap="true" :loading="showListLoading" :more="more" class="project-list">
            <el-card v-for="project in projects" :key="project.id" class="project-item">
                <div style="display: flex; align-items: center;">
                    <avatar :item="{ 'userId': project.userId, 'author': project.author, 'shareUser': project.shareUser }"></avatar>
                    <div class="author-info">
                        <div>{{ project.author || project.shareUser }}</div>
                        <div>{{ project.niceDate }}</div>
                    </div>
                </div>
                <el-link :href="project.projectLink" :underline="false" target="_blank" class="title">{{ project.title }}</el-link>
                <div class="info-container">
                    <div class="description">{{project.desc}}</div>
                    <el-image :src="project.envelopePic" fit="cover" class="preview"></el-image>
                </div>
            </el-card>
        </list-view>
        <el-card class="category-list" :body-style="{ 'display': 'flex', 'flex-direction': 'column' }" v-loading="showTypeLoading">
            <el-link
                class="categroy"
                v-for="(item, index) in categories"
                :key="index"
                :underline="false"
                :class="{ 'curr-category': item.id === lastId }"
                @click="getProjectList('init', item.id)">{{ item.name }}
            </el-link>
        </el-card>
    </div>
</template>

<script>
import { getCategories, getProjects } from '@/api/project';
import ListView from '@/components/ListView';
import Avatar from '@/components/Avatar';

export default {
    data() {
        return {
            categories: [],
            projects: [],
            busy: false,
            noMore: false,
            showHint: false,
            currPage: 1,
            lastId: -1,
            showTypeLoading: true,
            showListLoading: true,
        }
    },
    created() {
        getCategories().then(res => {
            this.showTypeLoading = false;
            if (res.data != undefined && res.data.length != 0) {
                this.categories = res.data;
                this.setDefaultId(this.categories);
                this.getProjectList('init', this.lastId);
            }
        })
    },
    components: {
        Avatar,
        ListView,
    },
    methods: {
        getProjectList(state, id) {
            let params = {
                cid: id
            };
            if (state === 'init') {
                this.currPage = 1;
                this.noMore = false;

                getProjects(this.currPage, params).then(res => {
                    this.showListLoading = false;
                    let projectList = res.data.datas;
                    if (projectList && projectList.length != 0) {
                        this.projects = projectList;
                        this.currPage += 1;
                        this.lastId = id;
                    } else {
                        this.showHint = true;
                    }
                })
            }
            if (state === 'more') {
                this.busy = true;
                getProjects(this.currPage, params).then(res => {
                    this.busy = false;

                    let projectList = res.data.datas;
                    if (projectList && projectList.length != 0) {
                        this.projects.push(...projectList);
                        this.currPage += 1;
                    } else {
                        this.noMore = true;
                    }
                })
            }
        },
        getAvatarText() {
            if (arguments[0]) {
                return arguments[0].charAt(0)
            }
            return arguments[1].charAt(0)
        },
        more() {
            this.getProjectList('more', this.lastId);
        },
        setDefaultId(arr) {
            for (let index = 0; index < arr.length; index++) {
                if (arr[index].id) {
                    return this.lastId = arr[index].id;
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.project-container {
    display: flex;
}

.project-list {
    width: 730px;
    margin-top: -10px;
}

.project-item {
    padding: 10px;
    width: 360px;
    margin-top: 10px;
}

// .avatar {
//     background-color: #59a57c;
//     flex-shrink: 0;
// }

.info-container {
    position: relative;
    width: 100%;
    height: 500px;

    &:hover .description {
        visibility: visible;
    }

    &:hover .preview {
        visibility: hidden;
    }
}

.author-info {
    line-height: 18px;
    font-weight: 500;
    font-size: 14px;
    color: #4D5760;
    margin-left: 0.5rem;

    & > div:last-child {
        font-size: 13px;
        margin-top: 0.1rem;
    }
}

.title {
    margin: 0.6rem 0;
    color: black;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.3rem;
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.description {
    visibility: hidden;
    position: absolute;
    line-height: 1.3rem;
    font-size: 13px;
}

.preview {
    width: 100%;
    height: 100%;
    position: absolute;
}

.category-list {
    width: 200px;
    height: 500px;
    overflow: auto;
    margin-left: 0.6rem;

    .categroy {
        padding: 10px;

        &.curr-category {
            color: $primaryColor;
        }
    }
}
</style>