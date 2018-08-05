<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>Article</BreadcrumbItem>
      <BreadcrumbItem>分类管理</BreadcrumbItem>
    </Breadcrumb>
    <Content class="content">
      <Button type="primary" @click="isOpenModal = true" :style="{margin:'10px'}">新增</Button>
      <add-dialog :opening.sync="isOpenModal"></add-dialog>
      <Table :loading="isLoading" stripe :columns="table_titles" :data="category"></Table>
    <div style="float: right;">
          <Page :total="total" :page-size="5" :current="current_page" @on-change="changePage" :show-total="true"></Page>
    </div>
    </Content>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import addDialog from './addDialog'
import Edit from './addForm'
export default {
  name: 'category',
  components: {
    addDialog,
    Edit
  },
  data() {
    return {
      isOpenModal: false,
      current_page:1,
      table_titles: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '分类',
          key: 'category',
          render: (e, params) => {
            return e('Tag', { props: { type: 'border' } }, params.row.name)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (e, params) => {
           let name = params.row.name
           let isVaild = false
            return e('div', [
              e(
                'Poptip',
                {
                  props: { title: '请输入新的名字' },
                  style: { margin: '0 15px 5px 0' }
                },
                [
                  e(
                    'Button',
                    {
                      props: { type: 'primary' }
                    },
                    '编辑'
                  ),
                  e('div', { slot: 'content' }, [
                    e(Edit, {
                      props: {
                        categoryName: name,
                        category: this.category,
                        complete: isVaild
                      },
                      on: {
                        change:(val)=>{
                          name = val
                        },
                        complete:(val)=>isVaild = val,
                        enter: () => {
                          if(isVaild)
                            this.edit(params.row.id, name)
                        }
                      }
                    })
                  ])
                ]
              ),
              e(
                'Poptip',
                {
                  props: { confirm: true, title: '您确认删除这条分类吗？' },
                  style: { margin: '0 15px 5px 0' },
                  on: { 'on-ok': () => this.comfirmDelete(params.row.id) }
                },
                [e('Button', { props: { type: 'error' } }, '删除')]
              )
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoadingCategory',
      category: 'category',
      total:'categoryTotal'
    })
  },
  mounted() {
    this.$store.dispatch('getAllCategory',{page:this.current_page})
  },
  methods: {
    changePage(page){
      this.current_page = page
      this.$store.dispatch('getAllCategory',{page})
    },
    comfirmDelete(id) {
      let hasArticle = this.category.find(e => e.id === id) 
      this.$store
        .dispatch('deleteCategory', id)
        .then(() => {
          this.$Message.success('删除成功')
          this.changePage(Math.ceil((this.total-1) / 5))
        })
        .catch(error => {
          console.log(error)
        })
    },
    edit(id, name) {
      this.$store
        .dispatch('changeCategory', {id,name})
        .then(() => {
          this.$Message.success('修改成功')
          this.$store.dispatch('getAllCategory')
        })
        .catch(error => {
          this.$Message.error('未知错误，修改失败')
          console.log(error)
        
          
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
