import predictOnly from '../../util/predict';
import getSuggestionsForImprovement from '../../util/getSuggestionsForImprovement';
import decisionTree from './decision-tree.json';

export function importSamples({ commit }, samples) {
  const rows = samples.split('\n');

  rows.forEach((row) => {
    const [name, NF, NM, NTop, NLeaf, DTMax, CogC, FoC, SCDF, RDen] = row.split(
      ',',
    );
    const x = {
      NF,
      NM,
      NTop,
      NLeaf,
      DTMax,
      CogC,
      FoC,
      SCDF,
      RDen,
    };
    const prediction = predictOnly(x, decisionTree);
    const suggestionsForImprovement = getSuggestionsForImprovement(
      x,
      prediction,
    );

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
      prediction,
      suggestionsForImprovement,
    });
  });
}

export function clearSamples({ commit }) {
  commit('setSamples', []);
}
