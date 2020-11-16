import { login, logout, register } from '@/api/user';
import {
    getCookie,
    setCookie,
    getUsername,
    setUsername,
} from '@/utils/auth';

const state = {
    name: getUsername(),
    cookie: getCookie(),
}

const mutations = {
    SET_NAME: (state, name) => {
        state.name = name;
        setUsername(state.name);
    },
    SET_COOKIE: (state, cookie) => {
        state.cookie = cookie;
        setCookie(state.cookie);
    },
}

const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            login({ username: username, password: password }).then(response => {
                const name = response.data.nickname || response.data.username;
                const cookie = document.cookie;
                commit('SET_NAME', name);
                commit('SET_COOKIE', cookie);
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('SET_NAME', '');
                commit('SET_COOKIE', '');
                resolve();
            }).catch((error) => {
                reject(error);
            })
        })
    },
    register(userInfo) {
        const { username, password, confirmPassword } = userInfo;
        return new Promise((resolve, reject) => {
            register({
                username: username,
                password: password,
                repassword: confirmPassword 
            }).then(() => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}