<template>
  <ion-page>

    <ion-content scrollEvents @ionScroll='fn'>
      <ion-header>
        <van-nav-bar left-text="歌单广场" left-arrow @click-left="onClickLeft" />
      </ion-header>

      <van-tabs v-model:active="active">
        <van-tab v-for="tag in tags" :key="tag.playlistTag.id" :title="tag.playlistTag.name"
          :name="tag.playlistTag.name">
          <song-list mode="col" showHead="0" :tag="active" :num="page" @ok="show=1" ref="songList"></song-list>
        </van-tab>
      </van-tabs>

      <!-- 占位 -->
      <div class="box" ref="box"></div>

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

    //更新内容
    const songList = ref();

    //滑动
    const box = ref();

    //可见高
    const clientHeight = document.body.clientHeight;

    //元素属性
    let rect: any;

    //分页
    const page = ref(15);

    //防抖
    let timer: any = null;

    //回到顶部
    const showToTop = ref(false);

    //滚动函数
    const fn = (ev: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        rect = box.value.getBoundingClientRect();
        if (rect.top < clientHeight) {
          songList.value.loadedMore();
        }

        if (ev.detail.scrollTop > 100) {
          showToTop.value = true;
        } else {
          showToTop.value = false;
        }
      }, 500);
    };

    //tag标签
    const axios = async () => {
      const { tags: data } = await (
        await fetch("https://qcz1as.app.cloudendpoint.cn/playlist/hot")
      ).json();
      tags.value = data;
    };
    axios();

    return {
      tags,
      onClickLeft,
      active,
      page,
      box,
      show,
      songList,
      fn,
      showToTop,
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
  height: 10rem;
  width: 100%;
}
.toTop {
  position: fixed;
  bottom: 90rem;
  background-color: white;
  overflow: hidden;
  border-radius: 100%;
}
</style>
