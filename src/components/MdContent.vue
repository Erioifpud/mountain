<template>
  <div class="md-container">
    <loading v-if="show"></loading>
    <div v-html="renderedText"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator'
import Loading from '@/components/Loading'
import * as MarkdownIt from 'markdown-it'
import Type from '@/interfaces.ts'

@Component({
  components: {
    Loading
  }
})
export default class MdContent extends Vue {
  public show: boolean = true
  public data: any = null
  public mdit: MarkdownIt = new MarkdownIt()

  @Prop({ required: true })
  public url: string

  @Prop({ default: 'content' })
  public attr: string

  get renderedText () {
    if (this.data) {
      return this.mdit.render(this.data[this.attr])
    } else {
      return ''
    }
  }

  private mounted () {
    const id = this.$route.params.id
    let url = this.url
    if (id) {
      url = `${this.url}${id}/`
    }
    this.$ax.get(url)
      .then((r: any) => {
        this.data = r.data
        this.show = false
      })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/vars.scss';
@import '@/assets/css/base.scss';

.md-container {
  @extend %main-content
}
</style>

