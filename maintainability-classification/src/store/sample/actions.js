import predictOnly from '../../util/predict';
import getSuggestionsForImprovement from '../../util/getSuggestionsForImprovement';
import decisionTree from './decision-tree.json';

export function importSamples({ commit }, {
  name, NF, NM, NTop, NLeaf, DTMax, CogC, FoC, SCDF, RDen,
}) {
  commit('addSample', {
    name,
    NF,
    NM,
    NTop,
    NLeaf,
    DTMax,
    CogC,
    FoC,
    SCDF,
    RDen,
  });
}

export function evaluateSamples({ commit, getters }) {
  const evaluatedSamples = getters.samples.map((item) => {
    const prediction = predictOnly(item, decisionTree);
    const suggestionsForImprovement = getSuggestionsForImprovement(
      item,
      prediction,
    );

    return {
      ...item,
      prediction,
      suggestionsForImprovement,
    };
  });

  commit('setSamples', evaluatedSamples);
}

export function clearSamples({ commit }) {
  commit('setSamples', []);
}
