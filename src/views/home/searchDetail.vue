<template>
  <ion-page>
    <ion-content>
      <ion-header>
        <van-nav-bar left-text="首页" left-arrow @click-left="onClickLeft" />
      </ion-header>

      {{kw}}
    </ion-content>
  </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { IonPage, IonContent, IonHeader } from "@ionic/vue";
import { NavBar } from "vant";

export default defineComponent({
  components: { IonPage, IonContent, vanNavBar: NavBar, IonHeader },
  setup() {
    // //路由
    const router = useRouter();
    const kw = router.currentRoute.value.params.kw;

    //返回上一个页面
    const onClickLeft = () => {
      router.back();
    };

    return {
      onClickLeft,
      kw,
    };
  },
});
</script>

<style scoped>
.van-nav-bar {
  --van-nav-bar-text-color: black;
  --van-nav-bar-icon-color: black;
}
</style>