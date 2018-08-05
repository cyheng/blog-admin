<template>
    <Menu ref="menu" theme="dark" :active-name=active width="auto">
        <router-link to="/home">
        <MenuItem name="1">
        <Icon type="ios-navigate"></Icon>
        <span>统计情况</span>
        </MenuItem>
        </router-link>
        <Submenu name="2">
            <template slot="title">
                <Icon type="document"></Icon>
                <span>文章</span>
            </template>
            <router-link to="/article/createArticle">
                <MenuItem name="/article/createArticle">创建文章</MenuItem>
            </router-link>
            <router-link to="/article/Articles">
                <MenuItem name="/article/Articles">管理文章</MenuItem>
            </router-link>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="folder"></Icon>
                <span>分类</span>
            </template>
            <router-link to="/home/category">
                <MenuItem name="/home/category">管理分类</MenuItem>
            </router-link>
        </Submenu>
        <Submenu name="4">
            <template slot="title">
                <Icon type="settings"></Icon>
                <span>评论</span>
            </template>
            <router-link to="/home/comments">
                <MenuItem name="/home/comments">管理评论</MenuItem>
            </router-link>
        </Submenu>
        <Submenu name="5">
            <template slot="title">
                <Icon type="help-circled"></Icon>
                <span>关于</span>
            </template>
        <router-link to="/home/user">
            <MenuItem name="/home/user">用户信息</MenuItem>
        </router-link>
        <router-link to="/home/about">
            <MenuItem name="/home/about">关于页</MenuItem>
        </router-link>
        </Submenu>
        
    </Menu>
</template>


<script>
//TODO: 路由变换时，改变亮的MenuItem
export default {
  name: "sidebar",
  data() {
    return {
        active:''
    };
  },
  watch: {
    '$route' (to, from) {
        this.active = to.path
    }
  },
};
</script>

<style lang="scss" scoped>
.ivu-menu{
    z-index: 0;
}
</style>
