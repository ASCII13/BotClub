<template>
    <el-card shadow="hover">
        <div slot="header">常用站点</div>
        <div class="sites">
            <a class="name" v-for="(item, index) in sites" :key="index" :href="item.link" target="_blank">{{item.name}}</a>
        </div>
    </el-card>
</template>

<script>
import { getCommonlyUsedSites } from '@/api/commonly-used-sites';

export default {
    data() {
        return {
            sites: [],
        }
    },
    mounted() {
        getCommonlyUsedSites().then((res) => {
            this.sites = res.data;
        })
    },
}
</script>

<style lang="scss" scoped>
.sites {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .name {
        margin: .2rem;
        height: 2rem;
        line-height: 2rem;
        font-size: .85rem;
        padding: 0 .5rem;
        border-radius: 4px;
        font-weight: 400;
        background-color:#ededef;
        &:hover {
            background-color: $primaryColor;
            color: white;
        }
    } 
}
.dark-mode {
    .sites {
        a {
            color: $textColorDark;
            background-color: $inputBgColorDark;
        }
    }
}
</style>