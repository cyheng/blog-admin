<template>
    <Modal v-model="openDialog" title="请选择分类" @on-cancel="cancel">
        <Tag v-for="i in category " :key="i.id" type="dot" color="blue" @click.native="selectCategory(i)">{{i.name}}</Tag>
         <Tag @click.native="getMore">More</Tag>
        <Poptip placement="top" v-model="toolTipVisible">
            <Button icon="ios-plus-empty" type="dashed" size="small">{{newCategory||'添加分类' }}</Button>
            <div slot="content">
                <add-form @complete="getVaild" :category="category" v-model="newCategory" @enter="handleAdd"></add-form>
            </div>
        </Poptip>
        <div slot="footer">
            <Button size="large" long @click="cancel">取消</Button>
        </div>
        <Spin size="large" fix v-if="loading"></Spin>
    </Modal>
</template>



<script>
import { mapGetters } from 'vuex'
import addForm from '../category/addForm'
export default {
  name: 'addCategory',
  components: {
    addForm
  },
  model: {
    prop: 'switch',
    event: 'change'
  },
  props: {
    switch: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      isVaild: false,
      openDialog: this.switch,
      loading: false,
      newCategory: '',
      toolTipVisible: false,
      size:5,
    }
  },
  methods: {
    getMore(){
      this.size = this.size + 5;
    
      this.$store.dispatch('getAllCategory',{page:1,size:this.size});
    },
    cancel() {
      this.openDialog = false
      this.$emit('change', false)
    },
    getVaild(val) {
      this.isVaild = val
    },
    handleAdd() {
      if (this.isVaild) {
        const name = this.newCategory
        this.toolTipVisible = false
        this.$store
          .dispatch('postCategory', name)
          .then(data => {
            this.newCategory = ''
            this.$store.dispatch('getAllCategory')
          })
          .catch(({ response }) => {
            console.log(response)
          })
      }
    },
    selectCategory(category) {
      this.openDialog = false
      this.$emit('getCategory', category)
      this.$emit('change', false)
    }
  },
  computed: {
    ...mapGetters(['category'])
  },
  watch: {
    switch(val) {
      this.openDialog = val
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
