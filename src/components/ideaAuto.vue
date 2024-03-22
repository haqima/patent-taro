<template>
  <view>
    <nut-row class="mode-title">Idea生成</nut-row>
    <!-- <nut-row><hr></nut-row> -->
    <nut-divider />
    <nut-row :justify="center" class="mode-explain">根据你输入的关键词来生成专利想法，并且生成一篇专利底稿草稿</nut-row>
    <nut-row  class="sample-gif">
      sample-gif
    </nut-row>
    <nut-row :align="center">
      <view class="input-box">
        <nut-col >
          <nut-input  placeholder="简单输入你的idea，如“一种新时代AI算命方法”。" v-model="input" clearable show-world-limt :max-length="200"></nut-input>
        </nut-col>
      </view>
      
    </nut-row>


    <nut-row :align="center">
      <nut-button plain type="primary" class="mr-4" @click="submit" >提交</nut-button>
    </nut-row>
  </view>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import Taro from '@tarojs/taro';
import { getCurrentInstance } from '@tarojs/taro'

export default {
    data() {
    return {
      mode: getCurrentInstance().router.params.mode,
      input: ''
    }
    },
    methods: {
    async submit() {
      const sessionId = uuidv4(); // 生成 session_id
      
      console.log("Message to sent to Flask server from IdeaAuto:", this.input,'\t', sessionId);
      Taro.navigateTo({
        url: '/subpackages/result/result?request_uuid=' + sessionId + '&idea=' + this.input + '&mode=0'
      });
    },

  },
  mounted(){
    console.log(getCurrentInstance().router.params.mode)
  }
}
</script>

<style scoped>
.input-box {
  height: 80px;
  padding: 10px 10px;
  margin: auto 10px;
}
</style>