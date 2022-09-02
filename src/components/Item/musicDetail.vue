<template>
  <img :src="music.al.picUrl" class="bgimg" />
  <div class="detailTop">
    <!-- 左侧 -->
    <div class="top_left">
      <svg
        :style="{ width: '.5rem', height: '.5rem' }"
        aria-hidden="true"
        @click="updatedetailShow"
      >
        <use :xlink:href="'#icon-zuojiantou'" />
      </svg>
      <div class="name">
        <Vue3Marquee>{{ music.name }}</Vue3Marquee>
        <span v-for="item in music.ar" :key="item">{{ item.name + " " }}</span>
        <svg :style="{ width: '.2rem', height: '.2rem' }" aria-hidden="true">
          <use :xlink:href="'#icon-youjiantou'" />
        </svg>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="top_right">
      <svg :style="{ width: '.5rem', height: '.5rem' }" aria-hidden="true">
        <use :xlink:href="'#icon-fenxiang'" />
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow">
    <img
      src="@/assets/img/needle.png"
      class="needle"
      :class="{ needle_active: !isbtnShow }"
    />
    <img src="@/assets/img/disk.png" class="disk" />
    <img
      :src="music.al.picUrl"
      class="disk_img"
      :class="{ disk_img_active: !isbtnShow, disk_img_paused: isbtnShow }"
      @click="isLyricShow = true"
    />
  </div>
  <div
    class="lyric"
    ref="lyric"
    v-show="isLyricShow"
    @click="isLyricShow = false"
  >
    <p
      v-for="item in lyarr"
      :key="item"
      :class="{
        active:
          context.currentTime * 1000 >= item.time &&
          context.currentTime * 1000 < item.pre,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footer_top">
      <svg
        :style="{ width: '.6rem', height: '.6rem', fill: '#fff' }"
        aria-hidden="true"
      >
        <use :xlink:href="'#icon-aixin'" />
      </svg>
      <svg
        :style="{ width: '.6rem', height: '.6rem', fill: '#fff' }"
        aria-hidden="true"
      >
        <use :xlink:href="'#icon-xiazai'" />
      </svg>
      <svg :style="{ width: '.6rem', height: '.6rem' }" aria-hidden="true">
        <use :xlink:href="'#icon-gedan'" />
      </svg>
      <svg
        :style="{ width: '.6rem', height: '.6rem', fill: '#fff' }"
        aria-hidden="true"
      >
        <use :xlink:href="'#icon-xiaoxi'" />
      </svg>
      <svg
        :style="{ width: '.6rem', height: '.6rem', fill: '#fff' }"
        aria-hidden="true"
      >
        <use :xlink:href="'#icon-liebiao-'" />
      </svg>
    </div>
    <div class="footer_content">
      <input
        type="range"
        class="range"
        min="0"
        :max="context.duration"
        step="0.05"
        v-model="context.currentTime"
      />
    </div>
    <div class="footer">
      <svg
        :style="{ width: '.5rem', height: '.5rem', fill: '#fff' }"
        aria-hidden="true"
      >
        <use :xlink:href="'#icon-xunhuan'" />
      </svg>
      <!-- 上一首 -->
      <svg
        :style="{ width: '.5rem', height: '.5rem', fill: '#fff' }"
        aria-hidden="true"
        @click="goPlay(-1)"
      >
        <use :xlink:href="'#icon-shangyishoushangyige'" />
      </svg>
      <!-- 播放按钮 -->
      <svg
        :style="{ width: '1rem', height: '1rem', fill: '#fff' }"
        aria-hidden="true"
        v-if="isbtnShow"
        @click="play"
      >
        <use :xlink:href="'#icon-bofang'" />
      </svg>
      <!-- 暂停按钮 -->
      <svg
        :style="{ width: '1rem', height: '1rem', fill: '#fff' }"
        aria-hidden="true"
        v-else
        @click="play"
      >
        <use :xlink:href="'#icon-zanting'" />
      </svg>
      <!-- 下一首 -->
      <svg
        :style="{ width: '.5rem', height: '.5rem', fill: '#fff' }"
        aria-hidden="true"
        @click="goPlay(1)"
      >
        <use :xlink:href="'#icon-xiayigexiayishou'" />
      </svg>
      <svg
        :style="{ width: '.5rem', height: '.5rem', fill: '#fff' }"
        aria-hidden="true"
      >
        <use :xlink:href="'#icon-zu'" />
      </svg>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { useStore } from "vuex";
import { computed, watch, ref, onMounted } from "vue";
export default {
  components: { Vue3Marquee },
  setup(props) {
    // console.log(props);
    const store = useStore();
    const context = store.state;
    const isLyricShow = ref(false);
    const lyric = ref();
    let lyarr = computed(() => {
      let arr;
      if (context.lyricList.lyric) {
        arr = context.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
          }
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          let lrc = item.split("]")[1];
          // console.log(min, sec, mill, lrc);
          return { min, sec, mill, time, lrc };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 1000000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      // console.log(arr);
      return arr;
    });
    // 方法
    function updatedetailShow() {
      store.commit("updatedetailShow");
    }
    function goPlay(num) {
      let index = context.playListIndex + num;
      if (index < 0) {
        index = context.playList.length - 1;
      } else if (index == context.playList.length) {
        index = 0;
      }
      store.commit("updateplayListIndex", index);
    }
    // 监听
    watch(
      () => {
        return context.currentTime;
      },
      (newvalue) => {
        let p = document.querySelector("p.active");
        // console.log([p]);
        if (p) {
          if (p.offsetTop > 300) {
            lyric.value.scrollTop = p.offsetTop - 300;
          }
        }
        if (newvalue === context.duration) {
          if (context.playListIndex === context.playList.length - 1) {
            store.commit("updateplayListIndex", 0);
            props.play();
          } else {
            store.commit("updateplayListIndex", context.playListIndex + 1);
          }
        }
      }
    );
    // 生命周期钩子
    onMounted(() => {
      // console.log(lyric);
      // console.log(isLyricShow);
      props.addDuration();
    });
    return {
      context,
      store,
      isLyricShow,
      lyric,
      lyarr,
      updatedetailShow,
      goPlay,
    };
  },
  props: ["music", "play", "isbtnShow", "addDuration"],
};
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(1.6rem);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .top_left {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .name {
      margin-left: 0.2rem;
      p {
        font-weight: 500;
      }
      span {
        font-size: 0.2rem;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .disk {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .disk_img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_img 10s linear infinite;
  }
  .disk_img_active {
    animation-play-state: running;
  }
  .disk_img_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_img {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.lyric {
  width: 100%;
  height: 8.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  p {
    margin-bottom: 0.4rem;
    color: #ccc;
  }
  .active {
    color: #fff;
    font-size: 0.5rem;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footer_top {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .footer_content {
    .range {
      width: 100%;
      height: 0.06rem;
    }
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
