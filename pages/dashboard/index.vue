<template>
  <h1 class="font-medium text-lg">Hi!</h1>
  <AButton >
    <icons-apple-outlined />
    click me
  </AButton>

  <div class="flex flex-wrap">
    <kanban-list v-for="col in columns" v-bind="col" :key="col.title" :tasks="col.tasks">
      <template #task>
        
      </template>
    </kanban-list>
  </div>
  
</template>

<script lang="ts" setup>
import { Task } from '@/models/task'
//import { AppleOutlined } from '@ant-design/icons-vue'
const genericTask = { title: "test", status: "TODO", summary: "abc 123", priority: TaskPriorityEnum.LOW, description: 'someone to ...', createdAt: new Date(), updatedAt: new Date() }

const tasks = [
  { ...genericTask, id: 1 },
  { ...genericTask, id: 2, title: "test 2" },
  { ...genericTask, id: 3, title: "test 3" },
] as unknown[] as Task[];

const columns = [
  { title: "TODO", tasks },
  { title: "IN PROGRESS", tasks },
  { title: "IN REVIEW", tasks },
  { title: "GO LIVE", tasks },
  { title: "DONE", tasks },
];


</script>
