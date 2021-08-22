<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{this.$route.query.q}}</h2>
      <span class="sub-title">找到{{this.count}}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item,index) in lists" :key="index" @dblclick="playMusic(item.id)">
              <td>{{index + 1}}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span class="iconfont icon-mv" v-if="item.mvid != 0" ></span>
                  </div>
                  <span v-if="item.alias.length != 0">{{item.alias[0]}}</span>
                </div>
              </td>
              <td >
                {{item.artists[0].name}}
              </td>
              <td>{{item.album.name}}</td>
              <td>{{item.duration}}</td>
            </tr>
           

          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists" > 
        <div class="items">
          <div class="item" v-for="(item,index) in playlists" :key="index" @click="toPlaylist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount}}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
       
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item,index) in mv" :key="index" @click="toMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount}}</div>
              </div>
              <span class="time">{{item.duration}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
          
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'result',
  data() {
    return {
      activeIndex: 'songs',
      limit: 10,
      type: 1,
      page: 1,
      lists: [],
      count: '',
      playlists: [],
      mv: []
      
      
 
    };
  },
  watch: {
activeIndex(){
  //songs 歌曲
  //lists 歌单
  //mv mv
  // let type = 1;
  switch(this.activeIndex){
    case 'songs': this.type = 1; this.limit= 10
      break;
       case 'lists': this.type = 1000;this.limit= 10
      break;
       case 'mv': this.type = 1004; this.limit = 8
      break;
      default:
        break;
        }
         axios({
      url: 'https://autumnfish.cn/search',
      method: 'get',
      params: {
        keywords: this.$route.query.q,
        limit: this.limit,
        type: this.type,
        offset: (this.page - 1) * this.limit
      }
    }) .then(res=>{
      // console.log(res);
      // console.log(this.type);
         if(this.type == 1){
          
    axios({//歌曲
      url: 'https://autumnfish.cn/search',
      method: 'get',
      params: {
        keywords: this.$route.query.q,
        limit: this.limit,
        type: this.type,
        offset: (this.page - 1) * this.limit
      }
    }) .then(res=>{
      console.log(res);
      this.lists = res.data.result.songs
      this.count = res.data.result.songCount
      for(let i = 0 ; i < this.lists.length;i++) {
        const  duration = this.lists[i].duration;
         let min =  parseInt( duration / 1000 / 60);
         if(min < 10) {
           min = '0' + min
         }
         let sec = parseInt( duration / 1000 % 60);
         if(sec < 10) {
           sec = '0' + sec
         }
         this.lists[i].duration = min + ':' + sec 
      }
    })
        }
        else if (this.type == 1000){
          //歌单
          this.playlists = res.data.result.playlists;
          this.count = res.data.result.playlistCount;
          for(let i = 0 ; i < this.playlists.length; i++){
            if(this.playlists[i].playCount > 100000) {
              this.playlists[i].playCount =parseInt( this.playlists[i].playCount / 10000) + '万'
            }
          }
        }
        else{
          this.mv = res.data.result.mvs;
          this.count = res.data.result.mvCount;
          for (let i = 0; i < this.mv.length; i++) {
            let min = parseInt(this.mv[i].duration / 1000 / 60)
            let sec = parseInt(this.mv[i].duration / 1000 % 60)
            if(min < 10) {
              min = '0' + min
            }
            if(sec < 10) {
              sec = '0' + sec
            }
            this.mv[i].duration = min + ':' +sec
            //播放次数
            if(this.mv[i].playCount>100000){
              this.mv.playCount = parseInt(this.mv.playCount / 10000) + '万'
            }
            
            
          }
        } 
        
      
    })
     
        
    
  }
}
  ,
  methods: {
    toMv(id){
      this.$router.push('/mv?q=' + id)
    },
    toPlaylist(id){
      this.$router.push('/playlist?q=' + id)
      
    },
    playMusic(id){
      axios({
        url: "https://autumnfish.cn/song/url",
        method: 'get',
        params: {
          id
        }
      }) .then (res=>{
         const url = res.data.data[0].url
      this.$parent.musicUrl = url;
      })
    }
  },
  created(){
    axios({
      url: 'https://autumnfish.cn/search',
      method: 'get',
      params: {
        keywords: this.$route.query.q,
        limit: this.limit,
        type: this.type,
        offset: (this.page - 1) * this.limit
      }
    }) .then(res=>{
      // console.log(res);
      this.lists = res.data.result.songs
      this.count = res.data.result.songCount
      for(let i = 0 ; i < this.lists.length;i++) {
        const  duration = this.lists[i].duration;
         let min =  parseInt( duration / 1000 / 60);
         if(min < 10) {
           min = '0' + min
         }
         let sec = parseInt( duration / 1000 % 60);
         if(sec < 10) {
           sec = '0' + sec
         }
         this.lists[i].duration = min + ':' + sec 
      }
    })
  }
};
</script>

<style >
</style>

<!--  
<template>
  <ion-page>
    <ion-content>
      <ion-header>
        <van-nav-bar left-text="首页" left-arrow @click-left="onClickLeft" />
      </ion-header>

      {{kw}}
    </ion-content>
  </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { IonPage, IonContent, IonHeader } from "@ionic/vue";
import { NavBar } from "vant";

export default defineComponent({
  components: { IonPage, IonContent, vanNavBar: NavBar, IonHeader },
  setup() {
    // //路由
    const router = useRouter();
    const kw = router.currentRoute.value.params.kw;

    //返回上一个页面
    const onClickLeft = () => {
      router.back();
    };

    return {
      onClickLeft,
      kw,
    };
  },
});
</script>

<style scoped>
.van-nav-bar {
  --van-nav-bar-text-color: black;
  --van-nav-bar-icon-color: black;
}
</style> 
-->