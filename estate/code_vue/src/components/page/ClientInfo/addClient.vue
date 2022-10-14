<template>
    <div>
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
            console.log(this.client)
        },
      submitForm(formName) {
        const that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post(url.ip_+"/guest/create",this.client).then(resp =>{
                // console.log(resp)
              if(resp.data.Message == 'success'){
                  that.$alert('添加成功','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    that.$router.push('/ClientCard')
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