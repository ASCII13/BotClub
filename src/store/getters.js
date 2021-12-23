const getters = {
    user: state => state.user.user,
    cookie: state => state.user.cookie,
    keywords: state => state.app.keywords,
    theme: state => state.app.theme,
    mode: state => state.app.mode,
}

export default getters