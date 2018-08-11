<template>
  <div class="about-page">
    <md-content url="https://cciradih.top/about/" attr="content"></md-content>
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
export default class About extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/css/vars.scss';
@import '@/assets/css/base.scss';

.about-page {
  @extend %page-template;
}
</style>
