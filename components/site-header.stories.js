import SiteHeader from './site-header.vue'
import GeneralData from '@/content/core/general.json'

export default {
  title: 'Components/Header',
  component: SiteHeader
}

export const header = args => ({
  components: {
    SiteHeader
  },
  template: '<SiteHeader :header="headerData" />',
  data () {
    return {
      headerData: GeneralData.header
    }
  }
})
