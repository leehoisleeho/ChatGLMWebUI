<script setup>
import { NMessageProvider,NLoadingBarProvider } from 'naive-ui'
</script>

<template>
  <div id="app">
    <n-message-provider>
      <n-loading-bar-provider>
        <router-view></router-view>
      </n-loading-bar-provider>
    </n-message-provider>
  </div>
</template>
  
