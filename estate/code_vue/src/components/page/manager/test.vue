<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-grape"> 团队信息展示</i>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="deleteSelection"
                >批量删除</el-button>
                <el-select
                        v-model="selectedInfo"
                        placeholder="搜索依据"
                        class="handle-select mr10"
                >
                    <el-option key="1" label="客户编号" value="cno"></el-option>
                    <el-option key="2" label="项目编号" value="pno"></el-option>
                    <el-option key="3" label="项目名称" value="pname"></el-option>
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
                    @selection-change="selectionChange"
                    header-cell-class-name="table-header"
                    @cell-click="showStaff"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="tno" label="团队编号" align="center"></el-table-column>
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
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="totalPage"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" label-width="70px">
                <el-form-item label="客户编号">
                    <el-input v-model="tempInfo.cno"></el-input>
                </el-form-item>
                <el-form-item label="项目编号">
                    <el-input v-model="tempInfo.pno"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="tempInfo.pname"></el-input>
                </el-form-item>
                <el-form-item label="项目类别">
                    <el-input v-model="tempInfo.ptype"></el-input>
                </el-form-item>
                <el-form-item label="模型价格">
                    <el-input v-model="tempInfo.mprice"></el-input>
                </el-form-item>
                <el-form-item label="渲染价格">
                    <el-input v-model="tempInfo.xprice"></el-input>
                </el-form-item>
                <el-form-item label="后期价格">
                    <el-input v-model="tempInfo.hprice"></el-input>
                </el-form-item>
                <el-form-item label="项目开始时间">
                    <el-input v-model="tempInfo.pbt"></el-input>
                </el-form-item>
                <el-form-item label="项目结束时间">
                    <el-input v-model="tempInfo.pet"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog title="团队成员信息" :visible.sync="workerVisible" width="30%">
            <el-table
                    :data="workerTableInfo"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @cell-click="handleTeamTableClick"
            >
                <el-table-column prop="wno" label="成员编号" align="center"></el-table-column>
                <el-table-column prop="wname" label="成员姓名" align="center"></el-table-column>
                <el-table-column prop="wtel" label="成员电话" align="center"></el-table-column>
            </el-table>
            <hr/>
            <span style="font-size: 14px; font-family: 'Microsoft YaHei UI',fantasy">提示: 点击项目编号可查看项目相关信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="workerVisible=false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Project",
        data () {
            return{
                tableData: [],
                selections: [],

                workerVisible:false,
                workerTableInfo:{
                    wno:"",
                    wname:"",
                    wtel:""
                },
                totalPage: 0,
                editVisible: false,
                searchInfo: "",
                selectedInfo: "",
                tempInfo: {
                    cno: "",
                    pno:"",
                    pname: "",
                    ptype: "",
                    mprice: "",
                    xprice: "",
                    hprice: "",
                    pbt: "",
                    pet: "",
                }
            }
        },
        created() {
            this.getTableData();
        },
        methods: {
            getTableData: function () {
                let that = this;
                //接收的数据会和prop绑定的数据一一对应
                this.$axios.get('api/team/query')
                    .then(function (response) {
                        that.tableData = response.data.result;
                        that.totalPage = response.data.result.length;
                        // console.log(response.data);
                    }).catch(function (err) {
                    console.log(err + '(project info request failed)')
                })
            },
            showStaff:function(row,column,event,cell){

                //this.$message(row.type);
                // this.$message(column);
                // this.$message(event);
                // this.$message(cell);
            },
            handleEdit: function (row) {
                this.tempInfo.cno = row.cno;
                this.tempInfo.pno = row.pno;
                this.tempInfo.pname = row.pname;
                this.tempInfo.ptype = row.ptype;
                this.tempInfo.mprice = row.mprice;
                this.tempInfo.xprice = row.xprice;
                this.tempInfo.hprice = row.hprice;
                this.tempInfo.pbt = row.pbt;
                this.tempInfo.pet = row.pet;
                this.editVisible = true;
            },
            saveEdit: function () {
                let that = this;
                this.editVisible = false;
                this.$axios.post('api/project/modify',{
                    cno: that.tempInfo.cno,
                    pno: that.tempInfo.pno,
                    pname: that.tempInfo.pname,
                    ptype: that.tempInfo.ptype,
                    mprice: that.tempInfo.mprice,
                    xprice: that.tempInfo.xprice,
                    hprice: that.tempInfo.hprice,
                    pbt: that.tempInfo.pbt,
                    pet: that.tempInfo.pet
                }).then(function (response) {
                    if (response.data === 1){
                        that.getTableData();
                        that.$message.success('修改成功');
                    }
                    else
                        that.$message.success('修改失败');
                }).catch(function (error) {
                    console.log(error + '(modify failed)');
                })
            },
            handleDelete: function (row) {
                let that = this;
                this.$confirm('确定删除？', '提示',{
                    type: 'warning',
                }).then(() => {
                    that.$axios.get('api/project/delete',{
                        params:{
                            pno: row.pno
                        }
                    }).then(function (response) {
                        if (response.data === 1){
                            that.$message.success('删除成功');
                            that.getTableData();
                        }
                        else
                            that.$message.success('删除失败');
                    }).catch(function (err) {
                        console.log(err + 'delete failed');
                    })
                });

            },
            selectionChange: function (val) {
                this.selections = val;
            },
            deleteSelection: function () {
                const len = this.selections.length;
                if (len !== 0){
                    for (let i = 0; i < len; i++){
                        let pno = this.selections[i].pno;
                        this.$axios.get('api/project/delete',{
                            params:{
                                pno: pno
                            }
                        }).then(() => {}).catch(() => {});
                        this.getTableData();
                    }
                    this.$message.success('删除成功');
                }
                else{
                    this.$message.error("未选中任何信息");
                }
            },
            search: function () {
                let that = this;
                if (this.selectedInfo !== "" && this.searchInfo !== ""){
                    this.$axios.get('api/project/uniqueSearch',{
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
            handlePageChange: function () {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
        }

    }
</script>

<style scoped>
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
    .red{
        color: #ff0000;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .refresh{
        font-size: 25px;
    }
    .refreshPlace{
        position: absolute;
        top: 108px;
        left: 420px;
    }
    .handle-select {
        width: 120px;
    }
    .pagination {
        margin: 20px 0;
        text-align: right;
    }
</style>