<template>
  <div class="container">
    <van-search v-model="value" type="text" input-align="center" placeholder="请输入搜索关键词" @search="onSearch" />
  </div>
</template>

<script lang='ts'>
import { Search } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    VanSearch: Search,
  },
  setup() {
    //搜索值
    const value = ref("");

    //路由
    const router = useRouter();

    const onSearch = () => {
      router.push({
        name: "searchDetail",
        params: { kw: value.value },
      });
    };
    return {
      value,
      onSearch,
    };
  },
});
</script>

<style scoped>
</style>