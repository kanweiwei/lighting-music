<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header> -->
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-buttons>
            <ion-back-button default-href="/" color="dark"></ion-back-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <div v-if="!bol" class="load">
        loading...
      </div>
      <div v-else>
        <!-- 头部 -->
        <div class="container">
          <ion-grid class="grid">
            <ion-row>
              <ion-col size="5">
                <ion-img :src="data.coverImgUrl" class="header-img" alt="封面图"></ion-img>
              </ion-col>
              <ion-col size="7">
                <ion-row>
                  <ion-col class="name">{{data.name}}</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col class="avatar">
                    <ion-img :src="avatarUrls" class="img" alt="作者头像"></ion-img>
                    <span>{{nicknames}}</span>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col class="descriptionBox">
                    <div class="description">{{data.description}}</div>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col class="descriptionBox">
                    <div class="description">{{toTime(data.createTime)}}</div>
                  </ion-col>
                </ion-row>
              </ion-col>
            </ion-row>
          </ion-grid>

          <!-- 分享添加评论 状态栏 -->
          <ion-grid class="stateGrid">
            <ion-row class="stateRow">
              <!-- <ion-col class="cirleLeft" size="1"></ion-col> -->
              <ion-col class="col add" size="4">
                <van-icon name="add-o" size='20rem' />
                <span>{{countFilter(data.subscribedCount, 1)}}</span>
              </ion-col>
              <ion-col class="vertical">|</ion-col>
              <ion-col class="col comment" size="3">
                <van-icon name="comment-o" size='20rem' />
                <span>{{data.commentCount}}</span>
              </ion-col>
              <ion-col class="vertical">|</ion-col>
              <ion-col class="col share" size="3">
                <van-icon name="share-o" size='20rem' />
                <span>{{data.shareCount}}</span>
              </ion-col>
              <!-- <ion-col class="rightCircle" size="1"></ion-col> -->
            </ion-row>
          </ion-grid>
        </div>

        <!-- 播放全部 -->
        <ion-grid class="playAll">
          <ion-row>
            <ion-col size="1" class="allIndex">
              <van-icon name="play-circle" color='red' />
            </ion-col>
            <ion-col size="11" class="content">
              <div class="title">播放全部</div>
              <div class="length">（{{song.length}}）</div>
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
      </div>
    </ion-content>
  </ion-page>
</template>


<script lang='ts'>
import { defineComponent, ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";

//路由
import { useRouter } from "vue-router";
import { Icon } from "vant";
import { countFilter, toTime } from "@/utils/commont";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    vanIcon: Icon,
    IonButtons,
    IonBackButton,
  },
  setup() {
    //路由
    const router = useRouter();

    //数据
    const data = ref([]);
    const id = ref(router.currentRoute.value.params.id); //歌单ID

    const avatarUrls = ref(""); //用户头像
    const nicknames = ref(""); //用户名字

    const song = ref([]); //歌曲

    const bol = ref(false); //判断加载

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
      bol.value = true;

      avatarUrls.value = playlist.creator.avatarUrl; //用户头像
      nicknames.value = playlist.creator.nickname; //用户名字

      //获取tracks里歌曲数据
      song.value = playlist.tracks;

      console.log(playlist);
    };
    axios();

    return {
      back,
      data,
      avatarUrls,
      nicknames,
      song,
      bol,
      toTime,
      countFilter,
    };
  },
});
</script>
<style scoped>
.load {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.container {
  position: relative;
  background-color: rgb(199, 170, 180);
  border-radius: 0 0 3% 3%;
}

.grid {
  padding-left: 10rem;
  /* background-color: rgb(199, 170, 180); */
  padding-bottom: 30rem;
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

.stateGrid {
  position: absolute;
  left: 50%;
  bottom: -25%;
  transform: translate(-50%, -80%);
  width: 60%;
  border: 1rem solid white;
  box-shadow: 0 1rem 10rem #ccc;
  background: white;
  z-index: 2;
  border-radius: 20rem;
}

.stateGrid .stateRow .vertical {
  color: #ccc;
}

.stateGrid .stateRow .col {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
tateGrid .stateRow .add span {
  margin-left: 2rem;
}
.stateGrid .stateRow .comment span {
  margin-left: 2rem;
}
.stateGrid .stateRow .share span {
  margin-left: 2rem;
}

.playAll {
  margin-top: 30rem;
}
.playAll .allIndex {
  font-size: 22rem;
}

.playAll .content {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.playAll .content .title {
  margin-right: 10rem;
}
.playAll .content .length {
  color: #a8a7a7;
  font-weight: 500;
}

.index {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14rem;
  color: rgb(199, 170, 180);
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
  color: rgb(199, 170, 180);
}
</style>