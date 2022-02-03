<template>
  <div class="tab">
    <div
      class="tablinks"
      :key="index"
      v-for="(item, index) in this.labels"
      @click="changeTab(index)"
    >
      <p>{{ item }}</p>
    </div>
  </div>

  <div class="tab-content">
    <div
      v-if="this.data.chart"
      :class="{ 'column-chart': this.data.table, column: !this.data.table }"
    >
      <div v-if="this.data.titles">
        <h3>
          Day {{ this.labels[this.tabIndex] }} -
          {{ this.data.titles[this.tabIndex][0].main }}
        </h3>
        <h4 style="text-transform: capitalize">
          {{ this.data.titles[this.tabIndex][0].description }}
        </h4>
      </div>
      <line-chart :data="this.data.chart[this.tabIndex]"></line-chart>
    </div>

    <div
      v-if="this.data.table"
      :class="{ 'column-table': this.data.table, column: !this.data.table }"
    >
      <h3 style="margin-bottom: 3%">Additional Information</h3>
      <Table :data="this.data.table[this.tabIndex]" />
    </div>
  </div>
</template>

<script>
import Table from "../components/Table.vue";

export default {
  name: "TabStatistics",
  components: {
    Table,
  },
  props: {
    labels: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tabIndex: 0,
    };
  },
  methods: {
    changeTab(index) {
      this.tabIndex = index;
    },
  },
};
</script>

<style scoped>
.tab {
  overflow: hidden;
  position: relative;
  flex-flow: row wrap;
  justify-content: space-between;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  display: flex;
}

.tablinks {
  cursor: pointer;
  padding: 14px 14px;
  flex: 1;
  transition: 0.3s;
}

.tablinks:hover {
  background-color: #ddd;
}

.tablinks:hover {
  background-color: #ccc;
}

p {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 17px;
  text-align: center;
}

.tab-content {
  padding: 1% 3%;
  border: 1px solid #ccc;
  background-color: white;
  border-top: none;
  display: flex;
  justify-content: center;
}

.column-container {
  display: flex;
}

.column {
  flex: 1;
  justify-content: center;
}

.column-chart {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 5;
  margin-right: 5%;
}

.column-table {
  display: flex;
  flex-direction: column;
  flex: 2;
  margin: auto;
}

@media (max-width: 600px) {
  .tab-content {
    flex-direction: column;
  }

  .tablinks {
    flex-basis: auto;
  }

  .column-chart,
  .column-table {
    margin: 20px 0px;
  }
}
</style>