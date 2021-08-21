<template>
  <ion-page>
    <safe-area />
    <!-- <ion-searchbar show-cancel-button="never" class="searchBar"></ion-searchbar> -->
    <search></search>
    <ion-content>
      <div class="banners-container">
        <van-swipe :autoplay="3000" :lazy-render="true">
          <van-swipe-item v-for="banner in banners" :key="banner.bannerId">
            <img v-lazy="banner.pic" />
            <div class="img-label">新歌首发</div>
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 精品歌单，可重用 -->
      <div style="margin-top:10rem">
        <song-list title="次车库的雷达歌单" tag="欧美"></song-list>
      </div>

      <!-- 推荐歌单 -->
      <song-list title="推荐歌单" mode="col" type="recommend" :num=9></song-list>
    </ion-content>
  </ion-page>
</template>

<script>
import BannerApi from "@/services/banner.service.js";
import safeArea from "@/components/safe-area.vue";//搜索框
import songList from "@/components/songList.vue"; //歌单列表
import Search from './search.vue'
import { IonPage, IonContent } from "@ionic/vue";
import { Swipe, SwipeItem } from "vant";

export default {
  components: {
    IonPage,
    IonContent,
    safeArea,
    songList,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    Search
  },
  data () {
    return {
      banners: []
    };
  },
  setup () {
    const slideOpts = {
      initialSlide: 1,
      speed: 400,
      autoplay: {
        delay: 2000
      },
      effect: "flip",
      loop: true
    };
    return { slideOpts };
  },
  ionViewDidEnter () {
    this.getBanners();
  },
  methods: {
    async getBanners () {
      try {
        const res = await BannerApi.get({ type: 2 });
        this.banners = res.banners;
      } catch (error) {
        console.log(error);
      }
    },
    // slideLoaded(e) {
    //   console.log(e);
    // }
  }
};
</script>

<style lang="less">
.banners-container {
  margin: 0 14rem;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5),
    0px 1px 3px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
  .van-swipe-item {
    font-size: 0;
    .img-label {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 65rem;
      height: 20rem;
      background: #f7b500;
      box-shadow: 0rem 2rem 10rem 0rem rgba(0, 0, 0, 0.5);
      border-radius: 15rem 0rem 9rem 0rem;
      color: #fff;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>