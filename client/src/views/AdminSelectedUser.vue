<template>
  <div class="mt-3" style="margin: 0 auto; max-width: 1200px;">
    <div v-if="$store.state.isUserLoggedIn" class="ml-3 mr-3">
      <div v-if="this.error != ''">
        <v-alert type="error" v-bind="this.error" style="font-weight: bold;">{{this.error}}</v-alert>
      </div>
      <div v-if="this.message != ''">
        <v-alert type="success" v-bind="this.message" style="font-weight: bold;">{{this.message}}</v-alert>
      </div>
      <a @click="adminPage">Admin Home</a>
      <span class="ml-1 mr-1">></span>
      <a @click="usersPage">Users</a>
      <span class="ml-1 mr-1">></span>
      <a>Selected User</a>

      <v-row no-gutters>
        <v-col cols="12" sm="4">
          <h3>Email</h3>
        </v-col>
        <v-col cols="12" sm="4">
          <h3>Admin</h3>
        </v-col>
        <v-col cols="12" sm="4">
          <h3>Active</h3>
        </v-col>
      </v-row>

      <div class="mt-1 mb-1" style="height: 1px; background-color: rgb(200, 200, 200);"></div>

      <div class="mt-2">
        <v-row no-gutters>
          <v-col cols="12" sm="4">
            <h3 style="cursor: pointer;">{{this.user.email}}</h3>
          </v-col>
          <v-col cols="12" sm="4">
            <h3 v-if="this.user.isAdmin">
              <v-icon color="green">mdi-check-bold</v-icon>
            </h3>
            <h3 v-if="!this.user.isAdmin">
              <v-icon>mdi-close-circle</v-icon>
            </h3>
          </v-col>
          <v-col cols="12" sm="4">
            <v-checkbox v-model="user.isActive" style="padding: 5px; margin: 0px;"></v-checkbox>
          </v-col>
        </v-row>

        <div class="mt-1 mb-1" style="height: 1px; background-color: rgb(200, 200, 200);"></div>

        <div style="margin: 0 auto; text-align: center;">
          <v-btn
            class="mt-2 mb-2"
            style="width: 60%; box-shadow: 0 0 5px rgb(150, 150, 150); "
            height="50"
            color="success"
            @click="changeUserActive(user)"
          >Save Changes</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/AdminService";

export default {
  data: () => ({
    error: "",
    user: null,
    message: ""
  }),
  async mounted() {
    try {
      const response = await AdminService.admin();
    } catch (error) {
      // Credentials failed. Logout user and instruct them to login
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.error = error.response.data.error;
    }
    this.user = this.$store.state.selectedUser;
  },
  methods: {
    adminPage() {
      this.$router.push("/admin");
    },
    usersPage() {
      this.$router.push("/adminUsers");
    },
    selectUser(user) {
      this.$store.dispatch("setSelectedUser", user);
    },
    async changeUserActive(user) {
      try {
        const response = await AdminService.active(user);
        this.message = response.data.message;
      } catch (error) {
        // Credentials failed. Logout user and instruct them to login
        this.$store.dispatch("setToken", null);
        this.$store.dispatch("setUser", null);
        this.error = error.response.data.error;
      }
    }
  }
};
</script>
