<template>
  <div class="topNav">
    <svg :style="{ width: '.5rem', height: '.5rem' }" aria-hidden="true">
      <use :xlink:href="'#icon-31liebiao'" />
    </svg>

    <div class="topContent">
      <span @click="$router.push('/user')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>

    <svg
      :style="{ width: '.5rem', height: '.5rem' }"
      aria-hidden="true"
      @click="$router.push('/search')"
    >
      <use :xlink:href="'#icon-sousuo'" />
    </svg>
  </div>
</template>

<script>
import iconFont from "@/components/common/iconFont.vue";
export default {
  name: "TopNav",
  components: { iconFont },
};
</script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .topContent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    // align-items: center;
    font-size: 0.36rem;
    .active {
      font-weight: 900;
    }
  }
}
</style>
