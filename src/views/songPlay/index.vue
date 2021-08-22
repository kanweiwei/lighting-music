<template>
  <ion-page>
    <safe-area />
    <nav-bar title="音乐播放" left-arrow @click-left="router.back" />
    <ion-content>
      <div class="pic" :class="{ active: playing }">
        <van-image :src="info.picUrl" />
      </div>
      <div class="song-name">{{ info.name }}</div>
      <div class="song-author">{{ info.author }}</div>
      <audio
        :src="url"
        ref="audio"
        @timeupdate="timeUpdate"
        @canplay="audioCanplayCallback"
      ></audio>

      <div class="song-controls">
        <div class="audio-time">
          <span>{{ toTime(currentTime) }}</span>
          <span>{{ toTime(totalTime) }}</span>
        </div>
        <div class="audio-slider">
          <van-slider v-model="percent" @change="onChange" />
        </div>

        <van-icon
          name="play-circle"
          size="70px"
          v-if="!playing"
          @click="play"
        />
        <van-icon
          name="pause-circle"
          size="70px"
          v-if="playing"
          @click="pause"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import {
  NavBar,
  Image as VanImage,
  Icon as VanIcon,
  Slider as VanSlider,
} from "vant";
import SongService from "@/services/song.service.js";
import { onMounted, ref } from "vue";
export default {
  components: {
    IonPage,
    IonContent,
    NavBar,
    VanImage,
    VanIcon,
    VanSlider,
  },
  setup() {
    const router = useRouter();
    const url = ref("");
    const songId = ref(router.currentRoute.value.params.id);
    const info = ref(router.currentRoute.value.query);

    const currentTime = ref(0);
    const totalTime = ref(0);
    const percent = ref(0);
    const playing = ref(false);

    const getSongUrl = async (id) => {
      const res = await SongService.getUrl(id);
      if (res.code === 200 && res.data.length) {
        url.value = res.data[0].url;
        console.log(url.value);
      }
    };

    onMounted(() => {
      getSongUrl(songId.value);
    });

    return {
      router,
      getSongUrl,
      songId,
      info,
      url,
      currentTime,
      totalTime,
      percent,
      playing,
    };
  },
  methods: {
    audioCanplayCallback() {
      this.totalTime = this.$refs.audio.duration;
    },
    play() {
      this.$refs.audio.play();
      this.playing = true;
    },
    pause() {
      this.$refs.audio.pause();
      this.playing = false;
    },
    timeUpdate(e) {
      if (!this.$refs.audio) return;
      this.currentTime = parseInt(this.$refs.audio.currentTime);
      if (this.totalTime == 0) {
        this.percent = 0;
      } else {
        this.percent = Math.floor((this.currentTime / this.totalTime) * 100);
      }
    },
    toTime(sec) {
      //秒数转化为mm:ss形式
      const s = sec % 60 < 10 ? "0" + parseInt(sec % 60) : parseInt(sec % 60);
      const min =
        Math.floor(sec / 60) < 10
          ? "0" + Math.floor(sec / 60)
          : Math.floor(sec / 60);
      return min + ":" + s;
    },
    onChange(value) {
      this.percent = value;
      this.currentTime = (parseInt(this.totalTime) * value) / 100;
      this.$refs.audio.currentTime = (parseInt(this.totalTime) * value) / 100;
    },
  },
};
</script>

<style scoped lang="less">
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.pic {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin: 40px auto 0;
  box-shadow: 0 2px 4px #ccc;
  &:after {
    position: absolute;
    display: block;
    content: "";
    width: 50px;
    height: 50px;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    box-shadow: 0 -2px 4px #000;
  }
  &.active {
    animation: spin 2s linear infinite;
  }
}
.song-name {
  font-size: 28px;
  text-align: center;
  margin-top: 20px;
}
.song-author {
  font-size: 22px;
  text-align: center;
  margin-top: 10px;
}
.song-controls {
  width: 100%;
  position: fixed;
  bottom: 40px;
  left: 0;
  text-align: center;
}
.audio-time {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 12px;
}
.audio-slider {
  margin: 20px 20px;
}
</style>