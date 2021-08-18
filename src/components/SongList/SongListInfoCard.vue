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
                    <collapse-text :line="2">{{title}}</collapse-text>
                </ion-row>
                <ion-row>
                    {{userName}}
                </ion-row>
                <ion-row>{{dateString}} 创建</ion-row>
                <ion-row id="description">
                    <collapse-text :line="1">{{description}}</collapse-text>
                </ion-row>
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
        coverUrl:String,
        title:String,
        userName:String,
        description:String,
        createDate: String
    },
    computed: {
        dateString(){
            if(typeof this.createDate === "string"){
                //时间戳只支持数字
                const vaildValue=parseInt(this.createDate)
                const date=new Date(vaildValue)
                //整理格式YYYY-MM-DD
                const format=date.toLocaleString().split(" ")[0].split("/")
                            .map(val=>val.length==1?"0"+val:val) //补0
                            .join("-")                
                return format
            }else{
                return 'unknown'
            }    
        }
    }
})
</script>
<style lang="less">
#infos {
    position: relative;
    font-size: 16px;
    color: gray;
    #title {
        font-size: 18px;
        color: black;
        margin-bottom: 8rem;
    }
    #description {
        position: absolute;
        bottom: 4rem;
    }
}

ion-thumbnail {
    --size: 150rem;
    --border-radius: 30rem;
}
</style>