function predictOnly(x, root, path = []) {
  const {
    label, rule, left, right,
  } = root;
  const { feature, threshold } = rule || {};

  path.push(root);

  if (label) return { label, path };
  if (x[feature] <= threshold) return predictOnly(x, left, path);

  return predictOnly(x, right, path);
}

export default predictOnly;
