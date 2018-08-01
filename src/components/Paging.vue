<template>
  <ul class="paging" v-if="total !== 0">
    <li class="paging-item paging-prev" @click="clickPage(1)">&lt;</li>
    <li
      v-for="i in pages"
      class="paging-item"
      :key="i"
      :class="{selected: currentIndex === i}"
      @click="clickPage(i)"
    >
    {{ i }}
    </li>
    <li class="paging-item paging-next" @click="clickPage(maxPage)">&gt;</li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Model } from 'vue-property-decorator'

@Component
export default class Paging extends Vue {
  @Prop({ required: true })
  public total: number

  @Prop({ required: true })
  public countPerPage: number

  @Prop({ default: 5 })
  public pageRange: number

  @Model('pageChange', { type: Number })
  public currentIndex: number

  get maxPage () {
    return Math.ceil(this.total / this.countPerPage)
  }

  get pages () {
    const offset = (this.pageRange - 1) / 2
    const range = {
      start: this.currentIndex - offset,
      end: this.currentIndex + offset
    }
    if (range.start < 1) {
      range.end = range.end + (1 - range.start)
      range.start = 1
    }
    if (range.end > this.maxPage) {
      range.start = range.start - (range.end - this.maxPage)
      range.end = this.maxPage
    }
    if (range.start < 1) {
      range.start = 1
    }

    const arr = []
    for (let i = range.start; i <= range.end; i++) {
      arr.push(i)
    }
    return arr
  }

  public clickPage (index) {
    this.currentIndex = index
  }

  public clickPrevOrNext (dir) {
    if (this.currentIndex + dir >= 1 && this.currentIndex + dir <= this.maxPage) {
      this.currentIndex += dir
    }
  }

  @Watch('currentIndex')
  public onIndexChanged (val: number, oldVal: number) {
    this.$emit('pageChange', val)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/vars.scss';
@import '@/assets/css/base.scss';

.paging {
  width: fit-content;
  padding: 0;
  margin: 0 auto;
  margin-top: 2rem;
  list-style: none;
  background-color: #fff;
  user-select: none;
  font-size: 1.1rem;
  box-shadow: 0 5px 10px darken($color1, 10%);

  & > .paging-item {
    margin: 0.0625rem;
    padding: 0.25rem 0.75rem;
    display: inline-block;
    vertical-align: middle;
    font-weight: 500;
    cursor: pointer;
    color: $color8;
  }

  & > .paging-prev, & > .paging-next {
    color: $color1;
    font-weight: 500;
    font-size: 1.5rem;
    
    &:active {
      background-color: #f0f0f0;
    }
  }

  & > .paging-prev {
    border-right: 1px solid #f2f2f2;
  }

  & > .paging-next {
    border-left: 1px solid #f2f2f2;
  }

  .selected {
    border-bottom: 0.15rem solid $color1;
    // background-color: $color1;
    // border-radius: 5px;
  }
}
</style>
