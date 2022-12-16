<template>
  <div :class="[`page page-${tag}`]">

    <SiteHeader />
    <BlockBuilder :sections="sections" />
    <SiteFooter />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SettingsData from '@/content/config/settings.json'
import IndexPageData from '@/content/core/index.json'

import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import BlockBuilder from '@/components/blocks/block-builder'

export default {
  name: 'PageIndex',

  components: {
    SiteHeader,
    SiteFooter,
    BlockBuilder
  },

  data () {
    return {
      tag: 'index'
    }
  },

  async fetch ({ store, $content }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'settings', data: SettingsData })
    await store.dispatch('global/getBaseData', { key: 'index', data: IndexPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    pageData () {
      return this.siteContent[this.tag]
    },
    sections () {
      return this.pageData.page_content
    },
    header () {
      return this.pageData.header
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
