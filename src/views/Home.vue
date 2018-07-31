<template>
  <div class="home">
    <!-- <p class="name">Articles</p> -->
    <loading></loading>
    <div class="article" v-for="article in articleList" :key="article.id">
      <span class="a-section">
        <div class="a-title">{{ article.title }}</div>
        <div class="a-summary">{{ article.content }}</div>
        <div class="a-footer">
          <label class="a-date">{{ createTime(article.creationTime) }}</label>
          <a class="a-tag" v-for="tag in article.tags" :key="tag.id">{{ tag.name }}</a>
        </div>
      </span>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Loading from '@/components/Loading'
import Article from '@/interfaces.ts'
import * as moment from 'moment'

@Component({
  components: {
    Loading
  }
})
export default class Home extends Vue {
  public articleList: Article[] = []

  private createTime (timestamp: number) {
    return moment(timestamp).format('YYYY-MM-DD')
  }

  private mounted () {
    this.$ax.get('https://cciradih.top/articles/')
      .then((r: any) => {
        this.articleList = r.data
      })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/vars.scss';

.home {
  width: 100%;
  height: 100%;
  padding: 1.5rem 2.5rem;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 5px 10px darken(#4fc1ff, 10%);
  .name {
    font-size: 1.25rem;
    font-weight: 450;
  }
}

.article {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f2f2f2;

  & * {
    margin-bottom: 0.5rem;
  }
  .a-section {
    .a-title::before {
      content: '◇';
      letter-spacing: 0.5rem;
      color: #e74c3c;
    }

    .a-title {
      vertical-align: middle;
      font-size: 1.2rem;
      font-weight: 500;
      color: #34495e;
      // margin-bottom: 0.5rem;
    }

    .a-summary {
      font-size: 0.9rem;
      color: #485e74;
      margin-bottom: 1rem;
    }

    .a-footer {
      color: $color8;

      .a-tag {
        cursor: pointer;
        margin-right: 0.5rem;
        transition: color 0.25s ease-in-out;

        &::before {
          content: '#';
        }
        &:hover {
          color: $color7;
        }
      }
      .a-date {
        margin-right: 1rem;
        &::before {
          content: '◎';
          letter-spacing: 0.25rem;
        }
      }
    }
  }

  .a-right-section {
    width: 10%;
  }
}
</style>

