<template>
  <div class="home-page">
    <!-- <p class="name">Articles</p> -->
    <div class="article-list">
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
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
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
export default class Home extends Vue {
  // public articleList: Article[] = []
  private show: boolean = true
  private articlePerPage: number = 5
  private currentPage: number = 1

  @State
  private articleList: Type.Article[]

  @Mutation('updateArticleList')
  private updateArticleList

  get articleSlice () {
    const page = this.currentPage - 1
    const start = this.articlePerPage * page
    return this.articleList.slice(start, start + this.articlePerPage)
  }

  get maxPage () {
    return Math.ceil(this.articleList.length / this.articlePerPage)
  }

  private updatePage (val: number) {
    this.currentPage = val
  }

  private initPage () {
    let page = parseInt(this.$route.params.page, 10)
    if (page < 1) {
      this.$router.replace({
        name: 'home-page',
        params: {
          page: '1'
        }
      })
      page = 1
    } else if (page > this.maxPage) {
      this.$router.replace({
        name: 'home-page',
        params: {
          page: `${this.maxPage}`
        }
      })
      page = this.maxPage
    }
    this.currentPage = page
  }

  @Watch('currentPage')
  private currentPageUpdate (val: number) {
    this.$router.replace({
      name: 'home-page',
      params: {
        page: `${val}`
      }
    })
  }

  private mounted () {
    if (this.articleList.length === 0) {
      this.$ax.get('https://cciradih.top/articles/')
        .then((r: any) => {
          // this.$store.commit('updateArticleList', r.data)
          this.updateArticleList(r.data)
          this.show = false
          this.initPage()
        })
    } else {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/vars.scss';
@import '@/assets/css/base.scss';

.article-list {
  @extend %page-template;
}

.article-section {
  &:not(:last-of-type) {
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 2rem;
  }
}
</style>

