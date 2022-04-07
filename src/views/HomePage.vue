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

export default {
   name:"HomePage",
   components:{
        SideBar,
        MainFeed,
        MicellSec
   }
}
</script>