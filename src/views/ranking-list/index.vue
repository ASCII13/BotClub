<template>
    <list-view :busy="busy" :no-more="noMore" :show-hint="showHint" :loading="loading" :more="more" style="width: 660px;">
        <el-card
            v-for="user in users"
            :key="user.userId"
            :body-style="{ 'display': 'flex', 'align-items': 'center', 'height': '80px', 'padding': '15px' }"
            class="user-item">
            <avatar :name="user.username"></avatar>
            <div class="username">{{ user.username }}</div>
            <div class="coin">积分：{{ user.coinCount }}</div>
            <div class="level">等级：{{ user.level }}</div>
            <div class="rank">{{ user.rank }}</div>
        </el-card>
    </list-view>
</template>

<script>
import Avatar from '@/components/Avatar';
import ListView from '@/components/ListView';
import { fetchRankingList } from '@/api/ranking';
export default {
    data() {
        return {
            busy: false,
            noMore: false,
            loading: true,
            pageNum: 1,
            users: [],
        }
    },
    created() {
        this.getUsers('init', this.pageNum);
    },
    components: {
        Avatar,
        ListView,
    },
    methods: {
        getUsers(type, pageNum) {
            this.busy = type !== 'init';
            fetchRankingList(pageNum).then(res => {
                this.loading = false;

                const data = res.data;
                const rankings = data.datas;
                if (data && rankings && rankings.length > 0) {
                    if (type === 'init') {
                        this.users = rankings;
                    } else {
                        this.users.push(...rankings);
                        this.busy = false;
                    }
                    this.pageNum = ++pageNum;
                } else {
                    if (type !== 'init') {
                        this.noMore = true;
                    }
                }
            });
        },
        more() {
            this.getUsers('more', this.pageNum);
        },
    },
    computed: {
        showHint() {
            return !this.loading &&
                (!this.users || this.users.length === 0);
        }
    }
}
</script>

<style lang="scss" scoped>
.user-item {
    &:not(:first-child) {
        margin-top: 6px;
    }
    & > div {
        font-size: 15px;
    }
}
.avatar {
    width: 45px;
    height: 45px;
}
.username {
    margin-left: 0.8rem;
}
.username::after,
.coin::after {
    content: '|';
    padding: 0 0.8rem;
    color: #909399;
}
.rank {
    margin-left: auto;
}
</style>