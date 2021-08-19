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
            </ion-label>
        </ion-item>
        
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { IonAvatar,IonLabel,IonItem } from '@ionic/vue'

export default defineComponent({
    name: 'comment-card',
    props: {
        user:Object,
        content:String,
        time:Number,
        likedCount:Number,
    },
    components: {
        IonAvatar,
        IonLabel,
        IonItem
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
}
</style>