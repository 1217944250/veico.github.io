<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">账号信息系统</el-breadcrumb-item>
  <el-breadcrumb-item>账号资料卡</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
    <el-table :data="userList" >
        <el-table-column label="编号" prop="no" width="50px"></el-table-column>
        <el-table-column label="账号姓名" prop="username" width="200px"></el-table-column>
        <el-table-column label="账号权限" prop="access"></el-table-column>
        <el-table-column label="员工编号" prop="staffNo"></el-table-column>
        <el-table-column label="操作" width="300px" fixed="right">
            <template v-slot="user">
                <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editor(user.row)">修改</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="deleteAccount(user.row)">删除</el-button>
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
        userList:[
            {
            no:'',
            username:"",
            access:'',
            staffNo:'',
            }
        ]
        }
    },
    created(){
        
        const that = this
    axios.get(url.ip_+"/user/findAll").then(res => {
    // console.log(res);//打印出请求回来的数据
    that.userList = res.data
    console.log(this.userList)
  })
  .catch(error => {
    console.log(error)
  })

},
  methods:{
    editor(row){
        console.log(row.no)
        this.$router.push({
            path:'/changeaccount',
            query:{
                id:row.staffNo
            }
        })
    },
    deleteAccount(row){
        const that =this
        axios.delete(url.ip_+"/user/deleteByStaffNo?staffNo="+row.staffNo).then(res => {
            if(res.data.Message == 'success'){
                that.$alert('删除成功','消息',{
                  confirmButtonText:'确定',
                  callback: () =>{
                    location.reload();
                  }
                })
              }

        }
        )
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