<template>
  <v-app>
    <Hearder />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Hearder from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Hearder,
    Footer,
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");
* {
  font-family: "Kanit", sans-serif;
}
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
