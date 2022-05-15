export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    SET_INITIAL_CHAT(state, payload) {
      state.data = payload
    },
    APPEND_CHAT(state, payload) {
      state.data = [...state.data, ...payload]
    },
    PREPEND_CHAT(state, payload) {
      state.data = [...payload, ...state.data]
    },
  },
  actions: {
    setInitialChat(ctx, payload) {
      ctx.commit('SET_INITIAL_CHAT', payload)
    },
    appendChat(ctx, payload) {
      ctx.commit('APPEND_CHAT', payload)
    },
    prependChat(ctx, payload) {
      ctx.commit('PREPEND_CHAT', payload)
    },
  },
}
