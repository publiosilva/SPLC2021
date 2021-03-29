<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <h4>Measures</h4>
      <q-table
        :data="measures"
        :columns="[
          { field: 'measureName', label: 'Name' },
          { field: 'measureDescription', label: 'Description' },
        ]"
        :pagination="{
          rowsPerPage: 15
        }"
        row-key="measureName"
        hide-bottom
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Measures',

  data() {
    return {
      measures: [
        {
          measureName: 'Number of features (NF)',
          measureDescription: 'Total number of features in the model',
        },
        {
          measureName: 'Number of Mandatory Features (NM)',
          measureDescription: 'Number of mandatory features in the model',
        },
        {
          measureName: 'Number of top features (NTop)',
          measureDescription: 'Number of features descending directly from the root',
        },
        {
          measureName: 'Number of leaf Features (NLeaf)',
          measureDescription: 'Number of features that have no children',
        },
        {
          measureName: 'Depth of tree Max (DT Max)',
          measureDescription: 'Number of features with the longest distance from the feature model root',
        },
        {
          measureName: 'Cognitive Complexity of a Feature Model (CogC)',
          measureDescription: 'Number of points of variance',
        },
        {
          measureName: 'Feature EXtendibility (FEX)',
          measureDescription: 'NLeaf + SCDF + MCDF',
        },
        {
          measureName: 'Flexibility of configuration (FoC)',
          measureDescription: 'NO/NF',
        },
        {
          measureName: 'Single Cyclic Dependent Features (SCDF)',
          measureDescription: 'The sum of all features participating in child feature constraints that have variant points with [1..1]',
        },
        {
          measureName: 'Multiple Cyclic Dependent Features (MCDF)',
          measureDescription: 'The sum of all features participating in child feature constraints that have variant points with cardinality [1 .. *]',
        },
        {
          measureName: 'Number of Features Referenced in Constraints Mean (Rden)',
          measureDescription: 'Average number of (non-parent) features referenced in another feature\'s constraints',
        },
        {
          measureName: 'Ratio of variability (RoV)',
          measureDescription: 'Sum of the average number of child features in each of the nodes',
        },
        {
          measureName: 'Number of valid configurations (NVC)',
          measureDescription: 'Number of possible and valid configurations of the feature model',
        },
        {
          measureName: 'Number Groups Or (NGOr)',
          measureDescription: 'Number of variation points with Or relationship',
        },
        {
          measureName: 'Number Groups XOR (NGXOr)',
          measureDescription: 'Number of variation points with XOr relationship',
        },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>

</style>
