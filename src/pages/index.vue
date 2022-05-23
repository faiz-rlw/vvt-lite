<script setup lang="ts">
import toast from "~/plugin/toast/index";
const toastFun = () => {
    toast.message("success!!!");
};
</script>

<template>
    <a-button @click="toastFun">toast</a-button>
</template>

<route lang="yaml">
{ meta: { layout: "default" } }
</route>
