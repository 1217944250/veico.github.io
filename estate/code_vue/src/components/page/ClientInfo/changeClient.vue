<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">客户信息系统</el-breadcrumb-item>
  <el-breadcrumb-item>客户信息修改</el-breadcrumb-item>
</el-breadcrumb>
<el-form style="width: 90%" :model="client" status-icon :rules="rules" ref="client" label-width="100px" class="demo-client">
      <el-form-item label="客户编号" prop="guestNo">
    <el-input v-model="client.guestNo" ></el-input>
  </el-form-item>
  <el-form-item label="客户姓名" prop="guestName">
    <el-input v-model="client.guestName" ></el-input>
  </el-form-item>
   <el-form-item label="qq" prop="qq">
    <el-input v-model="client.qq" ></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input  v-model="client.email" ></el-input>
  </el-form-item>
  <el-form-item label="固定电话" prop="telephone">
    <el-input v-model="client.telephone" ></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobilePhone">
    <el-input v-model="client.mobilePhone" ></el-input>
  </el-form-item>
  <el-form-item label="一级单位" prop="primaryUnit">
    <el-input v-model="client.primaryUnit" ></el-input>
  </el-form-item>
  <el-form-item label="二级单位" prop="secondaryUnit">
    <el-input v-model="client.secondaryUnit" ></el-input>
  </el-form-item>
  <el-form-item label="三级单位" prop="tertiaryUnit">
    <el-input v-model="client.tertiaryUnit" ></el-input>
  </el-form-item>


  <el-form-item>
    <el-button power="primary" @click="submitForm('client')">提交</el-button>
    <el-button @click="resetForm('client')">重置</el-button>
    
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
          guestName:'',
          primaryUnit:'',
          secondaryUnit:'',
          tertiaryUnit:'',
          telephone:'',
          mobilePhone:'',
          qq:'',
          email:'',
        },
        rules: {

        }
      };
    },
    created(){
      // alert(this.$route.query.id)
        const that = this
    axios.get(url.ip_+"/guest/findByGuestNo?guestNo="+this.$route.query.id).then(res => {
    // console.log(res.data);//打印出请求回来的数据
    that.client = res.data.Guest
    // console.log(that.user)
  })
  .catch(error => {
    console.log(error)
  })

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
            axios.put(url.ip_+"/guest/update",that.client).then(resp =>{
                // console.log(resp)
              if(resp.data.Message == 'success'){
                that.$alert('修改成功','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    that.$router.push('/ClientCard')
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