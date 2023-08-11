<script setup>
import { onMounted, reactive, ref } from 'vue'
import { NSpace, NSelect } from 'naive-ui';
import list_knowledge_base from '../api/list_knowledge_base'
const value = ref('请选择对话知识库')
const Data = reactive({
  options: []
})
onMounted(() => {
  //获取知识库列表
  list_knowledge_base().then(res => {
    console.log(res)
    res.data.data.forEach((item, index) => {
      Data.options.push({
        label: item,
        value: index
      })
    })
    console.log(Data.options)
  })
})
const knowledgeBoxID = ref('')
function handleColorChange(val) {
  knowledgeBoxID.value = Data.options[val].label
  shake.value = false
}
const shake = ref(false)
function shakeFn(){
  shake.value = true
}
defineExpose({
  knowledgeBoxID,
  shakeFn
})
</script>

<template>
  <div class="knowledgeBox" :class="{shake:shake}" >
    <n-space vertical >
      <n-select v-model:value="value" :options="Data.options" @update:value="handleColorChange"  />
    </n-space>
  </div>
</template>

<style scoped>
.n-select {
  width: 220px;
}


.shake {
  animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  border: 1px solid rgb(250, 66, 66);
}

@keyframes shake {

  /* 水平抖动，核心代码 */
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(+2px, 0, 0);
  }

  30%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(+4px, 0, 0);
  }

  50% {
    transform: translate3d(-4px, 0, 0);
  }
}</style>