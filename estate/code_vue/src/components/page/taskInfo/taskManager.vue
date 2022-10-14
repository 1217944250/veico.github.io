<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item>任务中心</el-breadcrumb-item>
</el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未处理(${pending.length})`" name="first">
                    <el-table :data="pending" :show-header="false" style="width: 100%">
                        <el-table-column label="任务类型——任务内容">
                                <template slot-scope="scope">    
                                <span width="150px">{{scope.row.taskStage == 1 ? '"模型"' : (scope.row.taskStage == 2 ? '"渲染"' :'"后期"')}}</span>
                                &nbsp;&nbsp;
                                <span class="message-title" width="150px">{{scope.row.taskContent}}</span>
                                </template>
                            </el-table-column>
                        <el-table-column label="任务名称" prop="projectName" width="200px"></el-table-column>
                        <el-table-column label="发送者" prop="senderName" width="200px"></el-table-column>
                        <el-table-column label="发送时间" prop="sendTime" width="200px"></el-table-column>
                        <el-table-column label="操作" width="200px" fixed="right">
                            <template slot-scope="data">
                                <el-dropdown>
                                  <el-button type="primary">
                                   任务处理<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                    <el-button size="medium" type="success" @click="accept(data)">接受</el-button><br>
                                    <el-button size="medium" type="danger" @click="reject(data)">拒绝</el-button>
                                </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="`进行中(${underway.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="underway" style="width: 100%">
                            <el-table-column label="任务类型——任务内容">
                                <template slot-scope="scope">    
                                <span width="150px">{{scope.row.taskStage == 1 ? '"模型"' : (scope.row.taskStage == 2 ? '"渲染"' :'"后期"')}}</span>
                                &nbsp;&nbsp;
                                <span class="message-title" width="150px">{{scope.row.taskContent}}</span>
                                </template>
                            </el-table-column>
                            
                            <el-table-column label="任务名称" prop="projectName" width="200px"></el-table-column>
                            <el-table-column label="发送者" prop="senderName" width="200px"></el-table-column>
                            <el-table-column label="发送时间" prop="sendTime" width="200px"></el-table-column>
                            <el-table-column label="操作" width="100px" fixed="right">
                                <template slot-scope="data">
                                    <el-dropdown >
                                  <el-button type="primary">
                                   上传<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                    <el-button size="small" type="success" @click="upload(data)">文件上传</el-button><br>
                                    <el-button size="small" type="danger" @click="directUpload(data)">直接上传</el-button>
                                </el-dropdown-menu>
                                </el-dropdown>
                                </template>
                                
                            <!-- <template slot-scope="scope">
                                <el-cascader
                                v-model="value"
                                :options="options"
                                :props="{ expandTrigger: 'hover' }"
                                @change="handleChange"></el-cascader>
                                <el-upload ref="upload"
                            class="upload-demo"
                            action="upload-address"
                            :http-request="(file)=>{return uploadFile(file ,scope.row)}"
                            multiple>
                            <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                                
                            </template> -->
                        </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`已完成(${completed.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="completed"  style="width: 100%">
                            <el-table-column label="任务类型——任务内容">
                                <template slot-scope="scope">    
                                <span width="150px">{{scope.row.taskStage == 1 ? '"模型"' : (scope.row.taskStage == 2 ? '"渲染"' :'"后期"')}}</span>
                                &nbsp;&nbsp;
                                <span class="message-title" width="150px">{{scope.row.taskContent}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="任务名称" prop="projectName" width="200px"></el-table-column>
                            <el-table-column label="发送者" prop="senderName" width="200px"></el-table-column>
                            <el-table-column label="发送时间" prop="sendTime" width="200px"></el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
            <el-dialog title="上传文件" :visible.sync="dialogUploadVisible" :modal="true" >
               <p>请选择上传文件路径：</p>
               <el-cascader
                        v-model="value"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        @change="handleChange"></el-cascader><br>
                <el-upload ref="upload"
                    :limit="1"
                    class="upload-demo"
                    action="upload-address"
                    :http-request="(file)=>{return uploadFile(file ,this.middleData)}"
                    multiple>
                    <el-button size="small" type="primary">点击上传文件</el-button>
                    </el-upload>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogUploadVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ok()">确 定</el-button>
                  </div>
                </el-dialog>
        
    </div>
    
</template>

<script>
import axios from 'axios';
import url from '@/components/page/url';
    export default {
        name: 'tabs',
        created(){
            const that =this
                let king = JSON.parse(localStorage.getItem('king'));
                let trip = JSON.parse(localStorage.getItem('trip'));
                let  temporary ={};
                
                console.log(trip)
            
                    axios.get(url.ip_+"/project/task/findByReceiverNo?receiverNo="+king).then(res =>{
                        // console.log(res.data.ProjectTasks)
                        if(res.data.Result === "success"){
                            temporary =res.data.ProjectTasks;
                            // console.log(temporary)
                        }
                            // console.log(temporary)

                        for(let i in temporary){
                            if(temporary[i].status === 0&&temporary[i].finished === 0){
                                // console.log(temporary[i])
                                that.pending.push(temporary[i])
                            }
                            if(temporary[i].status === 1&&temporary[i].finished === 0){
                                that.underway.push(temporary[i])
                            }
                            if(temporary[i].status === 1&&temporary[i].finished === 1){
                                that.completed.push(temporary[i])
                            }
                        }
                        // console.log(that.pending)
                    })
                        // console.log(that.pending)

                
            },
        data() {
            
            return {
            dialogUploadVisible: false,
            middleData:'',
            options: [{
          value: '模型',
          label: '模型',
          children:[{
           value: '原始模型',
           label: '原始模型',
          },
          {
           value: '最终模型',
           label: '最终模型',
          }
          ]
        }, {
          value: '渲染',
          label: '渲染',
          children:[{
           value: '原始渲染',
           label: '原始渲染',
          },
          {
           value: '最终渲染',
           label: '最终渲染',
          }
          ]
        },{
          value: '后期',
          label: '后期',
          children:[{
           value: '原始后期',
           label: '原始后期',
          },
          {
           value: '最终后期',
           label: '最终后期',
          }
          ]
        }, {
          value: '资料',
          label: '资料'
        }, ],
        value: '',
        fileList:[],
                message: 'first',
                showHeader: false,
                pending: [],
                underway:[],
                completed: [],
            }
        },
        methods: {
            directUpload(data){
                let obj ={};
                obj = data.row;
                console.log(data.row)
                axios.put(url.ip+"/project/task/submit",obj).then(res =>{
                    if(res.data.Result === "success")
                    {
                        this.$alert(提交成功);
                        location.reload();
                    }
                })
            },
            upload(data){
                this.dialogUploadVisible=true;
                // console.log(data.row)
                this.middleData = data.row
            },
            ok(){
                // this.$alert("上传成功")
                // location.reload();
                // console.log(this.fileList);
                axios.post(url.ip_+"/project/file/upload",this.fileList[0]).then(res =>{
                    if(res.data.Result === "success")
                    this.$alert('上传成功，请等待审核','消息',{
                            confirmButtonText:'确定',
                            callback: () =>{
                                location.reload();
                            }
                            })
                    if(res.data.Result === "error"){
                        this.$alert(res.data.Message,'消息',{
                            confirmButtonText:'确定',
                            callback: () =>{
                                location.reload();
                            }
                            })
                    }
                })
                this.middleData ='';
                this.value = '';
                this.dialogUploadVisible=false;
            },
            preview(data)  {
        let fillName = data.row.fileName;
        if(fillName.split(".")[fillName.split(".").length-1] === 'jpg' 
        ||fillName.split(".")[fillName.split(".").length-1] === 'png'
        ||fillName.split(".")[fillName.split(".").length-1] === 'jpeg'
        ||fillName.split(".")[fillName.split(".").length-1] === 'gif'){
          this.$alert(
            "<strong><img src="+url.ip_+"/project/file/download?path="+data.row.fullPath + " width=100% height=100%></strong>"+
          "文件大小:"+data.row.fileSize+'</br>'+
          "上传时间:"+data.row.uploadTime+'</br>'+
          "上传者:"+data.row.uploader
          , 
          data.row.fileName, {
          dangerouslyUseHTMLString:true,
          confirmButtonText: '确定',
        })
        }
        else
        {this.$alert(
          "文件大小:"+data.row.fileSize+'</br>'+
          "上传时间:"+data.row.uploadTime+'</br>'+
          "上传者:"+data.row.uploader
          , 
          data.row.fileName, {
          dangerouslyUseHTMLString:true,
          confirmButtonText: '确定',
        });}

      },
      download(data) {
        let tempUrl=url.ip_+"/project/file/download?path="+data.row.fullPath;
        window.open(tempUrl,"_blank");
        
      },
            accept(data){
                console.log(data)
                axios.put(url.ip_+"/project/task/accept",data.row).then(res =>{
                    if(res.data.Result === "success"){
                        this.$alert('接受成功','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    location.reload();
                  }
                })
                    }
                })
                // axios.put(url.ip_+"/project/file/review/passReview?no="+data.row.no).then(res =>{
                //     if(res.data.Result === "success"){
                //         this.$alert('审核已通过','消息',{
                //   confirmButtonText:'确定',
                //   callback: () =>{
                //     location.reload();
                //   }
                // })
                //     }
                // })
            },
            reject(data){
                this.$prompt('拒绝缘由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          let from ={};
          from = data.row;
          from['reason']=value;
          console.log(from)
          axios.put(url.ip_+"/project/task/reject",from).then(res =>{
              if(res.data.Result === "success")
              {
                  this.$alert('任务已拒绝','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    location.reload();
                  }
                }) 
              }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
        
            },
            handleRead(index) {
                const item = this.pending.splice(index, 1);
                console.log(item);
                this.read = item.concat(this.read);
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            uploadFile(params,row){
                    // console.log("uploadFile", params);
                    console.log(row)
                let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
                const _file = params.file;
                let _path =[];
                for(let i in this.value){
                    _path = _path +"/"+this.value[i]
                };
                const _projectNo = row.projectNo;
                const _staffNo = loginInfo.staffNo;
                const  _principalNo = row.senderNo;
                // const _principalNo = "10001";
                const _taskNo =row.no;
                // 通过 FormData 对象上传文件
                let formData = new FormData();
                formData.append("file", _file);
                formData.append("path",_path);
                formData.append("projectNo",_projectNo);
                formData.append("staffNo",_staffNo);
                formData.append("principalNo",_principalNo);  
                formData.append("taskNo",_taskNo);  
                console.log(formData)
                this.fileList.push(formData)
                console.log(this.fileList)
                
      },
      handleChange(value) {
        console.log(value);
        let _path =[];
      for(let i in this.value){
        _path = _path +"/"+this.value[i]
      };
      console.log(_path)
      },
        },
        computed: {
            pendingNum(){
                return this.pending.length;
            }
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
.el-upload{
    width:100px !important;
    height:30px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 0px solid #00000000;
  }
</style>

