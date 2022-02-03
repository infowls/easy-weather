<template>
  <div class="root-container">
    <div class="nav-content">
      <NavBar />
    </div>
    <div class="router-content">
      <router-view v-if="this.$store.state.currentWeather" />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  components: {
    NavBar,
  },
  beforeCreate() {
    if(!this.$store.state.currentWeather){
      this.$store.dispatch("getGeolocation");
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  width: 100%;
}

body.home,
body.list {
  font-family: "Poppins", sans-serif;
  background: linear-gradient(-45deg, #221c72, #34adda, #4f3081);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

body.details {
  background-color: white;
  font-family: "Poppins", sans-serif;
}

#app {
  height: 100%;
}

.root-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav-content {
  flex: 1;
}

.router-content {
  flex: 10;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
