const getters = {
    name: state => state.user.name,
    cookie: state => state.user.cookie,
    keywords: state => state.app.keywords,
    theme: state => state.app.theme,
    mode: state => state.app.mode,
}

export default getters