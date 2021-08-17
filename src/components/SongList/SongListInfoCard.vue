<template>
  <ion-content>
      <ion-thumbnail>
          <img :src='coverUrl'>
      </ion-thumbnail>
      
      标题、作者、创建时间、表述
  </ion-content>
</template>

<script>
import { IonContent,IonThumbnail } from '@ionic/vue'
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'song-list-info-card',
    components: {
        IonContent,
        IonThumbnail
    },
    props: {
        coverUrl:String
    }
})
</script>
<style lang="less">
ion-thumbnail {
    width: 150px;
    height: 150px;
    img {
        border-radius: 30px;
    }        
}
</style>