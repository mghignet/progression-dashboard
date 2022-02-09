<template>
  <div
    class="milestone-container"
    :class="{ reverse: reverse }"
    :style="{ '--width': width }"
  >
    <div
      class="milestone-flag"
      :class="{ done: isDone(), warning: isInWarning(), reverse }"
    >
      <div class="milestone-text">{{ text }}</div>
    </div>
    <div class="milestone-date">{{ formatDate(date) }}</div>
  </div>
</template>

<script setup lang="ts">
import { MilestoneState } from "@/model/Milestone";
import { formatDate } from "@/utils/date-utils";

const props = defineProps<{
  text?: string;
  date?: Date;
  state?: MilestoneState;
  width: string;
  reverse?: boolean;
}>();

function isDone() {
  return MilestoneState.DONE === props.state;
}
function isInWarning() {
  return MilestoneState.WARNING === props.state;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.milestone-container {
  width: var(--width, 250px);
  position: relative;

  &:before {
    // pole
    content: "";
    position: absolute;
    z-index: 1000;
    width: 3px;
    left: 0;
    top: 0;
    bottom: 1px;
    background: #eee;
    z-index: -1;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
  }

  &:after {
    // hole
    content: "";
    position: absolute;
    display: block;
    height: 4px;
    width: 7px;
    bottom: 0;
    left: -2px;
    background: black;
    border-radius: 7px / 4px;
  }

  &.reverse {
    &::before {
      left: initial;
      right: 0;
    }

    &::after {
      left: initial;
      right: -2px;
    }
  }
}

$milestone-height: 60px;
$flag-default-color: #f8f8f8;
.milestone-flag {
  position: relative;
  height: $milestone-height;
  width: 100%;
  background: $flag-default-color;
  border-bottom: 2px solid #ddd;

  :after {
    content: "";
    display: block;
    position: absolute;
    right: -$milestone-height/2;
    top: 0;
    width: 0;
    height: 0;
    border-width: $milestone-height/2 $milestone-height/2 $milestone-height/2
      0px;
    border-style: solid;
    border-color: $flag-default-color transparent transparent
      $flag-default-color;
  }

  &.reverse {
    :after {
      border-width: $milestone-height/2 0px $milestone-height/2
        $milestone-height/2;
      border-color: $flag-default-color $flag-default-color transparent
        transparent;
      left: -$milestone-height/2;
    }
  }

  &.done {
    $done-flag-color: #aaddaa;
    background: $done-flag-color;
    :after {
      border-top-color: $done-flag-color;
    }
  }
  &.warning {
    $warning-flag-color: #ffad7f;
    background: $warning-flag-color;
    color: white;
    :after {
      border-top-color: $warning-flag-color;
    }
  }
}

.milestone-text {
  padding-top: 10px;
  font-size: 14px;
  font-weight: bold;
}
.milestone-date {
  position: absolute;
  bottom: 15px;
  left: 5px;
  font-size: 12px;
  transform: rotate(-45deg);
  font-weight: bold;

  .milestone-container.reverse & {
    left: initial;
    right: -65px;
  }
}
</style>
