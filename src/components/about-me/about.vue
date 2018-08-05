<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>关于我</BreadcrumbItem>
    </Breadcrumb>
    <Content class="content">
        <mavon-editor class="editor-layout" v-model=content></mavon-editor>
        <Button type="primary" @click.native="updateAbout">发布</Button>
         <Spin size="large" fix v-if="isLoading"></Spin>
    </Content>
  </div>
</template>


<script>
import { mavonEditor } from 'mavon-editor'
import {admin_about_get, admin_adbout_put} from '@/api/blog-admin-api/index'
export default {
  name:'about',
  components:{
    mavonEditor
  },
  async mounted(){
    const{data} = await admin_about_get()
    this.content = data.data.content
    this.id = data.data.id
  },
  data(){
    return {
      content:'',
      id:'',
      isLoading:false
    }
  },
  methods:{
   async updateAbout(){
     this.isLoading = true
     try {
       await admin_adbout_put({data:{id:this.id,content:this.content}})
      this.$Message.success('修改成功')
       
     } catch (error) {
       console.log(error)
     }
    this.isLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.editor-layout {
  max-height: 500px;
  min-height: 500px;
  margin: 20px;
  z-index: 1;
}
</style>
