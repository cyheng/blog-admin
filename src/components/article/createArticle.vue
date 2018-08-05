<template>
    <div>
        <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Article</BreadcrumbItem>
            <BreadcrumbItem>创建文章</BreadcrumbItem>
        </Breadcrumb>
        <article-detail ></article-detail>
    </div>

</template>
<script>
import articleDetail from "./articleDetail";

export default {
  name: "create-article",
  
  components: {
    articleDetail
  },
  
};
</script>


<style lang="scss" scoped>

</style>
