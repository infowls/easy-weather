<template>
  <div :key="index" v-for="(item, index) in this.$store.state.citiesLong">
      <Item :title="item" @click="redirect(item)" />
  </div>
</template>

<script>
import Item from "../components/Item.vue";

export default {
  name: "List",
  components: {
    Item,
  },
  methods: {
    redirect (item) {
      this.$store.commit('emptyCitiesLong');
      this.$store.commit('setGeolocation', item);
      this.$store.dispatch('getCurrentWeather', item.split(",")[0]);
      this.$router.push({ name: "Home" });
    }
  }, 
  beforeCreate() {
    document.body.className = "list";
    this.$store.commit('setAccentColor', "white");
  },
};
</script>

<style scoped>

</style>

