<template>
  <div class="group">
    <input
      v-model="this.cityInput"
      type="text"
      style="text-transform: capitalize"
      :placeholder="hintText"
      :style="{ borderColor: this.$store.state.accentColor, color: this.$store.state.accentColor }"
    />
    <button>
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
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      hintText: "Search ..."
    };
  },
  computed: {
    cityInput: {
      get() {
        return this.$store.state.cityInput;
      },
      set(newValue) {
        if(newValue)
          this.$store.dispatch('getCitiesApi', newValue);
        else
          this.$store.commit('getCitiesApi', []);
      },
    },
  },
};
</script>


<style scoped>
.group {
  display: inline-block;
  position: relative;
  padding-left: 5px;
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
}

button:active {
  filter: brightness(40%);
}
</style>