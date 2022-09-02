<template>
  <div class="login">
    <div class="login_top">登录体验更多精彩</div>
    <button class="btn" @click="login">二维码登录</button>
    <img :src="context.signURL" alt="" />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  qrCodeLoginKey,
  qrCodeLoginImg,
  qrCodeLoginCheck,
} from "@/network/api/login";
const store = useStore();
const router = useRouter();
const context = store.state;
async function login() {
  let nowtime = Date.now();
  //调第一个接口拿key
  let key = (await qrCodeLoginKey(nowtime)).data.data.unikey;
  //调第二个接口拿二维码图片
  let sginImgURL = (await qrCodeLoginImg(key)).data.data.qrimg;
  store.commit("updateSignURL", sginImgURL);
  // this.$store.state.signShow = true
  // 800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功
  let check = setInterval(async () => {
    let nowtime2 = new Date().getTime();
    let res = await qrCodeLoginCheck(key, nowtime2).then();
    // console.log(res);
    if (res.data.code == 800) {
      alert(res.data.message);
      clearInterval(check);
    } else if (res.data.code == 802) {
      // console.log(res);
      store.commit("uodateNickname", res.data.nickname);
      store.commit("updateUserImg", res.data.avatarUrl);
    } else if (res.data.code == 803) {
      // alert(res.data.message);
      store.commit("updateisLogin", true);
      router.push("/user");
      clearInterval(check);
    }
  }, 3000);
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 14rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .login_top {
    margin-top: 1rem;
    font-size: 0.6rem;
  }
  .btn {
    width: 2rem;
    height: 0.6rem;
    background-color: rgba(228, 29, 29, 0.788);
    color: #fff;
    border: none;
    border-radius: 0.2rem;
  }
}
</style>
