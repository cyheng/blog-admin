
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <myHeader></myHeader>
            <Layout class="content-layout">
                <Sider>
                    <mySider></mySider>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import myHeader from "@/components/Header";
import mySider from "@/components/Sidebar";
export default {
  components: {
    myHeader,
    mySider,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},

  mounted() {}
};
</script>
<style lang="scss" scoped>
.layout-header-bar {
  background: #fff;

  padding: 0;
}
.ivu-layout-header {
    background: #363e4f;
}


.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
</style>