<template>
  <TopNav />
  <Swipe />
  <IconList />
  <MusicList />
</template>

<script>
import TopNav from "@/components/Home/TopNav.vue";
import Swipe from "@/components/Home/Swipe.vue";
import IconList from "@/components/Home/iconList.vue";
import MusicList from "@/components/Home/musicList.vue";

export default {
  name: "Home",
  components: { TopNav, Swipe, IconList, MusicList },
};
</script>
