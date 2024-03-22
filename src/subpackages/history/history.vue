<template>
  <view>
    
   
    <div>
      <nut-row cols="12" sm="6" md="3" v-for="item in patent_history" :key="item.id" class="d-flex justify-center">
          <view class="d-flex justify-center align-center his-card" outlined tile @click="goTo(item)" >
            <nut-row>
              <nut-col class="d-flex align-center c-id" cols="1">
                <div class="">{{ item.id }}</div>
              </nut-col>
              <nut-col >
                <div class="c-title">
                  {{ item.title }}
                </div>
              </nut-col>
              <nut-col cols="4" class="d-flex justify-center align-center">
                <nut-tag :type="getColor(item.state)">{{ item.state }}</nut-tag>
              </nut-col>
            </nut-row>  
          </view>
      </nut-row>
    </div>
      
  </view>
  <PageFooter />
</template>

<script>
// import subButtonVue from '../components/subButton.vue'
import PageFooter from '../../components/pageFooter.vue';

export default {
  data() {
    return {
      user_id :1,
      input: '',
      patent_history: [
        { id: 1,
        title: '123',
        request_uuid: '1234456789',
        state:"fihished"},
      ],
    }
  },
  components: {
    PageFooter,
  },
  created() {
    this.getHistoty();
  },

  methods:{ 
    getHistoty(){
      const URL = process.env.TARO_APP_API_URL + '/api/patents?user=' + this.user_id;
      const resp = fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      resp
        .then((response) => response.json())
        .then((datas) => {
          if (datas.data.length > 0 )
            this.patent_history = [];
          datas.data.forEach((data,index) => {
            
              if (data.stage === 4) data.state = '已完成';
              else if (data.stage === 1) data.state = '处理中';
              else  data.state = '中止';
              data['id'] = index + 1;
              console.log(data);
              this.patent_history.push(data);
          });
    });
      
      
    },
    getColor(state) {
      if (state == '已完成') {
        return "success";
      } else if (state == "处理中") {
        return "warning";
      } else if (state == "中止") {
        return "danger";
      }
    },
    
    setCard(state){
      return state == 'finished'
    },
    
    goTo(item){
      if (item.state == '已完成')
      Taro.navigateTo({
        url: 'pages/result/result?request_uuid=' + item.request_uuid + '&from_his=true&user_id=' + this.user_id
      });
      else
      return;
    },
    
  }

}
</script>

<style scoped>
.v-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-5px);
}

.function-item {
  padding: 20px 0px;
}
.title {
  margin-bottom: 10px;
  
}
.his-card {
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 10px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 80%;
  justify-content: center;
  /* height: 100px; */
}

.c-id {
  font-size: 14px;
  margin-left: 10px;
}

.c-title {
  font-size: 14px;

}
</style>

