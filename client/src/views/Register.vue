<template>
  <div class="ml-5 mr-5">
    <div
      class="mt-10"
      style="max-width: 600px; background-color: rgb(240, 240, 240); border: 1px solid rgb(130, 130, 130); border-radius: 5px; padding: 20px; margin: 0 auto;"
    >
      <h1 class="text-center mb-4">Company Name</h1>
      <div class>
        <div
          class="mb-4"
          style="background-color: white; padding: 5px; border: 1px solid rgb(130, 130, 130); border-radius: 5px; "
        >
          <v-text-field
            background-color="white"
            color="success"
            height="40"
            label="Email"
            v-model="email"
          ></v-text-field>
        </div>
        <div
          class="mb-4"
          style="background-color: white; padding: 5px; border: 1px solid rgb(130, 130, 130); border-radius: 5px; "
        >
          <v-text-field
            background-color="white"
            color="success"
            height="40"
            label="Password"
            v-model="password"
            type="password"
          ></v-text-field>
        </div>
        <div style="width: 60%; margin: 0 auto;">
          <v-btn
            class="mb-2"
            style="width: 100%;"
            height="50"
            color="success"
            @click="register"
          >Register!</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    async register() {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      });
      console.log(response.data);
    }
  }
};
</script>
