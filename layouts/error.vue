<template>
  <div v-if="loaded" class="page error-page">
    <SiteHeader />

    <BlockBuilder :sections="siteContent.general.page_404.page_content" />

    <SiteFooter />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import SiteHeader from '@/components/site-header'
import BlockBuilder from '@/components/blocks/block-builder'
import SiteFooter from '@/components/site-footer'

export default {
  name: 'ErrorPage',

  components: {
    SiteHeader,
    BlockBuilder,
    SiteFooter
  },

  data () {
    return {
      loaded: false,
      tag: 'error'
    }
  },

  head () {
    if (this.loaded) {
      return this.$CompileSeo(this.$GetSeo())
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    })
  },

  mounted () {
    this.getData()
    this.setPage404(true)
  },

  methods: {
    getData () {
      this.$store.dispatch('global/getBaseData', 'general')
      this.loaded = true
    },
    ...mapActions({
      setPage404: 'global/setPage404'
    })
  }
}
</script>
