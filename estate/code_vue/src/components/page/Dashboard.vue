<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                        
                    </div>
                    <div style="color:rgb(12,187,82)" ><span style="font-size:20px ">欢迎使用本系统</span></div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>Vue
                    <el-progress :percentage="75.3" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="24.6" color="#f1e05a"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    
                </el-row>
                <el-card >
                <el-table
                    :show-header="false"
                    :data="tableData"
                    :span-method="objectSpanMethod"
                    border
                    :cell-style="columnStyle"
                    style="width: 100%; margin-top: 20px"
                >
                    <el-table-column prop="id" label="ID" width="240">
                        <img src="../../assets/img/img.jpg" />
                    </el-table-column>
                    <el-table-column width="180" prop="name"></el-table-column>
                    <el-table-column prop="amount1"></el-table-column>
                    <el-table-column width="180" prop="amount2"></el-table-column>
                    <el-table-column prop="amount3"></el-table-column>
                </el-table>
     </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import axios from 'axios';
import url from '@/components/page/url'
export default {
    name: 'dashboard',
    
    data() {
        
        return {
            dataForm: {},
            name: localStorage.getItem('name'),
        };
        
    },
    created(){
        const that =this;
        let loginInfo =JSON.parse(localStorage.getItem('loginInfo'));
        axios.get(url.ip_+"/staff/findByStaffNo?staffNo="+loginInfo.staffNo).then(resp =>{
                if(resp.data.Result === "success")
                {
                  that.dataForm=resp.data.Staff
                  that.name =resp.data.Staff.name;
                }
                if(resp.data.Result === "error")
                {
                  that.$alert("编号有误")
                }
          })

    },
    components: {
        Schart
    },
    computed: {
        tableData() {
      return [
        {
          id: this.dataForm.headImg,
          name: "账号编号",
          amount1: this.dataForm.no,
          amount2: "员工账号",
          amount3: this.dataForm.staffNo
        },
        {
          id: this.dataForm.headImg,
          name: "姓名",
          amount1: this.dataForm.name,
          amount2: "部门",
          amount3: this.dataForm.department
        },
        {
          id: this.dataForm.headImg,
          name: "职位",
          amount1: this.dataForm.post,
          amount2: "联系方式",
          amount3: this.dataForm.contact
        },
        {
          id: this.dataForm.headImg,
          name: "权限",
          amount1: this.dataForm.access,

        },
      ];
    },
        role() {
            return this.dataForm.post ;
        }
    },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
        columnStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 || columnIndex == 1 || columnIndex == 3) {
        //第三第四列的背景色就改变了2和3都是列数的下标
        return "background:#f3f6fc;";
      }else{
        return "background:#ffffff;";
      }
    },
    // 和并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
