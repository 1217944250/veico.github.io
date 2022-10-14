<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">员工信息系统</el-breadcrumb-item>
  <el-breadcrumb-item>查询员工</el-breadcrumb-item>
</el-breadcrumb>
 <el-form style="width: 90%" :model="staff" status-icon ref="staff" label-width="100px" class="demo-staff">
<el-form-item label="员工编号" prop="staffNo"  >
    <el-input v-model="staff.staffNo" size="small"></el-input>
    <el-button power="primary" @click="submitForm('staff')">提交</el-button>
    <el-button @click="resetForm('staff')">重置</el-button>
    </el-form-item>

    <el-form-item label="员工姓名" prop="name"  >
    <el-input v-model="staff.name" size="small"></el-input>
    </el-form-item>
    <el-form-item label="所属部门" prop="department"  >
    <el-input v-model="staff.department" size="small"></el-input>
    </el-form-item>
    <el-form-item label="职位" prop="post"  >
    <el-input v-model="staff.post" size="small"></el-input>
    </el-form-item>
    <el-form-item label="联系方式" prop="contact"  >
    <el-input v-model="staff.contact" size="small"></el-input>
    </el-form-item>
    <el-form-item label="权限" prop="access"  >
    <el-input v-model="staff.access" size="small"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status"  >
    <el-input v-model="staff.status" size="small"></el-input>
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
        // rules: {
        //  guestName: [
        //     { required: true, message: '请输入客户姓名', trigger: 'blur' },
        //   ],
        //   mobilePhone: [
        //     { required: true, message: '请输入客户电话', trigger: 'blur' },
        //   ],
        //   primaryUnit: [
        //     { required: true, message: '请输入客户单位', trigger: 'blur' },
        //   ],
        // }
      };
    },
    methods: {
        test(){
            alert(this.staff.staffNo)
        },
      submitForm(formName) {
        const that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get(url.ip_+"/staff/findByStaffNo?staffNo="+that.staff.staffNo).then(resp =>{
                console.log(resp.data.Staff)
                that.staff=resp.data.Staff
                console.log(that.staff)
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