<template>
  <view class="result-container">
    <nut-row justify="center">
      <nut-col >
        <div >

            <div v-if="show_idea" class="sub-title">专利大纲：</div>
            <div v-if="show_idea" class="text-container render-box" @click="this.idea_button = !(this.idea_button)">  
              <div v-html="renderMarkdown(generate_idea)"></div> 
            </div>

            <!-- <div v-if="this.idea_button && this.is_done" class="refine-buttons" >
                <nut-button @click="refineSection (index) " class="v-b" style="margin-left: 20px;" color="info">细化</nut-button>
                <nut-button @click="deleteSection(index) " class="v-b" color="error">删除</nut-button>
                <nut-button @click="deleteSection(index)" class="v-b" color="">编辑</nut-button>
              </div>

            <div v-if="show_patent" class="sub-title">专利内容：</div>
            <div v-for="(para, index) in this.generate_patent" :key="index" :id="index">
              <div class="render-box-idea text-container" v-if="para!==''" v-html="renderMarkdown(para.content)"  @click="changeSelectSection(index)"></div>
              <div v-if="selectSection === index && this.is_done" class="refine-buttons">
                <nut-button @click="this.user_refine = !this.user_refine " class="v-b" style="margin-left: 20px;" color="info">细化</nut-button>
                <nut-button @click="deleteSection(index) " class="v-b" color="error">删除</nut-button>
                <nut-button @click="deleteSection(index)" class="v-b" color="">编辑</nut-button>
                <div v-if="this.user_refine" class="refine-buttons">
                  <nut-button @click="refineSection(index, 1) " class="v-b" style="margin-left: 20px;" color="info">增加公式</nut-button>
                  <nut-button @click="refineSection(index, 2) " class="v-b" color="info">增加图表</nut-button>
                  <nut-button @click="refineSection(index, 3) " class="v-b" >重新细化</nut-button>
                </div>
              </div>
            </div> -->

        </div>
      </nut-col>
    </nut-row>
    
    <nut-row class="d-flex justify-center">
      <div v-if="is_done" >
        <nut-button @click="download()" class="v-b" variant="outlined" >下载为doc文档</nut-button>
      </div>
    </nut-row>
  </view>
</template>

<script>
import { getCurrentInstance } from '@tarojs/taro'
import Taro from '@tarojs/taro';
import MarkdownIt from 'markdown-it';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import markdownItTexmath from 'markdown-it-texmath';
import mermaid from 'mermaid/dist/mermaid.esm';  // 无法解决流程图问题  小程序无法渲染？ 微信有Towxml

