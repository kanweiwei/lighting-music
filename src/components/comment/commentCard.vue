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
                <p id="content" v-html="convert2EmtString(content)"></p>
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
import Emt from '@/assets/netease-emoji/emt_dict.json'

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
        },
        convert2EmtString() {
            return (str) => {
                let result = str
                const emt = str.match(/\[([\u4e00-\u9fa50-9]*)\]/g)
                if(emt && emt.length>0){
                    Array.from(emt).forEach(val => {
                        //console.log(str,val)
                        const target=val.replace('[','').replace(']','')
                        const emoji = Emt[target]
                        if(emoji)
                            result = result.replace(val,emoji)
                    })                    
                }
                
                return result
            }
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