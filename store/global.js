// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import GeneralSiteData from '@/content/core/general.json'
import Settings from '@/content/config/settings.json'

// /////////////////////////////////////////////////////////////////////// State
// -----------------------------------------------------------------------------
const state = () => ({
  siteContent: {},
  navigationOpen: false,
  page404: false
})

// ///////////////////////////////////////////////////////////////////// Getters
// -----------------------------------------------------------------------------
const getters = {
  siteContent: state => state.siteContent,
  navigationOpen: state => state.navigationOpen,
  page404: state => state.page404
}

// ///////////////////////////////////////////////////////////////////// Actions
// -----------------------------------------------------------------------------
const actions = {
  // //////////////////////////////////////////////////////////////// clearStore
  clearStore ({ commit }) {
    commit('CLEAR_STORE')
  },
  // /////////////////////////////////////////////////////////////// getBaseData
  async getBaseData ({ commit }, payload) {
    const key = typeof payload === 'string' ? payload : payload.key
    let data = false
    switch (key) {
      case 'general': data = GeneralSiteData; break
      case 'settings': data = Settings; break
      default : data = payload.data; break
    }
    if (data) {
      await this.dispatch('global/setSiteContent', { key, data })
    }
  },
  // //////////////////////////////////////////////////////////// setSiteContent
  setSiteContent ({ commit }, payload) {
    commit('SET_SITE_CONTENT', payload)
  },
  // ///////////////////////////////////////////////////////// setNavigationOpen
  setNavigationOpen ({ commit }, toggle) {
    commit('SET_NAVIGATION_OPEN', toggle)
  },
  // //////////////////////////////////////////////////////////////// setPage404
  setPage404 ({ commit }, toggle) {
    commit('SET_PAGE_404', toggle)
  }
}

// /////////////////////////////////////////////////////////////////// Mutations
// -----------------------------------------------------------------------------
const mutations = {
  CLEAR_STORE (state) {
    state.siteContent = {}
  },
  SET_SITE_CONTENT (state, payload) {
    state.siteContent[payload.key] = payload.data
  },
  SET_NAVIGATION_OPEN (state, toggle) {
    state.navigationOpen = toggle
  },
  SET_PAGE_404 (state, toggle) {
    state.page404 = toggle
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default {
  state,
  getters,
  actions,
  mutations
}
