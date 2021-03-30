<template>
    <el-container>
        <el-aside width="60px" id="toolbar">Aside</el-aside>
        <el-container>
          <el-aside width="250px" id="msglist">Aside</el-aside>
          <el-main id="msgcontent">Main</el-main>
        </el-container>
      </el-container>
</template>

<script>
export default {
    name: 'container',
    mounted: function() {
        // debugger;
        console.log("index:")
        console.log(this.$route);
        console.log(JSON.stringify(this.authInfo) === '"{}"')
        if(JSON.stringify(this.authInfo) === '"{}"') {
            this.$router.push('/login')
        }
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
    },
}
</script>

<style>
.el-aside, .el-main {
    height: -webkit-fill-available;
    text-align: center;
}
#toolbar {
    background-color: #00212B;
    color: #333;
}
#msglist {
    background-color: #D9ECFF;
    color: #333;
}
#msgcontent {
    background-color: #ECF5FF;
    color: #333;
}
</style>