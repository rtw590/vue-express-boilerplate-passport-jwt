<template>
  <div class="mt-3" style="margin: 0 auto; max-width: 1200px;">
    <div v-if="this.error != ''">
      <v-alert type="error" v-bind="this.error" style="font-weight: bold;">{{this.error}}</v-alert>
    </div>
    <div v-if="$store.state.isUserLoggedIn" class="ml-3 mr-3">
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

      <div>
        <v-row no-gutters>
          <v-col cols="12" sm="4">
            <h3 style="cursor: pointer;">{{$store.state.selectedUser.email}}</h3>
          </v-col>
          <v-col cols="12" sm="4">
            <h3 v-if="$store.state.selectedUser.isAdmin">
              <v-icon color="green">mdi-check-bold</v-icon>
            </h3>
            <h3 v-if="!$store.state.selectedUser.isAdmin">
              <v-icon>mdi-close-circle</v-icon>
            </h3>
          </v-col>
          <v-col cols="12" sm="4">
            <h3 v-if="$store.state.selectedUser.isActive">
              <v-icon color="green">mdi-check-bold</v-icon>
            </h3>
            <h3 v-if="!$store.state.selectedUser.isActive">
              <v-icon>mdi-close-circle</v-icon>
            </h3>
          </v-col>
        </v-row>

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
      const response = await AdminService.admin();
      this.users = response.data.users;
    } catch (error) {
      // Credentials failed. Logout user and instruct them to login
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.error = error.response.data.error;
    }
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
    }
  }
};
</script>
