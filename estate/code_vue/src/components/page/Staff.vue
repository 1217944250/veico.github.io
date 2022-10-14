<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-platform"></i> 员工信息查看
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
                    <el-option key="1" label="员工编号" value="wno"></el-option>
                    <el-option key="2" label="员工姓名" value="wname"></el-option>
                </el-select>
                <el-input  placeholder="搜索内容" v-model="searchInfo" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
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
                    @cell-click="handleTableClick"
            >
                <el-table-column prop="wno" label="员工编号" align="center"></el-table-column>
                <el-table-column prop="wname" label="员工姓名" align="center"></el-table-column>
                <el-table-column prop="wsex" label="性别" align="center"></el-table-column>
                <el-table-column prop="wtel" label="电话" align="center"></el-table-column>
                <el-table-column prop="wQQ" label="QQ" align="center"></el-table-column>111
                <el-table-column prop="wemail" label="邮箱" align="center"></el-table-column>
                <el-table-column prop="waddress" label="地址" align="center"></el-table-column>
                <el-table-column prop="wposition" label="职位" align="center"></el-table-column>
                <el-table-column prop="wdate" label="入职日期" align="center"></el-table-column>
                <el-table-column prop="type" label="所属团队" align="center"></el-table-column>
<!--                <el-table-column label="操作" align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button-->
<!--                                type="text"-->
<!--                                icon="el-icon-edit"-->
<!--                                @click="handleEdit(scope.row)"-->
<!--                        >编辑</el-button>-->
<!--                        <el-button-->
<!--                                type="text"-->
<!--                                icon="el-icon-delete"-->
<!--                                class="red"-->
<!--                                @click="handleDelete(scope.row)"-->
<!--                        >删除</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>
            <hr/>
            <span style="font-size: 14px; font-family: 'Microsoft YaHei UI',fantasy">提示: 点击所属团队可查看详细信息</span>
        </div>

        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" label-width="70px">
                <el-form-item label="员工编号">
                    <el-input v-model="tempData.wno"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="tempData.wname"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="tempData.wsex"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="tempData.wtel"></el-input>
                </el-form-item>
                <el-form-item label="QQ">
                    <el-input v-model="tempData.wQQ"></el-input>
                </el-form-item>
                <el-form-item label="email">
                    <el-input v-model="tempData.wemail"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="tempData.waddress"></el-input>
                </el-form-item>
                <el-form-item label="职位">
<!--                    <el-input v-model="tempData.wposition"></el-input>-->
                    <el-select v-model="tempData.wposition" placeholder="选择职位">
                        <el-option label="模型主管" value="模型主管"></el-option>
                        <el-option label="渲染主管" value="渲染主管"></el-option>
                        <el-option label="后期主管" value="后期主管"></el-option>
                        <el-option label="模型熟手" value="模型熟手"></el-option>
                        <el-option label="模型学徒" value="模型学徒"></el-option>
                        <el-option label="渲染熟手" value="渲染熟手"></el-option>
                        <el-option label="渲染学徒" value="渲染学徒"></el-option>
                        <el-option label="后期熟手" value="后期熟手"></el-option>
                        <el-option label="后期学徒" value="后期学徒"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入职日期">
<!--                    <el-input v-model="tempData.wdate"></el-input>-->
                    <el-date-picker type="date" placeholder="选择日期" v-model="tempData.wdate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="所属团队">
<!--                    <el-input v-model="tempData.type"></el-input>-->
                    <el-select v-model="tempData.type" placeholder="选择团队">
                        <el-option label="模型团队" value="模型团队"></el-option>
                        <el-option label="渲染团队" value="渲染团队"></el-option>
                        <el-option label="后期团队" value="后期团队"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
        </el-dialog>
        <el-dialog title="部门详细信息" :visible.sync="teamInfoVisible" width="30%">
            <el-table
                    :data="apartmentTableInfo"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @cell-click="handleTeamTableClick"
            >
                <el-table-column prop="tno" label="团队编号" align="center"></el-table-column>
                <el-table-column prop="pno" label="当前负责项目编号" align="center"></el-table-column>
                <el-table-column prop="type" label="团队类型" align="center"></el-table-column>
            </el-table>
            <hr/>
            <span style="font-size: 14px; font-family: 'Microsoft YaHei UI',fantasy">提示: 点击项目编号可查看项目相关信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="teamInfoVisible=false">确 定</el-button>
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
                apartmentTableInfo: [],
                teamInfoVisible: false,
                editVisible: false,
                selectedInfo: "",
                searchInfo: "",
                tempData: {
                    wno: "",
                    wname: "",
                    wsex: "",
                    wtel: "",
                    wQQ: "",
                    wemail: "",
                    waddress: "",
                    wposition: "",
                    wdate: "",
                    type: ""
                },
            }
        },
        created() {
            this.getTableData();
        },
        methods: {
            getTableData: function () {
                let that = this;
                this.$axios.get("api/staff/query")
                .then(function (response) {
                    console.log(response.data);
                    that.tableData = response.data;
                })
                .catch(function (error) {
                    console.log(error + ("Data request failed"));
                })
            },
            handleEdit: function (row) {
                this.tempData.wno = row.wno;
                this.tempData.wname = row.wname;
                this.tempData.wsex = row.wsex;
                this.tempData.wtel = row.wtel;
                this.tempData.wQQ = row.wQQ;
                this.tempData.wemail = row.wemail;
                this.tempData.waddress = row.waddress;
                this.tempData.wposition = row.wposition;
                this.tempData.wdate = row.wdate;
                this.tempData.type = row.type;
                this.editVisible = true;
            },
            handleDelete: function (row) {
                let that = this;
                this.$confirm('确定删除？', '提示',{
                    type: 'warning',
                }).then(() => {
                    that.$axios.get("api/staff/delete",{
                        params: {
                            wno: row.wno
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
                if (this.tempData.type === "模型团队")
                    team = "t001";
                else if (this.tempData.type === "渲染团队")
                    team = "t002";
                else
                    team = "t003";
                this.$axios.post("/api/staff/modify",{
                    wno: that.tempData.wno,
                    wname: that.tempData.wname,
                    wsex: that.tempData.wsex,
                    wtel: that.tempData.wtel,
                    wQQ: that.tempData.wQQ,
                    wemail: that.tempData.wemail,
                    waddress: that.tempData.waddress,
                    wposition: that.tempData.wposition,
                    wdate: that.tempData.wdate,
                    tno: team
                }).then(function (response) {
                    if(response.data === 1){
                        that.getTableData();
                        that.$message.success("修改成功");
                    }
                }).catch(function (error) {
                    console.log(error + "(modify failed)");
                })
            },
            handleTableClick: function (row, column) {

                if (column.property === "type") {
                    this.teamInfoVisible = true;
                    let that = this;
                    let team = "";
                    if (row.type === "模型团队")
                        team = "t001";
                    else if (row.type === "渲染团队")
                        team = "t002";
                    else
                        team = "t003";
                    this.$axios.get("api/staff/teamInfo",{
                        params: {
                            tno: team
                        }
                    }).then(function (response) {
                        that.apartmentTableInfo = response.data;
                    }).catch(function (error) {
                        console.log(error + "(apartment data request failed)");
                    })

                    // this.$router.push("/team");
                }
            },
            handleTeamTableClick: function (row, column) {
                if (column.property === "pno"){
                    this.$message.info("此项功能正在开发中");
                }

            },
            search: function () {
                let that = this;
                if (this.selectedInfo !== "" && this.searchInfo !== ""){
                    this.$axios.get('api/staff/uniqueSearch',{
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