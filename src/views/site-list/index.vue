<template>
    <div style="display: flex;">
        <list-view style="width: 600px;" :loading="loading">
            <el-card
                v-for="type in siteList"
                :key="type.cid"
                :id="`id${type.cid}`"
                class="type-item">
                <div slot="header">{{ type.name }}</div>
                <div class="item-list">
                    <a
                        class="item draw"
                        v-for="item in type.articles"
                        :key="item.id"
                        :href="item.link"
                        target="_blank">{{ item.title }}
                    </a>
                </div>
            </el-card>
        </list-view>
        <el-card class="catagroies" v-loading="loading" :body-style="{ 'display': 'flex', 'flex-direction': 'column',}">
            <div v-for="type in siteList" :key="type.cid" @click="currAnchor = `#id${type.cid}`" class="catagroy-item">
                <ex-link>{{ type.name }}</ex-link>
            </div>
        </el-card>
    </div>
</template>

<script>
import ExLink from '@/components/ExLink';
import ListView from '@/components/ListView';
import { getSiteList } from '@/api/sites';
export default {
    data() {
        return {
            siteList: [],
            loading: true,
            currAnchor: '',
        }
    },
    created() {
        getSiteList().then(res => {
            this.loading = false;

            const datas = res.data;
            if (!datas || datas.length === 0) return;

            this.siteList = datas.filter(item => item.articles.length > 0);
        });
    },
    components: {
        ListView,
        ExLink,
    },
    watch: {
        currAnchor(newVal, oldVal) {
            if (oldVal) {
                const prev = document.querySelector(oldVal);
                prev.classList.toggle('anchor');
            }
            const next = document.querySelector(newVal);
            next.classList.toggle('anchor');
            next.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.dark-mode {
    .type-item,
    .catagroies {
        color: $textColorDark;
        border-color: $elementBgDark;
        background-color: $elementBgDark;
    }
}
.type-item {
    &:not(:last-child) {
        margin-bottom: 6px;
    }
}
.item-list {
    display: flex;
    flex-wrap: wrap;
}
.catagroies {
    width: 200px;
    height: 500px;
    overflow: auto;
    margin-left: 0.6rem;
    &:hover {
        cursor: pointer;
    }
    .catagroy-item {
        margin: 8px 0;
        text-align: center;
    }
}
.item {
    padding: .5rem;
    box-sizing: border-box;
    // Required, since we're setting absolute on pseudo-elements
    position: relative;
    // vertical-align: middle;
    &::before,
    &::after {
        box-sizing: inherit;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
    }
}
.draw {
    transition: color 0.15s;
    &::before,
    &::after {
        // Set border to invisible, so we don't see a 4px border on a 0x0 element before the transition starts
        border: 2px solid transparent;
        border-radius: 4px;
        width: 0;
        height: 0;
    }
    // This covers the top & right borders (expands right, then down)
    &::before {
        top: 0;
        left: 0;
    }
    // And this the bottom & left borders (expands left, then up)
    &::after {
        bottom: 0;
        right: 0;
    }
    &:hover {
        color: $primaryColor;
    }
    // Hover styles
    &:hover::before,
    &:hover::after {
        width: 100%;
        height: 100%;
    }
    &:hover::before {
        border-top-color: $primaryColor; // Make borders visible
        border-right-color: $primaryColor;
        transition:
            width 0.15s ease-out, // Width expands first
            height 0.15s ease-out 0.15s; // And then height
    }
    &:hover::after {
        border-bottom-color: $primaryColor; // Make borders visible
        border-left-color: $primaryColor;
        transition:
            border-color 0s ease-out 0.3s, // Wait for ::before to finish before showing border
            width 0.15s ease-out, // And then exanding width
            height 0.15s ease-out 0.35s; // And finally height
    }
}
.anchor {
    border-color: $primaryColor !important;
}
</style>