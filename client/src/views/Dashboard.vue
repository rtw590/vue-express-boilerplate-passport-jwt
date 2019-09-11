<template>
  <div class="mt-3" style="margin: 0 auto; max-width: 800px;">
    <div v-if="this.error != ''">
      <v-alert type="error" v-bind="this.error" style="font-weight: bold;">{{this.error}}</v-alert>
    </div>
    <div v-if="$store.state.isUserLoggedIn">
      <h1>Welcome back, {{$store.state.user.email}}!</h1>
    </div>
    <p class="mt-1 text-left link" @click="changePasswordPage">Change Password</p>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
  data: () => ({
    error: "",
    user: ""
  }),
  async mounted() {
    try {
      const response = await AuthenticationService.dashboard();
    } catch (error) {
      // Credentials failed. Logout user and instruct them to login
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.error = error.response.data.error;
    }
  },
  methods: {
    changePasswordPage() {
      this.$router.push("/change-password");
    }
  }
};
</script>

<style scoped>
.link {
  color: rgb(57, 93, 255);
  margin-bottom: 0px;
}

.link:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
