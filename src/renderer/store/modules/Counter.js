const state = {
  main: 0,
  authInfo : "{}",
  uid : '',
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  setAuth (state, payload) {
    state.authInfo = payload;
  },
  setUid (state, payload) {
    state.uid = payload;
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  setAuth (context, payload) {
    context.commit('setAuth', payload)
  },
  setUid (context, payload) {
    context.commit('setUid', payload)
  }
}

export default {
  state,
  mutations,
  actions
}
