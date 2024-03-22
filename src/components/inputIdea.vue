<template>
    <v-container>
      <BackBotton />
      
      <v-row class="title">Idea生成</v-row>
      <v-row><hr></v-row>
      <v-row justify="center">输入你关于专利的idea，模型会提供需要提供发明内容和技术方案内容。</v-row>
      <v-row cols="12" sm="8" md="6" class="sample-gif">
        sample-gif
      </v-row>
  
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-textarea label="输入你关于专利的idea，需要提供发明内容和技术方案内容。" v-model="input" outlined dense></v-textarea>
          <v-btn color="primary" @click="submit" justify="center">提交</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  
  import { v4 as uuidv4 } from 'uuid';
  export default {
    data() {
      return {
        input: ''
      }
    },
    components: {
    },
    methods: {
      async submit() {
        const sessionId = uuidv4(); // 生成 session_id
        console.log("Message to sent to Flask server from IdeaInput:", this.input);
        this.$router.push({
          name: 'ResultPage', 
          query: { request_uuid: sessionId, idea:this.input, model: 1} 
        });
      },
  
    }
  }
  
  </script>
  
  <style scoped>
  .title {
   padding-left: 50px;
   padding-top: 20px;
  
   font-size: 25px;
  }
  
  .sample-gif {
    min-height: 200px;
    text-align: center;
  }
  
  hr {
    width:40%;
    border: 2px solid black;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  </style>
  
  
  