export default {
  data() {
    return {
      file_uuid: "", // 有文件则生成，无文件则留空
      mode: 0, 
      show_idea: false,
      show_patent: false,
      request_uuid: 0,
      generate_idea:"",
      generate_patent: [],
      user_input: "",  //prompt
      selectSection:-1,
      idea_button: false,
      user_refine: false,
      generate_patent_html:[],
      is_done: false,
      from_his: false,
      user_id:null,
      text: '#\t test title here !!!'
    };
  },
  created() {
      const router = getCurrentInstance().router.params;
      this.user_input = router.idea;
      this.request_uuid = router.request_uuid;
      this.mode = router.mode;
      this.file_uuid = router.file_uuid;
      if ( router.from_his !== undefined){
        this.from_his =router.from_his;
        this.user_id = router.user_id;
        this.request_uuid = router.request_uuid;
      }
  
      console.log(process.env.TARO_APP_API_URL)
      console.log("ResultPage file_uuid---:", this.file_uuid);
      console.log("ResultPage UU_sessionId---:", this.request_uuid);
      console.log("ResultPage idea---:", this.user_input);
      console.log("ResultPage mode---:", this.mode);
  
    if (this.from_his)  
      this.get_history(this.user_id, this.request_uuid);
    else
      this.get_content();
      // mermaid.initialize({startOnLoad:true});
      // mermaid.init(undefined, '.mermaid');
  },


  methods: {
    // 生成 标题 + 专利
    async get_content(){
      await this.get_g_idea();
      this.show_patent = true;
      // this.get_g_patent(this.generate_idea);
    },



    async get_g_idea(){
      if(this.mode===1) {
        this.generate_idea = this.user_input;
        // if (this.generate_idea.length>0)
          this.show_idea = true;
        return;
      }
      this.show_idea = true;
      const URL = process.env.TARO_APP_API_URL + '/api/requests/getIdea';
      const msg = {
        request_uuid: this.request_uuid,
        file_uuid: this.file_uuid,
        user_input: this.idea,
        generate_mode: this.mode
      }
      Taro.connectSocket({
        url: URL, // WebSocket 服务器地址
        header:{
          'content-type': 'application/json',
          data: JSON.stringify(msg)
        },
        success() {
          console.log('WebSocket 连接成功');
        },
        fail(error) {
          console.error('WebSocket 连接失败:', error);
        }
      }).then(task =>{
        // task.onOpen(() =>{
        //   task.send(JSON.stringify(msg));
        // });
        task.onMessage((res) => {
          console.log(res.data);
          this.generate_idea += res.data;
        })
      })
        // while (true) {
        //   var { value, done } = await  reader.read();
        //   console.log(value);   
        //   if (done) break;
        //   if (value.event.includes('finish')) break;
  
        //   const texts = this.parseSSE(value)
        //   for (const text of texts) {
        //     // idea += text.data.trim();
        //     this.generate_idea += text.data.replace(/ {4}/g, '\t');
        //     // console.log(JSON.stringify(this.generate_idea))
        //   }


    },




    parseSSE(s) {
    const res = [];
    const finished = []
    
    let temp = {
            id: '',
            event: '',
            data: '',
          };
      // console.log("----------lines:",s);
      s = s.replace(/\r\n/g,'\n');
      // console.log("after------lines:",JSON.stringify(s));
    // let temp_data = "";

    s.split(/\n/).forEach(line => {
    // console.log('line---->',JSON.stringify(line));
    line = line.replace(/%0A/g, '\n');
      // console.log('line---->',JSON.stringify(line));
		if (line.startsWith('event: ')) {
			temp.event = line.substring(7).trim();
		} else if (line.startsWith('id: ')) {
			temp.id = line.substring(4).trim();
		} else if (line.startsWith('data: ')) {
			temp.data = line.substring(6);
      // console.log('temp-data-->',JSON.stringify(temp.data))
      if (temp.data === ' ')
        temp.data = '\t';
		} else if (line === '' ) {
			if (temp.event) {
				res.push(temp);
			}
      else if (temp.event === 'finish'){
        finished.push(temp);
      }
			temp = {
				id: '',
				event: '',
				data: '',
			};
		}

    console.log('temp event---->', JSON.stringify(temp.event));
    if (temp.event === 'finish'){
      // console.log("QAQ")
      finished.push(temp);
      return finished;
    }
    // console.log(temp.event,temp.data)
	});

    if (temp.event) {
      res.push(temp);
    }
    return res;
  },

    renderMarkdown(markdownText) {
        // 显示原始输入
  
        const md = new MarkdownIt({breaks: true, linkify: true, html: true, typographer: true, quotes: '“”‘’'});
        
        md.use(markdownItTexmath, {
          engine: katex,
          delimiters: 'dollars',
          katexOptions: { macros: {"\\RR": "\\mathbb{R}"} }
        })
        md.use(markdownItTexmath, {
          engine: katex,
          delimiters: 'brackets', // 假设这表示使用 \( 和 \)
          katexOptions: { macros: {"\\RR": "\\mathbb{R}"} }
        });
          md.use((md) => {
            // 保存原始的 fence 渲染规则
            const defaultRender = md.renderer.rules.fence || function(tokens, idx, options, env, self) {
              return self.renderToken(tokens, idx, options);
            };
  
            md.renderer.rules.fence = (tokens, idx, options, env, self) => {
              const token = tokens[idx];
              if (token.info.trim() === 'mermaid') {
                return `<div class="mermaid">${token.content}</div>`;
              }
              return defaultRender(tokens, idx, options, env, self);
            };
          });
          // console.log('before--\n',JSON.stringify(markdownText))
  
          if (markdownText!== "")  {
            const renderedHtml = md.render(markdownText);
            // console.log("---r",renderedHtml)
            return renderedHtml;
          }
          else{
            return;
          }

      },
  },

}



</script>

<style>

</style>