<template>
    <div class="dark-mode-switch" @click="isDark = !isDark" :class="{ 'dark': mode === 'dark' }">
        <div class="inner">
            <div class="bg"/>
            <div class="circle"/>
        </div>
        <div class="rays">
            <div class="ray" v-for="count in 8" :key="count"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            isDark: false
        }
    },
    watch: {
        isDark(val) {
            const mode = val ? 'dark' : 'light';
            this.$store.dispatch('app/setMode', mode);
        },
        mode: {
            immediate: true,
            handler(val) {
                this.isDark = val === 'dark' ? true : false;
                if (this.isDark) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.removeAttribute('class');
                }
            }
        }
    },
    computed: {
        ...mapGetters(['mode']),
    },
}
</script>

<style lang="scss" scopeds>
.dark-mode-switch {
    position: relative;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
        .circle {
            margin: {
                top: -1.25rem;
                left: .3rem;
            }
        }
    }
    .inner {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .bg {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: #202020;
        border: 1px solid #f0f0f0;
        transition: all 0s;
    }
    .circle {
        margin: {
            top: -1.3rem;
            left: .35rem;
        };
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: #f0f0f0;
        border: 2px solid transparent;
        transition: all 0.2s;
    }
    .rays {
        position: absolute;
        left: 0;
        top: 0;

        .ray {
            position: absolute;
            top: .5rem;
            left: .4rem;
            width: 3px;
            height: 4px;
            background-color: #fbc02d;
            transform-origin: 2px 0;
            opacity: 0;

            @for $i from 1 through 8 {
                &:nth-child(#{$i}) {
                    transform: rotate(-45deg * $i - 135deg) translateY(11px);
                    transition: all 0.2s;
                }
            }
        }
    }
    &.dark {
        &:hover {
            .rays .ray {
                @for $i from 1 through 8 {
                    &:nth-child(#{$i}) {
                        transform: rotate(-45deg * $i - 135deg) translateY(13px);
                    }
                } 
            }
        }
        .circle {
            margin-left: 0;
            margin-top: -1rem;
            background-color: #fbc02d;
            border-color: #f9a825;
        }
        .rays .ray {
            opacity: 1;

            @for $i from 1 through 8 {
                &:nth-child(#{$i}) {
                    transform: rotate(-45deg * $i - 135deg) translateY(11px);
                    transition: all (0.2s + $i * 0.2s);
                }
            } 
        }
    }
}
</style>