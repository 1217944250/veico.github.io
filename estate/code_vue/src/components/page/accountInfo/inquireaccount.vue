<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">账号信息系统</el-breadcrumb-item>
  <el-breadcrumb-item>查询账号</el-breadcrumb-item>
</el-breadcrumb>
 <el-form style="width: 90%" :model="user" status-icon :rules="rules" ref="user" label-width="100px" class="demo-user">
<el-form-item label="员工编号" prop="staffNo"  >
    <el-input v-model="user.staffNo" size="small"></el-input>
    <el-button power="primary" @click="submitForm('user')">提交</el-button>
    <el-button @click="resetForm('user')">重置</el-button>
    
    </el-form-item>
    <el-form-item label="账号" prop="username"  >
    <el-input v-model="user.username" size="small"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password"  >
    <el-input v-model="user.password" size="small"></el-input>
    </el-form-item>
 </el-form>
    </div>
</template>

<script>
import axios from 'axios';
import url from '@/components/page/url'
  export default {
    data() {
      
      
      
      return {
        user: {
          staffNo:'',
          username: '',
          password: '',
          access:'',
        },
        rules: {
          staffNo: [
            { required: true, message: '请输入员工编号', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
        test(){
            alert(this.user.staffNo)
        },
      submitForm(formName) {
        const that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get(url.ip_+"/user/findByStaffNo?staffNo="+that.user.staffNo).then(resp =>{
                // console.log(that.user.staffNo)
                that.user=resp.data.User
                if(resp.data.Result ==="error")
                {
                  this.$message("员工编号错误")
                }
                // console.log(that.user)
          })
    //       .catch(error => {
    // console.log(error)
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>