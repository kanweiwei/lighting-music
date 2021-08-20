<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button  default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>评论({{this.totalCount}})</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getMoreComment"
            style="height:100%;width:100%;overflow-y:auto;"
            >
                <div v-for="comment in comments" :key="comment.commentId">
                    <comment-card 
                    :user="comment.user" 
                    :content="comment.content" 
                    :time="comment.time" 
                    :likedCount="comment.likedCount"></comment-card>
                </div>               
            </van-list>
        </ion-content>
    </ion-page>
</template>
<script>

import { defineComponent } from "@vue/runtime-core";
import { IonPage,IonHeader,IonButtons,IonTitle,IonBackButton,IonToolbar,IonContent } from '@ionic/vue'
import http from "@/utils/http";
import CommentCard from "@/components/comment/commentCard.vue";

export default defineComponent({
    name: 'comment',
    components: {
        IonPage,
        IonHeader,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonToolbar,
        IonContent,
        CommentCard
    },
    data(){
        return {
            id:0,
            type:'unk',
            comments:[],
            totalCount:0,
            sortType: 1,
            pageNo:1,
            cursor:'0',
            finished:false,
            loading:false
        }
    },
    methods: {
        getTypeNum(type){
            switch(type){
                case 'music':
                    return 0
                case 'playlist':
                    return 2
                default:
                    throw "invalid path value"
            }
        },
        getCommentData(type,id,sortType,pageNo,cursor){
            http.get('/comment/new',{
                params: {
                    type,
                    id,
                    sortType,
                    pageNo,
                    cursor
                }
            }).then(res=>res.data)
            .then(data=>{
                this.comments.push(...data.comments)
                this.finished=!data.hasMore
                this.cursor=data.cursor
                this.totalCount=data.totalCount
                this.loading=false
            }).catch(err=>console(err))           
        },
        getMoreComment(){
            const typeNum=this.getTypeNum(this.type)
            this.pageNo+=1
            this.getCommentData(typeNum,this.id,2,this.pageNo)
        }
    },
    ionViewDidEnter(){
        this.id=this.$route.params.id
        this.type=this.$route.params.type
        const typeNum=this.getTypeNum(this.type)
        this.getCommentData(typeNum,this.id,2,1)
    }
})
</script>

<style>

</style>