<template>
  <div class="timeline-container">
    <div class="timeline base">
      <div class="begin-date">{{ formatDate(timeline.beginDate) }}</div>
      <div class="end-date">{{ formatDate(timeline.endDate) }}</div>
      <Milestone
        v-for="milestone in timeline.milestones"
        :ref="`milestone${milestone.id}`"
        :key="milestone.id"
        :text="milestone.text"
        :date="milestone.date"
        :state="milestone.state"
        class="timeline-milestone"
        :style="{
          left: reverse(milestone)
            ? `calc(${getLeftPositionFromDate(
                milestone.date
              )} - ${milestoneFlagWidth})`
            : getLeftPositionFromDate(milestone.date),
        }"
        :width="milestoneFlagWidth"
        :reverse="reverse(milestone)"
      />
      <Period
        v-for="period in timeline.periods"
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

<script setup lang="ts">
import Milestone from "@/components/Milestone.vue";
import Period from "@/components/Period.vue";
import moment from "moment";
import { MilestoneModel } from "@/model/Milestone";
import { TimelineModel } from "@/model/Timeline";
import { formatDate } from "@/utils/date-utils";
import { computed, ref } from "vue";

const props = defineProps<{
  timeline: TimelineModel;
  currentDate: { type: Date; required: true };
}>();

const milestoneFlagWidth = ref("250px");

const numberOfDaysForTimeline = computed(() =>
  getNumberOfDaysBetweenDates(props.timeline.beginDate, props.timeline.endDate)
);
function reverse(milestone: MilestoneModel): boolean {
  return (
    getNumberOfDaysBetweenDates(milestone.date, props.timeline.endDate) <
    numberOfDaysForTimeline.value / 2
  );
}

function getNumberOfDaysBetweenDates(begin: Date, end: Date): number {
  return Math.max(0, moment(end).diff(moment(begin), "days") + 1);
}
function getLeftPositionFromDate(date: Date): string {
  const daysElapsed = getNumberOfDaysBetweenDates(
    props.timeline.beginDate,
    date
  );
  return `${Math.min(
    100,
    (daysElapsed / numberOfDaysForTimeline.value) * 100
  )}%`;
}

function getRightPositionFromDate(date: Date): string {
  const daysToGo = getNumberOfDaysBetweenDates(date, props.timeline.endDate);
  return `${Math.min(100, (daysToGo / numberOfDaysForTimeline.value) * 100)}%`;
}
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
  z-index: -1;

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
      color: #55aa55;
      top: 0;
      left: calc(100% + 10px);
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
  height: 190px;

  &:nth-child(3n + 1) {
    height: 280px;
  }
  &:nth-child(3n + 2) {
    height: 370px;
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
