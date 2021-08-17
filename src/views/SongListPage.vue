<template>
  <ion-page>
      <ion-header>
          <ion-toolbar>
              <ion-buttons slot="start">
                  <ion-back-button default-href="/"></ion-back-button>
              </ion-buttons>
              <ion-title>歌单</ion-title>
          </ion-toolbar>
      </ion-header>
      <ion-content fullscreen>
          <song-list-info-card coverUrl='http://p3.music.126.net/fob5pHV3xzGlJ_-KEeLFLg==/109951165693966983.jpg?param=200y200'></song-list-info-card>
      </ion-content>
  </ion-page>
</template>

<script lang="ts">
import SongListInfoCard from '@/components/SongList/SongListInfoCard.vue';
import { IonPage,IonHeader,IonToolbar,IonButtons,IonBackButton,IonTitle,IonContent } from '@ionic/vue'
import { defineComponent } from "vue";

export default defineComponent({
    name: 'song-list',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonContent,
        SongListInfoCard
    }
    
})
</script>

<style>

</style>