<template>
  <div class="custom-tree-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">项目文件系统</el-breadcrumb-item>
  <el-breadcrumb-item>文件管理</el-breadcrumb-item>
</el-breadcrumb>
  <div class="block">
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      accordion>
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button 
            v-show="data.isDisplay"
            type="text"
            size="mini"
            @click="() => preview(data)">
            预览
          </el-button>
          <el-button
            v-show="data.isDisplay"
            type="text"
            size="mini"
            @click="() => download(node, data)">
            下载
          </el-button>
          <el-button
            v-show="data.isDisplay"
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-row>
  <el-col :span="4"><div class="block">
</div></el-col>

  <el-col :span="4"><div class="grid-content bg-purple-light">
    &nbsp;&nbsp;
    <el-upload ref="upload"
  class="upload-demo"
  action="upload-address"
  :http-request="uploadFile"
  multiple>
  <el-button size="small" type="primary">点击上传资料</el-button>
</el-upload>
    </div></el-col>
</el-row>
  </div>
</div>
</template>
<script>
import axios from 'axios';
import url from '@/components/page/url'
  let id = 1000;

  export default {
    data() {
      const data = [{
        id: 1,
        label: '模型',
        isDisplay:false,
        children: [{
          id:5,
          label: '原始模型',
          isDisplay:false,
          children: []
        },
        {
          id: 6,
          label: '最终模型',
          children: []
        }
        ]
      }, {
        id: 2,
        label: '渲染',
        isDisplay:false,
        children: [{
          id: 7,
          label: '原始渲染',
          children: []
        },
        {
          id: 8,
          label: '最终渲染',
          children: []
        }
        ]
      }, {
        id: 3,
        label: '后期',
        isDisplay:false,
        children: [{
          id: 9,
          label: '原始后期',
          children: []
        },
        {
          id: 10,
          label: '最终后期',
          children: []
        }
        ]
      },
      {
        id: 4,
        label: '资料',
        isDisplay:false,
        children: []
      }];
      return {
        address:'',
        data: JSON.parse(JSON.stringify(data)),
        data: JSON.parse(JSON.stringify(data))
      }
    },
    created(){
      const that =this
      console.log(this.$route.query.id)
    axios.get(url.ip_+"/project/file/findByProjectNo?projectNo="+this.$route.query.id).then(res => {
    // console.log(res.data.ProjectFiles);//打印出请求回来的数据
    console.log(that.data[0].children[0].children)
    let m=0;let h=0;
    for(let i in res.data.ProjectFiles){
      if(res.data.ProjectFiles[i].detail === '最终模型'){
      that.data[0].children[1].children.push(res.data.ProjectFiles[i]);
      that.data[0].children[1].children[m].label=res.data.ProjectFiles[i].fileName;m++;}
      if(res.data.ProjectFiles[i].detail === '原始模型'){
      that.data[0].children[0].children.push(res.data.ProjectFiles[i]);
      that.data[0].children[0].children[h].label=res.data.ProjectFiles[i].fileName;h++;}
    }
    let o=0;let p=0;
    for(let i in res.data.ProjectFiles){
      if(res.data.ProjectFiles[i].detail === '最终渲染'){
      that.data[1].children[1].children.push(res.data.ProjectFiles[i]);
      that.data[1].children[1].children[o].label=res.data.ProjectFiles[i].fileName;o++;}
      if(res.data.ProjectFiles[i].detail === '原始渲染'){
      that.data[1].children[0].children.push(res.data.ProjectFiles[i]);
      that.data[1].children[0].children[p].label=res.data.ProjectFiles[i].fileName;p++;}
    }
    let a=0;let s=0;
    for(let i in res.data.ProjectFiles){
      if(res.data.ProjectFiles[i].detail === '最终后期'){
      that.data[2].children[1].children.push(res.data.ProjectFiles[i]);
      that.data[2].children[1].children[a].label=res.data.ProjectFiles[i].fileName;a++;}
      if(res.data.ProjectFiles[i].detail === '原始后期'){
      that.data[2].children[0].children.push(res.data.ProjectFiles[i]);
      that.data[2].children[0].children[s].label=res.data.ProjectFiles[i].fileName;s++;}
    }
    let w=0;
    for(let i in res.data.ProjectFiles){
      if(res.data.ProjectFiles[i].module === '资料'){
      that.data[3].children.push(res.data.ProjectFiles[i]);
      that.data[3].children[w].label=res.data.ProjectFiles[i].fileName;w++;}
    }
    for(let i in that.data[0].children[0].children)
    {
      that.data[0].children[0].children[i].isDisplay=true
    }
    for(let i in that.data[0].children[1].children)
    {
      that.data[0].children[1].children[i].isDisplay=true
    }
    for(let i in that.data[1].children[0].children)
    {
      that.data[1].children[0].children[i].isDisplay=true
    }
    for(let i in that.data[1].children[1].children)
    {
      that.data[1].children[1].children[i].isDisplay=true
    }
    for(let i in that.data[2].children[0].children)
    {
      that.data[2].children[0].children[i].isDisplay=true
    }
    for(let i in that.data[2].children[1].children)
    {
      that.data[2].children[1].children[i].isDisplay=true
    }
    for(let i in that.data[3].children)
    {
      that.data[3].children[i].isDisplay=true
    }
    console.log(that.data[0].children[0].children)
    // console.log(that.data)
  })
  .catch(error => {
    console.log(error)
  })

},
    methods: {
      preview(data)  {
        let fillName = data.fileName;
        if(fillName.split(".")[fillName.split(".").length-1] === 'jpg' 
        ||fillName.split(".")[fillName.split(".").length-1] === 'png'
        ||fillName.split(".")[fillName.split(".").length-1] === 'jpeg'
        ||fillName.split(".")[fillName.split(".").length-1] === 'gif'){
          this.$alert(
            "<strong><img src="+url.ip_+"/project/file/download?path="+data.fullPath + " width=100% height=100%></strong>"+
          "文件大小:"+data.fileSize+'</br>'+
          "上传时间:"+data.uploadTime+'</br>'+
          "上传者:"+data.uploader
          , 
          data.fileName, {
          dangerouslyUseHTMLString:true,
          confirmButtonText: '确定',
        })
        }
        else
        {this.$alert(
          "文件大小:"+data.fileSize+'</br>'+
          "上传时间:"+data.uploadTime+'</br>'+
          "上传者:"+data.uploader
          , 
          data.fileName, {
          dangerouslyUseHTMLString:true,
          confirmButtonText: '确定',
        });}

      },
      uploadFile(params){
        console.log("uploadFile", params);
        let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
      const _file = params.file;
      let _path =[];
      for(let i in this.value){
        _path = _path +"/资料"
      };
      const _projectNo = this.$route.query.id;
      const _staffNo = loginInfo.staffNo;
      const _principalNo = loginInfo.staffNo;

      // 通过 FormData 对象上传文件
      let formData = new FormData();
      formData.append("file", _file);
      formData.append("path",_path);
      formData.append("projectNo",_projectNo);
      formData.append("staffNo",_staffNo);
      formData.append("principalNo",_principalNo);  
      console.log(formData)

      axios.post(url.ip_+"/project/file/upload",formData).then(res =>{
        if(res.data.Result === "sueecss")
        that.$alert('上传成功，请等待主管审核','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    location.reload();
                  }
                })
      })
      },
      handleChange(value) {
        console.log(value);
        let _path =[];
      for(let i in this.value){
        _path = _path +"/"+this.value[i]
      };
      console.log(_path)
      },
      download(node, data) {
        let tempUrl=url.ip_+"/project/file/download?path="+data.fullPath;
        window.open(tempUrl,"_blank");
        
      },
      remove(node, data) {
        axios.delete(url.ip_+"/project/file/deleteByProjectFileNo?projectFileNo="+data.no).then(res =>{
          if(res.data.Result === "success")
          // console.log(res)
          this.$alert("删除成功")

          else
           this.$alert(res.data.Message)
           location.reload();
        })
        
      },
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span   > {node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      }
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
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