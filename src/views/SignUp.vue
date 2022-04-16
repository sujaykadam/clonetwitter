<template>
  <div class="flex justify-center content-center h-screen">
    <form @submit.prevent="register" class="w-1/5 absolute top-64 justify-center content-center">
      <h1 class="m-2 mb-5 font-extrabold">Sign Up</h1>
      <input v-model="fname" class="w-full border-0 input rounded-full h-10 mb-3" type="text" placeholder=" First Name"/>
      <input v-model="lname" class="w-full border-0 input rounded-full h-10 mb-3" type="text" placeholder=" Last Name"/>
      <input v-model="username" class="w-full border-0 input rounded-full h-10 mb-3" type="text" placeholder=" username"/>
      <input v-model="password" class="w-full border-0 input rounded-full h-10 mb-3" type="password" placeholder=" password"/>
      <button type="submit" class="block m-auto text-white bg-blue rounded-full font-semibold focus:outline-none w-auto h-12 w-32 p-3 hover:bg-darkblue">
        <p class="hidden lg:block">Sign Up</p>
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
      fname:"",
      lname:"",
    };
  },
  methods: {
      
    register: async function () {
      var flag = this.username == "" || this.password=="" || this.fname == "" || this.lname == ""
      if(!flag){
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
        fname: this.fname,
        lname: this.lname
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:9231/registeruser", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            if ( result == 23505)
                alert("Username taken")
            else
            this.$router.push('/login')
        }) 
        .catch((error) => console.log(error))
     }
      else
        alert("fill in all details")
    }
  },
  created() {
    document.title = "Sign Up";
    if (store.state.isAuth)
      this.$router.push("/home");
  },
};
</script> 