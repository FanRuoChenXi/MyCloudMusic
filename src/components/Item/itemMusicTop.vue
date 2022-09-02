<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" class="bgimg" />
    <div class="itemLeft">
      <svg
        :style="{ width: '.5rem', height: '.5rem', fill: '#fff' }"
        aria-hidden="true"
        @click="$router.go(-1)"
      >
        <use :xlink:href="'#icon-zuojiantou'" />
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg
        :style="{ width: '.5rem', height: '.5rem', fill: '#fff' }"
        aria-hidden="true"
      >
        <use :xlink:href="'#icon-sousuo'" />
      </svg>
      <svg
        :style="{ width: '.5rem', height: '.5rem', fill: '#fff' }"
        aria-hidden="true"
      >
        <use :xlink:href="'#icon-31liebiao'" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "itemMusicTop",
  setup(props) {
    // console.log(props);
  },
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .bgimg {
    width: 100%;
    height: 8rem;
    position: fixed;
    z-index: -1;
    filter: blur(0.6rem);
  }
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    margin: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 0.4rem;
      color: #fff;
    }
  }
}
</style>
