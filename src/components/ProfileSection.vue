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
      <button v-if="notmyprofile"
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
import {store} from '../store'
import RenderTweet from './RenderTweet.vue';
export default {
  components: { RenderTweet },
  name: "MainFeed",
  data() {
    return {
      name: "",
      username: "",
      following: 0,
      followers: 0,
      ifollow: false,
      tweetlis: [],
      notmyprofile: !(store.state.username == this.$route.query.u)
    };
  },
  methods: {
    goBack: function () {
      this.$router.back();
    },
    modifyfollow: function() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
      ifollow: this.ifollow,
      username: store.state.username,
      profile: this.$route.query.u
      });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

fetch("http://localhost:9231/modifyfollow", requestOptions)
  .then(response => response.text())
  .then(result => {
    this.ifollow = !this.ifollow
    if (JSON.parse(result).action)
      this.followers += 1
    else
      this.followers -= 1
})
  .catch(error => console.log('error', error));
}
  
},
  created() {
    if (this.$route.query.u == window.undefined || this.$route.query.u == "")
      this.$router.push("/404 ");
    else{
    document.title = "Profile";
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: this.$route.query.u,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:9231/getuser", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        this.username = result.username;
        this.name = `${result.fname} ${result.lname}`;
      })
      .catch((error) => {
        console.log("error", error);
        this.$router.push("/404");
      });

    myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    raw = JSON.stringify({
      username: store.state.username,
      profile: this.$route.query.u
    });
    requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:9231/getprofiledata", requestOptions)
      .then((response) => response.text())
      .then((result) => {
      result = JSON.parse(result)
      this.following = result.following
      this.followers = result.followers
      this.ifollow = result.ifollow
      this.tweetlis = result.tweets
      console.log(store.state)
      })
      .catch((error) => console.log("error", error));
    }
      
  },
};
</script>

