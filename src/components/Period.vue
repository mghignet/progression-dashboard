<template>
  <div class="period-container">
    <div class="title">{{ title }}</div>
    <div class="begin-date">{{ formatDate(beginDate) }}</div>
    <div class="end-date">{{ formatDate(endDate) }}</div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from "@/utils/date-utils";

defineProps<{
  title: string;
  beginDate: Date;
  endDate: Date;
}>();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.period-container {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.title {
  font-size: 16px;
  font-weight: bold;
}
.begin-date,
.end-date {
  position: absolute;
  font-weight: bold;
  font-size: 12px;
  bottom: -20px;
}
.begin-date {
  left: 0;
}
.end-date {
  right: 0;
}
</style>
