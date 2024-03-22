<template>
  <view class="user-profile">
    <!-- 用户头像和基本信息 -->
    <nut-cell title="头像" :value="userInfo.avatar"></nut-cell>
    <nut-cell title="昵称" :value="userInfo.nickname"></nut-cell>
    <nut-cell title="个人简介" :value="userInfo.bio"></nut-cell>

    <!-- 动态列表 -->
    <nut-list>
      <template #default="{item}" >
        <text>{{ item.content }}</text>
        <text class="list-item-time">{{ item.time }}</text>
      </template>
    </nut-list>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue';
// import { getUserProfile } from '@/services/userService'; // 假定你有一个获取用户信息的 service

export default {
  name: 'UserProfile',
  setup() {
    // 定义响应式变量
    const userInfo = ref({
      avatar: '',
      nickname: '',
      bio: '',
    });

    // 返回响应式数据和方法
    return {
      userInfo: null,
      dynamicList: null,
      handleClick: null,
    };
  },
};
</script>

<style lang="scss">
.user-profile {
  padding: 20rpx;
}
.list-item-time {
  font-size: 12px;
  color: #999;
}
</style>