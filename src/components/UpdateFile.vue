<script setup>
import { reactive, ref } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import upload_file from '../api/upload_file'


function handleFileChange(e) {
  Data.file = event.target.files[0]
  console.log(Data.file)
  fileName.value = Data.file.name
  show.value = true
}
const fileName = ref('')
const show = ref(false)
const Data = reactive({
  file: null
})

function goServer(fileName){
    upload_file({
      file: Data.file,
      knowledge_base_id: fileName
    })
      .then(res => {
        console.log(res)
    })
}

// 暴露接口
defineExpose({
  goServer,Data
})
</script>

<template>
  <div class="UpdataBox">
    <input type="file" @change="handleFileChange" />
    <n-button type="info">上传文件</n-button>
    <div class="fileName" v-if="show">
      <img src="../assets/imgs/fileicon.png" alt="">
      {{ fileName }}
    </div>
  </div>
</template>

<style scoped>
.fileName>img {
  height: 25px;
  margin-right: 10px;
}

.fileName {
  margin-top: 20px;
  font-size: 18px;
  color: rgb(95, 95, 95);
  display: flex;
  align-items: center;
}

.n-button {
  height: 35px;
  cursor: pointer !important;
}

.UpdataBox>input {
  border: 1px solid red;
  opacity: 0;
  position: absolute;
  z-index: 100;
  cursor: pointer !important;
  height: 35px;
}

.UpdataBox {
  margin-top: 20px;
  border: 1ox solid rgb(0, 0, 0);
}
</style>