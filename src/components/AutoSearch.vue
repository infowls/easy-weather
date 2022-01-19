<template>
  <div class="auto-search">
    <Search/>
    <div class="dropdown">
      <ul>
        <div :key="item.id" v-for="item in this.$store.state.cities">
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