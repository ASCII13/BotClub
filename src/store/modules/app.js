import variables from '@/styles/element-variables.scss';
import {
    setKeywords,
    getKeywords,
    setMode,
    getMode,
    isFixedHeader,
    setHeaderStatus,
} from '@/utils/storage';

const state = {
    keywords: getKeywords(),
    theme: variables.theme,
    mode: getMode() || 'light',
    fixedHeader: isFixedHeader() || false,
}

const mutations = {
    SET_KEYWORDS: (state, key) => {
        state.keywords = key;
        setKeywords(key);
    },
    SET_THEME: (state, val) => {
        state.theme = val;
    },
    SET_MODE: (state, val) => {
        state.mode = val;
        setMode(val);
    },
    SET_HEADER_STATUS: (state, val) => {
        state.fixedHeader = val;
        setHeaderStatus(val);
    }
}

const actions = {
    setKeywords({ commit }, key) {
        commit('SET_KEYWORDS', key);
    },
    setTheme({ commit }, val) {
        commit('SET_THEME', val);
    },
    setMode({ commit }, val) {
        commit('SET_MODE', val);
    },
    setHeaderStatus({ commit }, val) {
        commit('SET_HEADER_STATUS', val);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}