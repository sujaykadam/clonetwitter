<template>
    <div class="centersection w-1/2">
        <div class="fixed w-1/2 backdrop-blur-3xl mt-0 flex">
            <div @click="goBack">
                <i  class="fa fa-arrow-left p-4 cursor-pointer" />
            </div>
            <h1 class="text-xl font-bold h-14 pt-3 pl-3">User Name</h1>
        </div>        
            <img class="mt-14 " src="https://pbs.twimg.com/profile_banners/1037265563742027781/1629210564/1500x500">
        <div class="h-14 pl-4 flex relative">
            <img class="h-36 w-36 rounded-full border-4 relative bottom-16" src="https://pbs.twimg.com/profile_images/1168492936591360000/abetP0Yj_400x400.jpg" alt="">
            <button class="h-10 p-2 px-4 rounded-full mt-2 absolute right-4 bg-blue text-white text-lg btn-primary hover:text-lightblue focus:outline-none active:shadow-none">Follow</button>
        </div>
        <div class="mt-8 ml-6">
            <h1 class="text-xl font-extrabold ">Tanmay Gupta</h1>
            <h2 class="mb-2 text-light">@Tanmay</h2>
            <i class="text-lg px-1 text-light rounded-full mr-2 fa fa-calendar-o">&nbsp; Joined November 2015</i>
            <p class="">142&nbsp;Following&nbsp;&nbsp;&nbsp;30&nbsp;Followers</p>
        </div>
        <div class="flex items-stretch">
            <button class="h-14 flex-grow-0 hover:bg-slate-300 font-medium">Tweets</button>
            <button class="h-14 hover:bg-slate-300 font-medium">Tweets & Replies</button>
            <button class="h-14 hover:bg-slate-300 font-medium">Media</button>
            <button class="h-14 hover:bg-slate-300 font-medium">Likes</button>

        </div>
    </div>
</template>


<script>
export default{
    name: "MainFeed",
    methods:{
        goBack: function(){
            this.$router.back()
        }
    }
}
</script>

