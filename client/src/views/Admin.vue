<template>
  <div class="mt-3" style="margin: 0 auto; max-width: 1200px;">
    <div v-if="this.error != ''">
      <v-alert type="error" v-bind="this.error" style="font-weight: bold;">{{this.error}}</v-alert>
    </div>
    <div v-if="$store.state.isUserLoggedIn" class="ml-3 mr-3">
      <a>Admin Home</a>
      <div>
        <h3>Models</h3>
        <div class="mt-1 mb-1" style="height: 1px; background-color: rgb(200, 200, 200);"></div>

        <a @click="usersPage">Users</a>

        <div class="mt-1 mb-1" style="height: 1px; background-color: rgb(200, 200, 200);"></div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/AdminService";

export default {
  data: () => ({
    error: "",
    users: null
  }),
  async mounted() {
    try {
      const response = await AdminService.isAdmin();
    } catch (error) {
      // Credentials failed. Logout user and instruct them to login
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.error = error.response.data.error;
    }
  },
  methods: {
    usersPage() {
      this.$router.push("/adminUsers");
    }
  }
};
</script>
