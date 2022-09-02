<template>
  <div class="musicList">
    <div class="listTop">
      <div class="top_left">
        <svg :style="{ width: '.42rem', height: '.42rem' }" aria-hidden="true">
          <use :xlink:href="'#icon-bofang'" />
        </svg>
        <span>播放全部</span>
      </div>
      <div class="top_right">
        <svg :style="{ width: '.3rem', height: '.3rem' }" aria-hidden="true">
          <use :xlink:href="'#icon-jiahao'" />
        </svg>
        <span> 收藏({{ subscribedCount }}) </span>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, i) in itemlist" :key="i">
        <div class="item_left" @click="playMusic(i)">
          <span class="left_span">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="index">
              {{ item1.name + " " }}
            </span>
          </div>
        </div>
        <div class="item_right">
          <svg
            :style="{ width: '.42rem', height: '.42rem', fill: '#999' }"
            aria-hidden="true"
            class="bofang"
            v-if="item.mv"
          >
            <use :xlink:href="'#icon-shipin'" />
          </svg>
          <svg
            :style="{ width: '.42rem', height: '.42rem', fill: '#999' }"
            aria-hidden="true"
            class="liebiao"
          >
            <use :xlink:href="'#icon-31liebiao'" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "itemMusicList",
  setup(props) {
    const stote = useStore();
    // console.log(props);
    // if ((props.itemlist = "")) {
    //   props.itemlist = JSON.parse(sessionStorage.getItem().itemlist);
    // }
    function playMusic(i) {
      stote.commit("updateplayList", props.itemlist);
      stote.commit("updateplayListIndex", i);
    }
    return { playMusic };
  },
  props: ["itemlist", "subscribedCount"],
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 30rem;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  background-color: #fff;
  .listTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top_left {
      width: 3rem;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      svg {
        stroke: #333;
        stroke-width: 20;
      }
      span {
        font-weight: 400;
      }
    }
    .top_right {
      display: flex;
      align-items: center;
      background-color: red;
      padding: 0.2rem;
      border-radius: 0.4rem;
      color: #fff;
      svg {
        fill: #fff;
        margin-right: 0.1rem;
        stroke: #fff;
        stroke-width: 50;
      }
    }
  }
  .list {
    width: 100%;
    //
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item_left {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .left_span {
          display: inline-block;
          text-align: center;
          width: 0.2rem;
        }
        div {
          margin-left: 0.3rem;
          p {
            width: 4.54rem;
            height: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span {
            color: #999;
            font-weight: 400;
            font-size: 0.24rem;
          }
        }
      }
      .item_right {
        width: 20%;
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        .bofang {
          position: absolute;
          left: 0;
        }
        .liebiao {
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>
