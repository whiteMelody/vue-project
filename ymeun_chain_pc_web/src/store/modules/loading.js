const loading = {
    state: {
        status: false,
    },
    mutations: {
        SET_LOADING_STATUS(state, bool) {
            state.status = bool
        },
    }
}

export default loading
