<script setup>
import { reactive, ref, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import MarkdownIt from 'markdown-it';
import { NButton, useLoadingBar, useMessage } from 'naive-ui'
import doc_chat from '../api/doc_chat'
import SelectionKnowledge from '../components/SelectionKnowledge.vue';
const router = useRouter();
const message = useMessage()
// 发送问题
const send = async () => {
  let knowledge_base_id = SelectionKnowledgeRef.value.knowledgeBoxID
  if (!knowledge_base_id) {
    message.error('请选择对话知识库')
    SelectionKnowledgeRef.value.shakeFn()
    return
  }
  Data.list.push({
    wen: value.value,
    da: ''
  })
  Data.isImgBox = false
  // 显示loading
  element.value = true
  // 按钮不可点击
  btn.value = false
  let index = Data.list.length - 1
  scrollToBottom()
  value.value = ''
  // 提交问答 等待回答  
  console.log(`正在向知识库${knowledge_base_id}提问题`)
  const res = await doc_chat({
    "knowledge_base_id": knowledge_base_id,
    "question": Data.list[index].wen,
    "streaming": false,
    "history": history
  })
  let source_documents = res.data.source_documents
  if (source_documents.length == 0) {
    const md = new MarkdownIt();
    const html = md.render('根据知识库的知识，我无法回答你这个问题');
    Data.list[index].da = '' // 清空答案
    // 逐个字显示答案
    for (let i = 0; i < html.length; i++) {
      setTimeout(() => {
        Data.list[index].da += html[i]
      }, 10 * i)
    }
    element.value = false // 隐藏loading
    btn.value = true  // 按钮可点击
    Data.list[index].dis = true
    scrollToBottom()
    return
  }
  history = res.data.history
  element.value = false // 隐藏loading
  btn.value = true  // 按钮可点击
  const md = new MarkdownIt();
  const html = md.render(res.data.response);
  Data.list[index].da = '' // 清空答案
  // 逐个字显示答案
  for (let i = 0; i < html.length; i++) {
    setTimeout(() => {
      Data.list[index].da += html[i]
    }, 10 * i)
  }
  Data.list[index].dis = true
  scrollToBottom()
}
// 问题历史记录
let history = []

// 总的响应式数据
const Data = reactive({
  // 问答数据，包含问题和答案，dis为true时，显示loading。false时，不显示loading 
  list: [],
  isImgBox: true
})

// 输入框的值
let value = ref('')
// 是否显示loading
let element = ref(true)
// 按钮是否可点击
let btn = ref(true)
// 获取聊天框的dom
const chat_box = ref(null);
// 保持每次新问题都在底部
const scrollToBottom = () => {
  nextTick(() => {
    chat_box.value.scrollTop = chat_box.value.scrollHeight
  });
};
// 监听list的变化，执行scrollToBottom
watch(() => Data.list, scrollToBottom, { deep: true });
// 跳转到本地知识库
const go_knowledg = () => {
  router.push('/updata')
}
// 获取SelectionKnowledge组件的实例
const SelectionKnowledgeRef = ref(null)

</script>
<template>
  <div class="container">
    <n-button type="primary" class="go_knowledg" @click="go_knowledg">本地知识库</n-button>
    <SelectionKnowledge class="SelectionKnowledge" ref="SelectionKnowledgeRef" />
    <div class="chat_box" ref="chat_box">
      <div class="imgBox" v-if="Data.isImgBox">
        <img src="../assets/imgs/logo.png" alt="">
        <h2>欢迎使用本地知识库</h2>
      </div>
      <div v-for="i in Data.list">
        <div class="box_1">
          <div class="logo_1">
            <img src="../assets/imgs/uersLogo.png" alt="">
          </div>
          <div class="chatBox_1">{{ i.wen }}</div>
        </div>
        <div class="box">
          <div class="logo">
            <img src="../assets/imgs/logo.png" alt="" :class="{ 'element': element, dis: i.dis }">
          </div>
          <div class="chatBox" v-html="i.da"></div>
        </div>
      </div>
    </div>
    <div class="input">
      <div class="inputbox">
        <input type="text" placeholder="请输入你的问题" v-model="value">
        <n-button type="primary" @click="send" v-show="btn">发送</n-button>
        <n-button type="primary" @click="send" disabled="" v-show="!btn">等待</n-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.SelectionKnowledge {
  position: absolute;
  top: 20px;
  left: 140px;
}

.imgBox>h2 {
  margin-top: 20px;
}

.imgBox>img {
  width: 300px;
  height: 300px;
}

.imgBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.3;
  margin: 120px;
}

.chat_box>img {
  opacity: 0.2;
}

.go_knowledg {
  margin: 20px;
  position: absolute;
}

.element {
  animation: rotate 2s linear infinite;
}

.dis {
  animation: none
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.chat_box {
  height: 85vh;
  overflow: scroll;
}

.logo_1 {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
}

.logo_1>img {
  width: 100%;
  height: 100%;
}

.logo_1>img {}

.box_1>.chatBox_1 {
  font-size: 17px;
  padding: 10px 20px;
  width: 800px;
  min-height: 50px;
  border-radius: 15px;
  color: #535353;
}

.box_1 {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: start;

}

.inputbox {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputbox>.n-button {
  margin-left: -66px;
  border-radius: 5px;
  height: 38px;
}

.input {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15vh;
}

.inputbox>input {
  width: 1000px;
  height: 50px;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  padding: 0 20px;
  font-size: 17px;
  outline: none;
}

.container {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.logo>img {
  width: 100%;
  height: 100%;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-top: 5px;
}

.box {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: start;
}

/deep/ pre>code {
  display: block;
  background: #3a3a3a;
  width: 100%;
  color: white;
  padding: 10px 10px;
  border-radius: 10px;
}

.chatBox {
  font-size: 17px;
  padding: 10px 20px;
  width: 800px;
  min-height: 50px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 15px;
  color: #535353;
}
</style>
