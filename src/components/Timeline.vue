<template>
  <div class="timeline-container">
    <div class="timeline base">
      <div class="begin-date">{{ formatDate(beginDate) }}</div>
      <div class="end-date">{{ formatDate(endDate) }}</div>
      <Milestone
        v-for="milestone in milestones"
        :key="milestone.id"
        :text="milestone.text"
        :state="milestone.state"
        class="timeline-milestone"
        :style="{ left: getPositionFromDate(milestone.date) }"
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
        endDate="31/12/2022"
      />
    </div>
    <div
      class="timeline passed"
      :style="{ '--progress': getPositionFromDate(currentDate) }"
    >
      <div class="current-date">{{ formatDate(currentDate) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Milestone from "@/components/Milestone.vue";
import Period from "@/components/Period.vue";
import moment from "moment";
import { MilestoneState, MilestoneModel } from "@/model/Milestone";

export default defineComponent({
  name: "Timeline",
  components: { Milestone, Period },
  props: {
    beginDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    currentDate: { type: Date, required: true },
  },
  data() {
    return {
      milestoneStateDone: MilestoneState.DONE,
      milestoneStateWarning: MilestoneState.WARNING,
      milestones: [] as MilestoneModel[],
    };
  },
  mounted() {
    this.milestones.push({
      id: "1",
      text: "Odin est décommissionné",
      state: MilestoneState.WARNING,
      date: new Date("02/28/2022"),
    });
    this.milestones.push({
      id: "2",
      text: "Moins de 10% de RTs annulés",
      state: MilestoneState.DONE,
      date: new Date("05/19/2022"),
    });
    this.milestones.push({
      id: "3",
      text: "+40% de forfaits dans Instala",
      date: new Date("10/03/2022"),
    });
  },
  methods: {
    formatDate(date: Date): string {
      return moment(date).format("DD/MM/YYYY");
    },
    getNumberOfDaysBetweenDates(begin: Date, end: Date) {
      console.log(begin, end);
      return moment(end).diff(moment(begin), "days") + 1;
    },
    getPositionFromDate(date: Date): string {
      const totalDays = this.getNumberOfDaysBetweenDates(
        this.beginDate,
        this.endDate
      );
      const daysElapsed = this.getNumberOfDaysBetweenDates(
        this.beginDate,
        date
      );
      return `${Math.max(
        0,
        Math.min(100, Math.round((daysElapsed / totalDays) * 100))
      )}%`;
    },
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
    left: 0;
    height: 90px;
    animation: animatedProgress 1.5s ease;
    width: var(--progress);
    background: #55aa5599;
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

@keyframes animatedProgress {
  0% {
    width: 0;
  }
  100% {
    width: var(--progress);
  }
}

.begin-date,
.end-date {
  position: absolute;
  font-size: 12px;
  font-weight: bold;
  top: -25px;
}
.begin-date {
  left: 5px;
}
.end-date {
  right: 5px;
}

.timeline-milestone {
  position: absolute;
  bottom: 30%;
  z-index: 100;
  height: 190px;

  &:nth-child(2n) {
    height: 280px;
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
