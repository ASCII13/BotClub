import Cookies from 'js-cookie';
import { login, logout, register } from '@/api/user';

const state = {
    name: Cookies.get('userName')
}

const mutations = {
    SET_NAME: (state, name) => {
        state.name = name;
        if (state.name) {
            Cookies.set('userName', state.name);
        }
    }
}

const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username, password: password }).then(response => {
                const name = response.data.nickname || response.data.username;
                commit('SET_NAME', name);
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('SET_NAME', '')
                resolve()
            }).catch((error) => {
                reject(error)
            })
        })
    },
    register(userInfo) {
        const { username, password, confirmPassword } = userInfo
        return new Promise((resolve, reject) => {
            register({
                username: username,
                password: password,
                repassword: confirmPassword 
            }).then(() => {
                resolve()
            }).catch(error => {
                reject(error)
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