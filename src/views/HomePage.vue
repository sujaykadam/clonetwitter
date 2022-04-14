<template>
    <div class="flex">
        <side-bar />
        <main-feed />
        <micell-sec />
    </div>
</template>

<script>
import SideBar from "../components/SideBar.vue"
import MainFeed from "../components/MainFeed.vue"
import MicellSec from "../components/MicellSec.vue"
import {store} from "../store.js"

export default {
   name:"HomePage",
   components:{
        SideBar,
        MainFeed,
        MicellSec
   },
   mounted() {
    if (! store.state.isAuth)
      this.$router.push("/login");
  },
}
</script>