<template>
  <Form ref="form" :model="form" :rules="addRule" >
            <FormItem prop="categoryName">
                <Input v-model="form.categoryName" placeholder="请输入分类名" @on-blur="blur('form')" @on-enter="sumbit"/>
            </FormItem>
        </Form>
</template>

<script>
export default {
  name:'add-form',
  model:{
    prop: 'categoryName',
    event: 'change'
  },
  props:{
      category:{
          type:Array,
          required:true
      },
      categoryName:{
          type:String,
          default: ''
      }
  },
  data(){
      const validateCategoryName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('分类名不能为空'));
                } else if (this.category.some(e=>e.name === value)) {
                    callback(new Error('存在重名的分类！'));
                } else {
                    callback();
                }
    };
    return {
        form: {
            categoryName: ""
      },
      addRule: {
        categoryName: [{ validator: validateCategoryName, trigger: "blur" }]
      }
    }
  },
  methods:{
      blur(name){
        this.$refs[name].validate(valid => {
        this.$emit('complete',valid)
       
        this.$emit('change',this.form.categoryName)
      });
      },
      sumbit(){
          this.blur("form")
          this.$emit('enter')
      }
  },
  watch:{
      categoryName(val){
          this.form.categoryName = val
      }
  }
}
</script>
