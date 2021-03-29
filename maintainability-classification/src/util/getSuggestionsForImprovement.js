import _ from 'lodash';

function findBetterPath(root, label, currentPath = []) {
  const labelValues = {
    verybad: 1,
    bad: 2,
    moderate: 3,
    good: 4,
    verygood: 5,
  };
  const { rule, left, right } = root;
  const isLeaf = (node) => !!node?.label;
  let betterPaths = [];

  if (isLeaf(left)) {
    if (labelValues[left.label] > labelValues[label]) {
      betterPaths.push([...currentPath, rule]);
    }
  } else {
    betterPaths = [
      ...betterPaths,
      ...findBetterPath(left, label, [...currentPath, rule]),
    ];
  }

  if (isLeaf(right)) {
    if (labelValues[right.label] > labelValues[label]) {
      betterPaths.push([...currentPath, { ...rule, comparator: '>' }]);
    }
  } else {
    betterPaths = [
      ...betterPaths,
      ...findBetterPath(right, label, [
        ...currentPath,
        { ...rule, comparator: '>' },
      ]),
    ];
  }

  return betterPaths;
}

function removeDuplicatedSuggestions(suggestions) {
  const groupedSuggestions = suggestions.reduce((acc, current) => {
    const key = `${current.feature}${current.comparator}`;

    if (!acc[key]) {
      acc[key] = [current];
    } else {
      acc[key].push(current);
    }

    return acc;
  }, {});

  return Object.entries(groupedSuggestions).map(([key, value]) => {
    if (key.includes('<=')) {
      return _.minBy(value, (item) => item.threshold);
    }

    return _.maxBy(value, (item) => item.threshold);
  });
}

function filterAcceptedSuggestions(x, suggestion) {
  const { feature, comparator, threshold } = suggestion;
  const comparators = {
    '<=': () => x[feature] > threshold,
    '>': () => x[feature] <= threshold,
  };
  const compare = comparators[comparator];

  return compare();
}

function sanitizeSuggestionsForImprovement(x, suggestions) {
  const deduplicatedSuggestions = removeDuplicatedSuggestions(suggestions);

  return deduplicatedSuggestions.filter((suggestion) => filterAcceptedSuggestions(x, suggestion));
}

function getSuggestionsForImprovement(x, prediction) {
  const { label, path } = prediction;
  const [, ...pathNodes] = _.reverse([...path]);

  for (let i = 0; i < pathNodes.length; i += 1) {
    const pathNode = pathNodes[i];
    const betterPaths = findBetterPath(pathNode, label);

    if (betterPaths.length) {
      return sanitizeSuggestionsForImprovement(
        x,
        _.minBy(betterPaths, (item) => item.length),
      );
    }
  }

  return [];
}

export default getSuggestionsForImprovement;
