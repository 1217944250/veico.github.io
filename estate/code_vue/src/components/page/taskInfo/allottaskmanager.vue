<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">项目信息系统</el-breadcrumb-item>
  <el-breadcrumb-item>项目任务</el-breadcrumb-item>
  <el-breadcrumb-item>分配任务管理</el-breadcrumb-item>

</el-breadcrumb>
<el-card>
    <el-table :data="projectList" >
        <el-table-column label="任务阶段" prop="taskStage" width="100px"></el-table-column>
        <el-table-column label="任务内容" prop="taskContent" width="200px"></el-table-column>
        <el-table-column label="任务所属者" prop="receiverName"></el-table-column>
        <el-table-column label="分配时间" prop="sendTime"></el-table-column>
        <el-table-column label="结束时间" prop="processTime"></el-table-column>
        <el-table-column label="任务状态" prop="status">
        </el-table-column>
        <el-table-column label="操作" width="230px" fixed="right">
            <template v-slot="user">
                <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="cancelTask(user.row)">取消任务</el-button>
                <el-button size="mini" type="primary" icon="el-icon-delete" plain @click="changeTaskdata(user.row)">修改任务</el-button>
                
            </template>

        </el-table-column>
    </el-table>
</el-card>
<el-dialog title="修改任务" :visible.sync="dialogFormVisible" :modal="true" >
                <el-form :model="form">
                <el-form-item label="任务内容" >
                  <el-input v-model="form.taskContent" autocomplete="off"></el-input>
                </el-form-item>
                </el-form>
                <P>请选择分配人员：</P>  
                <el-select v-model="staffNo" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.staffNo"
                  :label="item.name"
                  :value="item.staffNo">
                </el-option>
              </el-select>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changeTask(form)">确 定</el-button>
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
        dialogFormVisible: false,
        form: {
          taskContent:'',
        },
        kate:''
        }
    },
    created(){
        const that =this;
        console.log(this.$route.query.ment.projectNo)
        let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    axios.get(url.ip_+"/project/task/findByProjectNoAndSenderNo?projectNo="+this.$route.query.ment.projectNo+"&senderNo="+loginInfo.staffNo).then(res => {
    // console.log(res.data.ProjectInfos);//打印出请求回来的数据
    that.projectList = res.data.ProjectTasks;
    // console.log(this.projectList )
  })
  .catch(error => {
    console.log(error)
  })

},
  methods:{
    cancelTask(row){
        // console.log(row);
        let obj ={};
        obj =row;
        // console.log(obj)
        this.$confirm('该任务可能已完成，删除会将任务对应文件删除，是否继续删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(obj)
          axios.delete(url.ip_+"/project/task/delete?taskNo="+obj.no).then(res =>{
            console.log(res.data)
            // if(res.data.Result ==="success"){
            //     that.$alert('删除成功','消息',{
            //       confirmButtonText:'确定',
            //       callback: () =>{
            //         location.reload();
            //       }
            //     })
            // }
        });
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
    changeTaskdata(row){
      this.staffNo =this.$route.query.ment.receiverNo;
      this.dialogFormVisible=true;
      const that = this;
      let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        // let from ={};
        axios.get(url.ip_+"/staff/findDepartmentByStaffNo?staffNo="+loginInfo.staffNo).then(res =>{
          that.options = res.data.Staffs
          // from.receiverNo = that.staffNo
        })
        that.kate = row;
        // console.log(from)

    },
    changeTask(from){
      console.log(from)
      this.kate.receiverNo = this.staffNo
      let obj ={};
      obj = this.kate;
      obj.taskContent = from.taskContent
      console.log(obj)
      axios.put(url.ip_+"/project/task/update",obj).then(res =>{
        if(res.data.Result === "success"){
            this.dialogFormVisible=false;
            this.staffNo = '';
            this.form.taskContent = '';
            this.$alert("分配成功")
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