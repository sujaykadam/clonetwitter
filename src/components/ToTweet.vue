<template>
  <div class="mt-14 mb-0.5 p-1 px-3 flex h-32 border-b border-lighter">
    <img class="h-12 w-12 rounded-full" src="https://pbs.twimg.com/profile_images/831883332564742144/C_zlxYgp_200x200.jpg"/>
    <form v-on:submit.prevent ="addNewTweet" class="flex-grow px-4 relative">
      <textarea v-model="tweet" placeholder="What's happening?" class="resize-none text-xl mt-3 pb-3 w-full focus:outline-none"/>
      <div class="flex items-center">
        <i class="text-lg px-1 hover:text-blue hover:bg-lightblue rounded-full text-black mr-2 fa fa-image"></i>
        <i class="text-lg px-1 hover:text-blue hover:bg-lightblue rounded-full text-black mr-2 fa fa-film"></i>
        <i class="text-lg px-1 hover:text-blue hover:bg-lightblue rounded-full text-black mr-2 fa fa-bar-chart">   </i>
        <i class="text-lg px-1 hover:text-blue hover:bg-lightblue rounded-full text-black mr-2 fa fa-smile-o"></i>
        <i class="text-lg px-1 hover:text-blue hover:bg-lightblue rounded-full text-black mr-2 fa fa-calendar-o"></i>
        <i class="text-lg px-1 hover:text-blue hover:bg-lightblue rounded-full text-black mr-2 fa fa-map-marker"></i>
        <button type="submit" class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full absolute bottom-0 right-0">
          Tweet
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {EventBus} from '../main.js'
export default {
  name: "ToTweet",
  data() {
    return {
      tweet: "",
    };
  },
  methods:{
    addNewTweet: function(){
      EventBus.$emit('newTweet', this.tweet);
      this.tweet = "";
    }
  }
};
</script>