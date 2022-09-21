<template>
    <div class="project-container">
        <list-view :busy="busy" :no-more="noMore" :show-hint="showHint" :wrap="true" :loading="showListLoading" :more="more" class="project-list">
            <ex-link v-for="project in projects" :key="project.id" :href="project.projectLink" :underlined="false" class="project-item">
                <el-image :src="project.envelopePic" fit="cover" class="preview"></el-image>
                <div class="info">
                    <div class="title">{{ project.title }}</div>
                    <div class="description">{{ project.desc }}</div>
                    <!-- <div class="other">
                        <i class="el-icon-star-on"></i>
                        <div class="author">
                            <div>{{ project.author || project.shareUser }}</div>
                            <div>{{ project.niceDate }}</div>
                        </div>
                    </div> -->
                    <div class="author">
                        <div>{{ project.author || project.shareUser }}</div>
                        <div>{{ project.niceDate }}</div>
                    </div>
                </div>
            </ex-link>
        </list-view>
        <el-card class="category-list" :class="{ 'dark': mode === 'dark' }" :body-style="{ 'display': 'flex', 'flex-direction': 'column' }" v-loading="showTypeLoading">
            <div class="category" v-for="(item, index) in categories" :key="index" @click="cid = item.id">
                <ex-link :current="item.id === cid">{{ item.name }}</ex-link>
            </div>
        </el-card>
    </div>
</template>

<script>
import { fetchCategories, fetchProjects } from '@/api/project';
import ListView from '@/components/ListView';
// import Avatar from '@/components/Avatar';
import ExLink from '@/components/ExLink';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            categories: [],
            projects: [],
            busy: false,
            noMore: false,
            pageNum: 1,
            cid: -1,
            showTypeLoading: true,
            showListLoading: true,
        }
    },
    created() {
        fetchCategories().then(res => {
            this.showTypeLoading = false;
            if (res.data && res.data.length > 0) {
                this.categories = res.data.map(c => {
                    if (c.name.indexOf('&amp;')) {
                        c.name = c.name.replace('&amp;', '&');
                    }
                    return c;
                });
                this.setDefaultId(this.categories);
            }
        });
    },
    components: {
        // Avatar,
        ListView,
        ExLink,
    },
    methods: {
        getAvatarText() {
            if (arguments[0]) {
                return arguments[0].charAt(0)
            }
            return arguments[1].charAt(0)
        },
        more() {
            this.busy = true;
            fetchProjects(this.pageNum, {cid: this.cid}).then(res => {
                const data = res.data;
                const projects = data.datas;
                if (data && projects && projects.length > 0) {
                    this.projects.push(...projects);
                    this.pageNum++;
                } else {
                    this.noMore = true;
                }
                this.busy = false;
            });
        },
        setDefaultId(arr) {
            for (let index = 0; index < arr.length; index++) {
                if (arr[index].id) {
                    return this.cid = arr[index].id;
                }
            }
        }
    },
    computed: {
        ...mapGetters(['mode']),
        showHint() {
            return !this.showListLoading &&
                (!this.projects || this.projects.length === 0);
        }
    },
    watch: {
        cid(newVal, oldVal) {
            if (newVal === oldVal) return;

            this.projects = [];
            this.showListLoading = true;

            fetchProjects(1, {cid: newVal}).then(res => {
                this.showListLoading = false;

                const data = res.data;
                const projects = data.datas;
                if (data && projects && projects.length > 0) {
                    this.projects = projects;
                    this.pageNum = 2;
                    this.noMore = false;
                }
            });
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
    // &:hover .other {
    //     height: 2.2rem;
    // }
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
    font-weight: 440;
    font-size: .75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
// .other {
//     height: 0;
//     overflow: hidden;
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//     transition: 0.2s all;
// }
// .el-icon-star-on {
//     margin-right: auto;
//     width: 1.5rem;
//     height: 1.5rem;
//     line-height: 1.5rem;
//     font-size: 1.5rem;
// }
.author {
    height: 0;
    line-height: 1.1rem;
    text-align: end;
    font-size: .8rem;
    font-weight: 400;
    font-style: italic;
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
.dark {
    .info {
        background-color: $elementBgDark;
    }
    ::v-deep img {
        -webkit-filter: brightness(70%);
        filter: brightness(70%);
    }
}
</style>