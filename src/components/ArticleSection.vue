<template>
  <div>
    <div class="article">
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import Article from '@/interfaces.ts'
import * as moment from 'moment'

@Component
export default class ArticleSection extends Vue {
  @Prop({
    required: true
  })
  public article: Article

  private createTime (timestamp: number) {
    return moment(timestamp).format('YYYY-MM-DD')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/vars.scss';

.article {
  // margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  // border-bottom: 1px solid #f2f2f2;

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
      width: fit-content;
      font-size: 1.2rem;
      font-weight: 500;
      color: #34495e;
      cursor: pointer;
      transition: color 0.25s ease-in-out;
      
      &:hover {
        color: $color7;
      }
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
        margin-right: 1rem;
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
}
</style>

