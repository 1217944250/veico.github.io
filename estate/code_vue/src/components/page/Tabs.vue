<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-message"></i>  消息盒子</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未审核(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title" width="100px">{{scope.row.module}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span class="message-title" width="150px">{{scope.row.fileName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" width="100px"></el-table-column>
                        <el-table-column prop="uploadTime" width="200px"></el-table-column>
                        <el-table-column width="300px" v-show="access == 1||access == 3||access == 5||access == 7">
                            <template slot-scope="data"  >
                                
                                <el-button size="small"  @click="preview(data)">预览</el-button>
                                <el-button size="small"  @click="download(data)">下载</el-button>
                                 &nbsp;
                                <el-dropdown >
                                  <el-button type="primary">
                                   审核<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                    <el-button size="small" type="success" @click="ok(data)">通过</el-button><br>
                                    <el-button size="small" type="danger" @click="reject(data)">拒绝</el-button>
                                </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="`已审核(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title" width="100px">{{scope.row.module}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span class="message-title" width="150px">{{scope.row.fileName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" width="200px"></el-table-column>
                            <el-table-column prop="uploadTime" width="200px"></el-table-column>
                            <el-table-column width="300px">
                                
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                
            </el-tabs>
        </div>
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
                that.access =trip;
                if(trip ===3||trip===5||trip===7||trip ===1){
                    let fackunread={}
                    this.getdata(fackunread)                  
                }
                if(trip ===4||trip===6||trip===8)
                {
                    axios.get(url.ip_+"/project/file/review/findByStaffNo?staffNo="+king).then(res =>{
                        if(res.data.Result === "success"){
                            for(let i in res.data.ProjectFileReviews){
                        if(res.data.ProjectFileReviews[i].status === 0)
                        {
                            this.unread.push(res.data.ProjectFileReviews[i])
                        }
                        else{
                            this.read.push(res.data.ProjectFileReviews[i])
                        }
                    }
                        }
                    })
                }
            },
        data() {
            
            return {
                message: 'first',
                showHeader: false,
                unread: [],
                read: [],
                recycle: [],
                access:'',
            }
        },
        methods: {
            getdata(fackunread){

                axios.get(url.ip_+"/project/file/review/findAll").then(res =>{
                        if(res.data.Result === "success")
                        {
                            this.fackunread = res.data.ProjectFileReviews
                        }
                        
                        this.getdata2(this.fackunread)
                        for(let i in this.fackunread){
                        if(this.fackunread[i].status === 0)
                        {
                            this.unread.push(this.fackunread[i])
                        }
                        else{
                            this.read.push(this.fackunread[i])
                        }
                    }
                       
                    })
            },
            getdata2(fackunread){
                for(let i in fackunread)
                        axios.get(url.ip_+"/staff/findByStaffNo?staffNo="+fackunread[i].uploader).then(resp =>{
                            fackunread[i]['name']=resp.data.Staff.name
                            // console.log("dada")
                })
                // return this.fackunread
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
            ok(data){
                console.log(data.row)
                let obj = data.row
                // console.log(fackunread)
                axios.put(url.ip_+"/project/file/review/passReview",obj).then(res =>{
                    if(res.data.Result === "success"){
                        this.$alert('审核已通过','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    location.reload();
                  }
                })
                    }
                })
            },
            reject(data){
                this.$prompt('拒绝缘由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          let from ={};
          from = data.row;
          from['suggestion']=value;
          console.log(from)
          axios.put(url.ip_+"/project/file/review/rejectReview",from).then(res =>{
              if(res.data.Result === "success")
              {
                  this.$alert('审核已拒绝','消息',{
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
                const item = this.unread.splice(index, 1);
                console.log(item);
                this.read = item.concat(this.read);
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
        },
        computed: {
            unreadNum(){
                return this.unread.length;
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
</style>

