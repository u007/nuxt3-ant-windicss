<template>
  <h1 class="font-medium text-lg">Hi!</h1>
  <AButton >
    <apple-outlined />
    click me
  </AButton>

  <div class="flex flex-wrap">
    <kanban-list v-for="col in columns" v-bind="col">
      <template #task>
        
      </template>
    </kanban-list>
  </div>
  
</template>

<script lang="ts" setup>
//import { AppleOutlined } from '@ant-design/icons-vue'

const tasks = [
  { title: "test", status: "TODO", summary: "abc 123", priority: TaskPriorityEnum.HIGH },
  { title: "test 2", status: "TODO", summary: "abc 123", priority: TaskPriorityEnum.MEDIUM },
  { title: "test 3", status: "TODO", summary: "abc 123", priority: TaskPriorityEnum.LOW }
]

const columns = [
  { title: "TODO", tasks: tasks },
  { title: "IN PROGRESS", tasks: tasks },
  { title: "IN REVIEW", tasks: tasks },
  { title: "GO LIVE", tasks: tasks },
  { title: "DONE", tasks: tasks },
];


</script>
