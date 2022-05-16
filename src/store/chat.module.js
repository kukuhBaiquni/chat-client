export default {
  namespaced: true,
  state: {
    data: [],
    activeId: '',
    totalData: 0,
  },
  mutations: {
    SET_INITIAL_CHAT(state, payload) {
      state.data = payload.data
      state.totalData = payload.totalData
    },
    APPEND_CHAT(state, payload) {
      state.data = [...state.data, ...payload]
    },
    PREPEND_CHAT(state, payload) {
      state.data = [...payload, ...state.data]
    },
    SET_ACTIVE_ID(state, payload) {
      state.activeId = payload
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
    setActiveId(ctx, payload) {
      ctx.commit('SET_ACTIVE_ID', payload)
    },
  },
}
