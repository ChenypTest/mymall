<template>
  <div>
    <detail-nav-bar/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  export default {
    name: "Detail",
    components: {
      DetailNavBar
    },
    data(){
      return{
        iid:null
      }
    },
    created() {
      // console.log(this.$route.query.iid);
      this.iid=this.$route.query.iid
    }
  }
</script>

<style scoped>

</style>
