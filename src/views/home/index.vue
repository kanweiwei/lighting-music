<template>
  <ion-page>
    <safe-area />
    <ion-searchbar show-cancel-button="never" class="searchBar"></ion-searchbar>
    <ion-content>
      <div class="banners-container">
        <ion-slides :pager="true" :options="slideOpts" ref="slideBanners" :ionSlidesDidLoad="slideLoaded">
          <ion-slide v-for="(banner, index) in banners" :key="index">
            <img :src="banner.pic" />
          </ion-slide>
        </ion-slides>
      </div>

      <!-- 歌单组件 -->
      <song-list></song-list>

    </ion-content>
  </ion-page>
</template>

<script>
import BannerApi from "@/services/banner.service";
import safeArea from "@/components/safe-area.vue";
import songList from "@/components/songList.vue";//歌单列表
import {
  IonPage,
  IonSearchbar,
  IonSlides,
  IonSlide,
  IonContent
} from "@ionic/vue";

export default {
  components: {
    IonPage,
    IonSearchbar,
    IonSlides,
    IonSlide,
    IonContent,
    safeArea,
    songList,
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
    slideLoaded (e) {
      console.log(e);
    },
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
}
</style>