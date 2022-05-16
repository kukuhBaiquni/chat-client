export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    SET_USERS(state, payload) {
      state.data = payload
    },
    CHANGE_STATUS(state, payload) {
      let copyData = [...state.data]
      const index = copyData.map((item) => item?.id).indexOf(payload.id)
      if (index !== -1) {
        copyData[index].last_seen = payload.last_seen
        state.data = copyData
      }
    },
    PREPEND_USER(state, payload) {
      state.data = [payload, ...state.data]
    },
  },
  actions: {
    setUsers(ctx, payload) {
      ctx.commit('SET_USERS', payload)
    },
    changeStatus(ctx, payload) {
      ctx.commit('CHANGE_STATUS', payload)
    },
    prependUser(ctx, payload) {
      ctx.commit('PREPEND_USER', payload)
    },
  },
}
