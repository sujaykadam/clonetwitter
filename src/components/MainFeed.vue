<template>
  <div class="onMobile w-1/2 centersection">
    <div
      @click="goTo('writeTweet')"
      class="cursor-pointer z-50 fixed w-1/2 backdrop-blur-3xl mt-0"
    >
      <h1 class="text-xl font-bold h-14 pt-3 pl-3">Home</h1>
    </div>
    <to-tweet ref="writeTweet"></to-tweet>
    <div v-if="unloaded" class="flex justify-center content-center">
      <img src="../assets/loading.png" class="pt-4 max-h-10" />
    </div>
    <div>
      <render-tweet v-for="mtweet in myTweets" :key="mtweet.id" :twData="mtweet" />
      <render-tweet v-for="tweet in tweetsLis" :key="tweet.id" :twData="tweet" />
    </div>
  </div>
</template>

<script>
import RenderTweet from "./RenderTweet.vue";
import ToTweet from "./ToTweet.vue";
import { EventBus } from "../main.js";
import {store} from "../store";

export default {
  name: "MainFeed",
  data() {
    return {
      tweetsLis: [],
      myTweets: [],
      unloaded: true,
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
    addToMyTweets(theTweet) {
      this.unloaded = true;
      var newOne = {
        id: this.myTweets.length,
        fname: store.state.fname,
        lname: store.state.lname,
        username: store.state.username,
        picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        tweet: theTweet
      };
      this.myTweets.unshift(newOne);
      this.unloaded = false;
    },
  },
  async mounted() {
    document.title = "Home";
    this.unloaded = true
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: store.state.username,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:9231/tweets/gettweets", requestOptions)
      .then((response) => response.text())
      .then((result) => {this.tweetsLis =  JSON.parse(result)
                        this.unloaded = false;})
      .catch((error) => console.log("error", error.message));
  },
  created: function () {
    EventBus.$on("newTweet", this.addToMyTweets);
  },
};
</script>

<style>
@media (min-width: 600px) {
  .centersection {
    margin-left: 25%;
  }
}
@media only screen and (max-width: 600px) {
  .onMobile {
    margin: 5%;
    width: full;
  }
}
</style>