<template>
    <Header>
        <span class="layout-logo">
            <span class="brand">DORARO博客的后台管理</span>
        </span>
        <div class="layout-nav">
            <Dropdown class="user-icon">
                <Button type="text">
                    <Avatar :src="avatar" size="large" icon="person"/>
                    <span style="color:white">{{name}}</span>
                </Button>
                <DropdownMenu slot="list">
                    <router-link to="/home/user">
                    <DropdownItem>
                        <Icon type="settings" ></Icon>设置</DropdownItem>
                    </router-link>
                    <DropdownItem @click.native="logout">
                        <Icon type="log-out" ></Icon>登出</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
  </Header>
</template>


<script>

import { mapGetters } from 'vuex'
export default {
  name: "myheader",
  data() {
    return {};
  },
  computed:{
     ...mapGetters([
      'name',
      'avatar',
    ])
  },
  methods:{
      logout(){
          this.$store.dispatch('front_logout')
          this.$router.push('login')
      },
     
  }
};
</script>

<style lang="scss" scoped>
.ivu-btn-text:focus {
  box-shadow: none;
}
.user-icon {
  float: right;
}
.layout-logo{
    border-radius: 3px;
    float: left;
    position: relative;
    top: 5px;
    left: 20px;
    .brand{
        color: white;
        padding: 5px;
        text-align: center;
        font-size: 1.3em;

    }
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
