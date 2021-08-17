<template>
    <ion-grid>
        <ion-row>
            <ion-col>
                <ion-thumbnail>
                    <img :src='coverUrl' alt="歌单封面">
                </ion-thumbnail>
            </ion-col>
            <ion-col id="infos">
                <ion-row id="title">
                    <collapse-text :line="2">标题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题</collapse-text>
                </ion-row>
                <ion-row>作者</ion-row>
                <ion-row>创建时间</ion-row>
                <ion-row id="description">歌单描述</ion-row>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts">
import { IonThumbnail,IonGrid,IonCol,IonRow } from '@ionic/vue'
import { defineComponent } from "@vue/runtime-core";
import CollapseText from './CollapseText.vue';

export default defineComponent({
    name: 'song-list-info-card',
    components: {
        IonThumbnail,
        IonGrid,
        IonRow,
        IonCol,
        CollapseText
    },
    props: {
        coverUrl:String
    }
})
</script>
<style lang="less">
#infos {
    position: relative;
    #description {
        position: absolute;
        bottom: 5rem;
    }
}

ion-thumbnail {
    --size: 150rem;
    --border-radius: 30rem;
}
</style>