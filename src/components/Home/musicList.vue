<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        :show-indicators="false"
        class="musicSwipe"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
            <img :src="item.picUrl" alt="" />
            <span class="playCount">
              <svg
                :style="{ width: '.4rem', height: '.4rem' }"
                aria-hidden="true"
              >
                <use :xlink:href="'#icon-24gl-play'" />
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import iconFont from "@/components/common/iconFont.vue";
import { getMusicList } from "@/network/api/home";
import { reactive, onMounted } from "vue";
export default {
  name: "musicList",
  components: { iconFont },
  setup() {
    const state = reactive({
      musicList: [],
    });
    function changeCount(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    onMounted(async () => {
      let res = await getMusicList();
      // console.log(res);
      state.musicList = res.data.result;
    });
    return { state, changeCount };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 0.02rem solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 4rem;
    .musicSwipe {
      height: 100%;
      img {
        width: 100%;
        height: 3rem;
        border-radius: 0.5rem;
      }
      .playCount {
        display: flex;
        align-items: center;
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        color: #fff;
      }
    }
  }
}
</style>
