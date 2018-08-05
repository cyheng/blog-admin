<template>
    <Modal v-model="visible" title="请输入分类名字" @on-cancel="cancel">
        <add-form @complete="isVaild" :category="category" v-model="categoryName" @enter="submit"></add-form>
        <div slot="footer">
            <Button type="primary" size="large" @click="submit">确定</Button>
        </div>
    </Modal>
</template>


<script>
import { mapGetters } from 'vuex'
import addForm from './addForm'
export default {
  name: "add-category",
  components:{
      addForm
  },
  props: {
    opening: {
      type: Boolean,
      default: false
    },
  },
  data() {
 
    return {
      visible:this.opening,
      categoryName:"",
      
      valid:false
    };
  },

  methods: {
   isVaild(val){
       this.valid = val
   },
    submit() {
        if (this.valid) {
          const name = this.categoryName
          this.$store.dispatch('postCategory',name)
          .then(data=>{
            this.$Message.success("Success!");
             this.$store.dispatch("getAllCategory");
            this.categoryName = ''
            this.valid = false
            this.$emit('update:opening', false)
          })
        } else {
          this.$Message.error("格式不正确");
        }

    },
    cancel() {
      this.$emit('update:opening', false)
    },
   
  },
   computed:{
   ...mapGetters(['category'])
  },
  watch:{
      opening(val){
          this.visible = val
      }
  }
};
</script>
<style lang="scss" scoped>

</style>
