<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <h4>{{ featureModel.name || "Not Found" }}</h4>
      <div v-if="featureModel" class="row">
        <div class="col-12 col-md-6">
          <h6 class="q-mt-none q-mb-sm">Feature Tree</h6>
          <q-tree
            :nodes="featureTree"
            node-key="name"
            label-key="name"
            :expanded.sync="expandedNodes"
            class="feature-tree"
          />
        </div>
        <div class="col-12 col-md-6">
          <div class="row">
            <div class="col-12">
              <h6 class="q-mt-none q-mb-sm">Constraints</h6>
              <q-list bordered separator>
                <q-item
                  v-ripple
                  v-for="(item, index) in featureModel.constraints"
                  :key="index"
                >
                  <q-item-section>{{ item.value }}</q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="col-12 q-mt-lg">
              <router-link :to="{ name: 'measures' }">
                <h6 class="q-mt-none q-mb-sm">
                  Measures <q-icon name="link" />
                </h6>
              </router-link>
              <q-table
                :data="featureModelMeasuresDown"
                :columns="[
                  {
                    field: 'measureName',
                    label: 'Measure Name',
                    style: 'width: 375px'
                  },
                  { field: 'measureValue', label: 'Value' }
                ]"
                :pagination="{
                  rowsPerPage: 15
                }"
                row-key="measureName"
                hide-bottom
              />
              <q-table
                :data="featureModelMeasuresUp"
                :columns="[
                  {
                    field: 'measureName',
                    label: 'Measure Name',
                    style: 'width: 375px'
                  },
                  { field: 'measureValue', label: 'Value' }
                ]"
                :pagination="{
                  rowsPerPage: 15
                }"
                row-key="measureName"
                hide-bottom
                hide-header
                class="q-mt-sm"
              />
            </div>
            <div class="col-12">
              <h6 class="q-my-sm">Legend</h6>
              <q-list bordered separator>
                <q-item v-ripple>
                  <q-item-section avatar>
                    <q-avatar rounded>
                      <img src="~assets/m.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>Mandatory Feature</q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section avatar>
                    <q-avatar rounded>
                      <img src="~assets/o.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>Optional Feature</q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section avatar>
                    <q-avatar rounded>
                      <img src="~assets/or.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>OR Group</q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section avatar>
                    <q-avatar rounded>
                      <img src="~assets/xor.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>XOR Group</q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FeatureModels',

  data() {
    return {
      expandedNodes: [],
    };
  },

  computed: {
    ...mapGetters('featureModel', ['featureModel', 'featureTree']),
    ...mapGetters('measure', ['measure', 'measures']),

    featureModelId() {
      return parseInt(this.$route.params.id || 0, 10);
    },

    featureModelMeasuresDown() {
      return [
        {
          measureName: 'Number-of-Features ⇓',
          measureValue: this.measure['Number-of-Features'],
        },
        {
          measureName: 'Number-of-Mandatory-Features ⇓',
          measureValue: this.measure['Number-of-Mandatory-Features'],
        },
        {
          measureName: 'Number-of-Top-Features ⇓',
          measureValue: this.measure['Number-of-Top-Features'],
        },
        {
          measureName: 'Number-of-Leaf-Features ⇓',
          measureValue: this.measure['Number-of-Leaf-Features'],
        },
        {
          measureName: 'Depth-of-Tree-Max ⇓',
          measureValue: this.measure['Depth-of-Tree-Max'],
        },
        {
          measureName: 'Cognitive-Complexity-of-Feature-Model ⇓',
          measureValue: this.measure['Cognitive-Complexity-of-Feature-Model'],
        },
        {
          measureName: 'Single-Cylic-Dependent-Features ⇓',
          measureValue: this.measure['Single-Cylic-Dependent-Features'],
        },
        {
          measureName: 'Multiple-Cyclic-Dependent-Features ⇓',
          measureValue: this.measure['Multiple-Cyclic-Dependent-Features'],
        },
        {
          measureName: 'Number-of-Features-Referenced-in-Constraints-Mean ⇓',
          measureValue: this.measure[
            'Number-of-Features-Referenced-in-Constraints-Mean'
          ],
        },
        {
          measureName: 'Ratio-of-Variability ⇓',
          measureValue: this.measure['Ratio-of-Variability'],
        },
        {
          measureName: 'Number-of-Valid-Configurations ⇓',
          measureValue: this.measure['Number-of-Valid-Configurations'],
        },
        {
          measureName: 'Number-of-Groups-OR ⇓',
          measureValue: this.measure['Number-of-Groups-OR'],
        },
        {
          measureName: 'Number-of-Groups-XOR ⇓',
          measureValue: this.measure['Number-of-Groups-XOR'],
        },
      ];
    },

    featureModelMeasuresUp() {
      return [
        {
          measureName: 'Feature-Extensibility ⇑',
          measureValue: this.measure['Feature-Extensibility'],
        },
        {
          measureName: 'Flexibility-of-Configuration ⇑',
          measureValue: this.measure['Flexibility-of-Configuration'],
        },
      ];
    },
  },

  watch: {
    featureModelId() {
      this.loadFeatureModel();
    },
  },

  created() {
    this.fetchFeatureModels();
    this.fetchMeasures();
    this.loadFeatureModel();
  },

  methods: {
    ...mapActions('featureModel', [
      'fetchFeatureModels',
      'fetchFeatureModelById',
    ]),
    ...mapActions('measure', ['fetchMeasures', 'fetchMeasureById']),

    loadFeatureModel() {
      this.fetchFeatureModelById(this.featureModelId);
      this.fetchMeasureById(this.featureModelId);

      this.expandedNodes = this.getTreeNodeLabels(this.featureTree);
    },

    getTreeNodeLabels(tree) {
      let labels = [];

      for (let i = 0; i < tree.length; i += 1) {
        const el = tree[i];

        labels.push(el.name);
        labels = [...labels, ...this.getTreeNodeLabels(el.children)];
      }

      return labels;
    },
  },
};
</script>

<style lang="stylus" scoped>
.feature-tree {
  >>> .q-tree__img {
    height: 16px;
  }
}

a {
  text-decoration: none;
}

>>> .q-table {
  td {
    font-size: 14px;
  }
}
</style>
