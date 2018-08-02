<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <top-bar></top-bar>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TopBar from '@/components/TopBar'

@Component({
  components: {
    TopBar
  }
})
export default class App extends Vue {

}
</script>

<style lang="scss">
@import '@/assets/css/vars.scss';
@import '@/assets/css/base.scss';

html, body {
  margin: 0;
  width: 100%;
  height: 100%;
}

#app {
  @extend %font1;
  height: inherit; 
  // text-align: center;
  // color: #2c3e50;
}

.content {
  min-height: calc(100% - 5rem); 
  padding: 3rem 4rem;
  box-sizing: border-box;
  background-color: #4fc1ff;
  box-shadow: inset 0 2px 2px darken(#4fc1ff, 5%);
}

@media screen and (max-width: $mobile-width) {
  .content {
    min-height: calc(100% - 2.5rem); 
    padding: 1.5rem 2rem;
    padding-bottom: 2rem;
  }
}
</style>
