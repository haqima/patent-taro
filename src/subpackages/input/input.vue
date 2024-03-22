<template>
  <view>
    <!-- <router-view></router-view> -->
    <component :is="selectComponent(this.mode)" />
  </view>
</template>


<script>
import ideaAuto from '../../components/ideaAuto.vue';
import { getCurrentInstance } from '@tarojs/taro'


export default {
    data(){
        return {
            mode: getCurrentInstance().router.params.mode,
            selectedComponent: null
        }
    },
    components:{
        ideaAuto,
    },
    methods:{
        
        selectComponent(name){
            if(name == 'idea-auto')
                this.selectedComponent = ideaAuto;
            else if(name == '')
                this.selectedComponent = null;
            return this.selectedComponent;

        }
        
    }
    
}
</script>

<style>
.mode-title {
    
    font-weight: 600;
    margin-bottom: 10px;
    color:red;

}

.mode-explain {
    font-size: 20px;
    color:blue;
}

.sample-gif {
  line-height: 40px;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  background: #ff8881;
  margin-bottom: 10px;
}

</style>