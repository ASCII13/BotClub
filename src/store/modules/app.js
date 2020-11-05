// import { globalSearch } from '@/api/search';

const state = {
    searchKey: ''
}

const mutations = {
    SET_SEARCH_KEY: (state, key) => {
        state.searchKey = key
    }
}

const actions = {
    setSearchKey({ commit }, key) {
        commit('SET_SEARCH_KEY', key);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}