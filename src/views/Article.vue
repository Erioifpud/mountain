<template>
  <div class="article-page">
    <md-content url="https://cciradih.top/articles/"></md-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MdContent from '@/components/MdContent'

@Component({
  components: {
    MdContent
  }
})
export default class Article extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/css/vars.scss';
@import '@/assets/css/base.scss';

.article-page {
  @extend %page-template;
}
</style>

