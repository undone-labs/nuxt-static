<template>
  <header class="site-header">
    <div class="grid">
      <NuxtLink to="/" class="logo">
        <SiteLogo />
      </NuxtLink>
    </div>
  </header>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'
import SiteLogo from '@/components/svgs/logo'

// ====================================================================== Export
export default {
  name: 'SiteHeader',

  components: {
    SiteLogo
  },

  props: {
    header: {
      type: Array,
      required: false,
      default: () => { }
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      navigationOpen: 'global/navigationOpen'
    }),
    headerData () {
      return this.header ? this.header : this.siteContent.general.header
    }
  },

  methods: {
    ...mapActions({
      setNavigationOpen: 'global/setNavigationOpen'
    })
  }
}
</script>

<style lang="scss" scoped>
.site-header {
  background-color: $color_Primary;
  margin-bottom: toRem(100);
  padding: toRem(30) 0;
  .grid {
    color: white;
    display: flex;
    justify-content: space-between;
    nav {
      > * {
        margin-right: 1rem;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    a {
      line-height: 1;
    }
    .logo {
      width: toRem(60);
      display: block;
    }
  }
}
</style>
