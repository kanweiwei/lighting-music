<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" class="title" @click="back">
            <i class="bank-icon"></i>
            歌单
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <!-- header -->
      <ion-grid class="grid">
        <ion-row>
          <ion-col size="5">
            <ion-img :src="data.coverImgUrl" class="header-img"></ion-img>
          </ion-col>
          <ion-col size="7">
            <ion-row>
              <ion-col class="name">{{data.name}}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="avatar">
                <ion-img :src="avatarUrls" class="img"></ion-img>
                <span>{{nicknames}}</span>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="descriptionBox">
                <div class="description">{{data.description}}</div>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- 歌曲部分 -->
      <ion-grid>
        <ion-row v-for="(item,index) in song" :key="item.id" class="content-row">
          <ion-col size="1" class="index">{{index+1}}</ion-col>
          <ion-col size="10" class="content">
            <div class="title">{{item.name}}</div>
            <div class="avatar">{{item.ar[0].name}}</div>
          </ion-col>
          <ion-col size="1" class="open">...</ion-col>
        </ion-row>

      </ion-grid>
    </ion-content>
  </ion-page>
</template>


<script lang='ts'>
import { defineComponent, ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from "@ionic/vue";

//路由
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
  },
  setup() {
    //路由
    const router = useRouter();

    //数据
    const data = ref<any>([]);
    const id = ref(router.currentRoute.value.params.id); //歌单ID

    const avatarUrls = ref(""); //用户头像
    const nicknames = ref(""); //用户名字

    const song = ref([]); //歌曲

    //返回上一个页面
    const back = () => {
      router.back();
    };

    const axios = async () => {
      //获取数据playlist
      const { playlist } = await (
        await fetch(
          `https://qcz1as.app.cloudendpoint.cn/playlist/detail?id=${id.value}`
        )
      ).json();

      data.value = playlist;

      avatarUrls.value = playlist.creator.avatarUrl; //用户头像
      nicknames.value = playlist.creator.nickname; //用户名字

      //获取tracks里歌曲数据
      song.value = playlist.tracks;
    };
    axios();

    return { back, data, avatarUrls, nicknames, song };
  },
});
</script>
<style scoped>
.bank-icon {
  display: inline-block;
  width: 40rem;
  height: 40rem;
  background-size: 30rem 30rem;
  background-position: 0 14rem;
  background-image: url("/assets/icon/direction-left.png");
  background-repeat: no-repeat;
}
.grid {
  padding-left: 10rem;
  background: rgb(187, 181, 181);
  padding-bottom: 20rem;
}

.header-img {
  border-radius: 20rem;
  overflow: hidden;
}
.name {
  font-size: 14rem;
  font-weight: bold;
}
.avatar {
  display: flex;
  align-items: center;
  color: rgb(230, 218, 218);
}
.avatar .img {
  width: 25rem;
  height: 25rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10rem;
}

.description {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgb(230, 218, 218);
}

.content-row {
  margin: 8rem 0;
}
.index {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14rem;
  color: #aaa;
}
.content .title {
  font-size: 15rem;
}
.content .avatar {
  color: #aaaaaa;
}

.open {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(90deg);
  font-size: 20rem;
  color: #aaa;
}
</style>