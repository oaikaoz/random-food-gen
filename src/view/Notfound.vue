<template>
  <div>
    <v-app>
      <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
          <v-flex>
            <v-breadcrumbs :items="items" large></v-breadcrumbs>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>

export default {
  data: () => ({
    items: [
      {
        text: "404 ",
        disabled: false,
        href: "",
      },
     {
        text: "portfolio",
        disabled: false,
        href: "/",
      },
      {
        text: "randomFood",
        disabled: false,
        href: "random_food",
      },
    ],
  }),
};
</script>
<style></style>
