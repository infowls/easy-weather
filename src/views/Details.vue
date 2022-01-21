<template >
  <div v-if="this.$store.state.dailyWeather">
    <div id="title-bar">
      <h1 id="text">
        {{ this.$store.state.city }} ({{ this.currentDateTime }}) -
        {{ this.$store.state.dailyWeather.current.weather[0].main }}
      </h1>
      <Icon
        :icon="this.$store.state.dailyWeather.current.weather[0].icon"
        :width="'50'"
        :height="'50'"
        :color="'black'"
      />
    </div>

    <div id="data">
      <h2>Hourly</h2>
      <hr />
      <TabStatistics :labels="this.hourDataLabels" :data="this.hourlyData" />
    </div>

    <div id="data">
      <h2>Daily</h2>
      <hr />
      <TabStatistics :labels="this.dayLabels" :data="this.dailyData" />
    </div>
  </div>
</template>

<script>
import Icon from "../components/Icon.vue";
import TabStatistics from "../components/TabStatistics.vue";

export default {
  name: "Details",
  components: {
    Icon,
    TabStatistics,
  },
  data() {
    return {
      hourDataLabels: ["Temperature", "Humidity", "Pressure", "Wind"],
    };
  },
  beforeCreate() {
    if (this.$store.state.dailyWeather == null)
      this.$router.push({ name: "Home" });
  },
  computed: {
    currentDateTime: {
      get() {
        return this.$store.getters.getCurentDateTime;
      },
    },
    dayLabels: {
      get() {
        return this.$store.getters.getDayLabels;
      },
    },
    hourlyData: {
      get() {
        return this.$store.getters.getHourData;
      },
    },
    dailyData: {
      get() {
        return this.$store.getters.getDailyData;
      },
    },
  },
};
</script>

<style scoped>
#title-bar {
  display: flex;
  margin-left: 2%;
  margin-right: 2%;
}

#text {
  margin-right: 2%;
}

hr {
  border-color: #dbdbdb;
  border-style: solid;
  margin-top: 1%;
  margin-bottom: 1%;
}

#data {
  margin: 3% 2% 5% 2%;
}
</style>
