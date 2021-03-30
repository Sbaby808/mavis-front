<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'mavis-front',
    mounted(){
      //添加监听事件  
      window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    },
    methods:{
      beforeunloadHandler(e){
        this.$store.dispatch('setAuth', JSON.stringify({}));
        this.$store.dispatch('setUid', '');
      }
    },
    beforeDestroy() {
        // 退出应用前清空vuex中的信息
        this.$store.dispatch('setAuth', JSON.stringify({}));
        this.$store.dispatch('setUid', '');
    },
    destroyed() {
        window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    },
    computed: {
      authInfo:{
            get() {
                return this.$store.state.Counter.authInfo;
            },
            set(val) {
                this.$store.dispatch('setAuth', val);
            }
        },
        uid:{
            get() {
                return this.$store.state.Counter.uid;
            },
            set(val) {
                this.$store.dispatch('setUid', val);
            }
        }
    }
  }
</script>

<style>
  /* CSS */
</style>
