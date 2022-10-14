<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">项目信息系统</el-breadcrumb-item>
  <el-breadcrumb-item>查询项目</el-breadcrumb-item>
</el-breadcrumb>
 <el-form style="width: 90%" :model="user" status-icon :rules="rules" ref="user" label-width="100px" class="demo-user">
<el-form-item label="项目编号" prop="projectNo"  >
    <el-input v-model="user.projectNo" size="small"></el-input>
    <el-button power="primary" @click="submitForm('user')">提交</el-button>
    <el-button @click="resetForm('user')">重置</el-button>
    </el-form-item>
 </el-form>
 <el-card v-show="isShow">
       <el-table
         :show-header="false"
         :data="tableData"
         :span-method="objectSpanMethod"
         border
         :cell-style="columnStyle"
         style="width: 100%; margin-top: 20px"
       >
         <el-table-column prop="id" label="ID" width="240">
         </el-table-column>
         <el-table-column width="180" prop="name"></el-table-column>
         <el-table-column prop="amount1"></el-table-column>
         <el-table-column width="180" prop="amount2"></el-table-column>
         <el-table-column prop="amount3"></el-table-column>
       </el-table>
     </el-card>
    </div>
</template>

<script>
import axios from 'axios';
import url from '@/components/page/url'
  export default {
    name: "mallMember-detail",
    data() {
      
      
      return {
          isShow: false,
          rules: {
          projectNo: [
            { required: true, message: '请输入项目编号', trigger: 'blur' },
          ],
        },
        user: {
          projectNo:'',
        },
        dataForm: {},
      };
    },
    computed: {
  //因为数据用到了dataform中的数据，所以写在了computed中
    tableData() {
      return [
        {
          id: this.dataForm.headImg,
          name: "项目编号",
          amount1: this.dataForm.projectNo,
          amount2: "项目名称",
          amount3: this.dataForm.projectName
        },
        {
          id: this.dataForm.headImg,
          name: "所属客户",
          amount1: this.dataForm.guestName,
          amount2: "主要负责人",
          amount3: this.dataForm.principalName
        },
        {
          id: this.dataForm.headImg,
          name: "模型负责人",
          amount1: this.dataForm.modelName,
          amount2: "渲染负责人",
          amount3: this.dataForm.renderName
        },
        {
          id: this.dataForm.headImg,
          name: "后期负责人",
          amount1: this.dataForm.lateName,
          amount2: "开始时间",
          amount3:
            this.dataForm.startTime
        },
        {
          id: this.dataForm.headImg,
          name: "结束时间",
          amount1: this.dataForm.endTime,
          amount2: "项目状态",
          amount3:
            this.dataForm.status
        },
      ];
    }
  },
    methods: {
        test(){
            alert(this.user.staffNo)
        },
      submitForm(formName) {

        const that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get(url.ip_+"/project/info/findByProjectNo?projectNo="+that.user.projectNo).then(resp =>{
                if(resp.data.Result === "success")
                {
                  that.isShow =true
                  that.dataForm=resp.data.ProjectInfoReturn
                }
                if(resp.data.Result === "error")
                {
                  that.$alert("编号有误")
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
      },
      columnStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 || columnIndex == 1 || columnIndex == 3) {
        //第三第四列的背景色就改变了2和3都是列数的下标
        return "background:#f3f6fc;";
      }else{
        return "background:#ffffff;";
      }
    },
    // 和并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    }
  }
</script>