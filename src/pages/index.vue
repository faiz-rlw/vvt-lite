<script setup lang="ts">
import http from "~/api";
onMounted(() => {
    http.login({ id: 1 });
});
</script>

<template></template>

<route lang="yaml">
{ meta: { layout: "default" } }
</route>
