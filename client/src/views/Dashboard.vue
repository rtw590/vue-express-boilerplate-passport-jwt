<template>
  <div class="mt-3" style="margin: 0 auto; max-width: 800px;">
    <h1>Welcome back, {{$store.state.user.email}}!</h1>
    <v-btn
      class="mb-2"
      style="width: 100%; box-shadow: 0 0 5px rgb(150, 150, 150)"
      height="50"
      color="success"
      @click="dashboard"
    >Test</v-btn>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
  components: {},
  methods: {
    async dashboard() {
      const response = await AuthenticationService.dashboard();
      console.log(response);
    }
  }
};
</script>
