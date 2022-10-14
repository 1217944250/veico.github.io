<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-user"></i> 用户账号管理
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
                <el-input  placeholder="用户名" v-model="searchInfo" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="searchByUsername">搜索</el-button>
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
                    @selection-change="selectionChanged"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                <el-table-column prop="password" label="密码" align="center"></el-table-column>
                <el-table-column prop="userLevel" label="账号级别" align="center"></el-table-column>
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
                <el-form-item label="用户名">
                    <el-input v-model="tempUsername"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="tempPassword"></el-input>
                </el-form-item>
                <el-form-item label="账号级别">
<!--                    <el-input v-model="tempUserLevel"></el-input>-->
                    <el-select v-model="tempUserLevel" placeholder="选择职位">
                        <el-option label="管理员" value="admin"></el-option>
                        <el-option label="主管" value="manager"></el-option>
                        <el-option label="前台" value="counter"></el-option>
                        <el-option label="员工" value="staff"></el-option>
                    </el-select>
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
        name: "Users",
        data(){
            return {
                query: {
                    pageIndex: 1,
                    pageSize: 10
                },
                totalPage: 0,
                tableData: [],
                selections: [],
                searchInfo: "",
                tempUsername: "",
                tempPassword: "",
                tempUserLevel: "",
                editVisible: false,
                idx: -1,

            }
        },
        created() {
            this.getUserInfo();
        },
        methods: {
            getUserInfo: function(){
                let that = this;
                this.$axios.get("api/users/query")
                .then(function (response) {
                    let dataTemp = [];
                    for (let i = 0; i < response.data.length; i++){
                        let tempUser = {
                            username: response.data[i].wno,
                            password: response.data[i].passwd,
                            userLevel: response.data[i].alevel
                        };
                        dataTemp.push(tempUser);
                    }
                    that.tableData = dataTemp;
                    that.totalPage = dataTemp.length;
                })
                .catch(function (error) {
                    that.$message.warning("数据请求错误");
                    console.log(error + "(accounts information request error.)");
                })
            },
            refresh: function () {
                this.getUserInfo();
                this.searchInfo = "";
                this.$message.success('刷新成功');
            },
            searchByUsername: function () {
                let tempRow = [];
                let that = this;
                if(this.searchInfo !== ""){
                    this.$axios.get("api/users/uniqueSearch",{
                        params: {
                            username: this.searchInfo
                        }
                    }).then(function (response) {
                        console.log(response.data);
                        let tempUser = {
                            username: response.data.result.wno,
                            password: response.data.result.passwd,
                            userLevel: response.data.result.alevel
                        };
                        tempRow.push(tempUser);
                        that.tableData = tempRow;
                        that.$message.success("搜索成功");
                    }).catch(function (error) {
                        console.log(error + "(search failed)");
                    });

                }
                else{
                    this.$message.error("请输入搜索内容");
                    this.getUserInfo()
                }

            },
            handleEdit: function (row) {
                this.idx = row.index;
                this.tempUsername = row.username;
                this.tempPassword = row.password;
                this.tempUserLevel = row.userLevel;
                this.editVisible = true;
            },
            saveEdit: function () {
                this.editVisible = false;
                let that = this;
                this.$axios.post('api/users/modify',{
                    wno: that.tempUsername,
                    passwd: that.tempPassword,
                    alevel: that.tempUserLevel
                }).then(function (response) {
                    if (response.data === 1){
                        that.getUserInfo();
                        that.$message.success("修改成功");
                    }

                    else
                        that.$message.success("修改失败");
                }).catch(function (error) {
                    console.log(error + "(modify failed)");
                })
            },
            handleDelete: function (row) {
                let that = this;
                this.$confirm('确定删除？', '提示',{
                    type: 'warning',
                }).then(() => {
                    this.$axios.get('api/users/delete', {
                        params: {
                            username: row.username
                        }
                    }).then(function (response) {
                        if (response.data === 1){
                            that.$message.success("删除成功");
                            that.getUserInfo();
                        }
                        else{
                            that.$message.error("删除失败");
                        }
                    }).catch(function (error) {
                        console.log(error + "(delete failed)")
                    });
                }).catch(() => {})
            },
            selectionChanged: function(val){
                this.selections = val;
            },
            deleteSelection: function () {
                const len = this.selections.length;
                if (len !== 0){
                    for (let i = 0; i < len; i++){
                        let username = this.selections[i].username;
                        this.$axios.get("api/users/delete",{
                            params: {
                                username: username
                            }
                        }).then(() => {}).catch(() => {});
                        this.getUserInfo();
                    }
                    this.$message.success("删除成功");
                }
                else{
                    this.$message.error("未选中任何信息");
                }
            },
            handlePageChange: function (val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
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
        left: 289px;
    }
    .pagination {
        margin: 20px 0;
        text-align: right;
    }
</style>