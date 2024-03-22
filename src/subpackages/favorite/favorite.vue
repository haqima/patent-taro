<template>
    <view class="history">
      <text>{{ msg }}</text>
    </view>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  
  export default {
    setup () {
      const msg = ref('Hello worl111d')
      return {
        msg
      }
    }
  }
  </script>
  