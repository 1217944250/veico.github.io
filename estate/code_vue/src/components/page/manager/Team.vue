<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-platform"></i> 团队信息展示
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select
                        v-model="selectedInfo"
                        placeholder="搜索依据"
                        class="handle-select mr10"
                >
                    <el-option key="1" label="团队编号" value="tno"></el-option>
                    <el-option key="2" label="项目编号" value="pno"></el-option>
                    <el-option key="2" label="团队类型" value="type"></el-option>
                </el-select>
                <el-input  placeholder="搜索内容" v-model="searchInfo" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button type="primary"  @click="addVisible=true">添加</el-button>
                <el-tooltip content="刷新" class="refreshPlace">
                    <i class="el-icon-refresh refresh" @click="refresh"></i>
                </el-tooltip>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @cell-dblclick="handleTableClick"
            >
                <el-table-column prop="tno" label="团队编号" align="center" ></el-table-column>
                <el-table-column prop="pno" label="项目编号" align="center"></el-table-column>
                <el-table-column prop="type" label="团队类型" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <hr/>
            <span style="font-size: 14px; font-family: 'Microsoft YaHei UI',fantasy">提示: 点击所属团队可查看成员信息</span>

        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-user-solid"> 团队成员管理</i>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                    :data="teamTableInfo"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
            >
                <el-table-column prop="wno" label="成员编号" align="center"></el-table-column>
                <el-table-column prop="wname" label="成员姓名" align="center"></el-table-column>
                <el-table-column prop="wtel" label="成员电话" align="center"></el-table-column>
                <el-table-column prop="tno" label="团队编号" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="teamEdit(scope.row)"
                        >编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" label-width="70px">
                <el-form-item label="团队编号">
                    <el-input v-model="tempData.tno"></el-input>
                </el-form-item>
                <el-form-item label="项目编号">
                    <el-input v-model="tempData.pno"></el-input>
                </el-form-item>
                <el-form-item label="团队类型">
                    <el-input v-model="tempData.type"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
        </el-dialog>

        <el-dialog title="分配成员" :visible.sync="workerVisible" width="30%">
            <el-form ref="form" label-width="70px">
                <el-form-item label="成员编号">
                    <el-input v-model="teamInfo.wno"></el-input>
                </el-form-item>
                <el-form-item label="成员姓名">
                    <el-input v-model="teamInfo.wname"></el-input>
                </el-form-item>
                <el-form-item label="成员电话">
                    <el-input v-model="teamInfo.wtel"></el-input>
                </el-form-item>
                <el-form-item label="团队编号">
                    <el-input v-model="teamInfo.tno"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="saveWorker">确 定</el-button>
                    <el-button @click="workerVisible = false">取 消</el-button>
                </span>
        </el-dialog>

        <el-dialog title="团队成员信息" :visible.sync="teamInfoVisible" width="30%">

            <el-table
                    :data="teamTableInfo"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
            >
                <el-table-column prop="wno" label="成员编号" align="center"></el-table-column>
                <el-table-column prop="wname" label="成员姓名" align="center"></el-table-column>
                <el-table-column prop="wtel" label="成员电话" align="center"></el-table-column>
            </el-table>
            <hr/>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit">编辑</el-button>
                <el-button @click="teamInfoVisible=false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="添加团队信息" :visible.sync="addVisible" width="30%">

            <el-form  label-width="80px" :model="formLabelAlign">
                <el-form-item label="团队编号">
                    <el-input v-model="addData.tno"></el-input>
                </el-form-item>
                <el-form-item label="项目编号">
                    <el-input  v-model="addData.pno"></el-input>
                </el-form-item>
                <el-form-item label="团队类型">
                    <el-input v-model="addData.type"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addTeam">提交</el-button>
                <el-button @click="addVisible=false">退出</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>
    export default {
        name: "Staff",
        data () {
            return{
                tableData: [],
                teamTableInfo: [],
                teamInfoVisible: false,
                editVisible: false,
                addVisible:false,
                workerVisible:false,
                selectedInfo: "",
                searchInfo: "",
                addData:{
                    tno:"",
                    pno:"",
                    type:""
                },
                tempData: {
                    tno: "",
                    pno: "",
                   type: "",
                },
                teamInfo:{
                    wno:"",
                    wname:"",
                    wtel:"",
                    tno:""
                }
            }
        },
        created() {
            this.getTableData();
            this.getTeam();
        },
        methods: {
            getTableData: function () {
                let that = this;
                //接收的数据会和prop绑定的数据一一对应
                this.$axios.get('api/team/query')
                    .then(function (response) {
                        that.tableData = response.data.result;
                        // that.totalPage = response.data.result.length;
                        //  console.log(response.data);
                    }).catch(function (err) {
                    console.log(err + '(project info request failed)')
                })
            },
            teamEdit:function(row){
                this.teamInfo.wno=row.wno;
                this.teamInfo.wname=row.wname;
                this.teamInfo.wtel=row.wtel;
                this.teamInfo.tno=row.tno;
                this.workerVisible=true;
            },
            saveWorker:function(){
                this.$message.success("ok");
                let that = this;
                this.$axios.post("api/staff/modifyW",{
                    wno: that.teamInfo.wno,
                    wname: that.teamInfo.wname,
                    wtel: that.teamInfo.wtel,
                    tno: that.teamInfo.tno
                }).then(function (response) {
                    if(response.data===1){
                        that.getTeam();
                        that.$message.success("编辑成功");
                    }
                }).catch(function (error) {
                    console.log(error+"编辑出错");
                })
            },
            getTeam:function () {
                let that = this;
                this.$axios.get("api/staff/query")
                    .then(function (response) {
                    console.log(response.data);
                    that.teamTableInfo = response.data;
                }).catch(function (error) {
                    console.log(error + "(team data request failed)");
                })
            },
            addTeam:function(){
                let that = this;
                this.$axios.post('api/team/add',{
                    tno:that.addData.tno,
                    pno:that.addData.pno,
                    type:that.addData.type
                }).then(function (response) {
                    if(response.data===1){
                        that.getTableData();
                        that.$message.success("添加成功");
                        that.addVisible=false;
                    }
                }).catch(function (error) {
                    console.log(error + "(add failed)");
                })
            },
            handleTableClick: function (row,column,cell) {
                let tmp=row;
                let that = this;
                console.log(tmp.tno);
                    that.teamInfoVisible=true;//依据tno获取员工
                    this.$axios.get("api/staff/team" ,{
                        params:{
                            tno:tmp.tno
                        }
                    }).then(function (response) {
                        console.log(response.data);
                        that.teamTableInfo = response.data;
                    }).catch(function (error) {
                        console.log(error + "(apartment data request failed)");
                    })
            },

            handleEdit: function (row) {
                this.tempData.tno = row.tno;
                this.tempData.pno = row.pno;
                this.tempData.type = row.type;
                this.editVisible = true;
            },
            handleDelete: function (row) {
                let that = this;
                this.$confirm('确定删除？', '提示',{
                    type: 'warning',
                }).then(() => {
                    that.$axios.get("api/team/delete",{
                        params: {
                            tno: row.tno
                        }
                    }).then(function (response) {
                        if (response.data === 1){
                            that.getTableData();
                            that.$message.success("删除成功！");
                        }
                    })
                });

            },
            saveEdit: function () {
                this.editVisible = false;
                let that = this;
                let team = "";
                this.$axios.post("/api/team/modify",{
                    tno: that.tempData.tno,
                    pno: that.tempData.pno,
                    type: that.tempData.type
                }).then(function (response) {
                    if(response.data === 1){
                        that.getTableData();
                        that.$message.success("修改成功");
                    }
                }).catch(function (error) {
                    console.log(error + "(modify failed)");
                })
            },
            search: function () {//待完善
                let that = this;
                if (this.selectedInfo !== "" && this.searchInfo !== ""){
                    this.$axios.get('api/team/uniqueSearch',{
                        params: {
                            type: that.selectedInfo,
                            data: that.searchInfo
                        }
                    }).then(function (response) {
                        that.$message.success('查询成功');
                        let temp = [];
                        temp.push(response.data);
                        that.tableData = temp;
                    }).catch(function (error) {
                        that.$message.success('查询失败');
                        console.log(error + "(search failed)");
                    });
                }
                else{
                    this.$message.error("搜索内容不能为空");
                }
            },
            refresh: function () {
                this.searchInfo = "";
                this.selectedInfo = "";
                this.getTableData();
                this.$message.success('刷新成功');
            },
        }
    }
</script>

<style scoped>
    .table {
        width: 100%;
        font-size: 14px;
    }
    .handle-box {
        margin-bottom: 20px;
    }
    .handle-input {
        width: 180px;
        display: inline-block;
    }
    .mr10 {
        margin-right: 10px;
    }
    .red {
        color: #ff0000;
    }
    .refresh{
        font-size: 25px;
    }
    .refreshPlace{
        position: absolute;
        top: 108px;
        left: 395px;
    }

</style>