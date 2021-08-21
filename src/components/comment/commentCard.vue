<template>
    <div>
        <ion-item id="comment">
            <ion-avatar slot="start">
                <img :src="user.avatarUrl" alt="头像">
            </ion-avatar>
            <ion-label class="ion-text-wrap">
                <div id="commment-header">
                    <div>
                        <h4>{{user.nickname}}</h4>
                        <p id="time-string">{{localTime}}</p>
                    </div>
                    <p id="like-count">{{likedCount}}赞</p>                   
                </div>
                <p id="content">{{content}}</p>
                <p v-if="showFloorComment && showFloorComment.replyCount>0">
                    <ion-text color="primary" @click="showPopup(commentId)">{{showFloorComment.replyCount}}条回复></ion-text>
                </p>
                <p id="reply" v-if="beReplied!= null">
                    <ion-text color="primary">@{{beReplied[0].user.nickname}}</ion-text>
                    :{{beReplied[0].content?beReplied[0].content:'该评论已删除'}}
                </p>
            </ion-label>
        </ion-item>        
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { IonAvatar,IonLabel,IonItem,IonText } from '@ionic/vue'

export default defineComponent({
    name: 'comment-card',
    props: {
        user:Object,
        content:String,
        time:Number,
        likedCount:Number,
        showFloorComment:Object,
        beReplied:Object,
        showPopup:Function,
        commentId:Number
    },
    components: {
        IonAvatar,
        IonLabel,
        IonItem,
        IonText
    },
    computed: {
        localTime(){
            const commentDate=new Date(this.time)
            const thisYear=new Date().getFullYear()
            let format=commentDate.toLocaleString().split(" ")[0].split("/")
            if(format[0].valueOf() != thisYear){
                format=format[0]+"年"+format[1]+"月"+format[2]+"日"
            }else {
                format=format[1]+"月"+format[2]+"日"
            }
            return format
        }
    }
})
</script>

<style>

#commment-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
#time-string {
    color: rgb(182, 182, 182);
    font-size: 12px;
}
#content {
    margin-top: 12rem;
    color: black;
    font-size: 14px;
}
#like-count {
    color: rgb(182, 182, 182);
}
#comment {
    align-items:flex-start;
    background-color: rgb(250, 250, 250);
}
#reply {
    padding-left: 8rem;
    line-height: 24px;
    border-left: 1rem solid gray;
    font-size: 12px;
}
</style>