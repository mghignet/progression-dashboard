<template>
  <div class="dashboard-container">
    <div class="dashboard-year">Année 2022</div>
    <Timeline />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timeline from "@/components/Timeline.vue";

export default defineComponent({
  name: "DashboardView",
  components: { Timeline },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dashboard-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.dashboard-year {
  font-size: 36px;
  font-weight: bold;
  position: absolute;
  left: 30px;
  top: 30px;
}
</style>
