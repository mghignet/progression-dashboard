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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { MilestoneState } from "@/model/Milestone";

export default defineComponent({
  name: "Milestone",
  props: {
    text: String,
    state: String as PropType<MilestoneState>,
    // Hacky but it's the only way I found to be able to position the reversed flags correctly
    width: { type: String, required: true },
    reverse: Boolean,
  },
  methods: {
    isDone() {
      return MilestoneState.DONE === this.state;
    },
    isInWarning() {
      return MilestoneState.WARNING === this.state;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.milestone-container {
  width: var(--width, 250px);
  position: relative;

  &::before {
    // pole
    content: "";
    position: absolute;
    width: 3px;
    left: 0;
    top: 0;
    bottom: 1px;
    background: #eee;
    z-index: 1;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
  }

  &::after {
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
  font-size: 14px;
  font-weight: bold;
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
  padding: 10px;
}
</style>
