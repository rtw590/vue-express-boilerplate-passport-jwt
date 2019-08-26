<template>
  <v-app>
    <v-app-bar app dark color="rgb(255, 89, 56)">
      <v-toolbar-title class="headline text-uppercase">
        <span @click="home" style="cursor: pointer">Logo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
        <v-icon @click="login">mdi-account-circle</v-icon>
      </v-toolbar-items>
      <v-toolbar-items v-if="$store.state.isUserLoggedIn">
        <v-icon @click="dashboard">mdi-account-circle</v-icon>
      </v-toolbar-items>
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
  data: () => ({}),
  methods: {
    login() {
      this.$router.push("/login");
    },
    home() {
      this.$router.push("/");
    },
    dashboard() {
      this.$router.push("/dashboard");
    }
  }
};
</script>
