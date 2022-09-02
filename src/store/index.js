import { createStore } from "vuex";
import { getMusicLyric } from "@/network/api/item";

export default createStore({
  state: {
    playList: [
      // 播放列表
      {
        al: {
          id: 34569060,
          name: "Hide",
          pic: 3283141728902354,
          picUrl:
            "https://p2.music.126.net/cgl67PV4VRQ2a5Y_vx-ZRw==/3283141728902354.jpg",
        },
        ar: [{ name: "Multex" }],
        name: "Hide",
        id: 407002307,
      },
    ],
    lyricList: {}, // 歌词
    user: {
      imgUrl: "",
      nickname: "",
    }, // 用户信息
    playListIndex: 0, // 默认下标
    isbtnShow: true, // 播放按钮显示
    detailShow: false, // 详情页展示
    currentTime: 0, //当前时间
    duration: 0, // 歌曲总时长
    isLogin: false, // 是否登录
    isFooter: true, // 是否显示底部组件
    signURL: "", // 二维码地址
  },
  getters: {},
  mutations: {
    updatebtnShow(state, value) {
      state.isbtnShow = value;
    },
    updateplayList(state, value) {
      state.playList = value;
      // console.log(state.playList);
    },
    updateplayListIndex(state, value) {
      state.playListIndex = value;
    },
    updatedetailShow(state) {
      state.detailShow = !state.detailShow;
    },
    updateLyric(state, value) {
      state.lyricList = value;
    },
    updateCurrentTime(state, value) {
      // console.log(state.currentTime);
      state.currentTime = value;
    },
    updateDuration(state, value) {
      state.duration = value;
      // console.log(state.duration);
    },
    // 添加歌曲到列表
    pushPlayList(state, value) {
      state.playList.push(value);
    },
    // 获取二维码
    updateSignURL(state, value) {
      state.signURL = value;
    },
    // 登录
    updateisLogin(state, value) {
      state.isLogin = value;
    },
    // 用户信息
    uodateNickname(state, value) {
      state.user.nickname = value;
    },
    updateUserImg(state, value) {
      state.user.imgUrl = value;
    },
  },
  actions: {
    async getLyric(context, value) {
      let res = await getMusicLyric(value);
      // console.log(res);
      context.commit("updateLyric", res.data.lrc);
    },
  },
  modules: {},
});
