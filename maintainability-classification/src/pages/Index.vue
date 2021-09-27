<template>
  <q-page class="flex items-center">
    <div class="row full-width">
      <div class="col-8 offset-2">
        <h5>How to use?</h5>
        <ul>
          <li>
            Create a feature model in a modeling tool (we recommend the DyMMer
            tool which is available at
            https://github.com/DyMMerProject/DyMMerV2).
          </li>

          <li>
            Calculate the values of the NF, NM, NTop, NLeaf, DTMax, CogC, FoC,
            SCDF and RDen maintainability measures in a tool that supports the
            calculation of these measures (the DyMMer tool supports the
            calculation of the 9 maintenance measures).
          </li>

          <li>
            Enter the model name and the measurement values in the order
            described above in the text field below. Separate the values with a
            comma. You can insert more than one model of features at a time,
            just put one item per line.
          </li>

          <li>Click on the "Import" button.</li>

          <li>
            See the maintainability of the feature model in the
            "Maintainability" column of the table below.
          </li>

          <li>
            Click on the "Suggestions" button to view suggested changes to the
            measurement values.
          </li>
        </ul>
      </div>
      <div class="col-8 offset-2">
        <div class="row">
          <div class="col-4 q-pr-sm q-pb-sm">
            <q-input outlined label="Feature Model Name" v-model="featureModelName"></q-input>
          </div>
          <div class="col-4 q-pr-sm q-pb-sm">
            <q-input outlined label="NF" type="number" v-model.number="NF"></q-input>
          </div>
          <div class="col-4 q-pb-sm">
            <q-input outlined label="NM" type="number" v-model.number="NM"></q-input>
          </div>
          <div class="col-4 q-pr-sm q-pb-sm">
            <q-input outlined label="NTop" type="number" v-model.number="NTop"></q-input>
          </div>
          <div class="col-4 q-pr-sm q-pb-sm">
            <q-input outlined label="NLeaf" type="number" v-model.number="NLeaf"></q-input>
          </div>
          <div class="col-4 q-pb-sm">
            <q-input outlined label="DTMax" type="number" v-model.number="DTMax"></q-input>
          </div>
          <div class="col-4 q-pr-sm q-pb-sm">
            <q-input outlined label="CogC" type="number" v-model.number="CogC"></q-input>
          </div>
          <div class="col-4 q-pr-sm q-pb-sm">
            <q-input outlined label="FoC" type="number" v-model.number="FoC"></q-input>
          </div>
          <div class="col-4 q-pb-sm">
            <q-input outlined label="SCDF" type="number" v-model.number="SCDF"></q-input>
          </div>
          <div class="col-4 q-pr-sm q-pb-sm">
            <q-input outlined label="RDen" type="number" v-model.number="RDen"></q-input>
          </div>
        </div>
        <div class="flex justify-end full-width q-mt-md">
          <q-btn
            color="primary"
            label="Import"
            :disable="formIsInvalid"
            @click="doImport"
          />
        </div>
      </div>
      <div class="col-8 offset-2 q-mt-xl">
        <q-table
          title="Samples"
          :data="samples"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body-cell-suggestions="props">
            <q-td :props="props">
              <q-btn
                v-if="props.value && props.value.length"
                flat
                color="primary"
                label="Suggestions"
              >
                <q-popup-proxy>
                  <q-list dense bordered padding class="rounded-borders">
                    <q-item
                      v-for="(suggestion, index) in props.value"
                      :key="index"
                      clickable
                      v-ripple
                    >
                      <q-item-section class="q-py-sm">
                        <q-item-label class="text-weight-bold">
                          Make
                          {{
                            `${suggestion.feature} ${suggestion.comparator} ${suggestion.threshold}`
                          }}
                        </q-item-label>
                        <q-item-label>
                          <q-banner rounded class="bg-primary text-white q-mt-sm">
                            {{ tips[suggestion.feature][suggestion.comparator] }}
                          </q-banner>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-popup-proxy>
              </q-btn>
              <q-btn v-else flat disable label="No Suggestions" />
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="col-8 offset-2 q-mt-md flex justify-end">
        <q-btn
            label="Clear"
            class="q-mr-sm"
            @click="doClear"
          />
        <q-btn
            color="primary"
            label="Evaluate"
            :disable="samples.length === 0"
            @click="doEvaluate"
          />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PageIndex',

  data() {
    return {
      helperText:
        'Insert samples in the format: Feature Model Name,Number of Features (NF),Number of Mandatory Features (NM),Number of Top Features (NTop),Number of Leaf Features (NLeaf),Depth of Tree Max (DTMax), Cognitive Complexity (CogC),Flexibility of Configuration (FoC),Single Cylic Dependent Feature (SCDF),Density of the Dependency Graph (RDen)\n\nExample:\nFoo,10,2,3,5,3,4,0.53,0,0\nBar,20,12,8,7,6,9,0.74,1,2',
      columns: [
        {
          name: 'name',
          align: 'center',
          label: 'Name',
          field: 'name',
          sortable: true,
        },
        {
          name: 'NF',
          align: 'center',
          label: 'NF',
          field: 'NF',
          sortable: true,
        },
        {
          name: 'NM',
          align: 'center',
          label: 'NM',
          field: 'NM',
          sortable: true,
        },
        {
          name: 'NTop',
          align: 'center',
          label: 'NTop',
          field: 'NTop',
          sortable: true,
        },
        {
          name: 'NLeaf',
          align: 'center',
          label: 'NLeaf',
          field: 'NLeaf',
          sortable: true,
        },
        {
          name: 'DTMax',
          align: 'center',
          label: 'DTMax',
          field: 'DTMax',
          sortable: true,
        },
        {
          name: 'CogC',
          align: 'center',
          label: 'CogC',
          field: 'CogC',
          sortable: true,
        },
        {
          name: 'FoC',
          align: 'center',
          label: 'FoC',
          field: 'FoC',
          sortable: true,
        },
        {
          name: 'SCDF',
          align: 'center',
          label: 'SCDF',
          field: 'SCDF',
          sortable: true,
        },
        {
          name: 'RDen',
          align: 'center',
          label: 'RDen',
          field: 'RDen',
          sortable: true,
        },
        {
          name: 'maintainability',
          required: true,
          label: 'Maintainability',
          align: 'center',
          field: (row) => (row.prediction ? row.prediction.label : 'UNKNOWN'),
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'suggestions',
          align: 'center',
          label: 'Suggestions',
          field: 'suggestionsForImprovement',
          sortable: true,
        },
      ],
      featureModelName: null,
      NF: null,
      NM: null,
      NTop: null,
      NLeaf: null,
      DTMax: null,
      CogC: null,
      FoC: null,
      SCDF: null,
      RDen: null,
      tips: {
        NF: {
          '>': 'Increase the number of features (hint: divide very broad features into smaller features)',
          '<=': 'Decrease the number of features (hint: add very small features into larger features)',
        },
        NM: {
          '>': 'Increase the number of mandatory features (hint: check if there are any optional features that should be mandatory)',
          '<=': 'Decrease the number of mandatory features (hint: check if there are any mandatory features that should be optional)',
        },
        NTop: {
          '>': 'Restructure the feature model so that the number of features that descend directly from the root of the tree increases',
          '<=': 'Restructure the feature model so that the number of features that descend directly from the root of the tree decreases',
        },
        NLeaf: {
          '>': 'Restructure the feature model so that the number of features in the last level of the tree increases',
          '<=': 'Restructure the feature model so that the number of features in the last level of the tree decreases',
        },
        DTMax: {
          '>': 'Restructure the feature model so that the number of levels in the tree increases',
          '<=': 'Restructure the feature model so that the number of levels in the tree decreases',
        },
        CogC: {
          '>': 'Increase the number of Or or XOr type groupings',
          '<=': 'Decrease the number of Or or XOr type groupings',
        },
        FoC: {
          '>': 'Increase the number of optional features (hint: check if there are any mandatory features that should be optional) or decrease the number of features (hint: add very small features into larger features)',
          '<=': 'Decrease the number of optional features (hint: check if there are any optional features that should be mandatory) or increase the number of features (hint: divide very comprehensive features into smaller features)',
        },
        SCDF: {
          '>': 'Restructure the feature model so that the number of features that are children of XOr type groupings increases',
          '<=': 'Restructure the feature model so that the number of features that are children of groupings of type XOr decreases',
        },
        RDen: {
          '>': 'Increase the number of features referenced in constraints',
          '<=': 'Decrease the number of features referenced in constraints',
        },
      },
    };
  },

  computed: {
    ...mapGetters('sample', ['samples']),

    formIsInvalid() {
      const isEmpty = (value) => value == null || value.length === 0;
      const isNonNegative = (value) => parseInt(value, 10) >= 0;
      const numericFields = [
        this.NF,
        this.NM,
        this.NTop,
        this.NLeaf,
        this.DTMax,
        this.CogC,
        this.FoC,
        this.SCDF,
        this.RDen,
      ];

      return isEmpty(this.featureModelName) || numericFields
        .map((value) => isNonNegative(value))
        .some((value) => !value);
    },
  },

  methods: {
    ...mapActions('sample', ['clearSamples', 'importSamples', 'evaluateSamples']),

    doClear() {
      this.clearSamples();
    },

    doEvaluate() {
      this.evaluateSamples();
    },

    doImport() {
      this.importSamples({
        name: this.featureModelName,
        NF: this.NF,
        NM: this.NM,
        NTop: this.NTop,
        NLeaf: this.NLeaf,
        DTMax: this.DTMax,
        CogC: this.CogC,
        FoC: this.FoC,
        SCDF: this.SCDF,
        RDen: this.RDen,
      });
      this.featureModelName = null;
      this.NF = null;
      this.NM = null;
      this.NTop = null;
      this.NLeaf = null;
      this.DTMax = null;
      this.CogC = null;
      this.FoC = null;
      this.SCDF = null;
      this.RDen = null;
    },
  },
};
</script>
