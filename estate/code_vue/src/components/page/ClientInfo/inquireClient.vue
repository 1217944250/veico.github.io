<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">客户信息系统</el-breadcrumb-item>
  <el-breadcrumb-item>查询客户</el-breadcrumb-item>
</el-breadcrumb>
 <el-form style="width: 90%" :model="client" status-icon :rules="rules" ref="client" label-width="100px" class="demo-client">
<el-form-item label="客户编号" prop="guestNo"  >
    <el-input v-model="client.guestNo" size="small"></el-input>
    <el-button power="primary" @click="submitForm('client')">提交</el-button>
    <el-button @click="resetForm('client')">重置</el-button>
    
    </el-form-item>

    <el-form-item label="客户姓名" prop="guestName"  >
    <el-input v-model="client.guestName" size="small"></el-input>
    </el-form-item>
    <el-form-item label="qq" prop="qq"  >
    <el-input v-model="client.qq" size="small"></el-input>
    </el-form-item>
        <el-form-item label="手机" prop="mobilePhone"  >
    <el-input v-model="client.mobilePhone" size="small"></el-input>
    </el-form-item>
        <el-form-item label="固定电话" prop="telephone"  >
    <el-input v-model="client.telephone" size="small"></el-input>
    </el-form-item>
        <el-form-item label="邮箱" prop="email"  >
    <el-input v-model="client.email" size="small"></el-input>
    </el-form-item>
        <el-form-item label="一级单位" prop="primaryUnit"  >
    <el-input v-model="client.primaryUnit" size="small"></el-input>
    </el-form-item>
        <el-form-item label="二级单位" prop="secondaryUnit"  >
    <el-input v-model="client.secondaryUnit" size="small"></el-input>
    </el-form-item>
        <el-form-item label="三级单位" prop="tertiaryUnit"  >
    <el-input v-model="client.tertiaryUnit" size="small"></el-input>
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
        client: {
          guestNo:'',
            guestName:"",
            qq:'',
            email:'',
            mobilePhone:'',
            telephone:'',
            primaryUnit:'',
            secondaryUnit:'',
            tertiaryUnit:'',
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
            alert(this.client.guestNo)
        },
      submitForm(formName) {
        const that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get(url.ip_+"/guest/findByGuestNo?guestNo="+that.client.guestNo).then(resp =>{
                console.log(resp.data.Guest)
                that.client=resp.data.Guest
                console.log(that.client)
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