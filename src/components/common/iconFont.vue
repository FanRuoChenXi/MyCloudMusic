<template>
  <!-- 应用阿里icon组件-->
  <svg
    :style="{ width: iconClass.width, height: iconClass.height }"
    aria-hidden="true"
  >
    <use :xlink:href="'#' + iconHref" />
  </svg>
  <slot></slot>
</template>

<script>
export default {
  props: ["iconClass", "iconHref"],
  //传入的iconClass写法  iconClass: { width: "20px", height: "20px", },
};
</script>
