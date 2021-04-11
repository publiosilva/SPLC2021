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
        <div class="flex">
          <q-input
            v-model="text"
            filled
            type="textarea"
            label="Samples"
            :placeholder="helperText"
            class="full-width"
          />
        </div>
        <div class="flex justify-end full-width q-mt-sm">
          <q-btn
            color="primary"
            label="Import"
            :disable="!text"
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
                      <q-item-section>
                        Make
                        {{
                          `${suggestion.feature} ${suggestion.comparator} ${suggestion.threshold}`
                        }}
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
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PageIndex',

  data() {
    return {
      text: '',
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
          field: (row) => row.prediction.label,
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
    };
  },

  computed: {
    ...mapGetters('sample', ['samples']),
  },

  methods: {
    ...mapActions('sample', ['clearSamples', 'importSamples']),

    doImport() {
      this.clearSamples();
      this.importSamples(this.text);
    },
  },
};
</script>
