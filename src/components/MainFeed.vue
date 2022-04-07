<template>
  <div class="onMobile w-1/2 centersection">
    <div @click="goTo('writeTweet')" class="cursor-pointer fixed w-1/2 backdrop-blur-3xl mt-0">
      <h1 class="text-xl font-bold h-14 pt-3 pl-3">Home</h1>
    </div>
    <to-tweet ref="writeTweet"></to-tweet>
    <div v-if="unloaded" class="flex justify-center content-center">
      <img src="../assets/loading.png" class="pt-4 max-h-10">
    </div>
    <div >
      <render-tweet v-for="tweet in myTweets" :key="tweet.username" :twData ="tweet"/>
      <render-tweet v-for="tweet in tweetsLis" :key="tweet.username" :twData="tweet"/>
    </div>
    
  </div>
</template>

<script>
import RenderTweet from "./RenderTweet.vue";
import ToTweet from "./ToTweet.vue";
import {EventBus} from "../main.js";

export default {
  name: "MainFeed",
  data() {
    return {
      tweetsLis: [],
      myTweets: [],
      unloaded: true
    };
  },

  components: {
    RenderTweet,
    ToTweet,
  },
  methods: {
    goTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
    addToMyTweets(theTweet){
      this.unloaded = true;
      var newOne = {
      "name": {
        "title": "mr",
        "first": "Sujay",
        "last": "Kadam"
      },
      "login": {
        username:"sujaykadam_"
        },
      "picture": {
        "thumbnail": "https://pbs.twimg.com/profile_images/831883332564742144/C_zlxYgp_400x400.jpg"
      },
      location: theTweet
      }
      this.myTweets.push(newOne)
      console.log(this.myTweets)
      this.unloaded = false;
    }
  },
  async mounted() {
    document.title = "Home";
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      "https://randomuser.me/api/?inc=login,name,picture,location&results=100",
      requestOptions)
      .then((response) => response.text())
      .then((result) => this.tweetsLis = JSON.parse(result).results)
      .catch((error) => console.log("error", error)); 
      this.unloaded = false;
  },
  created: function(){
    EventBus.$on("newTweet", this.addToMyTweets)
  }
};

</script>

<style>
@media (min-width: 600px){
  .centersection{
    margin-left: 25%;
  }
}
@media only screen and (max-width: 600px){
    .onMobile{
      margin: 5%;
      width: full;
  }
}
</style>