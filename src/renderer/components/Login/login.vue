<template>
    <div id="login_app">
        <div id="login_content">
            <h3 id="title">Mavis</h3>
            <div id="info">
                <!-- <el-avatar :size="100" :src="headUrl"></el-avatar> -->
                <el-button type="primary" round @click="alilogin">支付宝扫码登录</el-button>
                <!-- <el-input style="display:block" id="username_content" v-model="username" placeholder="请输入账户名" type="string" clearable size="mini"></el-input> -->
            </div>
        </div>
        <div id="login_particles">
            <!-- color: String类型。默认'#dedede'。粒子颜色。
            particleOpacity: Number类型。默认0.7。粒子透明度。
            particlesNumber: Number类型。默认80。粒子数量。
            shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
            particleSize: Number类型。默认80。单个粒子大小。
            linesColor: String类型。默认'#dedede'。线条颜色。
            linesWidth: Number类型。默认1。线条宽度。
            lineLinked: 布尔类型。默认true。连接线是否可用。
            lineOpacity: Number类型。默认0.4。线条透明度。
            linesDistance: Number类型。默认150。线条距离。
            moveSpeed: Number类型。默认3。粒子运动速度。
            hoverEffect: 布尔类型。默认true。是否有hover特效。
            hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
            clickEffect: 布尔类型。默认true。是否有click特效。
            clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"
            要是还想设置背景的话，可以直接给#particles-js这个id样式中添加背景图片和颜色
            -->
            <vue-particles
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="60"
            shapeType="circle"
            :particleSize="4"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.5"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            >
            </vue-particles>
        </div>
    </div>
</template>

<script>
import {guid} from '../../assets/js/common.js'
export default {
    name: 'login',
    data() {
        return {
            username : '',
            headUrl : 'src/renderer/components/Login/imgs/head.jpg',
        }
    },
    mounted() {
        console.log(this.$route)
        // 清空登录状态
        this.$store.dispatch('setAuth', {})
        this.$store.dispatch('setUid', '')
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
        },
    },
    methods:{
        login: function() {
            this.$router.push('/index')
        },
        alilogin: function() {
            const that = this;
            // console.log(uid)
            var uid = guid()
            var login_window
            that.$store.dispatch('setUid', uid)
            console.log(uid)
            //判断当前浏览器是否支持WebSocket
            if ("WebSocket" in window) {
                var socket = new WebSocket(
                "ws://sbaby808.com:8088/mavis/" + uid
                );
                //连接发生错误的回调方法
                socket.onerror = function() {
                    console.log('ws error')
                };
                //连接成功建立的回调方法
                socket.onopen = function(event) {
                    console.log('ws success')
                }; 
                //接收到消息的回调方法
                socket.onmessage = function(event) {
                    console.log(event.data)
                    that.$store.dispatch('setAuth', JSON.stringify(event.data))
                    login_window.close()
                    socket.close()
                    that.$router.push('/')
                };
                //连接关闭的回调方法
                socket.onclose = function() {
                    console.log('ws close')
                };
                //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
                // window.onbeforeunload = function() {
                //     this.websocket.close();
                // };
            } else {
                alert("不支持建立socket连接");
            }
            login_window = window.open('https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021002129638214&scope=auth_base,auth_user&redirect_uri=' +
                encodeURIComponent('http://sbaby808.com:8088/wscontrol/login_callback?topic=' + uid))
            // login_window.onbeforeunload = function() {
            //     that.socket.close();
            // }
        }
    },
    watch:{
        username : function(val) {
            if(val == '') {
                document.getElementById("username_content").style.backgroundColor = 'transparent'
            } else {
                document.getElementById("username_content").style.backgroundColor = '#fff'
            }
        }
    }
}
</script>

<style>
#particles-js {
    background-image: url(imgs//sky.871d198.jpg);
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
#login_content {
    color: #fff;
    z-index: 999;
    font-size: 7rem;
    font-family: Teko,sans-serif;
    text-shadow: 8px 8px #000;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
    position: relative;
}
#login_particles {
    z-index: 1;
}
#login_app {
    height: 100%;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    color: #2c3e50;
}
#username_content {
    text-align: center;
    width: 25%;
    margin: 0;
    background-color: transparent;
}
#title {
    margin-top: 8%;
    margin-bottom: 5%;
}
#info {
    padding: 0%;
    margin: 0%;
}
</style>