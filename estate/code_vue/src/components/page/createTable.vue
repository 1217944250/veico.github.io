<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">生成报表</el-breadcrumb-item> 
</el-breadcrumb>
&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;
        <el-cascader
                        v-model="value"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        ></el-cascader>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button size="mini" type="primary"  plain @click="createTable()"> 生成 </el-button>
    </div>
</template>
<script>
import axios from 'axios';
import url from '@/components/page/url';
export default {
    data(){
        return{
            options: [{
          value: '员工信息',
          label: '员工信息',
        }, {
          value: '客户信息',
          label: '客户信息',
        },{
          value: '员工绩效',
          label: '员工绩效',
        }, {
          value: '项目汇总',
          label: '项目汇总'
        }, ],
        value: '',
        }
        
    },
    methods: {
        createTable(){
            console.log(this.value)
            if(this.value === "员工信息")
            window.open(url.ip_+"/report/generateStaffInfoReport","_blank");
         
            else if(this.value === "客户信息")
            window.open(url.ip_+"/report/generateGuestInfoReport","_blank");
            else if(this.value === "员工绩效")
            window.open(url.ip_+"/report/generateStaffPerformanceReport","_blank");
            else(this.value === "项目汇总")
            window.open(url.ip_+"/report/generateProjectSummaryReport","_blank");
        }
    }

    
}

</script>
