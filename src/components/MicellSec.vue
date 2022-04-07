<template>
  <div id="micell" class="z-50 hideOnMobile fixed w-1/4 h-screen border-l border-lighter py-2 px-6 overflow-y-scroll">
      <input class="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4" placeholder="Search Twitter" />
      <i class="fa fa-search absolute left-0 top-0 mt-5 ml-12 text-sm text-light"></i>
      <div class="w-full rounded-lg bg-lightest">
        <div class="flex items-center justify-between p-3">
          <p class="text-lg font-bold">Trends for You</p>
          <i class="fa fa-cog text-lg text-blue"></i>
        </div>
        <button v-for="trend in trending" :key="trend.title" class="w-full flex justify-between hover:bg-lighter p-3 border-t border-lighter">
          <div>
            <p class="text-xs text-left leading-tight text-dark"> {{ trend.top}} </p>
            <p class="font-semibold text-sm text-left leading-tight"> {{ trend.title}} </p>
            <p class="text-left text-sm leading-tight text-dark"> {{ trend.bottom}} </p>
          </div>
          <i class="fa fa-angle-down text-lg text-dark"></i>
        </button>
        <button class="p-3 w-full hover:bg-lighter hover:rounded-b-md  text-left text-blue border-t border-lighter">
          Show More
        </button>
      </div>
  </div>
</template>

<script>
export default {
  name: "MicellSec",
  data(){
    return{
      trending: [
        {top: 'Trending in Mumbai', title: 'Gigi', bottom: 'Trending with: Rip Gigi'},
        {top: 'Music', title: 'We Won', bottom: '135K Tweets'},
        {top: 'Pop', title: 'Blue Ivy', bottom: '40k tweets'},
        {top: 'Trending in India', title: 'Random', bottom: '40k tweets'},
        {top: 'Trending', title: 'When Beyonce', bottom: '25.4k tweets'},
      ],
    }
  }
};
</script>
  <style scoped>
  #micell{
    margin-left: 75%;
  }
</style>