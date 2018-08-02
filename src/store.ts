import Vue from 'vue';
import Vuex from 'vuex';
import Type from '@/interfaces';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articleList: [] as Type.Article[]
  },
  mutations: {
    updateArticleList (state, newList: Type.Article[]) {
      state.articleList = newList
    }
  },
  actions: {

  },
});
