<template>

  <div class="hideOnMobile fixed h-full w-1/4 px-24 border-r border-lighter">
    <button class="h-14 w-14 mb-1 hover:bg-lightblue text-3xl rounded-full text-blue">
      <i class="fa fa-twitter"></i>
    </button>

    <button v-for="tab in tabs" :key="tab.id"  @click="updateID(tab.id)" :class="`focus:outline-none hover:text-blue flex items-center py-2 px-4 hover:bg-lightblue rounded-full mr-auto mb-3 ${ id === tab.id ? 'text-blue' : ''}`">
      <i :class="`${ tab.icon } text-2xl mr-4 text-left`"></i>
      <p class="text-lg font-semibold text-left hidden lg:block"> {{ tab.title }} </p>
    </button> 

    <button class="text-white bg-blue rounded-full font-semibold focus:outline-none w-auto  h-12 w-52 p-3 hover:bg-darkblue">
      <p class="hidden lg:block">Tweet</p>
      <i class="fa fa-plus lg:hidden"></i>
    </button>

    <div class="lg:w-full absolute bottom-2 ">
        <button @click="dropdown = true" class="flex items-center w-52 hover:bg-lightblue rounded-full p-2 focus:outline-none">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" class="w-10 h-10 rounded-full border border-lighter" />
          <div class="hidden lg:block ml-4">
            <p class="text-sm font-bold leading-tight"> {{name}}</p>
            <p class="text-sm start leading-tight"> @{{username}} </p>
          </div>
          <i class=" hidden lg:block fa fa-angle-down ml-auto text-lg"></i>
        </button>
        <div v-if="dropdown === true" class="absolute bottom-0 left-0 w-64 rounded-lg shadow-md border-lightest bg-white mb-16">
          <button @click="dropdown = false" class="p-3 flex items-center w-full hover:bg-lightest p-2 focus:outline-none">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" class="w-10 h-10 rounded-full border border-lighter" />
            <div class="ml-4">
              <p class="text-sm font-bold leading-tight"> {{name}} </p>
              <p class="text-sm leading-tight"> @{{username}} </p>
            </div>
            <i class="fa fa-check ml-auto test-blue"></i>
          </button>
          <button @click="dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none">
            Add an existing account
          </button>
          <button @click="dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none">
            Log out {{username}}
          </button>
        </div>
      </div>

  </div>

</template>

<script>
import {store} from '../store.js'
export default {
  name: "SideBar",
  data() {
    return {
      tabs: [
        { icon: "fa fa-home", title: "Home", id: "home" },
        { icon: "fa fa-hashtag", title: "Explore", id: "explore" },
        { icon: "fa fa-bell", title: "Notifications", id: "notifications" },
        { icon: "fa fa-envelope", title: "Messages", id: "messages" },
        { icon: "fa fa-bookmark", title: "Bookmarks", id: "bookmarks" },
        { icon: "fa fa-list-ul", title: "Lists", id: "lists" },
        { icon: "fa fa-user", title: "Profile", id: "profile" },
        { icon: "fa fa-ellipsis-h", title: "More", id: "more" },
      ],
      id: 'home',
      dropdown: false,
      name: `${store.state.fname} ${store.state.lname}`,
      username: store.state.username
    };
  },
  methods:{
    updateID: function(id){
      this.id = id
    }
  }
};
</script>

<style>
  @media (max-width: 1000px) {
    .hideOnMobile{
      display: none;
  }
}
</style>