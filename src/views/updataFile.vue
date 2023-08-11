<script setup>
import { NButton, NModal ,useMessage,useLoadingBar} from 'naive-ui'
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import list_files from '../api/list_files'
import delete_file from '../api/delete_file'
import upload_file from '../api/upload_file';

const route = useRoute()
const base_know_name = ref('')
const Data = reactive({
  list: []
})
const loadingBar = useLoadingBar()
// 页面加载时候
onMounted(() => {
 
  console.log('页面加载完成', route.query.base_know_name)
  base_know_name.value = route.query.base_know_name
  //获取知识库文件列表
  list_files(base_know_name.value).then(res => {
    Data.list = res.data.data
    loadingBar.finish()
  })
})
let baseKnowName = route.query.base_know_name
let doc_name = ref('')
function del(i) {
  showModal.value = true
  doc_name.value = i
}
// 删除文件
function onPositiveClick() {
  console.log('删除')
  delete_file(baseKnowName, doc_name.value).then(res => {
    showModal.value = false;
    list_files(base_know_name.value).then(res => {
      Data.list = res.data.data
    })
  })
}
function onNegativeClick() {
  console.log('取消')
  showModal.value = false;
}
const showModal = ref(false)

// 新增文件
function handleFileChange(e) {
  loadingBar.start()
  let file = event.target.files[0]
  let baseKnowName = route.query.base_know_name
  upload_file({
    file: file,
    knowledge_base_id: baseKnowName
  })
    .then(res => {
      list_files(base_know_name.value).then(res => {
        Data.list = res.data.data
        loadingBar.finish()
      })
    })
}
</script>
<template>
  <div class="container">
    <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="删除" content='确认删除该文件吗？'
      positive-text="确认" negative-text="算了" @positive-click="onPositiveClick" @negative-click="onNegativeClick" />
    <div class="fileBox">
      <h1>本地文件 / {{ base_know_name }}</h1>
      <ul>
        <li v-for="i in Data.list">
          <span>{{ i }}</span>
          <div>
            <n-button type="error" style="margin-left: 20px;" @click="del(i)">删除</n-button>
          </div>
        </li>
      </ul>
      <div class="btnBox">
        <input type="file" @change="handleFileChange" />
        <n-button type="primary">新增文件</n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btnBox>input {
  width: 100%;
  position: absolute;
  z-index: 100;
  opacity: 0;

}

.btnBox {
  position: absolute;
  top: 20px;
  right: 20px;
}

.title {
  color: #999;
  font-size: 16px;
}

.fileBox>h1 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #4b4b4b;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fileBox>ul {
  height: 800px;
  /* 设置容器高度 */
  overflow: auto;
  /* 在内容溢出时显示滚动条 */
}

.fileBox>ul>li {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #e4e4e4;
}

.fileBox {
  width: 800px;
  height: 900px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  position: relative;
  padding: 20px;
}

.fileBox>.n-button {
  width: 150px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%);
}
</style>