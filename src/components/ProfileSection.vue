<template>
  <div class="centersection w-1/2">
    <div class="fixed w-1/2 backdrop-blur-3xl mt-0 flex">
      <div @click="goBack">
        <i class="fa fa-arrow-left p-4 cursor-pointer" />
      </div>
      <h1 class="text-xl font-bold h-14 pt-3 pl-3">User Name</h1>
    </div>
    <img
      class="mt-14"
      src="https://pbs.twimg.com/profile_banners/1037265563742027781/1629210564/1500x500"
    />
    <div class="h-14 pl-4 flex relative">
      <img
        class="h-36 w-36 rounded-full border-4 relative bottom-16"
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt=""
      />
      <button
        v-if="notmyprofile"
        class="
          h-10
          p-2
          px-4
          rounded-full
          mt-2
          absolute
          right-4
          bg-blue
          text-white text-lg
          btn-primary
          hover:text-lightblue
          focus:outline-none
          active:shadow-none
        "
      >
        <span v-if="ifollow" @click="modifyfollow">Followed</span>
        <span v-else @click="modifyfollow"> Follow</span>
      </button>
    </div>
    <div class="mt-8 ml-6">
      <h1 class="text-xl font-extrabold">{{ name }}</h1>
      <h2 class="mb-2 text-light">@{{ username }}</h2>
      <i class="text-lg px-1 text-light rounded-full mr-2 fa fa-calendar-o"
        >&nbsp; Joined November 2015</i
      >
      <p class="">
        {{ following }}&nbsp;Following&nbsp;&nbsp;&nbsp;{{
          followers
        }}&nbsp;Followers
      </p>
    </div>
    <div class="flex items-stretch">
      <button class="h-14 flex-grow-0 hover:bg-slate-300 w-full font-medium">
        Tweets
      </button>
    </div>
    <render-tweet v-for="tweet in tweetlis" :key="tweet.id" :twData="tweet" />
  </div>
</template>


<script>
import { store } from "../store";
import RenderTweet from "./RenderTweet.vue";
var axios = require("axios");

export default {
  components: { RenderTweet },
  name: "MainFeed",
  data() {
    return {
      name: "",
      username: this.$route.query.u,
      following: 0,
      followers: 0,
      ifollow: false,
      tweetlis: [],
      notmyprofile: !(store.state.username == this.$route.query.u),
    };
  },
  methods: {
    goBack: function () {
      this.$router.back();
    },
    modifyfollow: function () {
      var data = JSON.stringify({
        ifollow: this.ifollow,
        username: store.state.username,
        profile: this.$route.query.u,
      });
      var config = {
        method: "post",
        url: "http://localhost:9231/user/modifyfollow",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(
          function (response) {
            this.ifollow = !this.ifollow;
            if (response.data.action) this.followers += 1;
            else this.followers -= 1;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    if (this.$route.query.u == window.undefined || this.$route.query.u == "")
      this.$router.push("/404");
    else {
      document.title = "Profile";

      var config = {
        method: "get",
        url: "http://localhost:9231/user/profile",
        headers: {
          profile: `${this.$route.query.u}`,
          username: `${store.state.username}`,
        },
      };

      axios(config)
        .then(function (response) {
          var result = response.data;
          this.name = `${result.fname} ${result.lname}`;
          this.following = result.following;
          this.followers = result.followers;
          this.ifollow = result.ifollow;
          result.tweets.forEach(element => {
            this.tweetlis.push({
              'id': element.id,
              'fname': result.fname,
              'lname': result.lname,
              'username': this.$route.query.u,
              'picture': result.picture,
              'tweet': element.tweet
            })
          });
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    }
  },
};
</script>

