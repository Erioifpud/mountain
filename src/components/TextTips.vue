<template>
  <div class="text-tips">
    <p class="text-tips__emoji">{{ emoji }}</p>
    <p class="text-tips__message">{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TextTips extends Vue {
  @Prop() 
  private msg!: string

  @Prop()
  private emoji!: string
}
</script>

<style scoped lang="scss">
.text-tips {
  
}
</style>
