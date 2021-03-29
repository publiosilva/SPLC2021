import measures from './measures.json';

export function fetchMeasures({ commit }) {
  commit('setMeasures', measures);
}

export function fetchMeasureById({ commit, state }, id) {
  const [measure] = state.measures.filter((item) => item.Id === `${id}`);

  commit('setMeasure', measure);
}
