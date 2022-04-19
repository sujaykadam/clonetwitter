<template>
  <div class="flex justify-center content-center h-screen">
    <form
      @submit.prevent="logger"
      class="absolute top-64 justify-center content-center"
    >
      <h1 class="m-2 mb-5 font-extrabold">Login</h1>
      <input
        v-model="username"
        class="w-full border-0 input rounded-full h-10 mb-3"
        type="text"
        placeholder=" username"
      />
      <input
        v-model="password"
        class="w-full border-0 input rounded-full h-10 mb-3"
        type="password"
        placeholder=" password"
      />
      <button
        type="submit"
        class="
          block
          m-auto
          text-white
          bg-blue
          rounded-full
          font-semibold
          focus:outline-none
          w-auto
          h-12
          w-32
          p-3
          hover:bg-darkblue
        "
      >
        <p class="hidden lg:block">Login</p>
        <i class="fas fa-plus lg:hidden"></i>
      </button>
      <button
        class="
          block
          m-auto
          text-white
          bg-blue
          rounded-full
          font-semibold
          focus:outline-none
          w-auto
          h-12
          w-32
          p-3
          mt-2
          hover:bg-darkblue
        "
        @click="redirect"
      >
        <p class="hidden lg:block">Sign Up</p>
        <i class="fas fa-plus lg:hidden"></i>
      </button>
    </form>
  </div>
</template>

<script>
import { store } from "../store.js";
var axios = require("axios");

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    redirect: function () {
      this.$router.push("/signup");
    },
    logger: async function () {
      const encoder = new TextEncoder();
      const data = encoder.encode(this.password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      var creds = JSON.stringify({
        username: this.username,
        password: hashHex,
      });

      var config = {
        method: "post",
        url: "http://localhost:9231/user/authuser",
        headers: {
          "Content-Type": "application/json",
        },
        data: creds,
      };

      axios(config)
        .then(function (response) {
          var result = response.data;
          if (result.isAuth) {
            store.commit("update", result);
            store.commit("login", result);
            this.$router.push("/home");
          } else alert("Invalid Credentials");
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    document.title = "Login";
    if (store.state.isAuth) this.$router.push("/home");
  },
};
</script> 