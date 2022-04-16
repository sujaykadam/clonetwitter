<template>
  <div class="flex border-b border-lighter p-1">
    <div class="min-w-fit"><img v-bind:src="image" class="h-12 w-12 rounded-full"></div>
    <div class="ml-3">
      <h1 @click="redirect" class="hover:cursor-pointer">
        <strong>{{name}}</strong>&nbsp;
        <span class="text-light">{{username}}</span>
      </h1>
      <div class="max-w">{{tweet}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['twData'],
  methods: {
    redirect: function(){
      this.$router.push(this.url)
    }
  },
  data(){
    return{
      image: this.twData.picture,
      name: this.twData.fname +" "+ this.twData.lname+" ",
      username: "@"+this.twData.username,
      tweet: this.twData.tweet,
      url: '/userprofile?u='+this.twData.username,
    }
  },
  name: "RenderTweet"
};
</script>
