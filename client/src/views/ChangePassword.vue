<template>
  <div class="ml-5 mr-5">
    <div
      v-bind:class="{ errorShake: isErrorShake }"
      class="mt-6"
      style="max-width: 600px; background-color: rgb(240, 240, 240); border: 1px solid rgb(130, 130, 130); border-radius: 5px; padding: 30px; margin: 0 auto; box-shadow: 0 0 10px rgb(150, 150, 150)"
    >
      <h1 class="text-center mb-4">Change Password</h1>

      <div v-if="this.error != ''">
        <v-alert type="error" v-bind="this.error" style="font-weight: bold;">{{this.error}}</v-alert>
      </div>

      <div v-if="this.message != ''">
        <v-alert type="success" v-bind="this.message" style="font-weight: bold;">{{this.message}}</v-alert>
      </div>

      <v-form ref="form">
        <div
          class="mb-4"
          style="background-color: white; padding: 5px; border: 1px solid rgb(130, 130, 130); border-radius: 5px; box-shadow: 0 0 5px rgb(150, 150, 150)"
        >
          <v-text-field
            background-color="white"
            color="success"
            height="40"
            label="Current Password"
            v-model="currentPassword"
            type="password"
            required
            :rules="[rules.required, rules.passwordLength]"
          ></v-text-field>
        </div>
        <div
          class="mb-4"
          style="background-color: white; padding: 5px; border: 1px solid rgb(130, 130, 130); border-radius: 5px; box-shadow: 0 0 5px rgb(150, 150, 150)"
        >
          <v-text-field
            background-color="white"
            color="success"
            height="40"
            label="New Password"
            v-model="password"
            type="password"
            required
            :rules="[rules.required, rules.passwordLength]"
          ></v-text-field>
        </div>
        <div
          class="mb-4"
          style="background-color: white; padding: 5px; border: 1px solid rgb(130, 130, 130); border-radius: 5px; box-shadow: 0 0 5px rgb(150, 150, 150)"
        >
          <v-text-field
            background-color="white"
            color="success"
            height="40"
            label="Confirm New Password"
            v-model="password2"
            type="password"
            required
            :rules="[rules.required, rules.passwordLength]"
          ></v-text-field>
        </div>
        <div style="width: 60%; margin: 0 auto;">
          <v-btn
            class="mb-2"
            style="width: 100%; box-shadow: 0 0 5px rgb(150, 150, 150)"
            height="50"
            color="success"
            @click="changePassword"
          >Change Password</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import UserService from "@/services/UserService";

export default {
  data: () => ({
    currentPassword: "",
    password: "",
    password2: "",
    message: "",
    error: "",
    isErrorShake: false,
    rules: {
      required: value => !!value || "Required.",
      email: value =>
        (!!value.includes("@") && !!value.includes(".")) ||
        "Must be valid email",
      passwordLength: value =>
        value.length >= 8 || "Password must be at least 8 characters."
    }
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
    async changePassword() {
      this.$refs.form.validate();
      if (
        this.currentPassword == "" ||
        this.password == "" ||
        this.password2 == ""
      ) {
        this.error = "Please enter information for all of the fields";
        this.isErrorShake = true;
        setTimeout(() => {
          this.isErrorShake = false;
        }, 800);
      } else {
        if (this.password !== this.password2) {
          this.error = "Passwords do not match";
          this.isErrorShake = true;
          setTimeout(() => {
            this.isErrorShake = false;
          }, 800);
        } else {
          try {
            // TODO: Update the backend to handle this route
            // Include check of how long the password is
            const response = await UserService.changePassword({
              password: this.password,
              currentPassword: this.currentPassword
            });
            this.error = "";
            this.message = response.data.message;
          } catch (error) {
            this.error = error.response.data.error;
            this.isErrorShake = true;
            setTimeout(() => {
              this.isErrorShake = false;
            }, 800);
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.errorShake {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.75s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
