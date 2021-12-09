<template>
    <el-card shadow="hover" class="commonly-used-sites-panel">
        <div slot="header">常用站点</div>
        <div class="sites">
            <ex-link class="name" v-for="(item, index) in sites" :key="index" :href="item.link">{{item.name}}</ex-link>
        </div>
    </el-card>
</template>

<script>
import ExLink from '@/components/ExLink';
import { getCommonlyUsedSites } from '@/api/commonly-used-sites';

export default {
    data() {
        return {
            sites: [],
        }
    },
    mounted() {
        getCommonlyUsedSites().then((res) => {
            this.sites = res.data
        })
    },
    components: {
        ExLink,
    }
}
</script>

<style lang="scss" scoped>
.sites {
    display: flex;
    flex-wrap: wrap;
    .name {
        margin: 0 6px 10px 10px;
    } 
}
</style>