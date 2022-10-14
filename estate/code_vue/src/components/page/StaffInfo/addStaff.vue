<template>
    <div>
 <el-form style="width: 90%" :model="staff" status-icon :rules="rules" ref="staff" label-width="100px" class="demo-staff">
   <el-form-item label="员工编号" prop="staffNo">
    <el-input v-model="staff.staffNo" ></el-input>
  </el-form-item>
  <el-form-item label="员工姓名" prop="name">
    <el-input v-model="staff.name" ></el-input>
  </el-form-item>
    <el-form-item label="所属部门" prop="department">
    <el-input v-model="staff.department" ></el-input>
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
          name: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' },
          ],
          staffNo: [
            { required: true, message: '请输入员工编号', trigger: 'blur' },
          ],
          department: [
            { required: true, message: '请输入员工所属部门', trigger: 'blur' },
          ],
          post: [
            { required: true, message: '请输入员工职位', trigger: 'blur' },
          ],
          access: [
            { required: true, message: '请输入员工权限', trigger: 'blur' },
          ],
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
            console.log(this.staff)
        },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post(url.ip_+"/staff/create",this.staff).then(resp =>{
                // console.log(resp)
              if(resp.data.Result == 'success'){
                  that.$alert('添加成功','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    that.$router.push('/StaffCard')
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