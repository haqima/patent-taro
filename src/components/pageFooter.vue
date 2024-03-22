<template>
    <view class="container">
    <nut-row >
      <nut-col :span="6">
        <view class="icon-wrapper">
          <IconFont class="icon" name="edit" size="30" @click="changeTo(1)"/>
        </view>
      </nut-col>
      <nut-col :span="6">
        <view class="icon-wrapper">
          <IconFont class="icon" name="edit" size="30" @click="changeTo(2)"/>
        </view>
      </nut-col>
      <nut-col :span="6">
        <view class="icon-wrapper">
          <IconFont class="icon" name="edit" size="30" @click="changeTo(3)"/>
        </view>
      </nut-col>
      <nut-col :span="6">
        <view class="icon-wrapper">
          <IconFont class="icon" name="edit" size="30" @click="changeTo(4)"/>
        </view>
      </nut-col>
    </nut-row>
  </view>
</template>


  <script>
  import { IconFont } from '@nutui/icons-vue-taro';
  import Taro from '@tarojs/taro';
  export default {
    components: {
      IconFont
    },
    methods:{
      changeTo(num){
        const list = [,'index/index', 'history/history','favorite/favorite','profile/profile']
        Taro.navigateTo({
          url: '/pages/' + list[num]
        })
      }
    }
  };
  </script>
  
<style >
.container {
  position: fixed;
  justify-content: center;
  height: 100px;  
  bottom: 0px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  margin: 10px 0;
  align-items: center;
  width: 100%;
}

.icon-wrapper {
  display: flex; 
  justify-content: center; 
  align-items: center;
  align-content: center;
  height: 100px; 
}
.icon {
  font-size: 24px;
  color: #333;
} 

  </style>
  