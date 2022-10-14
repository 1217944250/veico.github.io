<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">员工信息系统</el-breadcrumb-item>
  <el-breadcrumb-item>员工资料卡</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
    <el-table :data="staff" >
        <el-table-column label="员工编号" prop="staffNo" width="50px"></el-table-column>
        <el-table-column label="员工姓名" prop="name" width="200px"></el-table-column>
        <el-table-column label="所属部门" prop="department"></el-table-column>
        <el-table-column label="职位" prop="post"></el-table-column>
        <el-table-column label="联系方式" prop="contact"></el-table-column>
        <el-table-column label="权限" prop="access"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="操作" width="300px" fixed="right">
            <template v-slot="staff">
                <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editor(staff.row)">修改</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="deleteAccount(staff.row)">删除</el-button>
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
        return{
        staff:[
            {
            staffNo:'',
            name:'',
            department:'',
            post:'',
            contact:'',
            access:'',
            status:'',
            }
        ]
        }
    },
    created(){
        const that = this
    axios.get(url.ip_+"/staff/findAll").then(res => {
    // console.log(res);//打印出请求回来的数据
    that.staff = res.data
  })
  .catch(error => {
    console.log(error)
  })

},
  methods:{
    editor(row){
        console.log(row.no)
        this.$router.push({
            path:'/changeStaff',
            query:{
                id:row.staffNo
            }
        })
    },
    deleteAccount(row){
        const that =this
        axios.delete(url.ip_+"/staff/deleteByStaffNo?staffNo="+row.staffNo).then(res => {
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
