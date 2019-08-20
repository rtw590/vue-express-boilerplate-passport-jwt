<template>
  <v-app>
    <v-app-bar app dark color="rgb(255, 89, 56)">
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({})
};
</script>
