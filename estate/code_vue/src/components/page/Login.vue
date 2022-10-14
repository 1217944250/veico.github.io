<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">房地产项目设计流程管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
<!--                <p class="login-tips">Tips : 用户名和密码随便填。</p>-->
                <div class="tips"  style="float:left;">
                    <el-link type="white" @click="forgot">忘记密码</el-link>
                </div>
                <div class="tips"  style="float:right;">
                    <el-link type="white" @click="register">还没有账号？点击注册</el-link>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import url from '@/components/page/url'
export default {
    data: function() {
        return {
            param: {
                username: 'admin',
                password: 'admin',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
         forgot(){
            this.$router.push('/forgot');
        },
        register(){
            this.$router.push('/register');
        },
        submitForm() {

            let flag = false;
            const that =this;
            this.$refs.login.validate(valid => {
                if (valid) {
                //     // this.$message.success('登录成功');
                     localStorage.setItem('ms_username', this.param.username);
                    //  this.$router.push('/dashboard');
                     axios.post(url.ip_+"/user/login?userName="+this.param.username+"&password="+this.param.password).then(res =>{
                        //  console.log(res.data)
                         if(res.data.Result === "success")
                         {
                             let useraccess =res.data.User.access
                             localStorage.setItem('trip',JSON.stringify(useraccess))
                             let userstaffno =res.data.User.staffNo
                             localStorage.setItem('king',JSON.stringify(userstaffno))
                             let trip = JSON.parse(localStorage.getItem('trip'));
                             localStorage.setItem('loginInfo',JSON.stringify(res.data.User))
                             console.log(localStorage.getItem('trip'))
                        
                             this.$router.push('/dashboard')
                             that.$message("登入成功"+trip)
                         }
                         else{
                             this.$message("用户名或密码错误")
                         }
                     })

                     
                //     let that = this;
                //     that.$axios.get("/", {
                //         params: {
                //             userna: this.param.username,
                //             pwd: this.param.password
                //         }
                //     }).then(function (response) {
                //       if(response.data === -1)
                //           that.$message.error('用户不存在');
                //       else if (response.data === 0)
                //           that.$message.error('密码错误');
                //       else if (response.data === 1){
                //           that.$message.success('登录成功');
                //           localStorage.setItem('ms_username', that.param.username);
                        //   that.$router.push('/dashboard');
                //       }
                //     }).catch(function (error) {
                //         console.log(error + "(test1)");
                //     });
                // } else {
                //     this.$message.error('请输入账号和密码');
                //     console.log('error submit!!');
                //     return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg3.jpg);
    background-size: 1920px, 1080px;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #000000;
    border-bottom: 1px solid #ddd;
    background-color: rgba(117, 255, 243, 0.03);
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
    background-color: rgba(117, 255, 243, 0.03);
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
/*.register{*/
/*    position: absolute;*/
/*    top:225px;*/
/*    left:251px;*/
/*    text-decoration:underline*/
/*}*/
</style>