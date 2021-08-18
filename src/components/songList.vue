<template>
  <div class='box'>
    <div style="height:20px"></div>
    <ion-grid>
      <ion-row>
        <!-- 非主流名字 -->
        <ion-col size="9">
          <span class="title">推荐歌单</span>
        </ion-col>
        <!-- 更多按钮 -->
        <ion-col size="3" class="more-box">
          <span class="more">更多&gt;</span>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col class="col" size="4" v-for="item in data" :key="item.id" @click="fn(item.id)">
          <!-- 图片 -->
          <ion-img class="img" :src="item.picUrl"></ion-img>
          <!-- 描述 -->
          <span>{{item.name}}</span>
          <!-- 播放量 -->
          <span class="playCount">
            <i class="playoutline"></i>
            <div>{{countFilter(item.playCount)}}</div>
          </span>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script lang='ts'>
import { IonGrid, IonRow, IonCol, IonImg } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { IonGrid, IonRow, IonCol, IonImg },
  setup() {
    //数据
    const data = ref([]);

    //路由
    const router = useRouter();

    //获取推荐列表数据
    const axios = async () => {
      const { result } = await (
        await fetch("https://qcz1as.app.cloudendpoint.cn/personalized?limit=9")
      ).json();

      data.value = result;
    };
    axios();

    //播放量过滤
    const countFilter = (count: number): string => {
      if (count > 10000) {
        return (count / 1000).toFixed(0) + "w";
      } else {
        return count + "";
      }
    };

    //跳转歌单详情
    const fn = (id: string) => {
      router.push({
        name: "songListDetail",
        params: { id },
      });
    };

    return {
      data,
      countFilter,
      fn,
    };
  },
});
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  /* background: rgb(226, 226, 226); */
}

ion-grid {
  padding: 0 5rem;
  border-radius: 4%;
  background: rgb(255, 254, 254);
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
.col {
  position: relative;
}
.col .img {
  border-radius: 10rem;
  overflow: hidden;
}

.col .playCount {
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
.col .playCount .playoutline {
  width: 0rem;
  height: 0rem;
  border-width: 6rem;
  border-color: transparent transparent transparent white;
  border-style: solid;
}
</style>