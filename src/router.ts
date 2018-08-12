import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Article from './views/Article.vue';
import About from './views/About.vue';
import Tag from './views/Tag.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'index',
    //   redirect: {
    //     path: '/home/1'
    //   }
    // },
    {
      path: '/home',
      name: 'home',
      redirect: {
        path: '/home/1'
      }
    },
    {
      path: '/home/:page',
      name: 'home-page',
      component: Home,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: Article,
    },
    {
      path: '/about',
      name: 'about',
      component: About
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/tag/:id',
      name: 'tag',
      component: Tag
    }
  ],
});
