import featureModels from './feature-models.json';

export function fetchFeatureModels({ commit }) {
  commit('setFeatureModels', featureModels);
}

export function fetchFeatureModelById({ state, commit }, id) {
  const [featureModel] = state.featureModels.filter((item) => item.id === id);

  commit('setFeatureModel', featureModel);
}
