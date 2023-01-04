<template>
  <footer class="site-footer">
    <div class="grid-center">
      <p>{{ footerData.copyright }}</p>
    </div>
    <div class="grid-center site-footer-social">
      <a v-for="(icon, index) in footerData.social" :key="index" target="_blank" :href="icon.url">
        <component :is="getButtonIcon(icon.id)" />
      </a>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import SiteLogo from '@/components/svgs/logo'
import IconLinkedIn from '@/components/svgs/social-linkedIn'
import IconTwitter from '@/components/svgs/social-twitter'
import IconYoutube from '@/components/svgs/social-youtube'
import IconFacebook from '@/components/svgs/social-facebook'
import Button from '@/components/button'

export default {
  name: 'SiteFooter',

  components: {
    SiteLogo,
    Button,
    IconLinkedIn,
    IconTwitter,
    IconYoutube,
    IconFacebook
  },

  props: {
    footer: {
      type: Array,
      required: false,
      default: () => { }
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    footerData () {
      return this.footer ? this.footer : this.siteContent.general.footer
    }
  },

  methods: {
    getButtonIcon (network) {
      let tag
      switch (network) {
        case 'linkedin': tag = 'IconLinkedIn'; break
        case 'twitter': tag = 'IconTwitter'; break
        case 'facebook': tag = 'IconFacebook'; break
        case 'youtube': tag = 'IconYoutube'; break
        default: tag = 'div'; break
      }
      return tag
    },
    getTag (url) {
      return url ? this.$GetTagBasedOnUrl(url) : 'div'
    },
    getTarget (url) {
      return url ? this.$GetTargetBasedOnUrl(url) : false
    },
    getTo (url) {
      return url ? this.$GetTagBasedOnUrl(url) === 'nuxt-link' ? url : false : false
    },
    getHref (url) {
      return url ? this.$GetTagBasedOnUrl(url) === 'a' ? url : false : false
    }
  }
}
</script>

<style lang="scss" scoped>
.site-footer {
  position: relative;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: $color_Primary;
  color: white;
  z-index: 5;
}
.site-footer-social {
  a {
    margin: 0 toRem(10);
  }
}
</style>
