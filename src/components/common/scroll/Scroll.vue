<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    },
    data(){
      return{
        scroll:null,
        isShowTop:false
      }
    },
    mounted() {
      // console.log(this.$refs.wrapper);
      this.scroll=new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })
      //监听滚动的位置
      this.scroll.on('scroll',(position)=>{
        //发送
        // console.log(position);
        this.$emit('scroll',position)
      })
      this.scroll.on('pullingUp',()=>{
        //上拉加载更多
        // console.log('pullingUp');
        this.$emit('pullUp')
      })
    },
    methods:{
      goTop(x,y,time=300){
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
      },
      finishUp(){
        this.scroll.finishPullUp()
      },
      imgRefresh(){
        this.scroll && this.scroll.refresh()
        // console.log('------');
      }
    }
  }
</script>

<style scoped>

</style>
