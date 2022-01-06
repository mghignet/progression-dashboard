<template>
  <div class="timeline-container">
    <div class="timeline base">
      <Milestone
        text="+40% de chantiers monitorés dans Instala"
        :state="milestoneStateDone"
        class="timeline-milestone q1"
      />
      <Milestone
        text="+40% de chantiers monitorés dans Instala"
        :state="milestoneStateWarning"
        class="timeline-milestone q2"
      />
      <Milestone
        text="+40% de chantiers monitorés dans Instala"
        class="timeline-milestone q3"
      />
      <Milestone
        text="+40% de chantiers monitorés dans Instala"
        class="timeline-milestone q4"
      />
      <Period
        class="timeline-period q1"
        title="Q1"
        beginDate="01/01/2022"
        endDate="31/03/2022"
      />
      <Period
        class="timeline-period q2"
        title="Q2"
        beginDate="01/04/2022"
        endDate="30/06/2022"
      />
      <Period
        class="timeline-period q3"
        title="Q3"
        beginDate="01/07/2022"
        endDate="30/09/2022"
      />
      <Period
        class="timeline-period q4"
        title="Q4"
        beginDate="01/10/2022"
        endDate="31/12/2021"
      />
    </div>
    <div class="timeline passed">
      <div class="current-date">{{ currentDate }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Milestone, { MilestoneState } from "@/components/Milestone.vue";
import Period from "@/components/Period.vue";
import moment from "moment";

export default defineComponent({
  name: "Timeline",
  components: { Milestone, Period },
  data() {
    return {
      milestoneStateDone: MilestoneState.DONE,
      milestoneStateWarning: MilestoneState.WARNING,
      currentDate: moment().format("MM/DD/YYYY"),
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.timeline-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.timeline {
  height: 100px;
  width: 100%;
  position: absolute;
  box-sizing: border-box;

  &.base {
    width: 100%;
    left: 0;
    background: repeating-linear-gradient(
      -45deg,
      #fafafa,
      #fafafa 10px,
      #eee 10px,
      #eee 20px
    );
    border: 5px solid #eee;
  }
  &.passed {
    width: 50%;
    left: 0;
    height: 90px;
    background: repeating-linear-gradient(
      -45deg,
      #88cc88,
      #88cc88 10px,
      #55aa55 10px,
      #55aa55 20px
    );
    border-right: 8px solid #55aa55;
    box-sizing: border-box; // include the border inside the element to be more precise

    .current-date {
      position: absolute;
      top: -25px;
      left: calc(100% - 30px);
      font-weight: bold;
      font-size: 12px;
    }
  }
}

.timeline-milestone {
  position: absolute;
  bottom: 30%;
  z-index: 100;

  &.q0 {
    height: 190px;
    left: 1%;
  }
  &.q1 {
    height: 280px;
    left: 20%;
  }
  &.q2 {
    height: 190px;
    left: 40%;
  }
  &.q3 {
    height: 280px;
    left: 60%;
  }
  &.q4 {
    height: 190px;
    left: 80%;
  }
}

.timeline-period {
  background: repeating-linear-gradient(
    -45deg,
    #dceffe,
    #dceffe 3px,
    #fff 3px,
    #fff 6px
  );
  border: 2px solid #dceffe;
  position: absolute;
  bottom: -60px;

  &.q1 {
    width: calc(25% - 20px);
    margin: 10px;
  }

  &.q2 {
    width: calc(25% - 20px);
    margin: 10px;
    left: 25%;
  }

  &.q3 {
    width: calc(25% - 20px);
    margin: 10px;
    left: 50%;
  }

  &.q4 {
    width: calc(25% - 20px);
    margin: 10px;
    left: 75%;
  }
}
</style>
