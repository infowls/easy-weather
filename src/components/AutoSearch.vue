<template>
  <div class="auto-search">
    <div class="group">
      <input
        v-model="this.textInput"
        type="text"
        style="text-transform: capitalize"
        :placeholder="hintText"
        :style="{
          borderColor: this.$store.state.accentColor,
          color: this.$store.state.accentColor,
        }"
      />
      <button @click="searchCities">
        <svg
          :fill="this.$store.state.accentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="30px"
          height="30px"
        >
          <path
            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
          />
        </svg>
      </button>
    </div>
    <div class="dropdown" v-if="this.$store.state.cities.length > 0">
      <ul @mouseleave="closeComplete">
        <div
          :key="index"
          v-for="(item, index) in this.$store.state.cities"
          @click="onSelected(item)"
        >
          <li>{{ item }}</li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AutoSearch",
  data() {
    return {
      hintText: "Search ...",
    };
  },
  computed: {
    textInput: {
      get() {
        return this.$store.state.cityInput;
      },
      set(value) {
        this.$store.commit("setInput", value);
        if (value)
          this.$store.dispatch("getCitiesApi", { value: value, limit: 5 });
      },
    },
  },
  methods: {
    onSelected(item) {
      this.$store.commit("emptyCities");
      this.$store.commit("setInput", "");
      this.$store.commit("setGeolocation", item);

      this.$store.dispatch("getCurrentWeather", item.split(",")[0]);

      this.$router.push({ name: "Home" });
    },
    searchCities() {
      this.$store.dispatch("getCitiesApi", {
        value: this.$store.state.cityInput,
        limit: 30,
      });
      this.$store.commit("emptyCities");
      this.$store.commit("setInput", "");
      this.$router.push({ name: "List" });
    },
    closeComplete() {
      this.$store.commit("emptyCities");
    },
  },
};
</script>

<style scoped>
.auto-search {
  position: relative;
}

.group {
  display: inline-block;
  position: relative;
  padding-left: 5px;
}

.dropdown {
  position: absolute;
  top: 35px;
  left: 0px;
}

input {
  width: 60%;
  height: 30px;
  background: transparent;
  border-width: 0px 0px 2px 0px;
  transform: translateX(-5%);
  transition: width 0.5s;
}

input:focus {
  outline: none;
  width: 80%;
}

button {
  position: absolute;
  background: transparent;
  border-width: 0px;
  cursor: pointer;
}

button:active {
  filter: brightness(40%);
}

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
