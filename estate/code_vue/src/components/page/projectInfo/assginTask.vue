<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">项目信息系统</el-breadcrumb-item>
  <el-breadcrumb-item>项目资料卡</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
    <el-table :data="projectList" >
        <el-table-column label="项目编号" prop="projectNo" width="100px"></el-table-column>
        <el-table-column label="项目名称" prop="projectName" width="200px"></el-table-column>
        <el-table-column label="所属客户" prop="guestName"></el-table-column>
        <el-table-column label="开始时间" prop="startTime"></el-table-column>
        <el-table-column label="结束时间" prop="endTime"></el-table-column>
        <el-table-column label="主要负责人" prop="principalName"></el-table-column>
        <el-table-column label="模型负责人" prop="modelName" >
          <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>员工编号: {{ scope.row.modelNo }}</p>
            <p v-if="scope.row.modelStatus === 0">状态:未开始 </p>
            <p v-if="scope.row.modelStatus === 1">状态:进行中 </p>
            <p v-if="scope.row.modelStatus === 2">状态:已完成 </p>
            <div slot="reference" class="name-wrapper">
              <el-tag :type="scope.row.modelStatus == 0 ? 'info' : (scope.row.modelStatus == 2 ? 'success' :'')" size="medium">{{ scope.row.modelName }}</el-tag>
            </div>
          </el-popover>
        </template>
        </el-table-column> 
          <el-table-column label="渲染负责人" prop="renderName">
            <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>员工编号: {{ scope.row.renderNo }}</p>
            <p v-if="scope.row.renderStatus === 0">状态:未开始 </p>
            <p v-if="scope.row.renderStatus === 1">状态:进行中 </p>
            <p v-if="scope.row.renderStatus === 2">状态:已完成 </p>
            <div slot="reference" class="name-wrapper">
              <el-tag :type="scope.row.renderStatus == 0 ? 'info' : (scope.row.renderStatus == 2 ? 'success' :'')" size="medium">{{ scope.row.renderName }}</el-tag>
            </div>
          </el-popover>
        </template>
          </el-table-column>
          <el-table-column label="后期负责人" prop="lateName">
            <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>员工编号: {{ scope.row.lateNo }}</p>
            <p v-if="scope.row.lateStatus === 0">状态:未开始 </p>
            <p v-if="scope.row.lateStatus === 1">状态:进行中 </p>
            <p v-if="scope.row.lateStatus === 2">状态:已完成 </p>
            <div slot="reference" class="name-wrapper">
              <el-tag :type="scope.row.lateStatus == 0 ? 'info' : (scope.row.lateStatus == 2 ? 'success' :'')" size="medium">{{ scope.row.lateName }}</el-tag>
            </div>
          </el-popover>
        </template>
          </el-table-column>
        <el-table-column label="项目状态" prop="status"></el-table-column>
        <el-table-column label="操作" width="340px" fixed="right">
            <template v-slot="user">
              <el-dropdown>
                <el-button type="primary">
                  任务处理<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                <el-button size="mini"  type="primary" plain @click="getselectdata(user.row)">分配</el-button>
                
                  <!-- <el-button size="mini" type="primary" plain @click="taskto(user.row,staffNo)">分配2</el-button> -->
                  <el-button size="mini" type="primary" plain @click="tasktoto(user.row,staffNo)">分配任务管理</el-button>
              </el-dropdown-menu>
              </el-dropdown>
 &nbsp;
 
                <el-button size="mini" type="danger" icon="el-icon-s-promotion" plain @click="scheduleSubmitted(user.row)">进度提交</el-button>
                <el-button size="mini" type="primary" icon="el-icon-s-promotion" plain @click="previewFile(user.row)">文件管理</el-button>
            </template>

        </el-table-column>
    </el-table>

</el-card>
    <el-dialog title="任务分配" :visible.sync="dialogSelectVisible" :modal="true" >
                <p>请选择分配人员：</p>
                <el-select v-model="staffNo" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.staffNo"
                  :label="item.name"
                  :value="item.staffNo">
                </el-option>
              </el-select>
              <p>请输入任务内容：</p>
              <el-input v-model="input" placeholder="请输入内容"></el-input>  
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogSelectVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ok(input)">确 定</el-button>
                  </div>
                </el-dialog>
</div>

</template>

<script>
import axios from 'axios';
import url from '@/components/page/url'

