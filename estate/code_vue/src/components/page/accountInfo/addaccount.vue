<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">账号信息系统</el-breadcrumb-item>
  <el-breadcrumb-item>添加账号</el-breadcrumb-item>
</el-breadcrumb>
 <el-form style="width: 90%" :model="user" status-icon :rules="rules" ref="user" label-width="100px" class="demo-user">
    <el-select v-model="staffNo" placeholder="请选择"    @change="changestaffNo">
    <el-option
      v-for="item in select"
      :key="item.staffNo"
      :label="item.name"
      :value="item.staffNo"
      :disabled="item.disabled"
      >
    </el-option>
  </el-select>
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
          username: '',
          password: '',
        },
        select: {
          staffNo: '',
          name: '',
          access:'',
          disabled: false
        }, 
        staffNo:'',
        access:'',
        rules: {
        }
      };
    },
    created(){
        const that = this
    axios.get(url.ip_+"/staff/findAll").then(res => {
    console.log(res);//打印出请求回来的数据
    that.select = res.data
    console.log(that.select)
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
    changestaffNo(staffNo){
   axios.get(url.ip_+"/user/findByStaffNo?staffNo="+staffNo).then(sfe =>{
       if(sfe.data.Result =='success')
       alert('该用户已注册')
       
   })
},
        test(){
            alert(this.user)
        },
      submitForm(formName) {
        const that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log(this.user)
              let obj ={};
              obj.password =  this.user.password
              obj.username =  this.user.username
              for (let i in this.select){
                  if (this.select[i].staffNo === this.staffNo){
                      obj.access = this.select[i].access;
                  }
              }
                obj.staffNo =  this.staffNo
                console.log(obj)
            axios.post(url.ip_+"/user/register",obj).then(resp =>{
                console.log(resp)
              if(resp.data.Result == 'success'){
                  that.$alert('添加成功','消息',{
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