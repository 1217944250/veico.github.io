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
        <el-table-column label="项目报价" prop="offer"></el-table-column>
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
        <el-table-column label="操作" width="500px" fixed="right">
            <template v-slot="user">
                <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editor(user.row)">分配</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="deleteProject(user.row)">删除</el-button>
                <el-button size="mini" type="warning" icon="el-icon-s-release" plain @click="endProject(user.row)">结束项目</el-button>
                <el-button size="mini" type="primary" icon="el-icon-s-promotion" plain @click="previewFile(user.row)">文件管理</el-button>
                &nbsp;
                <el-dropdown >
                                  <el-button type="primary" plain>
                                   回滚<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                    <el-button size="mini" type="primary" icon="el-icon-d-arrow-left" plain @click="rollbackProject1(user.row)">项目回滚到模型</el-button><br>
                                    <el-button size="mini" type="primary" icon="el-icon-d-arrow-left" plain @click="rollbackProject2(user.row)">项目回滚到渲染</el-button><br>
                                    <el-button size="mini" type="primary" icon="el-icon-d-arrow-left" plain @click="rollbackProject3(user.row)">项目回滚到后期</el-button>
                                </el-dropdown-menu>
                                </el-dropdown>
                
            </template>

        </el-table-column>
    </el-table>
</el-card>
</div>

</template>

<script>
import axios from 'axios';
import url from '@/components/page/url'

export default{
    data(){
        // 桥梁列表数据
        return{
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
            principalNo:'',
            modelNo:'',
            renderNo:'',
            lateNo:'',
            offer:''
            }
        ]
        }
    },
    created(){
        // const this = this
        let loginInfo= JSON.parse(localStorage.getItem('loginInfo'));
        if(loginInfo.access === 3|| loginInfo.access === 1){
            axios.get(url.ip_+"/project/info/findAll").then(res => {
            // console.log(res.data);//打印出请求回来的数据

            this.projectList = res.data.ProjectInfoReturns
            // console.log(this.projectList)
        })
        .catch(error => {
            console.log(error)
        });
        }
        else{
            axios.get(url.ip_+"/project/info/findByPrincipalNo?principalNo="+loginInfo.staffNo).then(res => {
            // console.log(res.data);//打印出请求回来的数据

            this.projectList = res.data.ProjectInfoReturns
            // console.log(this.projectList)
        })
        .catch(error => {
            console.log(error)
        });
        }
    
 
// console.log(this.projectList)

},
  methods:{
    editor(row){
        if(row.status === 0)
        {
        console.log(row.projectNo)
        this.$router.push({
            path:'/changeProject',
            query:{
                id:row.projectNo
            }
        })
        }
        else{
            this.$alert("该项目已启动，不可更改")
        }
    },
    deleteProject(row){
        const that =this
        console.log(row)
         this.$confirm('该操作会将项目文件和任务一并删除，是否继续删除?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete(url.ip_+"/project/info/delete?projectNo="+row.projectNo).then(res => {
            if(res.data.Result == 'success'){
                that.$alert('删除成功','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    location.reload();
                  }
                })
              }

        }
        )
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    },
    previewFile(row){
        if(row.status ===1 || row.status ===2)
        {
                    console.log(row.projectNo)
        this.$router.push({
            path:'/projectmanager',
            query:{
                id:row.projectNo
            }
        })
        }
        else{
            this.$alert("该项目未启动")
        }
    },
    endProject(row){
      const that =this;
      axios.put(url.ip_+"/project/info/finishProject",row).then(res =>{
        if(res.data.Result=== "success"){
          that.$alert('项目已结束','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    location.reload();
                  }
                })
        }
        else{
          that.$alert(res.data.Message,'消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    location.reload();
                  }
                })
        }
      })
    },
    rollbackProject1(row){
      const that =this;
      axios.delete(url.ip_+"/project/info/rollback?projectNo="+row.projectNo+"&destStage="+1).then(res =>{
        if(res.data.Result=== "success"){
          that.$alert('项目已回滚','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    location.reload();
                  }
                })
        }
      })
    },
    rollbackProject2(row){
      const that =this;
      axios.delete(url.ip_+"/project/info/rollback?projectNo="+row.projectNo+"&destStage="+2).then(res =>{
        if(res.data.Result=== "success"){
          that.$alert('项目已回滚','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    location.reload();
                  }
                })
        }
      })
    },
    rollbackProject3(row){
      axios.delete(url.ip_+"/project/info/rollback?projectNo="+row.projectNo+"&destStage="+3).then(res =>{
        if(res.data.Result=== "success"){
          that.$alert('项目已回滚','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    location.reload();
                  }
                })
        }
      })
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