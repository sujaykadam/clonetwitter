<template>
  <div class="flex border-b border-lighter p-1">
    <div class="min-w-fit"><img v-bind:src="image" class="h-12 w-12 rounded-full"></div>
    <div class="ml-3">
      <h1>
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
  data(){
    return{
      image: this.twData.picture.thumbnail,
      name: this.twData.name.first +" "+ this.twData.name.last+" ",
      username: "@"+this.twData.login.username,
      tweet: this.twData.location
    }
  },
  name: "RenderTweet"
};
</script>
