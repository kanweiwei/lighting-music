<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header> -->
    <ion-content scrollEvents @ionScroll="fn">
      <ion-header collapse="condense" class="myHeader">
        <!-- <ion-toolbar>
          <ion-buttons>
            <ion-back-button default-href="/" color="dark"></ion-back-button>
          </ion-buttons>
        </ion-toolbar> -->
      </ion-header>

      <div v-if="!bol" class="load">loading...</div>
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
                  <ion-col class="name">{{ data.name }}</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col class="avatar">
                    <ion-img :src="avatarUrls" class="img" alt="作者头像"></ion-img>
                    <span>{{ nicknames }}</span>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col class="descriptionBox" size="11">
                    <div class="description">{{ data.description }}</div>
                  </ion-col>
                  <ion-col size="1">
                    <div class="more">&gt;</div>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col class="descriptionBox">
                    <div class="description">{{ toTime(data.createTime) }}</div>
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
                <van-icon name="add-o" size="20rem" />
                <span>{{ countFilter(data.subscribedCount, 1) }}</span>
              </ion-col>
              <ion-col class="vertical">|</ion-col>
              <ion-col class="col comment" size="3" @click="onRouteToComment">
                <van-icon name="comment-o" size="20rem" />
                <span>{{ data.commentCount }}</span>
              </ion-col>
              <ion-col class="vertical">|</ion-col>
              <ion-col class="col share" size="3">
                <van-icon name="share-o" size="20rem" />
                <span>{{ data.shareCount }}</span>
              </ion-col>
              <!-- <ion-col class="rightCircle" size="1"></ion-col> -->
            </ion-row>
          </ion-grid>
        </div>

        <!-- 播放全部 -->
        <ion-grid class="playAll">
          <ion-row>
            <ion-col size="1" class="allIndex">
              <van-icon name="play-circle" color="red" />
            </ion-col>
            <ion-col size="11" class="content">
              <div class="title">播放全部</div>
              <div class="length">（{{ data.trackIds.length }}）</div>
            </ion-col>
          </ion-row>
        </ion-grid>

        <!-- 歌曲部分 -->
        <ion-grid>
          <ion-row v-for="(item, index) in song" :key="item.id" class="content-row" @click="playSong(item)">
            <ion-col size="1" class="index">{{ index + 1 }}</ion-col>
            <ion-col size="10" class="content">
              <div class="title">{{ item.name }}</div>
              <div class="avatar">{{ item.ar[0].name }}</div>
            </ion-col>
            <ion-col size="1" class="open">...</ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- 占位 -->
      <div class="box" ref="box" :style="{ 'text-align': 'center', opacity: show }">
        没有更多歌单了哦...
      </div>
    </ion-content>
  </ion-page>
</template>


<script lang='ts'>
import { countFilter, toTime } from "@/utils/commont";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
} from "@ionic/vue";
import { Icon } from "vant";
import { defineComponent, ref } from "vue";
//路由
import { useRouter } from "vue-router";

interface AllList {
  id: number;
}

export default defineComponent({
  emits: ["play-song"],
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    vanIcon: Icon,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    //路由
    const router = useRouter();

    //数据
    const data = ref([]);
    const id = ref(props.id); //歌单ID

    const avatarUrls = ref(""); //用户头像
    const nicknames = ref(""); //用户名字

    const song: any = ref([]); //歌曲

    const bol = ref(false); //判断加载

    //防抖
    let timer: any = null;

    //滑动
    const box = ref();

    //可见高
    const clientHeight = document.body.clientHeight;

    const show = ref(0); //底部显示隐藏

    const total = ref(10);

    //元素属性
    let rect: any;

    //分割数据
    let n = 1;

    async function allSong(data: any) {
      //用户登录歌曲数量
      let url = "https://qcz1as.app.cloudendpoint.cn/song/detail?ids=";

      // console.log(playlist.trackIds);
      data.trackIds.map((item: AllList, index: number) => {
        if (index < 15 * n) {
          url += item.id + ",";
        }
      });
      url = url.slice(0, -1);
      const result = await (await fetch(url)).json();
      song.value = [...song.value, ...result.songs.slice((n - 1) * 15, n * 15)];
    }

    //滚动
    const fn = (ev: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        rect = box.value.getBoundingClientRect();
        if (song.value.length < total.value) {
          if (rect.top < clientHeight) {
            n++;
            allSong(data.value);
          }
        } else {
          show.value = 1;
        }
      }, 500);
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
      total.value = playlist.trackIds.length;

      avatarUrls.value = playlist.creator.avatarUrl; //用户头像
      nicknames.value = playlist.creator.nickname; //用户名字

      allSong(playlist);
      //没有登陆时，获取tracks里歌曲数据
      // song.value = playlist.tracks;
    };
    axios();

    //返回上一页
    const onClickLeft = () => {
      router.back();
    };

    //评论
    const onRouteToComment = () => {
      router.push(`/comment/playlist/${id.value}`);
    };

    return {
      data,
      avatarUrls,
      nicknames,
      song,
      bol,
      toTime,
      countFilter,
      onClickLeft,
      fn,
      box,
      onRouteToComment,
      show,
    };
  },
  methods: {
    playSong(item: unknown) {
      this.$emit("play-song", item);
    },
  },
});
</script>
<style scoped>
.van-nav-bar {
  --van-nav-bar-text-color: black;
  --van-nav-bar-icon-color: black;
}
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
  font-size: 12px;
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
.more {
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
  font-size: 12px;
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
.stateGrid .stateRow .add span {
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

.content-row {
  margin-bottom: 10rem;
  font-size: 12px;
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
.box {
  height: 10rem;
  width: 100%;
  font-size: 14rem;
  font-weight: bold;
}
</style>