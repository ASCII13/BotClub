import variables from '@/styles/element-variables.scss';
import { setKeywords, getKeywords } from '@/utils/storage';

const state = {
    keywords: getKeywords(),
    theme: variables.theme,
}

const mutations = {
    SET_KEYWORDS: (state, key) => {
        state.keywords = key;
        setKeywords(key);
    },
    SET_THEME: (state, val) => {
        state.theme = val;
    }
}

const actions = {
    setKeywords({ commit }, key) {
        commit('SET_KEYWORDS', key);
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