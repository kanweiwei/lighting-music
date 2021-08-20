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
                <van-sticky :offset-top="44">
                    <div id="comment-bar">
                        <div id="bar-title">评论区</div>
                        <div style="display:flex">
                            <div v-for="tab in tabs" 
                            :key="tab.value" class="tab" 
                            :class="tab.value == activeTab?'active':''"
                            @click="setTab(tab.value)">
                                {{tab.name}}
                            </div>
                        </div>               
                    </div>
                </van-sticky>
                <div v-for="comment in comments" :key="comment.commentId">
                    <comment-card 
                    :user="comment.user" 
                    :content="comment.content" 
                    :time="comment.time" 
                    :likedCount="comment.likedCount"
                    :showFloorComment="comment.showFloorComment"
                    :beReplied="comment.beReplied"
                    :showPopup="showPopup"
                    :commentId="comment.commentId"
                    ></comment-card>
                </div>               
            </van-list>
            <van-popup v-model:show="show" position="bottom" round>
                <div id="reply-floor">
                    《-回复
                </div>
            </van-popup>
        </ion-content>
    </ion-page>
</template>
<script>

import { defineComponent,ref } from "@vue/runtime-core";
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
            loading:false,
            activeTab:99,
            popupHeight:(document.body.clientHeight-64)+'rem',
            tabs:[
                {name:'推荐',value:99},
                {name:'最热',value:2},
                {name:'最新',value:3}
            ]
        }
    },
    setup() {
        const show = ref(false);
        const showPopup = (msg) => {
            console.log(msg)
            show.value = true;
        };
        return {
            show,
            showPopup,
        };
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
            this.getCommentData(typeNum,this.id,this.activeTab,this.pageNo,this.cursor)
        },
        setTab(value){
            this.activeTab=value
            this.comments=[]
            const typeNum=this.getTypeNum(this.type)
            this.pageNo=1
            this.getCommentData(typeNum,this.id,this.activeTab,this.pageNo,this.cursor)
        }
    },
    ionViewDidEnter(){
        this.id=this.$route.params.id
        this.type=this.$route.params.type
        const typeNum=this.getTypeNum(this.type)
        this.getCommentData(typeNum,this.id,this.activeTab,1,this.cursor)       
    }
})
</script>

<style>
#back-box {
    height: 64px;
}
#comment-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    line-height: 22px;
    padding: 0 14rem;
    background-color: rgb(250, 250, 250);
}
#bar-title {
    font-weight: bold;
}
.tab {
    color: gray;
    margin: 0 4rem;
}
.tab.active{
    color: black;
    font-weight: bold;
}
#reply-floor {
    height: v-bind(popupHeight);
    background-color: #fff;
}
</style>