<template>
  <div class="flex">
    <side-bar />
    <profile-section />
    <micell-sec />
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import MicellSec from "../components/MicellSec.vue";
import ProfileSection from "../components/ProfileSection.vue";

export default {
  name: "UserProfile",
  components: {
    SideBar,
    ProfileSection,
    MicellSec,
  },
  
};
</script>