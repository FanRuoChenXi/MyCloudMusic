<template>
  <div class="iconList">
    <div class="iconItem">
      <iconFont
        :iconClass="{ width: '1rem', height: '1rem' }"
        :iconHref="'icon-tuijian'"
      >
        <span>每日推荐</span>
      </iconFont>
    </div>

    <div class="iconItem">
      <iconFont
        :iconClass="{ width: '1rem', height: '1rem' }"
        :iconHref="'icon-zhibo'"
      >
        <span>私人FM</span>
      </iconFont>
    </div>

    <div class="iconItem">
      <iconFont
        :iconClass="{ width: '1rem', height: '1rem' }"
        :iconHref="'icon-gedan'"
      >
        <span>歌单</span>
      </iconFont>
    </div>

    <div class="iconItem">
      <iconFont
        :iconClass="{ width: '1rem', height: '1rem' }"
        :iconHref="'icon-paihangbang'"
      >
        <span>排行榜</span>
      </iconFont>
    </div>
  </div>
</template>

<script>
import iconFont from "@/components/common/iconFont.vue";
export default {
  name: "iconList",
  components: { iconFont },
};
</script>

<style lang="less" scoped>
.iconList {
  width: 100%;
  height: 2rem;
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .iconItem {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
