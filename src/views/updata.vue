<script setup>
import { onMounted, reactive, ref, provide } from 'vue'
import { NButton, NDrawer, NDrawerContent, NInput, NDropdown, NModal,useMessage } from 'naive-ui'
import list_knowledge_base from '../api/list_knowledge_base'
import delete_knowledge_base from '../api/delete_knowledge_base'
import { useRouter } from 'vue-router';
import Updata from '../components/Updata.vue'
const router = useRouter();
const Data = reactive({
  // 知识库列表
  list: [],
  show: false,
})


// 页面加载时候
onMounted(() => {
  list_knowledge_base()
    .then(res => {
      console.log(res)
      Data.list = res.data.data
    })
})

// 新增知识库
function activate() {
  Data.show = true
}
// 关闭
function close() {
  Data.show = false
}
// 输入框的值
let value = ref('')

// 确认
function confirm() {
  Data.show = false
  value.value = ''
}

// 获得子组件的实例
const UpdataRef = ref(null) 
// 加入知识库
function callServer() {
  let file = UpdataRef.value.Data.file
  if(value.value && file) {
    // 从实力上调用方法
    UpdataRef.value.goServer(value.value)
    Data.show = false
    Data.list.push(value.value)
    message.success('添加成功')
  }else if(!file) {
    message.error('请选择文件')
  }else if(!value.value) {
    message.error('请输入知识库名称')
  }
}

// 编辑知识库
function handleSelect(key) {
  if (key == 0) {
    open_know_ledg()
  } else if (key == 1) {
    del_know_ledg()
  }
}
const base_know_name = ref('')
// 打开知识库
function open_know_ledg() {
  console.log(`打开${base_know_name.value}知识库`)
  //跳转到知识库页面
  router.push({
    path: '/updatafile',
    query: { base_know_name: base_know_name.value }
  })
}
// 点击编辑按钮时
function clickSelect(i) {
  base_know_name.value = i
}
// 删除知识库
function del_know_ledg() {
  showModal.value = true
}
function onNegativeClick() {
  showModal.value = false;
}
const message = useMessage()
function onPositiveClick() {
  showModal.value = false;
  delete_knowledge_base(base_know_name.value)
    .then(res => {
      // 删除成功后,删除页面中的知识库list里面相关的知识库
      Data.list = Data.list.filter(item => item != base_know_name.value)
      message.success('删除成功')
    })
}
const showModal = ref(false)
// 编辑知识库选项
let options = [
  {
    label: "打开",
    key: 0,
  },
  {
    label: "删除",
    key: 1,
  }
]
</script>

<template>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="删除" content='确认删除该知识库？' positive-text="确认"
    negative-text="算了" @positive-click="onPositiveClick" @negative-click="onNegativeClick" />
  <n-drawer :show="Data.show" :width="502">
    <n-drawer-content title="新增知识库">
      <n-input type="text" placeholder="请输入知识库名称" v-model:value='value' />
      <!-- 上传文件组件 -->
      <Updata ref="UpdataRef"></Updata>
      <div class="btnBox">
        <n-button type="primary" style="margin-right: 20px;" @click="callServer">新增</n-button>
        <n-button type="error" @click="close">取消</n-button>
      </div>
    </n-drawer-content>
  </n-drawer>
  <div class="container">

    <div class="title_1">
      <h1>本地知识库列表</h1>
      <n-button type="primary" @click="activate()">新增知识库</n-button>
    </div>
    <div class="knowledgeBox">
      <div class="knowledg" @dblclick="handleDoubleClick" v-for="i in Data.list">
        <img src="../assets/imgs/coursestorm.png" alt="">
        <div class="title">{{ i }}</div>
        <n-dropdown trigger="click" :options="options" @select="handleSelect">
          <n-button type="info" @click="clickSelect(i)">编辑</n-button>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btnBox {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}

.title_1>h1 {
  font-size: 27px;
  color: #404040;
  margin-right: 20px;
}

.title_1 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.knowledg>.title {
  margin-top: 10px;
  font-size: 14px;
  color: #343434;
  width: 100px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.knowledgeBox {
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
}

.knowledg>img {
  width: 100px;
}

.knowledgeBox {
  width: 100%;
  margin-top: 20px;
}

.knowledg {
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
}

.container>h1 {
  font-size: 25px;
  color: #1d1d1d;
  text-align: center;
}
</style>