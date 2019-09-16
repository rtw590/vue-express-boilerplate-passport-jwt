<template>
  <v-app>
    <!-- App bar for logged out user -->
    <v-app-bar app dark color="rgb(255, 89, 56)" v-if="!$store.state.isUserLoggedIn">
      <v-toolbar-title class="headline text-uppercase">
        <span @click="home" style="cursor: pointer">Logo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-icon @click="login">mdi-account-circle</v-icon>
      </v-toolbar-items>

      <v-menu bottom left style="margin-left: 8px;">
        <template v-slot:activator="{ on }">
          <v-btn dark flat depressed color="transparent" v-on="on" style="padding:5px; margin:0px;">
            <v-icon>mdi-dots-vertical</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="login">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- End app bar for logged out user -->

    <!-- App bar for logged in user -->

    <v-app-bar app dark color="rgb(255, 89, 56)" v-if="$store.state.isUserLoggedIn">
      <v-toolbar-title class="headline text-uppercase">
        <span @click="home" style="cursor: pointer">Logo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-icon @click="dashboard">mdi-account-circle</v-icon>
      </v-toolbar-items>

      <v-menu bottom left style="margin-left: 8px;">
        <template v-slot:activator="{ on }">
          <v-btn dark flat depressed color="transparent" v-on="on" style="padding:5px; margin:0px;">
            <v-icon>mdi-dots-vertical</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="dashboard">
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- End app bar for logged in user -->

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

<style scoped>
</style>
