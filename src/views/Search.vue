<template>
  <div class="search_top">
    <svg
      :style="{ width: '.5rem', height: '.5rem' }"
      aria-hidden="true"
      @click="$router.go(-1)"
    >
      <use :xlink:href="'#icon-zuojiantou'" />
    </svg>
    <input
      type="text"
      placeholder="陈奕迅"
      v-model="keyWord.searchKey"
      @keydown.enter="addKeyWold"
    />
  </div>
  <div class="search_history">
    <span class="span_text">历史记录</span>
    <span
      v-for="item in keyWord.wordList"
      :key="item"
      class="span_key"
      @click="spanSearch(item)"
    >
      {{ item }}
    </span>
    <svg
      :style="{ width: '.5rem', height: '.5rem' }"
      aria-hidden="true"
      @click="delHistory"
    >
      <use :xlink:href="'#icon-shanchu'" />
    </svg>
  </div>
  <div class="list">
    <div class="item" v-for="(item, i) in keyWord.searchList" :key="i">
      <div class="item_left" @click="updateList(item)">
        <span class="left_span">{{ i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in item.artists" :key="index">
            {{ item1.name + " " }}
          </span>
        </div>
      </div>
      <div class="item_right">
        <svg
          :style="{ width: '.42rem', height: '.42rem', fill: '#999' }"
          aria-hidden="true"
          class="bofang"
          v-if="item.mvid"
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
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { getSearch } from "@/network/api/search";
const store = useStore();
const context = store.state;
const keyWord = reactive({
  wordList: [],
  searchKey: "",
  searchList: [],
});
// 添加历史记录
async function addKeyWold() {
  if (keyWord.searchKey != "") {
    keyWord.wordList.unshift(keyWord.searchKey);
    // 去重
    keyWord.wordList = [...new Set(keyWord.wordList)];
    // 固定长度
    if (keyWord.wordList.length > 8) {
      keyWord.wordList.splice(keyWord.wordList.length - 1, 1);
    }
    localStorage.setItem("wordList", JSON.stringify(keyWord.wordList));
    // 返回搜索结果
    let res = await getSearch(keyWord.searchKey);
    // console.log(res);
    keyWord.searchList = res.data.result.songs;
    keyWord.searchKey = "";
  }
}
onMounted(() => {
  keyWord.wordList = JSON.parse(localStorage.getItem("wordList"))
    ? JSON.parse(localStorage.getItem("wordList"))
    : [];
});
// 删除历史记录
function delHistory() {
  localStorage.removeItem("wordList");
  keyWord.wordList = [];
}
// 历史记录搜索
async function spanSearch(item) {
  let res = await getSearch(item);
  console.log(res);
  keyWord.searchList = res.data.result.songs;
}
// 更新播放列表
function updateList(item) {
  item.al = item.album;
  item.al.picUrl = item.album.artist.img1v1Url;
  store.commit("pushPlayList", item);
  store.commit("updateplayListIndex", context.playList.length - 1);
}
</script>

<style lang="less" scoped>
.search_top {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    width: 90%;
    margin-left: 0.2rem;
    padding: 0.1rem;
    border: none;
    border-bottom: 1px solid #999;
  }
}
.search_history {
  width: 100%;
  height: 1rem;
  position: relative;
  .span_text {
    font-weight: 700;
  }
  .span_key {
    display: inline-block;
    padding: 0.1rem 0.2rem;
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    background-color: rgb(189, 168, 168);
  }
  svg {
    position: absolute;
    right: 0.2rem;
  }
}
.list {
  width: 100%;
  padding: 0.2rem;
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
</style>
