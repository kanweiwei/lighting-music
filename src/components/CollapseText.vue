<!-- 省略文本组件，必要参数line，指定文本内容保留行数 -->
<template>
    <div id="text">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'collapse-text',
    props: {
        line: {
            type: Number,
            required: true
        }
    }
})
</script>

<style>
#text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: v-bind(line); 
    -webkit-box-orient: vertical;
}
</style>