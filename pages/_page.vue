<template>
  <div :class="[`page page-${$route.params.page}`]">

    <SiteHeader />
    <BlockBuilder :sections="sections" />
    <SiteFooter />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import BlockBuilder from '@/components/blocks/block-builder'

// ====================================================================== Export
export default {
  name: 'PageTemplate',

  components: {
    SiteHeader,
    BlockBuilder,
    SiteFooter
  },

  async asyncData ({ $content, app, store, route, error }) {
    const page = await $content(`page/${route.params.page}`).fetch().catch((err) => {
      error(err.message || 'This page does not exist')
    })
    await store.dispatch('global/getBaseData', { key: route.params.page, data: page })
    return {
      page
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.$route.params.page))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    pageData () {
      return this.siteContent[this.$route.params.page]
    },
    sections () {
      return this.pageData.page_content
    }
  }
}
</script>
