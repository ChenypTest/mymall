<template>

  <div id="home">
    <nav-bar class="home-nav" >
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <tab-control  ref="tabControl1"
                  :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  class="tab-control"
                  v-show="isTabFixed"
    />

    <scroll class="content" ref="scroll"
            @scroll="contentScroll"
            :probe-type="3"
            :pullUpLoad="true"
            @pullUp="pullUp"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control  ref="tabControl2"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"/>
      <goods-list :goods="goodShow"/>
    </scroll>
    <back-top @click.native="btnClick" v-show="isShowTop" />
  </div>


</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import GoodsList from "./goods/GoodsList";
  import BackTop from "../../components/content/backtop/BackTop";
  import {getHomeMultidata,getHomeGoods} from 'network/home'

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import Scroll from "components/common/scroll/Scroll";


  export default {
    name: "Home",
    components:{
      BackTop,
      Scroll,
      HomeSwiper,
      NavBar,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList
    },
    computed:{
      goodShow(){
        return this.goods[this.goodsKey].list
      }
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        goodsKey:'pop',
        isShowTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata();
      //2请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      const refresh=this.debounce(this.$refs.scroll.imgRefresh,200)

      this.$bus.$on('itemImageLoad',()=>{
        // console.log('调用了');
        // this.$refs.scroll.imgRefresh()
        refresh()
      })
      //获取当前的tabControl的offsetTop
    },
    destroyed(){
      console.log('销毁了');
    },
    activated(){
      this.$refs.scroll.goTop(0,this.saveY,0)
      this.$refs.scroll.imgRefresh()
    },
    deactivated(){
      this.saveY=this.$refs.scroll.getScrollY()
    },
    methods:{
      /**
       * 防抖函数
       */
      debounce(func,delay){
        let timer=null
        return function (...args) {

          if (timer) clearTimeout(timer)
          timer=setTimeout(()=>{
            func.apply(this,args)
          },delay)
        }
      },
      //获取数据
      tabClick(index){
        // console.log(index);
        switch (index) {
          case 0:
            this.goodsKey='pop';
            break
          case 1:
            this.goodsKey='new';
            break
          case 2:
            this.goodsKey='sell'
            break
        }
        this.$refs.tabControl1.conIndex=index
        this.$refs.tabControl2.conIndex=index
      },
      //top点击
      btnClick(){
        this.$refs.scroll.goTop(0,0)
      },
      //上拉获取数据
      pullUp(){
        this.getHomeGoods(this.goodsKey)
      }
      ,
      //动态获取坐标
      contentScroll(position){
        // console.log(position);
        this.isShowTop=-position.y>1000
        this.isTabFixed=-position.y>this.tabOffsetTop
        // console.log(this.isTabFixed);

      },
      //获取上层坐标
      swiperImageLoad(){
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
        // console.log(this.tabOffsetTop);
      }
      ,
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res);
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list);
          // console.log(res);//pop的第一页
          //page+1
          this.goods[type].page+=1;
          // alert(this.goods[type].page)
          this.$refs.scroll.finishUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    position: relative;
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .content{
    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
