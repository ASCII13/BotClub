import { login, logout, register } from '@/api/user'

const state = {
    name: ''
}

const mutations = {
    SET_NAME: (state, name) => {
        state.name = name
    }
}

const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username, password: password }).then(response => {
                commit('SET_NAME', response.data.nickname)
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