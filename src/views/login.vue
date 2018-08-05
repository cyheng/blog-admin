<template>
  <div class="container">
    <Form ref="loginForm" :model="loginForm" :rules="loginRules" autocomplete="on" class="loginForm">
      <div class="login-title">
        <h3>登录系统</h3>
      </div>
      <FormItem prop="username">
        <Input v-model="loginForm.username" placeholder="请输入用户名">
        <Icon type="person" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input v-model="loginForm.password" placeholder="请输入密码" type="password">
        <Icon type="locked" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" class="submit-buttom" @click="handleSubmit('loginForm')">登录</Button>
      </FormItem>
    </Form>
     <transition name="slide-fade">
    <Spin  v-if="isLoading" fix>
      <Icon type="load-c" size=18  class="demo-spin-icon-load"></Icon>
      <div>登录中</div>
    </Spin>
     </transition>
  </div>
</template>

<script>
import { login_post } from "@/api/blog-admin-api/index.js";
import { setToken } from "@/auth";
export default {
  name: "login",
  data() {
    return {
      isLoading:false,
      loginForm: {
        username: "admin",
        password: "password"
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请填写登录名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码至少6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.isLoading = true
          this.$store
            .dispatch("login", this.loginForm)
            .then(() => {
              this.isLoading = false
              this.$Message.success('success!')
              this.$router.push({ path: "/home" }); //登录成功之后重定向到首页
            })
            .catch(err => {
              this.isLoading = false
              console.log(err)
            });
        } else {
          this.$Message.error("格式不正确");
        }
      });
    },
    
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #2d3a4b;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-title {
    font-size: 26px;
    font-weight: 400;
    color: #eeeeee;
    text-align: center;
    font-weight: bold;
    margin: 0 0 40px;
  }
  .loginForm {
    width: 400px;
  }
  .submit-buttom {
    width: 100%;
    margin-bottom: 30px;
  }
}
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
