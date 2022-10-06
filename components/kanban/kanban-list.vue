<template>
  <div class="grid grid-cols-1 bg-gray-100 flex-shrink-0">
    <h2 class="text-center font-bold my-1">{{title}}</h2>
    <div class="p-2 ">
      <kanban-task v-for="task in tasks" :key="task.id" v-bind="task" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'TODO',
  },
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
})
</script>
