import { fetchSelfInfo } from '@/api/ranking';
import { login, logout, register } from '@/api/user';
import {
    getCookie,
    setCookie,
    removeCookie,
    getUser,
    setUser,
    removeUser
} from '@/utils/auth';

const state = {
    user: getUser() || {},
    cookie: getCookie(),
}

const mutations = {
    SET_COOKIE: (state, cookie) => {
        state.cookie = cookie;
    },
    SET_USER: (state, user) => {
        state.user = user;
    },
}

const actions = {
    async login(
        { commit },
        { username, password }
    ) {
        try {
            const response = await login({username, password});
            const res = await fetchSelfInfo();

            const cookie = document.cookie;
            const name = response.data.nickname || response.data.username;
            const user = res.data;
            user.name = name;

            setCookie(cookie);
            setUser(user);

            commit('SET_COOKIE', cookie);
            commit('SET_USER', user);
        } catch (error) {
            console.error(error);
        }
    },
    async logout({ commit }) {
        await logout().then(() => {
            removeUser();
            removeCookie();

            commit('SET_USER', '');
            commit('SET_COOKIE', '');
        });
    },
    async register(
        { commit },
        { username, password, repassword }
    ) {
        try {
            const response = await register({username, password, repassword});
            const res = await fetchSelfInfo();
            const name = response.data.nickname || response.data.username;
            const cookie = document.cookie;
            const user = res.data;
            user.name = name;

            setCookie(cookie);
            setUser(user);

            commit('SET_USER', user);
            commit('SET_COOKIE', cookie);
        } catch (error) {
            console.error(error);
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}