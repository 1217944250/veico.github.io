<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-custom"></i> 客户信息查看
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
<!--                <el-button-->
<!--                        type="primary"-->
<!--                        icon="el-icon-delete"-->
<!--                        class="handle-del mr10"-->
<!--                        @click="deleteSelection"-->
<!--                >批量删除</el-button>-->
                <el-select
                        v-model="selectedInfo"
                        placeholder="搜索依据"
                        class="handle-select mr10"
                >
                    <el-option key="1" label="客户编号" value="cno"></el-option>
                    <el-option key="2" label="客户姓名" value="cname"></el-option>
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
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
<!--                <el-table-column prop="cno" label="客户编号" align="center"></el-table-column>-->
                <el-table-column prop="cname" label="客户姓名" align="center"></el-table-column>
                <el-table-column prop="unitLevel" label="单位级别" align="center"></el-table-column>
                <el-table-column prop="tel" label="电话" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机" align="center"></el-table-column>
                <el-table-column prop="QQ" label="QQ" align="center"></el-table-column>
                <el-table-column prop="email" label="email" align="center"></el-table-column>
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
                <el-form-item label="客户姓名">
                    <el-input v-model="tempInfo.cname"></el-input>
                </el-form-item>
                <el-form-item label="单位级别">
<!--                    <el-input v-model="tempInfo.unitLevel"></el-input>-->
                    <el-select v-model="tempInfo.unitLevel" placeholder="选择职位">
                        <el-option label="一级" value="一级"></el-option>
                        <el-option label="二级" value="二级"></el-option>
                        <el-option label="三级" value="三级"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户电话">
                    <el-input v-model="tempInfo.tel"></el-input>
                </el-form-item>
                <el-form-item label="客户手机">
                    <el-input v-model="tempInfo.mobile"></el-input>
                </el-form-item>
                <el-form-item label="客户QQ">
                    <el-input v-model="tempInfo.QQ"></el-input>
                </el-form-item>
                <el-form-item label="客户邮箱">
                    <el-input v-model="tempInfo.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Customer",
        data () {
            return{
                tableData: [],
                selections: [],
                query: {
                    pageIndex: 1,
                    pageSize: 10
                },
                totalPage: 0,
                editVisible: false,
                searchInfo: "",
                selectedInfo: "",
                tempInfo: {
                    cno: "",
                    cname: "",
                    unitLevel: "",
                    tel: "",
                    mobile: "",
                    QQ: "",
                    email: "",
                }
            }
        },
        created() {
          this.getTableData();
        },
        methods: {
            getTableData: function () {
                let that = this;
                this.$axios.get('api/customer/query')
                .then(function (response) {
                    that.tableData = response.data.result;
                    that.totalPage = response.data.result.length
                    // console.log(response.data);
                }).catch(function (err) {
                    console.log(err + '(customer info request failed)')
                })
            },
            handleEdit: function (row) {
                this.tempInfo.cno = row.cno;
                this.tempInfo.cname = row.cname;
                this.tempInfo.unitLevel = row.unitLevel;
                this.tempInfo.tel = row.tel;
                this.tempInfo.mobile = row.mobile;
                this.tempInfo.QQ = row.QQ;
                this.tempInfo.email = row.email;
                this.editVisible = true;
            },
            saveEdit: function () {
                let that = this;
                this.editVisible = false;
                this.$axios.post('api/customer/modify',{
                    cno: that.tempInfo.cno,
                    cname: that.tempInfo.cname,
                    unitLevel: that.tempInfo.unitLevel,
                    tel: that.tempInfo.tel,
                    mobile: that.tempInfo.mobile,
                    QQ: that.tempInfo.QQ,
                    email: that.tempInfo.email
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
                    that.$axios.get('api/customer/delete',{
                        params:{
                            cno: row.cno
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
                        let cno = this.selections[i].cno;
                        this.$axios.get('api/customer/delete',{
                            params:{
                                cno: cno
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
            // selectChange: function () {
            //     console.log(this.selectedInfo);
            // },
            search: function () {
                let that = this;
                if (this.selectedInfo !== "" && this.searchInfo !== ""){
                    this.$axios.get('api/customer/uniqueSearch',{
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