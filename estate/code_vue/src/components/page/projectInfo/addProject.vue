<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">项目管理系统</el-breadcrumb-item>
  <el-breadcrumb-item>增加项目信息</el-breadcrumb-item>
</el-breadcrumb>
 <el-form style="width: 90%" :model="Project" status-icon :rules="rules" ref="Project" label-width="100px" class="demo-Project">
  <el-form-item label="项目名字" prop="projectName">
    <el-input v-model="Project.projectName" ></el-input>
  </el-form-item>
   <el-form-item label="客户编号" prop="guestNo">
    <el-input v-model="Project.guestNo" ></el-input>
  </el-form-item>
   <el-form-item label="负责人编号" prop="principalNo">
    <el-input  v-model="Project.principalNo" ></el-input>
  </el-form-item>
  <el-form-item label="项目报价" prop="offer">
    <el-input v-model="Project.offer" ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button power="primary" @click="submitForm('Project')">提交</el-button>
    <el-button @click="resetForm('Project')">重置</el-button>

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
        Project: {
          guestNo:'',
          projectName:'',
          principalNo:'',
          offer:'',
        },
        rules: {

        }
      };
    },
  //   created(){
  //       const that = this
  //   axios.get(url.ip_+"/guest/findAll").then(res => {
  //   console.log(res);//打印出请求回来的数据
  //   that.select = res.data
  //   console.log(that.select)
  // })
  // .catch(error => {
  //   console.log(error)
  // })
  //   },
    methods: {
        test(){
            console.log(this.Project)
        },
      submitForm(formName) {
        const that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post(url.ip_+"/project/info/create",this.Project).then(resp =>{
                // console.log(resp)
              if(resp.data.Result == 'success'){
                  that.$alert('添加成功','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    that.$router.push('/ProjectCard')
                  }
                })
              }
              
            
          })
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