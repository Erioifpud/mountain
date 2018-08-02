<template>
  <div class="article-container">
    <!-- <p class="name">Articles</p> -->
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

</style>

