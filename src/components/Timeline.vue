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
        :style="{ left: getLeftPositionFromDate(milestone.date) }"
      />
      <Period
        v-for="period in periods"
        :key="period.id"
        class="timeline-period"
        :title="period.text"
        :beginDate="period.beginDate"
        :endDate="period.endDate"
        :style="{
          '--left': getLeftPositionFromDate(period.beginDate),
          '--right': getRightPositionFromDate(period.endDate),
        }"
      />
    </div>
    <div
      class="timeline passed"
      :style="{ '--progress': getLeftPositionFromDate(currentDate) }"
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
import { MilestoneModel } from "@/model/Milestone";
import { PeriodModel } from "@/model/Period";
import { formatDate } from "@/utils/date-utils";

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
      periods: [] as PeriodModel[],
    };
  },
  mounted() {
    this.milestones.push({
      id: "1",
      text: "Odin est décommissionné",
      state: MilestoneState.WARNING,
      date: new Date("03/31/2022"),
    });
    this.milestones.push({
      id: "2",
      text: "Moins de 10% de RTs annulés",
      state: MilestoneState.DONE,
      date: new Date("06/30/2022"),
    });
    this.milestones.push({
      id: "3",
      text: "+40% de forfaits dans Instala",
      date: new Date("09/30/2022"),
    });
    this.periods.push({
      id: "1",
      text: "Q1",
      beginDate: new Date("01/01/2022"),
      endDate: new Date("03/31/2022"),
    });
    this.periods.push({
      id: "2",
      text: "Q2",
      beginDate: new Date("04/01/2022"),
      endDate: new Date("06/30/2022"),
    });
    this.periods.push({
      id: "3",
      text: "Q3",
      beginDate: new Date("07/01/2022"),
      endDate: new Date("09/30/2022"),
    });
    this.periods.push({
      id: "4",
      text: "Q4",
      beginDate: new Date("10/01/2022"),
      endDate: new Date("12/31/2022"),
    });
  },
  computed: {
    numberOfDaysForTimeline: function () {
      return this.getNumberOfDaysBetweenDates(this.beginDate, this.endDate);
    },
  },
  methods: {
    formatDate,
    getNumberOfDaysBetweenDates(begin: Date, end: Date): number {
      return Math.max(0, moment(end).diff(moment(begin), "days") + 1);
    },
    getLeftPositionFromDate(date: Date): string {
      const daysElapsed = this.getNumberOfDaysBetweenDates(
        this.beginDate,
        date
      );
      return `${Math.min(
        100,
        (daysElapsed / this.numberOfDaysForTimeline) * 100
      )}%`;
    },
    getRightPositionFromDate(date: Date): string {
      const daysToGo = this.getNumberOfDaysBetweenDates(
        date,
        this.timeline.endDate
      );
      return `${Math.min(
        100,
        (daysToGo / this.numberOfDaysForTimeline) * 100
      )}%`;
    },
    getWidthFromDates(periodBegin: Date, periodEnd: Date): string {
      const periodTotalDays = this.getNumberOfDaysBetweenDates(
        periodBegin,
        periodEnd
      );
      return `${Math.min(
        100,
        (periodTotalDays / this.numberOfDaysForTimeline) * 100
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
  left: calc(var(--left) + 5px);
  right: calc(var(--right) + 5px);
}
</style>
