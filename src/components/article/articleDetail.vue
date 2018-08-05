<template>

  <Content class="content">
    <div class="save-config" >
    <Button type="primary" @click.native="fastSave()">快速保存</Button>
    <Button type="primary" @click.native="fastLoad()">快速读取</Button>
    <Button type="primary" @click.native="cleanFastSave()">清空缓存</Button>
    </div>
    <Form :model="article" label-position="left" ref="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="标题" prop="title">
        <Input v-model="article.title" placeholder="请输入文章标题" />
      </FormItem>
      <FormItem label="摘要说明" prop="summary" >
         <Alert>内容中使用&lt;!-- more --&gt;标签以上的内容为摘要</Alert>
      </FormItem>
      <FormItem id="editor" label="内容" prop="content">
        <mavon-editor ref=md :ishljs="true" v-model="article.content" class="editor-layout"
         @imgAdd="imgAdd" @imgDel="imgDel" @save="fastSave" ></mavon-editor>
      </FormItem>
      <FormItem label="显示toc">
        <i-switch v-model="article.showToc" size="large">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
      <FormItem label="分类" prop="category">
        <Tag type="dot" color="blue" @click.native="changeCategory">{{article.category.name||'请选择'}}</Tag>
        <add-dialog v-model="openDialog" @getCategory="getCategory"></add-dialog>
      </FormItem>
      <FormItem label="允许评论">
        <i-switch v-model="article.allowComment" size="large">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
      <FormItem label="状态">
        <i-switch v-model="article.published" size="large">
          <span slot="open">发布</span>
          <span slot="close">草稿</span>
        </i-switch>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="postArticle('formValidate')">发布</Button>
      </FormItem>
    </Form>
  </Content>

</template>
<script>
import { mavonEditor } from 'mavon-editor'
import addDialog from './addDialog'
import { mapGetters } from 'vuex'
import { getLocalSave, cleanLocalSave, setLocalSave } from '@/autosave'
import {
  admin_article_id_get,
  admin_articles_post,
  admin_articles_put,
  upload_file_post
} from '@/api/blog-admin-api/index'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'article-detail',
  components: {
    mavonEditor,
    addDialog
  },
  props: ['id'],
  created(){
    this.initData()
    this.IntervalSave()
  },
  

  methods: {
    fastSave(){
      const confirm = window.confirm("确定要快速保存吗？");
      if(confirm){
        setLocalSave(this.id, this.article)
        this.$Message.success('成功')
      }
    },
    fastLoad(){
      const confirm = window.confirm("确定要快速读取吗？");
      if(confirm){
        let article = getLocalSave(this.id)
        Object.assign(this.article, article)
        this.$Message.success('成功')
      }
    },
    cleanFastSave(){
      const confirm = window.confirm("确定清除缓存吗？");
      if(confirm){
        cleanLocalSave(this.id)
        this.$Message.success('成功')
      }
    },
    async getArticle(id) {
      try {
        const { data } = await admin_article_id_get(id)
        Object.assign(this.article, data)
        
      } catch (error) {
        console.log(error.response)
      }
    },
    async initData() {
      let article = getLocalSave(this.id)
      if (article) {
        Object.assign(this.article, article)
        cleanLocalSave(this.id)
      } else {
        if (this.id) {
          this.getArticle(this.id)
        }
      }
    },
    getCategory(val) {
      this.article.category = val
    },
    findSummary(){
      const SPLIT = '<!-- more -->'
       const contant = this.article.content 
       if(!contant.includes(SPLIT))
        return;
       const [head,other]=contant.split(SPLIT)
       return head
    },
    postArticle(name) {
      this.article.summary = this.findSummary()
      this.$refs[name].validate(async valid => {

        if (valid) {
          try {
            let { category, ...article } = this.article
            article.categoryId = category.id
            let res
            if (this.id) {
              res = await admin_articles_put(this.id, { data: article })
            } else {
              res = await admin_articles_post({ data: article })
            }
            cleanLocalSave(this.id)
            this.$router.push('/article/Articles')
            this.$Message.success('发布成功!')
          } catch (error) {
            console.log(error)
          }
        } else {
          this.$Message.error('格式错误')
        }
      })
    },

    async IntervalSave() {
      this.interval = setInterval(() => {
        if(this.change){
        let time = new Date().toLocaleTimeString()
       this.$Message.info(`在${time}自动缓存`)
        setLocalSave(this.id, this.article)
        }
      }, 1000 * 30) 
    },
    changeCategory() {
      this.openDialog = true
      this.$store.dispatch('getAllCategory')
    },
   async imgAdd(index, file) {
      let pic = new FormData()
      pic.append('file', file)
      try {
        const {data} = await upload_file_post({ data:pic })
        const url = data.data
        this.$refs.md.$img2Url(index, url)
      } catch (error) {
          console.log(error)
      }
    },
    imgDel(index) {
      console.log('delete '+index)
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  watch:{
    article:{
      deep: true,
      handler(){
        this.change = true
      }
    }
  },
  data() {
    return {
      isLoading:false,
      openDialog: false,
      change:false,
      interval: {},
      article: {
        title: '',
        content: '',
        category: {},
        summary:'',
        published: false,
        showToc: false,
        allowComment: true
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          }
        ],
        summary: [
          {
            required: true,
            message: '摘要不能为空',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '内容不能为空',
            trigger: 'blur'
          }
        ],
        category: [
          {
            required: true,
            trigger: 'blur',
            type: 'object',
            message: '请选择分类'
          }
        ],
        
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.editor-layout {
  max-height: 500px;
  min-height: 500px;
  z-index: 1;
}
.save-config{
  margin: 20px;
}
</style>
