<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">项目文件系统</el-breadcrumb-item>
  <el-breadcrumb-item>项目初始化</el-breadcrumb-item>
</el-breadcrumb>
 <el-form style="width: 90%" :model="user" status-icon :rules="rules" ref="user" label-width="100px" class="demo-user">
<el-form-item label="项目编号" prop="projectNo"  >
    <el-input v-model="user.projectNo" size="small"></el-input>
    <el-button power="primary" @click="submitForm('user')">提交</el-button>
    <el-button @click="resetForm('user')">重置</el-button>
    
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
          projectNo:'',
        },
        rules: {
          user_no: [
            { required: true, message: '请输入员工编号', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入员工名字', trigger: 'blur' },
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
                console.log(resp.data.User)
                that.user=resp.data.User
                console.log(that.user)
          })
    //       .catch(error => {
    // console.log(error)
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>