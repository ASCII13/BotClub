<template>
    <div class="avatar">
        <el-avatar
            :style="{ 'background-color': theme }"
            @click.native="browseInfo(item.userId)">{{ getFirstChar(item.author, item.shareUser) }}
        </el-avatar>
        <img v-if="showHat" class="suprise" src="@/assets/christmas/hat.svg"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getFirstChar } from "@/utils/text";
import { isChristmas } from "@/utils/suprise";

export default {
    name: 'Avatar',
    props: {
        item: {
            type: Object,
            default: function() {
                return {}
            }
        },
    },
    computed: {
        ...mapGetters([
            'theme',
        ]),
        showHat() {
            return isChristmas();
        }
    },
    methods: {
        getFirstChar,
        browseInfo(userId) {
            if (userId) {
                this.$router.push({
                    path: '/user',
                    query: {
                        id: userId,
                    }
                });
            }
        }
    },
    data() {
        return {
            show: false,
        }
    }
}
</script>

<style lang="scss" scoped>
.avatar {
    position: relative;
    height: fit-content;

    &:hover {
        cursor: pointer;
    }
}

.suprise {
    position: absolute;
    top: 13%;
    right: -28%;
    transform: translateY(-60%) rotate(40deg);
}
</style>