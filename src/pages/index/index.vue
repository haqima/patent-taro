<template>
  <nut-grid :column-num="2"  :clickable="true" class="mode-container" center square>
    <nut-grid-item :text="option.title + option.emoji" v-for="option in opts " :key="option.title" @click="selectComponent(option)" class="mode-choose"></nut-grid-item>
  </nut-grid>

  <pageFooter />

</template>

<script>
import './index.css';
import Taro from '@tarojs/taro';
import pageFooter from '../../components/pageFooter'
// import {useAuthStore} from '@/store'

export default {
  data() {
        return {
      selectedComponent: null,
      opts: [
        { title: "主题联想", component: "idea-auto", emoji: "💡", name: "主题联想", intro: "根据你的主题生成" },
        { title: "idea联想", component: "input-idea", emoji: "📝", name: "Idea联想", intro: "根据你的Idea生成" },
        { title: "论文联想", component: "idea-from-paper", emoji: "📚", name: "论文联想", intro: "根据你的论文联想" },
        { title: "论文方法转换", component: "method-from-paper", emoji: "🔄", name: "论文转换", intro: "根据你的论文生成" }
      ]
    };
  },
  components: {
    // Uncomment below if using PageFooter component in Taro
    pageFooter

  },
  methods: {
    selectComponent(option) {
      const v=process.env.TARO_APP_API_URL + 'tests'
      console.log(v)
      // Navigation in Taro is different, you may need to adjust this part based on Taro's navigation system
      Taro.navigateTo({
        url: '/subpackages/input/input?mode=' + option.component
      });
    }
  }
}
</script>

<style >
.mode-container {
  margin-top: 50px;
  /* display: flex; */
  /* justify-content: center; 
  align-items: center;  */
  /* width: 80%; 
  height: 50vh;  */
}
.mode-choosen {
  margin: 0 0;
  /* width: 200px; 
  height: 200px;  */
  /* border: 1px solid black; 
  display: flex;
  padding: 10 10;
  justify-content: center; 
  align-items: center; */
}




</style>
