<template>
  <div class="tab">
    <div :key="index" v-for="(item, index) in this.labels" class="tablinks">
      <button @click="changeTab(index)">{{ item }}</button>
    </div>
  </div>

  <div class="tabcontent">
    
    <div v-if="this.data.titles">
      <h3>
        Day {{ this.labels[this.tabIndex] }} -
        {{ this.data.titles[this.tabIndex][0].main }}
      </h3>
      <h4 style="text-transform: capitalize">
         {{ this.data.titles[this.tabIndex][0].description }}
      </h4>
    </div>

    <div :class="{ display: this.data.table }">

      <div v-if="this.data.chart" :class="{ shared: this.data.table }">
        <line-chart :data="this.data.chart[this.tabIndex]"></line-chart>
      </div>

      <div v-if="this.data.table" class="shared">
        <div class="align">
          <h3 style="margin-bottom: 3%">Additional Information</h3>
          <Table :data="this.data.table[this.tabIndex]" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Table from "../components/Table.vue";

export default {
  name: "TabStatistics",
  components: {
    Table
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
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

.tab button:hover {
  background-color: #ddd;
}

.tab button.active {
  background-color: #ccc;
}

.tabcontent {
  padding: 12px 12px;
  border: 1px solid #ccc;
  background-color: white;
  border-top: none;
  width: 100%;
}

.display > .shared {
  width: 50%;
  vertical-align: top;
  margin: 1%;
  padding: 20px;
}

.display {
  display: flex;
}

.align {
  margin-left: 25%;
}

@media only screen and (max-width: 600px) {
  .display {
    display: inline-block;
  }

  .tabcontent > .shared {
    width: 100%;
    vertical-align: top;
    margin: 1%;
    padding: 20px;
  }

  .align {
    margin-left: 0%;
  }
}
</style>