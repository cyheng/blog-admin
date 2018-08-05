<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>Article</BreadcrumbItem>
      <BreadcrumbItem>文章管理</BreadcrumbItem>
    </Breadcrumb>
    <Content class="content">
      <Table :loading="isLoading" stripe :columns="table_titles" :data="article_data"
       @on-sort-change="sort_method" 	></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="articles_num" :page-size="5" :current="current_page " @on-change="changePage" :show-total="true"></Page>
        </div>
      </div>
    </Content>
  </div>
</template>


<script>
import {  admin_articles_get,  admin_articles_delete,  admin_categories_get} from "@/api/blog-admin-api/index";
export default {
  name: "articles",
  data() {
    return {
      article_data: [],
      articles_num: 0,
      current_page: 1,
      isLoading: true,
      condition:{},
      table_titles: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "分类",
          key: "category",
          render: (e, params) => {
            return e("Tag", { props: {type: "border" } },params.row.category.name);
          },
          filterRemote:(id,col_name) => this.getArticles(this.current_page,{"category":id[0]}) ,
          filters:[],
          filterMultiple:false,
        },
        {
          title: "更新时间",
          key: "updateTime",
          sortable: "custom"
        },
        {
          title: "状态",
          key: "status",
          render: (e, params) => {
            const color = { 草稿: "grey", 发布: "green" }[params.row.status];
            return e(
              "Tag",
              { props: { type: "dot", color: color } },
              params.row.status
            );
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (e, params) => {
            return e("div", [
              e(
                "Button",
                {
                  props: { type: "primary" },
                  style: { margin: "0 15px 5px 0" },
                  on: { click: () => this.$router.push({ path:`editArticle/${params.row.id}` }) }
                },
                "查看"
              ),
              e(
                "Button",
                {
                  props: { type: "error" },
                  style: { margin: "0 15px 5px 0" },
                  on: { click: () => this.comfirmDelete(params.row.id) }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  mounted() {
      this.getArticles(1);
      this.get_category_filters()//分类过滤
  },
  computed: {
   
   
  },
  methods: {
    async getArticles(page,condition, size = 5) {
      this.current_page = page;
      this.isLoading = true;
       
      try {
        const {data} = await admin_articles_get({
          params: Object.assign(this.condition, {page,size}, condition )//condition可能为undifined,用来表示全部
        });
        this.article_data = data.records;
        this.articles_num = data.total;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async get_category_filters(){
      const {data} = await admin_categories_get()
      const catagories = data.records 
      this.table_titles.find((col)=> col.key == 'category')
      .filters = catagories.map((e)=> {
            return {label: e.name,value: e.id,}
          })
    },
    sort_method({ key, order }) {
      this.getArticles(this.current_page,{[key]:order})
    },
 
    changePage(page) {
      this.getArticles(page);
     
    },
    comfirmDelete(id) {
      this.$Modal.confirm({
        title: "确定要删除吗?",
        content: "真的要删除吗",
        onOk: async() => {
         await this.delteArticle(id);
         this.changePage(this.current_page)
        },
        onCancel: () => {
          this.$Message.info("取消删除!");
        }
      });
    },
    async delteArticle(id) {
      try {
        const { data } = await admin_articles_delete({ path: { id } });
        this.articles_num -= 1;
        this.current_page =Math.ceil(this.articles_num / 5) 
        this.$Message.success(data.message);
      } catch (error) {
        console.log(error.response);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
