<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" @click="itemClick(index)"
         class="tab-control-item" :class="{action:index===conIndex}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        conIndex:0
      }
    },
    methods:{
      itemClick(index){
        // alert('点击了')
        this.conIndex=index ;
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
  }
  .action{
    color: var(--color-high-text);

  }
  .action span{
    padding: 5px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>
