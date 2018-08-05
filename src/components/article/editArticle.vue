<template>
    <div>
        <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Article</BreadcrumbItem>
            <BreadcrumbItem>编辑文章</BreadcrumbItem>
        </Breadcrumb>
        <article-detail  :id="id"></article-detail>
    </div>

</template>
<script>
import articleDetail from "./articleDetail";

export default {
  name: "edit-article",
  components: {
    articleDetail
  },
  
  props: ['id']
};
</script>


<style lang="scss" scoped>

</style>
