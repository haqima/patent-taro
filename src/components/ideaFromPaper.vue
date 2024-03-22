<template>
    <v-container>
      <BackBotton />
      
      <v-row class="title">Idea生成</v-row>
      <v-row><hr></v-row>
      <v-row justify="center">上传你的文档，我们将从中为你联想专利并生成文案</v-row>
      <v-row cols="12" sm="8" md="6" class="sample-gif">
        sample-gif
      </v-row>
  
      
      <!-- <v-row cols="12" sm="8" md="6" class="sample-gif">
        sample-gif
      </v-row> -->
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-file-input
            label="上传文件，仅接受.pdf,.docx,.doc。"
            @change="handleFileUpload"
            outlined
            dense
            accept=".pdf,.docx,.doc"
          ></v-file-input>
          
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn color="primary" @click="submit" >提交</v-btn>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { v4 as uuidv4 } from 'uuid';
  
  export default {
    data() {
      return {
        file: null,
        input: ''
      };
    },
    components: {
    },
    methods: {
      handleFileUpload(event) {
        this.file = event.target.files[0]; // Assuming single file upload
      },
      async submit() {
        if (!this.file) {
          alert("请先选择一个文件");
          return;
        }
        console.log(this.file)
        const formData = new FormData();
        formData.append("file", this.file);
        formData.append("source", "IdeasFromPaper");  // 标识请求来源为IdeasFromPaper组件
        console.log(formData.has('file'))
        // let file_uuid = "";
        const URL  = process.env.VUE_APP_API_URL + "/api/uploads";
        const file_uuid= await
        fetch(URL, {
          method:'POST',
          body: formData,
        }).then(response =>{
          if (response.ok) return response.json();
          throw new Error('Network response was not ok.');
        }).then(data =>{
          return data.data.file_uuid;
        }).catch(error =>{
          console.error('There has been a problem with your fetch operation:', error);
        });
        console.log(file_uuid);
        const sessionId = uuidv4(); // 生成 session_id
        this.$router.push({
          name: 'ResultPage', 
          query: { request_uuid: sessionId, file_uuid: file_uuid, model: 2, idea: this.input} 
        });
  
  
        // console.log("Message to sent to Flask server from IdeasFromPaper:", this.input);
        // try {
        //   const response = await fetch('http://localhost:15001/send', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       sessionId: sessionId,
        //       message: this.input,
        //       source: 'IdeasFromPaper',  // 标识请求来源为IdeasFromPaper组件
        //     }),
        //   });
        // if (!response.ok) throw new Error('Network response was not ok');
        //   const data = await response.json();
        //   console.log(data);
        //   const idea = data.idea;
        //   const mode = data.mode;
        //   console.log("Message sent to Flask server from IdeasFromPaper:", this.input);
        //   console.log("Send to result page", { sessionId: sessionId, idea: idea, mode:mode})
        //   this.$router.push({ name: 'ResultPage', 
        //           query: { sessionId: sessionId, idea: idea, mode:mode} });
        // } catch (error) {
        //   console.error("Failed to send message from IdeasFromPaper:", error);
        // }
      }
    },
  };
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