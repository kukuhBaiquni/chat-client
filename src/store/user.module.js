export default {
  namespaced: true,
  state: {
    id: '',
    name: '',
    email: '',
    image: '',
    is_verified: false,
    last_seen: '',
  },
  mutations: {
    SET_USER(state, payload) {
      state.id = payload.id
      state.name = payload.name
      state.email = payload.email
      state.image = payload.image
      state.last_seen = payload.last_seen
    },
  },
  actions: {
    setUser(ctx, payload) {
      ctx.commit('SET_USER', payload)
    },
  },
}
