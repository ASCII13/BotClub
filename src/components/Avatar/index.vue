<template>
    <div class="avatar">
        <el-avatar
            :size="size"
            :style="{ 'background-color': theme }"
            :class="{ 'dark-mode': mode === 'dark' }"
            @click.native="browseInfo(userId)">{{ name | headChar }}
        </el-avatar>
        <img v-if="showHat" class="suprise" src="@/assets/christmas/hat.svg"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { isChristmas } from "@/utils/suprise";
export default {
    name: 'Avatar',
    props: {
        size: {
            type: [String, Number],
            default: 'large'
        },
        userId: {
            type: Number,
        },
        name: {
            type: String,
            default: '-'
        }
    },
    computed: {
        ...mapGetters([
            'theme',
            'mode',
        ]),
        showHat() {
            return isChristmas();
        }
    },
    methods: {
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
    filters: {
        headChar(str) {
            return str.charAt(0);
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
.dark-mode {
    color: $textColorDark;
}
</style>