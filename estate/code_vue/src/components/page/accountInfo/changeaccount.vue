<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">账号信息系统</el-breadcrumb-item>
  <el-breadcrumb-item>账号信息修改</el-breadcrumb-item>
</el-breadcrumb>
 <el-form style="width: 90%" :model="user" status-icon :rules="rules" ref="user" label-width="100px" class="demo-user">
<el-form-item label="员工编号" prop="staffNo" >
    <el-input v-model="user.staffNo" readOnly></el-input>
  </el-form-item>
  <el-form-item label="账号" prop="username">
    <el-input v-model="user.username" ></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="password">
    <el-input v-model="user.password" ></el-input>
  </el-form-item>


  <el-form-item>
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
          staffNo:'',
          username: '',
          password: '',
          access:'',
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
    created(){
        const that = this
    axios.get(url.ip_+"/user/findByStaffNo?staffNo="+this.$route.query.id).then(res => {
    // console.log(res.data);//打印出请求回来的数据
    that.user = res.data.User
    // console.log(that.user)
  })
  .catch(error => {
    console.log(error)
  })

//       axios.get(url.ip_+"/user/findByStaffNo?staffNo="+that.select.staffNo).then(resp => {
//       console.log(resp);
//       if(resp.data.Result=='success')
//       {
//           that.select.disabled = true
//       }
//   })

    
},  
    methods: {
        test(){
            alert(this.user)
        },
      submitForm(formName) {
        const that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
              // console.log(that.user)
              // let obj ={};
              // obj.password =  this.user.password
              // obj.username =  this.user.username
              // for (let i in this.select){
              //     if (this.select[i].staffNo === this.staffNo){
              //         obj.access = this.select[i].access;
              //     }
              // }
              //   obj.staffNo =  this.staffNo
              //   console.log(obj)
            axios.put(url.ip_+"/user/update",that.user).then(resp =>{
                // console.log(resp)
              if(resp.data.Message == 'success'){
                that.$alert('修改成功','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    that.$router.push('/accountCard')
                  }
                })
              }
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