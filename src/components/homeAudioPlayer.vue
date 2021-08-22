<template>
  <div
    class="home-audio-player"
    :class="{
      active: hasUrl,
    }"
  >
    <div>
      <img v-lazy="img" v-if="img" class="img" :class="{ active: playing }" />
    </div>
    <div>
      <div>{{ name }}</div>
      <div>{{ author }}</div>
    </div>
    <div>
      <van-icon
        name="play-circle-o"
        v-if="!playing && !loading"
        size="32px"
        @click="playAudio"
      />
      <van-loading v-if="loading" size="32" />

      <van-icon
        name="stop-circle-o"
        size="32px"
        v-if="playing && !loading"
        @click="stopAudio"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import axios from "axios";
import { Icon as VanIcon, Loading as VanLoading } from "vant";

export default defineComponent({
  props: {
    src: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
    },
  },
  components: {
    VanIcon,
    VanLoading,
  },
  computed: {
    hasUrl() {
      return this.src;
    },
  },
  watch: {
    src(newValue, oldValue) {
      console.log(newValue, oldValue);
      if (newValue !== oldValue) {
        if (!newValue) {
          console.log("newValue =>>", newValue);
          console.log("oldValue=>>", oldValue);
          //
          this.stopAudio();
        } else {
          this.stopAudio();
          this.initAudio(newValue);
        }
      }
    },
  },
  setup() {
    const playing = ref(false);
    const loading = ref(false);
    const AudioContext = window.AudioContext;
    const audioCtx = new AudioContext();

    const buffer = ref<AudioBuffer>();

    const audioBufferSourceNode = ref<AudioBufferSourceNode>();

    // 初始化音频并播放
    const initAudio = async (src: string) => {
      loading.value = true;
      playing.value = false;

      const res = await axios.get(src, {
        responseType: "arraybuffer",
      });
      loading.value = false;
      // 解码
      audioCtx.decodeAudioData(res.data, (buf) => {
        buffer.value = buf;
        audioBufferSourceNode.value = audioCtx.createBufferSource();
        audioBufferSourceNode.value.buffer = buf;
        audioBufferSourceNode.value.connect(audioCtx.destination);
        audioBufferSourceNode.value.start(0);
        playing.value = true;
        audioBufferSourceNode.value.addEventListener("ended", () => {
          loading.value = false;
        });
      });
    };
    // 停止播放
    const stopAudio = () => {
      if (audioBufferSourceNode.value) {
        audioBufferSourceNode.value.stop(0);
        playing.value = false;
      }
    };

    const playAudio = () => {
      if (audioBufferSourceNode.value) {
        audioBufferSourceNode.value.stop(0);
        audioBufferSourceNode.value = audioCtx.createBufferSource();
        if (buffer.value) {
          audioBufferSourceNode.value.buffer = buffer.value;
          const currentTime = audioCtx.currentTime;
          audioBufferSourceNode.value.connect(audioCtx.destination);
          audioBufferSourceNode.value.start(currentTime);
          playing.value = true;
        }
      }
    };

    const pause = () => {
      if (audioBufferSourceNode.value) {
        audioBufferSourceNode.value.stop(audioCtx.currentTime);
        playing.value = false;
      }
    };

    return {
      audioCtx,
      buffer,
      audioBufferSourceNode,
      initAudio,
      stopAudio,
      pause,
      playing,
      playAudio,
      loading,
    };
  },
  methods: {},
});
</script>

<style lang="less" >
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.home-audio-player {
  position: fixed;
  width: 90vw;
  height: 80px;
  background: #000;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 13px;
  display: none;
  left: 5vw;
  bottom: 15px;
  z-index: 10;
  box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.5);
  color: #fff;
  font-size: 14px;
  &.active {
    display: flex;
  }

  img {
    width: 51px;
    height: 51px;
    border: 1px solid #979797;
    border-radius: 50%;
    &.active {
      animation: spin 2s linear infinite;
    }
  }
}
</style>