<template>
  <div class="header">
    <span class="left">
      <label class="title">{{ title.toUpperCase().slice(0, 10) }}</label>
    </span>
    <span class="nav">
      <template v-for="router in routerData">
        <router-link 
          :to="router.path" 
          :key="router.name" 
          class="router"
          exact
        >
          {{ router.name }}
        </router-link>
      </template>
    </span>
    <span class="right">
      <img src="https://avatars0.githubusercontent.com/u/8306955?v=4" alt="avatar">
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  public title: string = 'Erioifpud'
  public routerData = [
    {
      name: 'home',
      path: '/'
    },
    {
      name: 'about',
      path: '/about'
    }
  ]
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/vars.scss';

.header {
  position: relative;
  // height: 5rem;
  line-height: 5rem;
  background: #fff;
  padding: 0 4rem;
  text-align: center;
  vertical-align: middle;
  .title {
    position: absolute;
    font-size: 1.5rem;
    font-weight: 500;
    color: $color8;
  }

  img {
    border-radius: 100%;
    vertical-align: middle;
    width: 2.5rem;
    box-shadow: 0 1px 10px #95a5a6;
  }
}

.router {
  transition: color 0.4s ease-in-out;
  letter-spacing: 0;
  font-size: 1.1rem;
  text-decoration: none;
  margin: 1rem;
  color: $color8;
  &-link-active {
    color: $color7;
  }
}

.left {
  float: left;
}

.right {
  float: right;
}

@media screen and (max-width: $mobile-width) {
  .header {
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 2rem;
    .right {
      display: none;
    }
    .title {
      font-size: 1rem;
    }
  }
}
</style>

