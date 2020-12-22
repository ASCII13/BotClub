import variables from '@/styles/element-variables.scss';

const state = {
    searchKey: '',
    theme: variables.theme,
}

const mutations = {
    SET_SEARCH_KEY: (state, key) => {
        state.searchKey = key;
    },
    SET_THEME: (state, val) => {
        state.theme = val;
    }
}

const actions = {
    setSearchKey({ commit }, key) {
        commit('SET_SEARCH_KEY', key);
    },
    setTheme({ commit }, val) {
        commit('SET_THEME', val);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}