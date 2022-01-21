<template>
  <div class="home-info">
    <div
      id="content"
      @mouseover="this.isMoreVisile = true"
      @mouseleave="this.isMoreVisile = false"
      @click="redirect"
    >
      <div id="card">
        <div id="image">
          <Icon
            :icon="this.$store.state.currentWeather.weather[0].icon"
            :width="'200'"
            :height="'200'"
            :color="this.$store.state.accentColor"
          />
        </div>
        <div id="text" :style="{ color: this.$store.state.accentColor }">
          <h3>
            {{ this.$store.state.currentWeather.weather[0].main }},
            {{ this.$store.state.currentWeather.main.temp }}
            {{ this.$store.state.units[this.$store.state.unitIndex][1] }}
          </h3>
          <p>{{ this.$store.state.city }}</p>
        </div>
      </div>

      <div id="more">
        <transition name="slide-fade">
          <svg
            v-if="this.isMoreVisile"
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            :fill="this.$store.state.accentColor"
            class="bi bi-chevron-compact-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
            />
          </svg>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../components/Icon.vue";

export default {
  name: "Home",
  components: {
    Icon,
  },
  data() {
    return {
      isMoreVisile: false,
    };
  },
  methods: {
    redirect() {
      this.$store
        .dispatch("getDailyWeather")
        .then((response) => {
          this.$router.push({ name: "Details" });
        })
        .catch((err) => console.log(err));
    },
  },
  beforeCreate() {
    document.body.className = "home";
    this.$store.commit('setAccentColor', "white");
  },
};
</script>

<style scoped>
#text {
  text-align: center;
  margin-top: 30%;
  font-size: 20px;
}

#card {
  display: inline-block;
}

#more {
  display: flex;
  align-items: center;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

#content {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}

.home-info {
  display: flex;
  justify-content: center;
}
</style>