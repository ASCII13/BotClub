<template>
    <el-card shadow="hover" class="commonly-used-sites-panel">
        <div slot="header">
            <span>常用站点</span>
        </div>
        <div class="site">
            <el-link
                v-for="(item, index) in sites"
                :key="index"
                :href="item.link"
                :underline="false"
                target="_blank">{{ item.name }}
            </el-link>
        </div>
    </el-card>
</template>

<script>
import { getCommonlyUsedSites } from '@/api/commonly-used-sites'

export default {
    data() {
        return {
            sites: [],
        }
    },
    created() {
        getCommonlyUsedSites().then((res) => {
            this.sites = res.data
        })
    },
}
</script>

<style lang="scss" scoped>
.commonly-used-sites-panel {
    width: 300px;

    .site {
        display: flex;
        flex-wrap: wrap;

        & > a {
            margin: 0 6px 6px 6px;
        }
    }
}
</style>