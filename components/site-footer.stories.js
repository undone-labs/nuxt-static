import SiteFooter from './site-footer.vue'
import GeneralData from '@/content/core/general.json'

export default {
  title: 'Components/Footer',
  component: SiteFooter
}

export const footer = args => ({
  components: {
    SiteFooter
  },
  template: '<SiteFooter :footer="footerData" />',
  data () {
    return {
      footerData: GeneralData.footer
    }
  }
})
