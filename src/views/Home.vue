<template>
  <div class="home">
    <!-- <p class="name">Articles</p> -->
    <div class="article-list">
      <loading :show="show"></loading>
      <article-section 
        class="article-section"
        v-for="article in articleSlice" 
        :key="article.id"
        :article="article"
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
import Article from '@/interfaces.ts'


@Component({
  components: {
    Loading,
    ArticleSection,
    Paging
  }
})
export default class Home extends Vue {
  public articleList: Article[] = []
  public show: boolean = true
  public articlePerPage: number = 5
  public currentPage: number = 1

  get articleSlice () {
    const page = this.currentPage - 1
    const start = this.articlePerPage * page
    return this.articleList.slice(start, start + this.articlePerPage)
  }

  public updatePage (val: number) {
    this.currentPage = val
  }

  public initPage () {
    const page = parseInt(this.$route.params.page, 10) || 1
    if (page >= 1 && page < this.articleList.length) {
      this.currentPage = page
      console.log(this.currentPage)
    }
  }

  private mounted () {
    this.$ax.get('https://cciradih.top/articles/')
      .then((r: any) => {
        this.articleList = r.data
        this.show = false
        this.initPage()
      })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/vars.scss';

.article-list {
  width: 100%;
  height: 100%;
  padding: 1.5rem 2.5rem;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 5px 10px darken($color1, 10%);

  .name {
    font-size: 1.25rem;
    font-weight: 450;
  }
}

.article-section {
  &:not(:last-of-type) {
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 2rem;
  }
}
</style>

