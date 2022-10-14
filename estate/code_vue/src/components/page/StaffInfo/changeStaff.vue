<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">员工信息系统</el-breadcrumb-item>
  <el-breadcrumb-item>员工信息修改</el-breadcrumb-item>
</el-breadcrumb>
<el-form style="width: 90%" :model="staff" status-icon :rules="rules" ref="staff" label-width="100px" class="demo-staff">
      <el-form-item label="员工编号" prop="staffNo">
    <el-input v-model="staff.staffNo" ></el-input>
  </el-form-item>
        <el-form-item label="员工姓名" prop="name">
    <el-input v-model="staff.name" ></el-input>
  </el-form-item>
        <el-form-item label="所属部门" prop="departmen">
    <el-input v-model="staff.departmen" ></el-input>
  </el-form-item>
        <el-form-item label="职位" prop="post">
    <el-input v-model="staff.post" ></el-input>
  </el-form-item>
        <el-form-item label="联系方式" prop="contact">
    <el-input v-model="staff.contact" ></el-input>
  </el-form-item>
        <el-form-item label="权限" prop="access">
    <el-input v-model="staff.access" ></el-input>
  </el-form-item>
  


  <el-form-item>
    <el-button power="primary" @click="submitForm('staff')">提交</el-button>
    <el-button @click="resetForm('staff')">重置</el-button>
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
         staff: {
          staffNo:'',
            name:'',
            department:'',
            post:'',
            contact:'',
            access:'',
            status:'',
        },
        rules: {
         
        }
      };
    },
    created(){
      // alert(this.$route.query.id)
const that = this
    axios.get(url.ip_+"/staff/findByStaffNo?staffNo="+this.$route.query.id).then(res => {
    // console.log(res.data);//打印出请求回来的数据
    that.staff = res.data.Staff
    // console.log(that.user)
  })
  .catch(error => {
    console.log(error)
  })
},  
    methods: {
        test(){
            alert(this.staff)
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
            axios.put(url.ip_+"/staff/update",that.staff).then(resp =>{
                // console.log(resp)
              if(resp.data.Message == 'success'){
                that.$alert('修改成功','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    that.$router.push('/StaffCard')
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