<template>
  <div class="info_top">
    <img :src="context.user.imgUrl" alt="" />
    <p>{{ context.user.nickname }}</p>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted } from "vue";
const store = useStore();
const context = store.state;
onMounted(() => {});
</script>

<style lang="less" scoped>
.info_top {
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
  }
  p {
    font-size: 0.4rem;
  }
}
</style>
