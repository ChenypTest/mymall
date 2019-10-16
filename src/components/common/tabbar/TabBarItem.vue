<template>
  <div class="tab-bar-item" @click="btnClick">
    <div v-if="isAction">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-action"></slot>
    </div>

    <div :class="{active:!isAction}">
      <slot name="item-text"></slot>
    </div>

  </div>
<!--  <div class="tab-bar-item">-->
<!--    <img src="../../assets/img/tabbar/home.svg"  alt="">-->
<!--    <div>首页</div>-->
<!--  </div>-->
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String
    },
    data(){
      return{
        // isAction:true
      }
    },
    computed:{
      isAction(){
        return this.$route.path.indexOf(this.path) ==-1
      }
    },
    methods:{
      btnClick(){
        try{
          this.$router.push(this.path).catch(err => { console.log(err) })
        }catch (err) {

        }

      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
  .active{
    color: red;
  }
</style>
