<script setup lang="ts">
import alert from "~/plugin/alert";
const onclick = ()=>{
    alert("131")
}
</script>

<template>
    <div class="text-70px">nihao</div>
    <a-button @click="onclick">123122</a-button>
</template>

<route lang="yaml">
{ meta: { layout: "default" } }
</route>
