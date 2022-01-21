<template>
  <div class="auto-search">
    <Search/>
    <div class="dropdown">
      <ul>
        <div :key="index" v-for="(item, index) in this.$store.state.cities" @click="onSelected(item)">
          <li>{{ item }}</li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import Search from "./Search";

export default {
  name: "AutoSearch",
  components: {
    Search
  },
  methods: {
    onSelected(item){      
      this.$store.commit('emptyCities');
      this.$store.commit('setInput', "");
      this.$store.commit('setGeolocation', item);
      
      this.$store.dispatch('getCurrentWeather', item.split(",")[0]);

      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  display: inline-block;
}

li {
  background-color: #ececec;
  width: 115%;
}

li:hover {
  background-color: #cbcbcb;
}

</style>