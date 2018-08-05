<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>用户设置</BreadcrumbItem>
    </Breadcrumb>
    <Content class="content">
      <Row :gutter="16">
        <Col span="16">
        <Form :model="formItem" :label-width="80">
          <FormItem prop="name" label="用户名">
            <Input type="text" v-model="name" />
          </FormItem>
          <FormItem label="E-mail" prop="mail">
            <Input v-model="formItem.mail" />
          </FormItem>
          <FormItem label="简介" prop="desc">
            <Input v-model="introduction" type="textarea" :autosize="{minRows: 4,maxRows: 8}" />
          </FormItem>
          <FormItem  prop="save">
            <Button type="primary">保存</Button>
          </FormItem>
        </Form>
        </Col>
        <Col span="8">
        <div class="avatar-container">
          <h2>用户头像</h2>
          <img :src="avatar" class="avatar"  @click="show=true"/>
          <img-upload field="file" :url=uploadUrl :params="params" v-model="show" 
          :headers={Authorization:token}
           :withCredentials="true" @cropSuccess="cropFinish" @cropUploadSuccess="ok"
            @cropUploadFail="fail"></img-upload>
        </div>
        </Col>
      </Row>

    </Content>
  </div>
</template>


<script>
import imgUpload from 'vue-image-crop-upload/upload-2.vue'
import { mapGetters } from 'vuex'
import {baseUrl} from '@/api/blog-admin-api/instance'
export default {
  name: 'user',
  components: {
    imgUpload
  },
  mounted(){
    
  },
  data() {
    return {
      show: false,
      uploadUrl:`${baseUrl}/admin/user/uploadAvatar`,
      params: {
        name: ''
      },
      formItem: {
        mail: '',
        name: '',
        introduction: ''
      }
    }
  },
  methods: {
    cropFinish(imageDataUrl, field) {},
    ok(jsonData, field) {
      const {imgurl} = jsonData
      this.avatar = imgurl
    },
    fail(status, field) {

    }
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'introduction','token'])
  }
}
</script>

<style lang="scss" scoped>
.avatar-container{
  display: flex;
  flex-flow:column;
  align-items: center;
}
.avatar {
  max-height: 200px;
  max-width: 200px;
  min-width: 200px;
  min-height: 200px;
  box-shadow: 1px 1px 1px 1px;
  &:hover{
    opacity: 0.5;
  }
}

</style>
