<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">佳成地产</div>
        <div class="header-right">
            <div class="header-user-con">
                <span  style="font-size:12px">  团队员工:</span>
                &nbsp;&nbsp;
                <div v-for="(item,status) in list" :key="status" >
            <div v-if="item.status === 1">
                <el-popover
                    placement="top-start"
                    width="120"
                    trigger="hover">
                    <div >{{item.name}} <span style="color:rgb(12,187,82)">(活跃)</span>
                         </div>
                    <div slot="reference">
                    <img src="https://st-ar.cdn.postman.com/images/avatars-09-9f4d4e7ebf7c58923e43aa7611f2facd.svg" />
                    </div>
                </el-popover>
                

            </div>
            <div v-else >
                 <el-popover
                    placement="top-start"
                    width="120"
                    trigger="hover">
                    <div>{{item.name}}  <span style="color:rgb(169,169,169)">(不活跃)</span> 
                        </div>
                    <div slot="reference">
                    <img  src="../../assets/img/toto.png" />
                    </div>
                </el-popover>
                
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <!--element ui的toolTip组件，effect：背景颜色，placement：出现提示信息的位置，下同-->
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <!--v-if判断是否有消息，即message为真显示该span标签（样式为一个红点），否则不显示-->
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <!-- <el-dropdown-menu slot="dropdown">
                        <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu> -->
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import bus from '../common/bus';
import url from '@/components/page/url'
export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: 'kliven',
            message:'',
            list:[],
            today: ' ',
            
        };
    },
    watch:{	//监听，监听什么？我们在data中定义一个变量，就监听这个变量
			today(){		//被监听的变量，也可以是对象集合等
				//当today中的值变化时，我们就触发定时事件
				this.times()
			}
	},
    computed: {
        username() {
            let loginInfo = localStorage.getItem('loginInfo');
            // return username ? username : this.name;
            return loginInfo.username;
        }
    },
    methods: {
        findDB(){	
            	//这个方法是你要获取后台数据的方法
        			//这里面通过你的axiosUrl获取到一些数据,
        			//怎样为today定义一个变量，那就当前时间，或随机数吧
                const that =this;
                let loginInfo =JSON.parse(localStorage.getItem('loginInfo'));
                axios.get(url.ip_+"/staff/findDepartmentByStaffNo?staffNo="+loginInfo.staffNo).then(res=>{
                if(res.data.Result === "success"){
                        that.list=res.data.Staffs;
                        console.log(that.list)
                 }
                 })
            // console.log(that.list)    
        			that.today = new Date();
            // console.log(that.today)

        	},
        times(){
        	return setTimeout(()=>{
				this.findDB()
			},5000)
		},
        // watch: {
        // list() {
        // this.timer() 
        // }
        // },
        
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command === 'loginout') {
                localStorage.removeItem('loginInfo');
                this.$router.push('/login');
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                // 判断为真，即处于全屏状态，取消全屏
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {   //针对chrome、Safari、Opera浏览器的判断，下同
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {  //针对火狐浏览器的判断，下同
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) { //IE 11，下同
                    document.msExitFullscreen();
                }
            } else {
                // 判断为真，即没有处于全屏状态，request全屏
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    //钩子函数进入加载进页面时调用
    created() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
        this.findDB();
    },
    destroyed() {
        clearTimeout(this.times)
        },
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.staffstatus {
    display: flex;
    height: 70px;
    align-items: center;
}
.header-user-con img {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
