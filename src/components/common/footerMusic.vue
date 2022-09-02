<template>
  <div class="footerMusic">
    <div class="footerLeft" @click="updatedetailShow">
      <img :src="context.playList[context.playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ context.playList[context.playListIndex].name }}</p>
        <span>横滑以切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <!-- 播放按钮 -->
      <svg
        :style="{ width: '.6rem', height: '.6rem' }"
        @click="play"
        aria-hidden="true"
        v-if="context.isbtnShow"
      >
        <use :xlink:href="'#icon-bofanganniu'" />
      </svg>
      <!-- 暂停按钮 -->
      <svg
        :style="{ width: '.54rem', height: '.54rem' }"
        @click="play"
        aria-hidden="true"
        v-else
      >
        <use :xlink:href="'#icon-zanting'" />
      </svg>
      <svg :style="{ width: '.6rem', height: '.6rem' }" aria-hidden="true">
        <use :xlink:href="'#icon-zu'" />
      </svg>
    </div>
    <audio
      :src="`https://music.163.com/song/media/outer/url?id=${
        context.playList[context.playListIndex].id
      }.mp3`"
      ref="audio"
    ></audio>
    <van-popup
      v-model:show="context.detailShow"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <MusicDetail
        :music="context.playList[context.playListIndex]"
        :isbtnShow="context.isbtnShow"
        :play="play"
        :addDuration="addDuration"
      />
    </van-popup>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, watch, onUpdated, onMounted } from "vue";
import MusicDetail from "../Item/musicDetail.vue";
export default {
  name: "footMusic",
  components: { MusicDetail },
  setup() {
    const audio = ref();
    const store = useStore();
    const context = store.state;
    let interVal;
    // 方法
    function play() {
      // 判断是否处在播放状态
      if (audio.value.paused) {
        audio.value.play();
        store.commit("updatebtnShow", false);
        updateTime();
      } else {
        audio.value.pause();
        store.commit("updatebtnShow", true);
        clearInterval(interVal);
      }
    }
    function updatedetailShow() {
      store.commit("updatedetailShow");
    }
    function updateTime() {
      interVal = setInterval(() => {
        store.commit("updateCurrentTime", audio.value.currentTime);
      }, 1000);
    }
    function addDuration() {
      store.commit("updateDuration", audio.value.duration);
    }
    // 监听
    watch(
      () => {
        return context.playListIndex;
      },
      () => {
        // 监听下标改变，自动播放
        audio.value.autoplay = true;
        updateTime();
        if (audio.value.paused) {
          store.commit("updatebtnShow", false);
        }
      }
    );
    watch(
      () => {
        return context.playList;
      },
      () => {
        if (context.isbtnShow) {
          audio.value.autoplay = true;
          updateTime();
          store.commit("updatebtnShow", false);
        }
      }
    );
    // 更改歌词 生命周期钩子
    onUpdated(() => {
      store.dispatch("getLyric", context.playList[context.playListIndex].id);
      addDuration();
    });
    onMounted(() => {
      store.dispatch("getLyric", context.playList[context.playListIndex].id);
    });
    return {
      context,
      store,
      audio,
      interVal,
      play,
      updatedetailShow,
      updateTime,
      addDuration,
    };
  },
};
</script>

<style lang="less">
.footerMusic {
  width: 100%;
  height: 1.4rem;
  padding: 0.2rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
