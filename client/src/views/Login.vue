<template>
  <div class="ml-5 mr-5">
    <div
      v-bind:class="{ errorShake: isErrorShake }"
      class="mt-6"
      style="max-width: 600px; background-color: rgb(240, 240, 240); border: 1px solid rgb(130, 130, 130); border-radius: 5px; padding: 30px; margin: 0 auto; box-shadow: 0 0 10px rgb(150, 150, 150)"
    >
      <h1 class="text-center mb-4">Company Name</h1>

      <div v-if="this.error != ''">
        <v-alert type="error" v-bind="this.error" style="font-weight: bold;">{{this.error}}</v-alert>
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
            label="Email"
            required
            :rules="[rules.required]"
            v-model="email"
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
            label="Password"
            required
            :rules="[rules.required]"
            v-model="password"
            type="password"
          ></v-text-field>
        </div>
        <div style="width: 60%; margin: 0 auto;">
          <v-btn
            class="mb-2"
            style="width: 100%; box-shadow: 0 0 5px rgb(150, 150, 150)"
            height="50"
            color="success"
            @click="login"
          >Login</v-btn>
        </div>
        <p class="mt-1 text-center link" @click="registerPage">
          New to our site?
          <br />Sign Up!
        </p>
      </v-form>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
  data: () => ({
    email: "",
    password: "",
    error: "",
    isErrorShake: false,
    rules: {
      required: value => !!value || "Required."
    }
  }),
  methods: {
    registerPage() {
      this.$router.push("/register");
    },
    async login() {
      this.$refs.form.validate();
      if (this.email == "" || this.password == "") {
        this.error = "Please enter information for all of the fields";
        this.isErrorShake = true;
        setTimeout(() => {
          this.isErrorShake = false;
        }, 800);
      } else {
        try {
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password
          });
          this.$store.dispatch("setToken", response.data.token);
          this.$store.dispatch("setUser", response.data.user);
          this.$router.push("/");
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

.errorForm {
  border: 1px solid red !important;
}

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
