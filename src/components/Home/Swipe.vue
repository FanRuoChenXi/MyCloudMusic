<template>
  <div id="swipe-top">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from "@/network/api/home";
import { reactive, onMounted } from "vue";
export default {
  name: "Swipe",
  setup() {
    const state = reactive({
      images: [],
    });
    onMounted(async () => {
      let res = await getBanner();
      // console.log(res);
      state.images = res.data.banners;
    });
    return { state };
  },
};
</script>

<style lang="less">
#swipe-top {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>
