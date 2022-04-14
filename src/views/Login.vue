<template>
  <div class="flex justify-center content-center h-screen">
    <form
      @submit.prevent="logger"
      class="absolute top-64 justify-center content-center"
    >
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
    </form>
  </div>
</template>

<script>
import {store} from '../store.js'
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    logger: async function () {
      const encoder = new TextEncoder();
      const data = encoder.encode(this.password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        username: this.username,
        password: hashHex,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:9231/authuser", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            if (JSON.parse(result).isAuth){
                store.commit('update',JSON.parse(result))
                store.commit('login',JSON.parse(result))
                this.$router.push("/home");
            }
            else
                alert("Invalid Credentials");
        })
        .catch((error) => console.log("error", error));  
    }
  },
  created() {
    document.title = "Login";
    if (store.state.isAuth)
      this.$router.push("/home");
  },
};
</script> 