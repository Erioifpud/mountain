<template>
  <div class="page">
    <div class="page__content">
      <p class="page__title" v-if="$route.params.name">{{ $route.params.name }}</p>
      <loading v-if="show"></loading>
      <article-section 
          class="article-section"
          v-for="article in articleSlice" 
          :key="article.id"
          :article="article"
          @clickTitle="$router.push({ name: 'post', params: $event })"
          @clickTag="$router.push({ name: 'tag', params: $event })"
        />
    </div>
    <paging 
      :total="articleList.length || 0"
      :countPerPage="articlePerPage"
      v-model="currentPage"
    /> 
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Loading from '@/components/Loading'
import ArticleSection from '@/components/ArticleSection'
import Paging from '@/components/Paging'
import Type from '@/interfaces.ts'

@Component({
  components: {
    Loading,
    ArticleSection,
    Paging
  }
})
export default class Tag extends Vue {
  private articleList: Type.Article[] = []
  private show: boolean = true
  private articlePerPage: number = 5
  private currentPage: number = 1

  get articleSlice () {
    const page = this.currentPage - 1
    const start = this.articlePerPage * page
    return this.articleList.slice(start, start + this.articlePerPage)
  }

  private mounted () {
    let params: any = this.$route.params
    this.$ax.get(`https://cciradih.top/tags/${params.id}/`)
      .then((r: any) => {
        // this.$store.commit('updateArticleList', r.data)
        // this.updateArticleList(r.data)
        this.articleList = r.data
        this.show = false
        // this.initPage()
      })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/vars.scss';
@import '@/assets/css/base.scss';

.page__content {
  @extend %page-template;

  .page__title {
    font-size: 1.2rem;
    color: $color8;
  }
}
</style>
