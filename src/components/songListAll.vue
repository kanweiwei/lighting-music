<template>
  <ion-page>
    <ion-content style="position:relative">
      <ion-header>
        <van-nav-bar left-text="歌单广场" left-arrow @click-left="onClickLeft" />
      </ion-header>

      <van-tabs v-model:active="active" @click-tab='clickFn'>
        <van-tab v-for="tag in tags" :key="tag.playlistTag.id" :title="tag.playlistTag.name"
          :name="tag.playlistTag.name" @touchend='touchEnd'>
          <song-list mode="col" showHead="0" :tag="active" :num="page" @ok="show=1"></song-list>
        </van-tab>
      </van-tabs>

      <!-- 占位 -->
      <div class="box" ref="box" :style="{'text-align':'center', 'opacity':show}">没有更多歌单了哦...</div>
    </ion-content>

  </ion-page>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { NavBar, Tabs, Tab } from "vant";
import { IonPage, IonHeader, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import songList from "@/components/songList.vue";

export default defineComponent({
  components: {
    vanNavBar: NavBar,
    vanTabs: Tabs,
    vanTab: Tab,
    IonPage,
    IonHeader,
    IonContent,
    songList,
  },
  setup() {
    //路由
    const router = useRouter();

    //返回
    const onClickLeft = () => {
      router.back();
    };

    //标签
    const tags = ref([]);

    //索引
    const active = ref("华语");

    //显示隐藏
    const show = ref(0);

    //tag标签
    const axios = async () => {
      const { tags: data } = await (
        await fetch("https://qcz1as.app.cloudendpoint.cn/playlist/hot")
      ).json();
      tags.value = data;
    };
    axios();

    //分页
    const page = ref(15);

    //滑动
    const box = ref();
    const clientHeight = document.body.clientHeight;
    let rect: any;

    //到底时加载
    const touchEnd = () => {
      rect = box.value.getBoundingClientRect();
      if (rect.top - 10 < clientHeight) {
        page.value += 15;
      }
    };

    //底部标识重新隐藏
    const clickFn = () => {
      show.value = 0;
    };

    return {
      tags,
      onClickLeft,
      active,
      page,
      touchEnd,
      box,
      show,
      clickFn,
    };
  },
});
</script>

<style scoped>
.van-nav-bar {
  --van-nav-bar-text-color: black;
  --van-nav-bar-icon-color: black;
}
.box {
  position: absolute;
  height: 10rem;
  width: 100%;
}
</style>
