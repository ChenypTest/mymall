<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in title "
             class="title-item"
             :class="{active:index===currentIndex}"
             @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    data(){
      return{
        title:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    components: {NavBar},
    methods:{
      backClick(){
        this.$router.back()
      },
      titleClick(index){
        this.currentIndex=index
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back{
    text-align: center;
    margin-top: 8px;
  }
</style>
