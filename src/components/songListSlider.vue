<template>
  <ion-grid>
    <ion-row>
      <!-- 非主流名字 -->
      <ion-col size="9">
        <span class="title">{{title}}</span>
      </ion-col>
      <!-- 更多按钮 -->
      <ion-col size="3" class="more-box">
        <span class="more">更多&gt;</span>
      </ion-col>
    </ion-row>
    <ion-row class="sliderRow" :style="{left:move+'px'}" @touchstart="touchStart" @touchmove="touchMove"
      @touchend="touchEnd">
      <ion-col class="sliderCol" size="4" v-for="item in data" :key="item.id" @click="fn(item.id)">
        <!-- 图片 -->
        <ion-img class="img" :src="item.coverImgUrl"></ion-img>
        <!-- 描述 -->
        <span class="name">{{item.name}}</span>
        <!-- 播放量 -->
        <span class="playCount">
          <i class="playoutline"></i>
          <div>{{countFilter(item.playCount)}}</div>
        </span>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang='ts'>
import { IonGrid, IonRow, IonCol, IonImg } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { countFilter } from "@/utils/commont";

export default defineComponent({
  components: { IonGrid, IonRow, IonCol, IonImg },
  props: {
    title: {
      type: String,
      default: "精品歌单",
    },
    tag: {
      type: String,
      default: "全部",
    },
  },
  setup(props) {
    //鼠标点击时x轴坐标
    let disX = 0;

    //最后偏移量
    const move = ref(0);

    //当前偏移量，避免第二次点击时，重回原位
    let end = 0;

    //鼠标点击
    function touchStart(ev: TouchEvent) {
      disX = ev.targetTouches[0].clientX;
    }

    //鼠标移动
    function touchMove(ev: TouchEvent) {
      if (move.value <= 0) {
        move.value = end + ev.targetTouches[0].clientX - disX;
      }

      //右滑限制
      if (move.value > 0) {
        move.value = 0;
      }

      //左滑限制
      const dom = -document.documentElement.clientWidth;
      if (move.value < dom) {
        move.value = dom;
      }
    }

    //鼠标抬起
    function touchEnd() {
      end = move.value;
    }

    //二
    //数据
    const data = ref([]);

    //路由
    const router = useRouter();

    //获取推荐列表数据
    const axios = async () => {
      const { playlists } = await (
        await fetch(
          `https://qcz1as.app.cloudendpoint.cn/top/playlist/highquality?limit=6&cat=${props.tag}`
        )
      ).json();

      data.value = playlists;
    };
    axios();

    //跳转歌单详情
    const fn = (id: string) => {
      router.push({
        name: "songListDetail",
        params: { id },
      });
    };
    return {
      touchStart,
      touchMove,
      touchEnd,
      move,
      data,
      fn,
      countFilter,
    };
  },
});
</script>

<style scoped>
ion-grid {
  border-radius: 4%;
  background: rgb(255, 254, 254);
  /* overflow: hidden; */
  height: 200rem;
  margin-top: 20rem;
}

.title {
  font-size: 18rem;
  font-weight: bold;
}
.more-box {
  text-align: end;
}

.more {
  display: inline-block;
  width: 50rem;
  font-size: 5rem;
  border: 2rem solid rgb(230, 229, 229);
  text-align: center;
  border-radius: 30rem;
  line-height: 20rem;
  background-color: white;
  font-weight: 600;
}
.sliderRow {
  display: flex;
  flex-flow: nowrap;
  position: relative;
}
.img {
  border-radius: 10rem;
  overflow: hidden;
}

.name {
  font-size: 12rem;
}

.playCount {
  display: flex;
  align-items: center;
  position: absolute;
  top: 5%;
  right: 1%;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  line-height: 20rem;
  border-radius: 10rem;
  padding: 0 8rem;
  transform: scale(0.8);
}
.playCount .playoutline {
  width: 0rem;
  height: 0rem;
  border-width: 6rem;
  border-color: transparent transparent transparent white;
  border-style: solid;
}
</style>
