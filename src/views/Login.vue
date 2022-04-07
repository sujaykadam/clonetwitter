<template>
    <div class="flex justify-center content-center h-screen">
        <form @submit.prevent="logger" class="absolute top-64 justify-center content-center">
            <input v-model="username" class="w-full border-0 input rounded-full h-10 mb-3" type="text" placeholder=" username">
            <input v-model="password" class="w-full border-0 input rounded-full h-10 mb-3" type="password" placeholder=" password">
            <button type="submit" class="block m-auto text-white bg-blue rounded-full font-semibold focus:outline-none w-auto  h-12 w-32 p-3 hover:bg-darkblue">
                <p class="hidden lg:block">Login</p>
                <i class="fas fa-plus lg:hidden"></i>
            </button>
        </form>
    </div>
</template>

<script>

export default {
    name: "LoginPage",
    data(){
        return{
            username: "",
            password: ""
        }
    },
    methods:{
        logger: function(){
            console.log(this.username,this.password)
            if(this.username == "sujay" && this.password =="pass"){
                this.$router.push("/home")
            }
            else{
                alert("Invalid Credentials")
            }
        } 
    },
    created(){
        document.title = "Login"
    }
}
</script>