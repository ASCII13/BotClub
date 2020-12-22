const getters = {
    name: state => state.user.name,
    cookie: state => state.user.cookie,
    searchKey: state => state.app.searchKey,
    theme: state => state.app.theme,
}

export default getters