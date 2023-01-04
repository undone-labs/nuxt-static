<template>
  <div class="page page-blog">
    <SiteHeader />

    <BlockBuilder v-if="postHeading" :sections="postHeading" />
    <div class="grid-center">
      <div v-if="postTags" class="col-8">
        Tags:
        <span
          v-for="(item, index) in postTags"
          :key="`${item}-${index}`"
          class="tag">
          {{ item }}{{ index >= postTags.length-1 ? ' ' : ',' }}
        </span>
      </div>
      <div class="col-8">
        <nuxt-content :document="postBody" />
      </div>
      <div class="col-10">
        <div class="controls-wrapper">
          <Button :button="{type: 'solid', url: previousPost, text: 'Prev'}" />
          <Button :button="{type: 'solid', url: nextPost, text: 'Next'}" />
        </div>
      </div>
    </div>

    <SiteFooter />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import Button from '@/components/button'
import BlockBuilder from '@/components/blocks/block-builder'

// ====================================================================== Export
export default {
  name: 'BlogTemplate',

  components: {
    SiteFooter,
    SiteHeader,
    BlockBuilder,
    Button
  },

  async asyncData ({ $content, app, store, route, error }) {
    try {
      const markdown = await $content(`blog/${route.params.blog}`).fetch()
      const posts = await $content('blog').without(['body']).fetch()
      markdown.allPosts = posts.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt))
      return {
        markdown
      }
    } catch (e) {
      return error('This post does not exist')
    }
  },

  data () {
    return {
      tag: 'blog'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    allPosts () {
      return this.markdown.allPosts
    },
    postHeading () {
      return {
        post_heading: {
          grid: ['middle', 'center'],
          col_1: {
            type: 'text_block',
            cols: {
              num: 'col-6',
              push_left: 'off-0'
            },
            heading: this.markdown.title,
            description: this.markdown.description,
            label: this.markdown.date + ' / ' + this.markdown.author
          },
          col_2: {
            type: 'image_block',
            src: this.markdown.thumbnail,
            cols: {
              num: 'col-2',
              push_left: 'off-0'
            }
          }
        }
      }
    },
    postBody () {
      return this.markdown
    },
    postTags () {
      if (Array.isArray(this.markdown.tags)) {
        return this.markdown.tags
      }
      return false
    },
    postIndex () {
      return this.allPosts.findIndex(post => post.slug === this.markdown.slug)
    },
    previousPost () {
      const index = this.postIndex
      if (index > 0) {
        const slug = this.allPosts[index - 1].slug
        return `/blog/${slug}`
      }
      return false
    },
    nextPost () {
      const index = this.postIndex
      if (index < this.allPosts.length - 1) {
        const slug = this.allPosts[index + 1].slug
        return `/blog/${slug}`
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
