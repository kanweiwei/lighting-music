<template>
  <ion-page>
    <safe-area />
    <van-nav-bar title="歌单" left-arrow @click-left="back" />
    <ion-content>
      <song-list-detail :id="id" @play-song="playSong" />
    </ion-content>
  </ion-page>
</template>

<script>
import SafeArea from "@/components/safe-area.vue";
import { useRouter } from "vue-router";
import SongListDetail from "@/components/songListDetail.vue";
import { IonPage, IonContent } from "@ionic/vue";
import { NavBar } from "vant";
export default {
  components: {
    SafeArea,
    SongListDetail,
    IonPage,
    IonContent,
    VanNavBar: NavBar,
  },
  setup() {
    const router = useRouter();
    const id = router.currentRoute.value.params.id;
    return {
      id,
      router,
    };
  },
  methods: {
    back() {
      this.router.back();
    },
    playSong(item) {
      this.router.push({
        name: "songPlay",
        params: {
          id: item.id,
        },
        query: { ...item, picUrl: item.al.picUrl, author: item.ar[0].name },
      });
    },
  },
};
</script>

<style>
</style>