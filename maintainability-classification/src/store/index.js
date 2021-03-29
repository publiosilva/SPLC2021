import Vue from 'vue';
import Vuex from 'vuex';
import sample from './sample';
import featureModel from './feature-model';
import measure from './measure';

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default () => {
  const Store = new Vuex.Store({
    modules: {
      sample,
      featureModel,
      measure,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING,
  });

  return Store;
};
