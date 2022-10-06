<template>
  <a-card class="mb-2 w-full" >
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

    
  </a-card>
</template>

<script lang="ts" setup>
// import { UpOutlined, DashOutlined, MinusOutlined } from '@ant-design/icons-vue'
import { PropType } from 'vue';

const props = defineProps({
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