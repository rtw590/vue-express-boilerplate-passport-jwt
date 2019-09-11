<template>
  <div class="ml-5 mr-5">
    <div
      v-bind:class="{ errorShake: isErrorShake }"
      class="mt-6"
      style="max-width: 600px; background-color: rgb(240, 240, 240); border: 1px solid rgb(130, 130, 130); border-radius: 5px; padding: 30px; margin: 0 auto; box-shadow: 0 0 10px rgb(150, 150, 150)"
    >
      <h1 class="text-center mb-4">Forgot Password</h1>

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
            label="Email"
            v-model="email"
            required
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </div>

        <div
          class="mb-4"
          style="background-color: white; padding: 5px; border: 1px solid rgb(130, 130, 130); border-radius: 5px; box-shadow: 0 0 5px rgb(150, 150, 150); display: none;"
          v-bind:class="{ showBox: success }"
        >
          <v-text-field
            background-color="white"
            color="success"
            height="40"
            label="Reset Code"
            v-model="resetCode"
            required
          ></v-text-field>
        </div>

        <div
          class="mb-4"
          style="background-color: white; padding: 5px; border: 1px solid rgb(130, 130, 130); border-radius: 5px; box-shadow: 0 0 5px rgb(150, 150, 150); display: none;"
          v-bind:class="{ showBox: success }"
        >
          <v-text-field
            background-color="white"
            color="success"
            height="40"
            label="Password"
            v-model="password"
            type="password"
            required
          ></v-text-field>
        </div>
        <div
          class="mb-4"
          style="background-color: white; padding: 5px; border: 1px solid rgb(130, 130, 130); border-radius: 5px; box-shadow: 0 0 5px rgb(150, 150, 150); display: none;"
          v-bind:class="{ showBox: success }"
        >
          <v-text-field
            background-color="white"
            color="success"
            height="40"
            label="Confirm Password"
            v-model="password2"
            type="password"
            required
          ></v-text-field>
        </div>

        <div style="width: 60%; margin: 0 auto;">
          <v-btn
            class="mb-2"
            style="width: 100%; box-shadow: 0 0 5px rgb(150, 150, 150); display: none"
            height="50"
            color="success"
            v-bind:class="{ showBox: success }"
            @click="updatePassword"
          >Reset Password</v-btn>
        </div>

        <div style="width: 60%; margin: 0 auto;">
          <v-btn
            class="mb-2"
            style="width: 100%; box-shadow: 0 0 5px rgb(150, 150, 150);"
            height="50"
            color="success"
            v-bind:class="{ hideBox: success }"
            @click="sendPasswordCode"
          >Send Reset Code</v-btn>
          <p
            class="mt-1 text-center link"
            @click="loginPage"
            style="display: none;"
            v-bind:class="{ showBox: passwordReset }"
          >Go to login page</p>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  data: () => ({
    email: "",
    message: "",
    resetCode: "",
    password: "",
    password2: "",
    error: "",
    success: false,
    passwordReset: false,
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
  methods: {
    async sendPasswordCode() {
      this.$refs.form.validate();
      if (
        this.email == "" ||
        this.email.includes("@") != true ||
        this.email.includes(".") != true
      ) {
        this.message = "";
        this.error = "Please enter information for all of the fields";
        this.isErrorShake = true;
        setTimeout(() => {
          this.isErrorShake = false;
        }, 800);
      } else {
        this.error = "";
        this.message = "";
        try {
          const response = await UserService.sendPasswordCode({
            email: this.email
          });

          this.message = response.data.message;
          this.success = true;
        } catch (error) {
          this.error = error.response.data.error;
          this.isErrorShake = true;
          setTimeout(() => {
            this.isErrorShake = false;
          }, 800);
        }
      }
    },
    async updatePassword() {
      // Frontend validation to ensure that all fields are filled out correctly
      this.error = "";
      this.message = "";
      if (
        this.email == "" ||
        this.resetCode == "" ||
        this.password == "" ||
        this.password2 == ""
      ) {
        this.error = "Please fill in all of the fields";
        this.isErrorShake = true;
        setTimeout(() => {
          this.isErrorShake = false;
        }, 800);
      } else if (this.password.length < 8 || this.password2.length < 8) {
        this.error = "Password must be at least 8 characters long";
        this.isErrorShake = true;
        setTimeout(() => {
          this.isErrorShake = false;
        }, 800);
      } else if (this.password !== this.password2) {
        this.error = "Passwords do not match";
        this.isErrorShake = true;
        setTimeout(() => {
          this.isErrorShake = false;
        }, 800);
      } else {
        // Everything filled properly so we send the info to the backend
        try {
          const response = await UserService.updatePassword({
            email: this.email,
            password: this.password,
            resetCode: this.resetCode
          });

          this.message = response.data.message;
          this.success = false;
          this.passwordReset = true;
        } catch (error) {
          this.error = error.response.data.error;
          this.isErrorShake = true;
          setTimeout(() => {
            this.isErrorShake = false;
          }, 800);
        }
      }
    },
    loginPage() {
      this.$router.push("/login");
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

.showBox {
  display: block !important;
}

.hideBox {
  display: none !important;
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
