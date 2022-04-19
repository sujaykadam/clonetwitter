<template>
  <div class="mt-14 mb-0.5 p-1 px-3 flex h-32 border-b border-lighter">
    <img
      class="h-12 w-12 rounded-full"
      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    />
    <form v-on:submit.prevent="addNewTweet" class="flex-grow px-4 z-0 relative">
      <textarea
        v-model="tweet"
        placeholder="What's happening?"
        class="resize-none text-xl mt-3 pb-3 w-full focus:outline-none"
      />
      <div class="flex items-center">
        <i
          class="
            text-lg
            px-1
            hover:text-blue hover:bg-lightblue
            rounded-full
            text-black
            mr-2
            fa fa-image
          "
        ></i>
        <i
          class="
            text-lg
            px-1
            hover:text-blue hover:bg-lightblue
            rounded-full
            text-black
            mr-2
            fa fa-film
          "
        ></i>
        <i
          class="
            text-lg
            px-1
            hover:text-blue hover:bg-lightblue
            rounded-full
            text-black
            mr-2
            fa fa-bar-chart
          "
        >
        </i>
        <i
          class="
            text-lg
            px-1
            hover:text-blue hover:bg-lightblue
            rounded-full
            text-black
            mr-2
            fa fa-smile-o
          "
        ></i>
        <i
          class="
            text-lg
            px-1
            hover:text-blue hover:bg-lightblue
            rounded-full
            text-black
            mr-2
            fa fa-calendar-o
          "
        ></i>
        <i
          class="
            text-lg
            px-1
            hover:text-blue hover:bg-lightblue
            rounded-full
            text-black
            mr-2
            fa fa-map-marker
          "
        ></i>
        <button
          type="submit"
          class="
            h-10
            px-4
            text-white
            font-semibold
            bg-blue
            hover:bg-darkblue
            focus:outline-none
            rounded-full
            absolute
            bottom-0
            right-0
          "
        >
          Tweet
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { EventBus } from "../main.js";
import { store } from "../store";
var axios = require('axios');

export default {
  name: "ToTweet",
  data() {
    return {
      tweet: "",
    };
  },
  methods: {
    addNewTweet: function () {
      if (this.tweet.trim() != "") {
        EventBus.$emit("newTweet", this.tweet);

        var data = JSON.stringify({
          username: store.state.username,
          tweet: this.tweet,
        });

        var config = {
          method: "post",
          url: "http://localhost:9231/tweets/tweet",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            this.tweet = "";
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert("Type some tweet");
      }
    },
  },
};
</script>