export default{
    data(){
        // 桥梁列表数据
        return{
        input: '',
        kate:'',
        projectList:[
            {
            projectNo:'',
            projectName:"",
            guestName:'',
            principalName:'',
            modelName:'',
            renderName:'',
            lateName:'',
            startTime:'',
            endTime:'',
            status:'',
            }
        ],
        options: [{
          name:'',
          staffNo:'',
        }],
        staffNo: '',
        dialogSelectVisible:false,
        }
    },
    created(){
        const that = this
    axios.get(url.ip_+"/project/info/findAll").then(res => {
    // console.log(res.data.ProjectInfos);//打印出请求回来的数据
    that.projectList = res.data.ProjectInfoReturns
  })
  .catch(error => {
    console.log(error)
  })

},
  methods:{
    getselectdata(row){
      console.log(this.staffNo)
      this.dialogSelectVisible=true
      const that = this;
      let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        let from ={};
        axios.get(url.ip_+"/staff/findDepartmentByStaffNo?staffNo="+loginInfo.staffNo).then(res =>{
          that.options = res.data.Staffs
          // from.receiverNo = that.staffNo
        })
        
        from.projectNo=row.projectNo;
        from.senderNo=loginInfo.staffNo;
        if(loginInfo.access ===3){from.taskStage = 1};
        if(loginInfo.access ===5){from.taskStage = 2};
        if(loginInfo.access ===7){from.taskStage = 3};
        // from.taskContent =that.input;
        that.kate=from;
        
    },
    ok(input){
      this.kate.receiverNo = this.staffNo
      if(input){
        this.kate.taskContent = input;
          axios.post(url.ip_+"/project/task/assign",this.kate).then(res =>{
          if(res.data.Result === "success"){
            
            this.$alert("分配成功")
            this.dialogSelectVisible=false;
            this.staffNo = '';
            this.input = '';
          }
        })
        }
    },
    scheduleSubmitted(row){
      const that = this;
      let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
      let obj ={};
      obj = row;
      obj.staffNo=loginInfo.staffNo
      let flag=0;
      if(loginInfo.access === 3&&row.modelStatus === 2){
        that.$alert("该阶段已结束")
      }
      if(loginInfo.access === 3&&row.modelStatus === 1){
        axios.get(url.ip_+"/project/task/checkAllTasksFinished?projectNo="+row.projectNo+"&senderNo="+loginInfo.staffNo).then(res =>{
           if(res.data.Message === "该项目还有未完成任务"){
               that.$alert("该项目还有未完成任务")
           }
           else{
              obj.modelStatus = 2;
              obj.renderStatus =1;
              flag =1;
           }
        })
      }
      if(loginInfo.access === 5&&row.renderStatus === 0){
        that.$alert("模型尚未完成，无法进行渲染阶段提交")
      }
      if(loginInfo.access === 5&&row.renderStatus === 2){
        that.$alert("该阶段已结束")
      }
      if(loginInfo.access === 5&&row.renderStatus === 1){
        axios.get(url.ip_+"/project/task/checkAllTasksFinished?projectNo="+row.projectNo+"&senderNo="+loginInfo.staffNo).then(res =>{
           if(res.data.Message === "该项目还有未完成任务"){
               this.$alert("该项目还有未完成任务")
           }
           else{
              obj.renderStatus = 2;
              obj.lateStatus =1;
              flag =1;
           }
        })
      }
      if(loginInfo.access === 7&&row.lateStatus === 0){
        that.$alert("渲染尚未完成，无法进行后期阶段提交")
      }
      if(loginInfo.access === 7&&row.lateStatus === 2){
        that.$alert("该阶段已结束")
      }
      if(loginInfo.access === 7&&row.lateStatus === 1){
        axios.get(url.ip_+"/project/task/checkAllTasksFinished?projectNo="+row.projectNo+"&senderNo="+loginInfo.staffNo).then(res =>{
           if(res.data.Message === "该项目还有未完成任务"){
               this.$alert("该项目还有未完成任务")
           }
           else{
              obj.lateStatus = 2;
              flag =1;
           }
        })
      }
      if(flag ===1){
        axios.put(url.ip_+"/project/info/submitStage",obj).then(res =>{
          if(res.data.Result === "success")
          {
            that.$alert("目标阶段提交成功")
          }
        })
      }
    },
    previewFile(row){
        console.log(row.projectNo)
        this.$router.push({
            path:'/projectmanager',
            query:{
                id:row.projectNo
            }
        })
    },
    tasktoto(row){
      console.log(row);
        // console.log(row.projectNo)
        this.$router.push({
            path:'/allottaskmanager',
            query:{
                ment:row,
            }
        })
    },
    taskto(row){
    }
}
};

</script>

<style >
.title {
        margin: 10px 0;
        text-align: center;
    }

</style>