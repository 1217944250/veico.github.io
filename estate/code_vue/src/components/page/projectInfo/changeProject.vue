<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">项目管理系统</el-breadcrumb-item>
  <el-breadcrumb-item>项目信息修改</el-breadcrumb-item>
</el-breadcrumb>
 <el-form style="width: 90%" :model="project" status-icon :rules="rules" ref="project" label-width="150px" class="demo-project">
<el-form-item label="项目编号" prop="projectNo" >
    <el-input v-model="project.projectNo" readonly></el-input>
  </el-form-item>
  <el-form-item label="项目名称" prop="projectName">
    <el-input v-model="project.projectName" ></el-input>
  </el-form-item>
   <el-form-item label="客户编号" prop="guestNo">
    <el-input v-model="project.guestNo" ></el-input>
  </el-form-item>
  <el-form-item label="负责人编号" prop="principalNo">
    <el-input v-model="project.principalNo" ></el-input>
  </el-form-item>
  <el-form-item label="模型负责人">
    <el-select v-model="modelNo" placeholder="请选择"   >
    <el-option
      v-for="item in select1"
      :key="item.modelNo"
      :label="item.name"
      :value="item.modelNo"
      :disabled="item.disabled"
      >
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="渲染负责人">
    <el-select v-model="renderNo" placeholder="请选择"    >
    <el-option
      v-for="item in select2"
      :key="item.renderNo"
      :label="item.name"
      :value="item.renderNo"
      :disabled="item.disabled"
      >
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="后期负责人">
    <el-select v-model="lateNo" placeholder="请选择"   >
    <el-option
      v-for="item in select3"
      :key="item.lateNo"
      :label="item.name"
      :value="item.lateNo"
      :disabled="item.disabled"
      >
    </el-option>
  </el-select>
  </el-form-item>
  
  <el-form-item>
    <el-button power="primary" @click="submitForm('project')">提交</el-button>
    <el-button @click="resetForm('project')">重置</el-button>
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
        project: {
          projectNo:'',
          projectName:'',
          guestNo: '',
          principalNo: '',
          modelNo:'',
          renderNo:'',
          lateNo:'',
        },
        select1: [{
          modelNo: '',
          name: '',
        }], 
        modelNo: '',
        select2: [{
          renderNo: '',
          name: '',
        }], 
        renderNo: '',
        select3: [{
          lateNo: '',
          name: '',
        }], 
        lateNo: '',
        rules: {

        }
      };
    },
    created(){
        const that = this
    axios.get(url.ip_+"/project/info/findByProjectNo?projectNo="+this.$route.query.id).then(res => {
    // console.log(res.data);//打印出请求回来的数据
    that.project = res.data.ProjectInfoReturn
    // console.log(that.user)
  })
  .catch(error => {
    console.log(error)
  })
  axios.get(url.ip_+"/staff/findModelPrincipal").then(res => {
    console.log(res.data);//打印出请求回来的数据
    that.select1 = res.data.Staffs;
    for(let i in that.select1)
    {that.select1[i].modelNo = res.data.Staffs[i].staffNo;}
    console.log(that.select1)
  })
  .catch(error => {
    console.log(error)
  })
  axios.get(url.ip_+"/staff/findRenderPrincipal").then(res => {
    console.log(res.data);//打印出请求回来的数据
    that.select2 = res.data.Staffs;
    for(let i in that.select2)
    {that.select2[i].renderNo = res.data.Staffs[i].staffNo;}

    console.log(that.select2)
  })
  .catch(error => {
    console.log(error)
  })
  axios.get(url.ip_+"/staff/findLatePrincipal").then(res => {
    console.log(res.data);//打印出请求回来的数据
    that.select3 = res.data.Staffs;
    for(let i in that.select3)
    {that.select3[i].lateNo = res.data.Staffs[i].staffNo;}

    console.log(that.select3)
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
           console.log(this.modelNo)
          //  console.log(this.modelNo)
        },
      submitForm(formName) {
        const that=this
        // console.log(this.modelNo)
        this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log(this.modelNo) 
              let obj ={};
              obj = this.project;
              for(let i in this.select1){
                if (this.select1[i].modelNo === this.modelNo){
                      obj.modelNo=this.select1[i].modelNo;
                      // console.log(i)
                      console.log(this.select1[i])
                      console.log(this.select1[i].modelNo)
                  } 
              }
              for(let i in this.select2){
                if (this.select2[i].renderNo === this.renderNo){
                      obj.renderNo =  this.select2[i].renderNo;
                  }
              }
              for(let i in this.select3){
                if (this.select3[i].lateNo === this.lateNo){
                      obj.lateNo=this.select3[i].lateNo;
                  }
              }
              console.log(obj)
            axios.put(url.ip_+"/project/info/publish",obj).then(resp =>{
                // console.log(resp)
              if(resp.data.Result == 'success'){
                that.$alert('分配成功','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    that.$router.push('/projectCard')
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