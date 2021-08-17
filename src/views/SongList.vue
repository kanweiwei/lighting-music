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
  </ion-page>
</template>

<script lang="ts">
import { IonPage,IonHeader,IonToolbar,IonButtons,IonBackButton,IonTitle } from '@ionic/vue'
import { defineComponent } from "vue";

export default defineComponent({
    name: 'song-list',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle
    }
    
})
</script>

<style>

</style>