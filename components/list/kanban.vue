<template>
  <div class="p-4">
    <a-card >
      <!-- priority -->
      <div class="absolute right-2 top-0">
        <up-outlined  v-if="priority === TaskPriorityEnum.HIGH"/>
        <dash-outlined v-if="priority === TaskPriorityEnum.MEDIUM"/>
        <minus-outlined v-if="priority === TaskPriorityEnum.LOW"/>
      </div>
      <h2 class="font-medium text-lg">{{title}}</h2>
      <div>
        {{summary}}
      </div>
      status: {{status}}

      
    </a-card>
  </div>
</template>

<script lang="ts" setup>

import { UpOutlined, DashOutlined, MinusOutlined } from '@ant-design/icons-vue'
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
