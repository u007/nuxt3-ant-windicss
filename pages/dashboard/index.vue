<template>
  <h1 class="font-medium text-lg">Hi!</h1>
  <a-button >
    <apple-outlined />
    click me

    <kanban title="test" status="TODO"
      summary="abc 123"
      :priority="TaskPriorityEnum.HIGH" />

  </a-button>
  
</template>

<script lang="ts" setup>
import { AppleOutlined } from '@ant-design/icons-vue'
import Kanban from '../../components/list/kanban.vue';
</script>