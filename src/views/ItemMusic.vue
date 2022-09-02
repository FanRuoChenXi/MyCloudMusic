<template>
  <ItemMusicTop :playlist="state.playlist" />
  <ItemInfo :playlist="state.playlist" />
  <ItemMusicList
    :itemlist="state.itemlist"
    :subscribedCount="state.playlist.subscribedCount"
  />
</template>

<script>
import { useRoute } from "vue-router";
import { reactive, onMounted } from "vue";
import { getItemMusic, getMusicList } from "@/network/api/item";
import ItemMusicTop from "../components/Item/itemMusicTop.vue";
import ItemInfo from "@/components/Item/itemInfo.vue";
import ItemMusicList from "@/components/Item/itemMusicList.vue";
export default {
  name: "ItemMusic",
  components: { ItemMusicTop, ItemInfo, ItemMusicList },
  setup() {
    const state = reactive({
      playlist: {}, // 歌单详情
      itemlist: [], // 歌单歌曲
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      // 获取歌单详情
      let res = await getItemMusic(id);
      // console.log(res);
      state.playlist = res.data.playlist;
      // 获取歌单歌曲
      let result = await getMusicList(id);
      // console.log(result);
      state.itemlist = result.data.songs;
      // 防止数据丢失
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
    });
    return { state };
  },
};
</script>

<style lang=""></style>
