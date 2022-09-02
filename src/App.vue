<template>
  <router-view />
  <FooterMusic v-show="context.isFooter" />
</template>

<script>
import FooterMusic from "./components/common/footerMusic.vue";
import { useStore } from "vuex";
export default {
  components: { FooterMusic },
  setup() {
    const store = useStore();
    const context = store.state;
    return { context };
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  color: black;
}
</style>
