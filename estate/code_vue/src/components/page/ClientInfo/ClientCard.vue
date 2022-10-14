<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">客户信息系统</el-breadcrumb-item>
  <el-breadcrumb-item>客户资料卡</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
    <el-table :data="guestList" >
        <el-table-column label="编号" prop="guestNo" width="50px"></el-table-column>
        <el-table-column label="客户姓名" prop="guestName" width="80px"></el-table-column>
        <el-table-column label="qq" prop="qq" width="150px"></el-table-column>
        <el-table-column label="手机" prop="mobilePhone"></el-table-column>
        <el-table-column label="固定电话" prop="telephone"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="一级单位" prop="primaryUnit"></el-table-column>
        <el-table-column label="二级单位" prop="secondaryUnit"></el-table-column>
        <el-table-column label="三级单位" prop="tertiaryUnit"></el-table-column>
        <el-table-column label="操作" width="300px" fixed="right">
            <template v-slot="client">
                <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editor(client.row)">修改</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="deleteAccount(client.row)">删除</el-button>
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
        // 客户列表数据
        return{
        guestList:[
            {
            gusetNo:'',
            guestName:"",
            qq:'',
            email:'',
            mobilePhone:'',
            telephone:'',
            primaryUnit:'',
            secondaryUnit:'',
            tertiaryUnit:'',
            }
        ]
        }
    },
    created(){
        const that = this
    axios.get(url.ip_+"/guest/findAll").then(res => {
    // console.log(res);//打印出请求回来的数据
    that.guestList = res.data
  })
  .catch(error => {
    console.log(error)
  })

},
  methods:{
    editor(row){
        // console.log(row);
        this.$router.push({
            path:'/changeClient',
            query:{
                id:row.guestNo
            }
        })
    },
    deleteAccount(row){
        const that =this
        axios.delete(url.ip_+"/guest/deleteByGuestNo?guestNo="+row.guestNo).then(res => {
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
