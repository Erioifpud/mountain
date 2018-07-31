<template>
  <div class="container">
    <!-- <div > -->
      <div v-for="i in 6" :key="`i-${i}`" class="row">
        <!-- <div > -->
          <div v-for="j in 6" :key="`j-${j}`" :class="`block block-${i}-${j}`"></div>
        <!-- </div> -->
      </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {

}
</script>

<style lang="scss" scoped>
@import '@/assets/css/vars.scss';

.container {
  margin: 1rem;
}

.row {
  // height: 10px;
  line-height: 10px;
}

.block {
  display: inline-block;
  margin: 2px;
  height: 10px;
  width: 10px;
  background-color: $color1;
}

@keyframes rotate {
  0% {
    transform: rotate3d(1, -1, 0, 0deg);
  }

  50% {
    transform: rotate3d(1, -1, 0, 180deg);
  }

  100% {
    transform: rotate3d(1, -1, 0, 360deg);
  }
}

%animation-base {
  animation-name: rotate;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

@function calc-delay($val) {
  @return 0.2s * $val;
}

@for $i from 1 through 6 {
  @for $j from 1 through 6 {
    .block-#{$i}-#{$j} {
      @extend %animation-base;
      animation-delay: calc-delay($i + $j);
    }
  }
}
</style>
