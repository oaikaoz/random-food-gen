<template>
  <v-app>
    <Hearder />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Hearder from "@/components/Header";

export default {
  name: "App",

  components: {
    Hearder,
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");

* {
  font-family: "Kanit", sans-serif;
}
</style>
