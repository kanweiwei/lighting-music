<template>
  <ion-grid class="audioGrid">
    <ion-row class="audioRow">
      <ion-col class="audioColImg" size="1">封面</ion-col>
      <ion-col class="audioColInfo" size="9">
        <span class="title">方圆几公里</span>
        <span>-</span>
        <span class="avatar">薛之谦</span>
      </ion-col>
      <ion-col class="audioColplay" size="1">按钮</ion-col>
      <ion-col class="audioColList" size="1">列表</ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang=ts>
import { defineComponent } from "vue";

import { IonGrid, IonCol, IonRow } from "@ionic/vue";

export default defineComponent({
  components: {
    IonGrid,
    IonCol,
    IonRow,
  },
});
</script>

<style scoped>
.audioGrid {
  background: white;
  width: 100%;
}
.audioRow {
}
.audioCol {
}
</style>