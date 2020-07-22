export const state = () => ({
  logoClick: false
})

export const actions = {
  // async nuxtServerInit({ commit }, { req, error }) {}
}

export const mutations = {
  setLogoClick (state, payload) {
    state.logoClick = payload
  }
}