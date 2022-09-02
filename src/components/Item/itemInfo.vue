<template>
  <div class="itemInfo">
    <div class="infoTop">
      <div class="contentLeft">
        <img :src="playlist.coverImgUrl" class="left_img" />
      </div>
      <div class="contentRight">
        <p class="rightP_one">{{ playlist.name }}</p>
        <div class="right_info">
          <img :src="playlist.creator.avatarUrl" class="right_img" />
          <span>{{ playlist.creator.nickname }}</span>
          <svg
            :style="{ width: '.26rem', height: '.26rem', fill: '#fff' }"
            aria-hidden="true"
          >
            <use :xlink:href="'#icon-youjiantou'" />
          </svg>
        </div>
        <p class="rightP_two">
          <span>
            {{ playlist.description }}
          </span>
          <svg
            :style="{ width: '.3rem', height: '.3rem', fill: '#fff' }"
            aria-hidden="true"
          >
            <use :xlink:href="'#icon-youjiantou'" />
          </svg>
        </p>
      </div>
    </div>
    <div class="iconList">
      <div class="iconItem">
        <svg
          :style="{ width: '.5rem', height: '.5rem', fill: '#fff' }"
          aria-hidden="true"
        >
          <use :xlink:href="'#icon-xiaoxi'" />
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>

      <div class="iconItem">
        <svg
          :style="{ width: '.5rem', height: '.5rem', fill: '#fff' }"
          aria-hidden="true"
        >
          <use :xlink:href="'#icon-fenxiang'" />
        </svg>
        <span>{{ playlist.shareCount }}</span>
      </div>

      <div class="iconItem">
        <svg
          :style="{ width: '.5rem', height: '.5rem', fill: '#fff' }"
          aria-hidden="true"
        >
          <use :xlink:href="'#icon-xiazai'" />
        </svg>
        <span>下载</span>
      </div>

      <div class="iconItem">
        <svg
          :style="{ width: '.46rem', height: '.46rem', fill: '#fff' }"
          aria-hidden="true"
        >
          <use :xlink:href="'#icon-show_duoxuan'" />
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "itemInfo",
  setup(props) {
    // console.log(props);
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem().playlist
      ).creator;
    }
  },
  props: ["playlist"],
};
</script>
<style lang="less" scoped>
.itemInfo {
  width: 100%;
  height: 4rem;
  .infoTop {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .contentLeft {
      height: 100%;
      .left_img {
        width: 2.2rem;
        height: 2.2rem;
        margin: 0.4rem 0.4rem;
      }
    }
    .contentRight {
      width: 100%;
      height: 80%;
      .rightP_one {
        font-weight: 900;
        color: #fff;
        padding: 0.02rem;
        margin-bottom: 0.08rem;
      }
      .right_info {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .right_img {
          width: 0.52rem;
          height: 0.52rem;
          border-radius: 50%;
        }
        span {
          font-size: 0.26rem;
          color: #fff;
        }
      }
      .rightP_two {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 35px;
        margin-top: 0.1rem;
        span {
          display: inline-block;
          width: 4.2rem;
          height: 100%;
          font-size: 0.16rem;
          color: #fff;
          overflow: hidden;
        }
      }
    }
  }
  .iconList {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .iconItem {
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        margin-top: 0.1rem;
        font-size: 0.3rem;
        color: #fff;
      }
    }
  }
}
</style>
