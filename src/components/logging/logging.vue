<template>
    <div>
        <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>统计情况</BreadcrumbItem>
        </Breadcrumb>
        <Content class="content">
            <div class="logging">
                <h1>本站的建站时间为{{getBirthday}}</h1>
                <h1>网站已经运行了{{time}}</h1>
                <h1>一共发布了{{article_num}}篇文章</h1>
                <h1>一共收到了{{comment_num}}条评论</h1>
                <h1>一共创建了{{category_num}}个分类</h1>
            </div>
        </Content>
    </div>

</template>


<script>
import {count_articles_get,count_categories_get} from '@/api/blog-admin-api/index'
export default {
  name: "logging",
  data(){
      return {
          interval:{},
          article_num:0,
          comment_num:0,
          category_num:0,
          birthday: new Date(2018, 1, 6, 14, 56, 0),
          time:''
      }
  },
  mounted(){
      count_articles_get().then(({data})=>{
          this.article_num = data.data
      })
      count_categories_get().then(({data})=>{
          this.category_num = data.data

      })
      this.interval=setInterval(()=>{
          const {days,hours,minutes,seconds} = this.getRunDay()
          this.time = `${days}天${hours}小时${minutes}分钟${seconds}秒`
          },1000)
  },
  beforeDestroy(){
      clearInterval(this.interval);
  },
  methods:{
      getRunDay(){
          const msPerMin = 1000 * 60
          const msPerHour = msPerMin * 60
          const msPerDay = msPerHour*24
          let diff = new Date().getTime() - this.birthday. getTime()
          let days = Math.floor(diff / msPerDay );
          diff = diff - (days * msPerDay );
          let hours = Math.floor(diff / msPerHour );
          diff = diff - (hours * msPerHour );
          let minutes = Math.floor(diff / msPerMin );
          diff = diff - (minutes * msPerMin );
          let seconds = Math.floor(diff / 1000 );
          return {days,hours,minutes,seconds}
      }
  },
  computed:{
      getBirthday(){
         let year= this.birthday.getFullYear()
         let month= this.birthday.getMonth()+1
         let day= this.birthday.getDate()
          return `${year}年${month}月${day}日`
      },
      
  }
};
</script>


<style lang="scss" scoped>
.logging{
  min-height: 280px;
    
  text-align: center;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
}
</style>
