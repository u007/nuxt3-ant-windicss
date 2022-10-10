<template>
  <ACard class="mb-2 w-full" :key="id">
    <!-- priority -->
    <div class="absolute right-1 top-0">
      <span :class="`text-xs${priority === TaskPriorityEnum.HIGH ? ' text-red-500': ''}
        ${priority === TaskPriorityEnum.LOW ? ' text-gray-300': ''}`" v-if="priority !== TaskPriorityEnum.MEDIUM">
        {{priority}}
      </span>
    </div>
    <h2 class="font-medium text-lg ">{{title}}</h2>
    <div>
      {{summary}}
    </div>
    status: {{status}}

    
  </ACard>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { TaskStatusEnum, TaskPriorityEnum } from '@/models/task'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    default: '',
  },
  status: {
    type: String as PropType<TaskStatusEnum>,
    required: true,
  },
  priority: {
    type: String as PropType<TaskPriorityEnum>,
    required: true,
  },
})
</script>

<style>
.ant-card {
  @apply mb-1;
}
</style>