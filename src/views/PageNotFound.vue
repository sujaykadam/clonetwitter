<template>
    <div>
        <side-bar />
    <div id="not" class="flex justify-center content-center text-light">
        <p class="absolute top-36">Hmm...this page doesn’t exist. Try searching for something else.</p>
        <button class="absolute top-48 text-white bg-blue rounded-full font-semibold focus:outline-none w-auto  h-12 w-32 p-3 hover:bg-darkblue">
            <p class="hidden lg:block">Search</p>
            <i class="fas fa-plus lg:hidden"></i>
        </button>
    </div>
    </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'

export default {
  components: { SideBar },
    name: "PageNotFound",
    created(){
        document.title = "404 Not Found"
    }
}
</script>

<style scoped>
#not{
    margin-left: 25%;
}
</style>