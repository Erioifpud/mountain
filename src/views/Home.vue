<template>
  <div class="home">
    <!-- <p class="name">Articles</p> -->
    <div class="article-list">
      <loading :show="show"></loading>
      <!-- <transition name="slide-fade"> -->
        <article-section 
          class="article-section"
          v-for="article in articleSlice" 
          :key="article.id"
          :article="article"
        />
      <!-- </transition> -->
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

  get maxPage () {
    return Math.ceil(this.articleList.length / this.articlePerPage)
  }

  public updatePage (val: number) {
    this.currentPage = val
  }

  public initPage () {
    let page = parseInt(this.$route.params.page, 10)
    if (page < 1) {
      this.$router.replace('/home/1')
      page = 1
    } else if (page > this.maxPage) {
      this.$router.replace(`/home/${this.maxPage}`)
      page = this.maxPage
    }
    this.currentPage = page
  }

  @Watch('currentPage')
  public currentPageUpdate (val: number) {
    this.$router.replace(`/home/${val}`)
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

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

