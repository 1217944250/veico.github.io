<template>
<!--    <div class="forgot-wrap">-->
<!--        <div class="steps">-->
<!--            <el-steps :active="active" finish-status="success">-->
<!--                <el-step title="步骤 1"></el-step>-->
<!--                <el-step title="步骤 2"></el-step>-->
<!--                <el-step title="步骤 3"></el-step>-->
<!--            </el-steps>-->
<!--            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>-->
<!--        </div>-->

<!--    </div>-->

    <h1>请联系前台或管理员<br><router-link to="/login">点击返回登录</router-link></h1>
</template>

<script>
    export default {
        name: "forgot",
        data:function() {
            return {
                active: 0
            };
        },

        methods: {
            next() {
                if (this.active++ > 2) this.active = 0;
            }
        }
    }
</script>

<style scoped>
.forgot-wrap{
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg3.jpg);
    background-size: 1920px, 1080px;
}
.steps{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}


</style>