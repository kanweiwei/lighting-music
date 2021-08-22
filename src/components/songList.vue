<template>
  <ion-grid>
    <ion-row v-if="showHead==='1'">
      <!-- 非主流名字 -->
      <ion-col size="9">
        <span class="title">{{title}}</span>
      </ion-col>
      <!-- 更多按钮 -->
      <ion-col size="3" class="more-box">
        <span class="more" @click="more">更多&gt;</span>
      </ion-col>
    </ion-row>
    <ion-row v-if="mode==='row'" class="sliderRow" :style="{left:move+'px'}" @touchstart="touchStart"
      @touchmove="touchMove" @touchend="touchEnd">
      <ion-col class="sliderCol " size="3.8" v-for="item in data" :key="item.id" @click="fn(item.id)">
        <!-- 图片 -->
        <ion-img class="img bd" :src="item.coverImgUrl"></ion-img>
        <!-- 描述 -->
        <span class="name">
          {{strFilter(item.name)}}
          <span class="hid" v-if="item.name.length>17">
            <van-icon name="ellipsis" />
          </span>
        </span>
        <!-- 播放量 -->
        <span class="playCount">
          <i class="playoutline"></i>
          <div>{{countFilter(item.playCount)}}</div>
        </span>
      </ion-col>
    </ion-row>
    <ion-row v-else class="row">
      <ion-col class="col " size="4" v-for="item in data" :key="item.id" @click="fn(item.id)">
        <!-- 图片 -->
        <ion-img class="img bd" :src="item.picUrl?item.picUrl:item.coverImgUrl"></ion-img>
        <!-- 描述 -->
        <span class="name">
          {{strFilter(item.name)}}
          <span class="hid" v-if="item.name.length>17">
            <van-icon name="ellipsis" />
          </span>
        </span>
        <!-- 播放量 -->
        <span class="playCount">
          <i class="playoutline"></i>
          <div>{{countFilter(item.playCount)}}</div>
        </span>
      </ion-col>
    </ion-row>
  </ion-grid>

  <!-- 占位 -->
  <div class="box" :style="{'text-align':'center', 'opacity':show}">没有更多歌单了哦...</div>

</template>

<script lang='ts'>
import { IonGrid, IonRow, IonCol, IonImg } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { countFilter } from "@/utils/commont";
import { Icon } from "vant";

export default defineComponent({
  components: { IonGrid, IonRow, IonCol, IonImg, vanIcon: Icon },
  emits: ["ok"],
  props: {
    //标题
    title: {
      type: String,
      default: "精品歌单",
    },
    //歌曲类型
    tag: {
      type: String,
      default: "全部",
    },
    //模式，横向row，竖向col
    mode: {
      type: String,
      default: "row",
    },
    //竖向时才能调整显示条数
    num: {
      type: Number,
      default: 6,
    },
    //歌单类别  good精品  recommend推荐
    type: {
      type: String,
      default: "good",
    },
    showHead: {
      type: String,
      default: "1",
    },
  },
  setup(props) {
    //横向滑动独有配置
    let disX = 0; //鼠标点击时x轴坐标

    const move = ref(0); //最后偏移量

    let end = 0; //当前偏移量，避免第二次点击时，重回原位

    function touchStart(ev: TouchEvent) {
      //鼠标点击
      disX = ev.targetTouches[0].clientX;
    }

    function touchMove(ev: TouchEvent) {
      //鼠标移动
      if (move.value <= 0) {
        move.value = end + ev.targetTouches[0].clientX - disX;
      }

      if (move.value > 0) {
        //右滑限制
        move.value = 0;
      }

      const dom = -document.documentElement.clientWidth + 40; //左滑限制
      if (move.value < dom) {
        move.value = dom;
      }
    }

    function touchEnd() {
      //鼠标抬起
      end = move.value;
    }

    // --------------------------------------------------
    // --------------------------------------------------
    // --------------------------------------------------
    // --------------------------------------------------
    // --------------------------------------------------

    //公用配置
    const data: any = ref([]); //数据

    const router = useRouter(); //路由

    const num = ref(props.num); //加载数据

    let n = 1; //分割数据

    let total = 0; //总数

    let timer = false; //节流

    const show = ref(0); //底部显示隐藏

    let url = ""; //地址

    if (props.mode === "row" && props.num !== 6) {
      throw new Error("横向滑动暂支持六张照片");
    }

    //获取数据
    const axios = async () => {
      if (props.type === "good") {
        //判断地址
        url = `https://qcz1as.app.cloudendpoint.cn/top/playlist/highquality?limit=${num.value}&cat=${props.tag}`;
      } else if (props.type === "recommend") {
        url = `https://qcz1as.app.cloudendpoint.cn/personalized?limit=${num.value}`;
      }

      if (props.type === "good") {
        const result = await (await fetch(url)).json();
        total = result.total;
        data.value = [
          ...data.value,
          ...result.playlists.slice((n - 1) * 15, n * 15),
        ];
      } else if (props.type === "recommend") {
        const { result } = await (await fetch(url)).json();
        data.value = result;
      }
    };
    axios();

    //点击封面，跳转歌单详情
    const fn = (id: string) => {
      router.push({
        name: "songListDetail",
        params: { id },
      });
    };

    //过滤字数
    const strFilter = (str: string) => {
      if (str.length > 17) {
        str = str.substring(0, 16);
      }

      return str;
    };

    //跳转更多
    const more = () => {
      router.push({
        name: "songListAll",
      });
    };

    //加载更多
    const loadedMore = () => {
      if (!timer) {
        timer = true;
        if (data.value.length < total) {
          n++;
          num.value += 15;
          axios();
        } else {
          show.value = 1;
        }
        timer = false;
      }
    };

    return {
      touchStart,
      touchMove,
      touchEnd,
      move,
      data,
      fn,
      countFilter,
      strFilter,
      more,
      loadedMore,
      show,
    };
  },
});
</script>

<style scoped lang='less'>
ion-grid {
  border-radius: 4%;
  background: rgb(255, 254, 254);
}

.title {
  font-size: 18rem;
  font-weight: bold;
}
.more-box {
  text-align: end;
}
.bd {
  box-shadow: 0 -3rem 1rem rgb(219, 219, 219);
}

.col {
  margin-bottom: 5rem;
}
.more {
  display: inline-block;
  width: 50rem;
  font-size: 5rem;
  border: 2rem solid rgb(230, 229, 229);
  text-align: center;
  border-radius: 30rem;
  line-height: 20rem;
  background-color: white;
  font-weight: 600;
}
.sliderRow {
  display: flex;
  flex-flow: nowrap;
  position: relative;
}
.img {
  border-radius: 10rem;
  overflow: hidden;
}

.name {
  display: inline-block;
  font-size: 12rem;
  height: 33rem;
  overflow: hidden;
}
.hid {
  // position: absolute;
  // right: 10rem;
  // bottom: -5rem;
  position: relative;
  display: inline-block;
  bottom: -5rem;
  // z-index: 2;
  font-size: 15rem;
}

.playCount {
  display: flex;
  align-items: center;
  position: absolute;
  top: 5%;
  right: 1%;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  line-height: 20rem;
  border-radius: 10rem;
  padding: 0 8rem;
  transform: scale(0.8);
}
.playCount .playoutline {
  width: 0rem;
  height: 0rem;
  border-width: 6rem;
  border-color: transparent transparent transparent white;
  border-style: solid;
}
.box {
  height: 10rem;
  width: 100%;
}
</style>
