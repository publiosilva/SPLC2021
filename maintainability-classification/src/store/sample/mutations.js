export function setSamples(state, payload) {
  state.samples = payload;
}

export function addSample(state, payload) {
  state.samples.push(payload);
}
