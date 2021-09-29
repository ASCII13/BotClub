<template>
    <div class="project-container">
        <list-view :busy="busy" :noMore="noMore" :showHint="showHint" :wrap="true" :loading="showListLoading" :more="more" class="project-list">
            <ex-link v-for="project in projects" :key="project.id" :href="project.projectLink" :underlined="false" class="project-item">
                <el-image :src="project.envelopePic" fit="cover" class="preview"></el-image>
                <div class="info">
                    <div class="title">{{ project.title }}</div>
                    <div class="description">{{ project.desc }}</div>
                    <div class="author">
                        <div>{{ project.author || project.shareUser }}</div>
                        <div>{{ project.niceDate }}</div>
                    </div>
                </div>
            </ex-link>
        </list-view>
        <el-card class="category-list" :body-style="{ 'display': 'flex', 'flex-direction': 'column' }" v-loading="showTypeLoading">
            <div class="category" v-for="(item, index) in categories" :key="index" @click="getProjectList('init', item.id)">
                <ex-link :current="item.id === lastId">{{ item.name }}</ex-link>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getCategories, getProjects } from '@/api/project';
import ListView from '@/components/ListView';
// import Avatar from '@/components/Avatar';
import ExLink from '@/components/ExLink';

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
            if (res.data && res.data.length > 0) {
                this.categories = res.data.map(item => {
                    if (item.name.indexOf('&amp;')) {
                        item.name = item.name.replace('&amp;', '&');
                    }
                    return item;
                });
                this.setDefaultId(this.categories);
                this.getProjectList('init', this.lastId);
            }
        })
    },
    components: {
        // Avatar,
        ListView,
        ExLink,
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
    position: relative;
    margin-top: 10px;
    background-color: white;
    border-radius: 4px;
    width: 360px;
    height: 360px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    &:hover .author {
        height: 2.2rem;
    }
}
.title {
    line-height: 1.4rem;
    font-size: .9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.preview {
    border-radius: 4px;
    width: 100%;
    height: 100%;
    position: absolute;
}
.info {
    position: absolute;
    bottom: 0;
    background-color: white;
    width: 100%;
    min-height: 35%;
    border-radius: 4px;
    padding: .8rem;
}
.description {
    margin: .5rem 0;
    height: 3.3rem;
    line-height: 1.1rem;
    font-weight: 300;
    font-size: .75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
.author {
    height: 0;
    line-height: 1.1rem;
    text-align: end;
    font-size: .8rem;
    font-weight: 300;
    overflow: hidden;
    transition: 0.2s all;
}
.category-list {
    width: 200px;
    height: 500px;
    overflow: auto;
    margin-left: 0.6rem;
    &:hover {
        cursor: pointer;
    }
    .category {
        padding: 10px;
        text-align: center;
        &.curr-category {
            color: $primaryColor;
        }
    }
}
</style>