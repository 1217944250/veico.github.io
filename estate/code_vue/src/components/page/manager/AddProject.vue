<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 增加项目信息
                </el-breadcrumb-item>
<!--                <el-breadcrumb-item>基本表单</el-breadcrumb-item>-->
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box" >
                <el-form ref="form" :model="form" :rules="rules" label-width="80px" text-ali>
<!--                    <el-input  修改示例-->
<!--                            placeholder="客户姓名！"-->
<!--                            size="small"-->
<!--                            style="width: 140px"-->
<!--                            v-model="searchParams.custName"-->
<!--                            clearable  代表可以清除>-->
<!--                    </el-input>-->
                    <el-form-item label="客户名称" prop="cname">
                        <el-input v-model="form.cname" style="width:200px" clearable @blur="checkBlur($event)" placeholder="请输入客户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="客户编号" prop="cno" >
                        <el-input v-model="form.cno" style="width:200px" clearable  placeholder="请输入客户编号"></el-input>
                    </el-form-item>
                    <el-form-item label="项目编号" prop="pno">
                        <el-input v-model="form.pno" style="width:200px" clearable placeholder="请输入项目编号"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称" prop="pname">
                        <el-input v-model="form.pname" style="width:200px" clearable placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="项目类别" prop="ptype">
                        <el-input v-model="form.ptype" style="width:200px" clearable placeholder="请输入项目类别"></el-input>
                    </el-form-item>
                    <el-form-item label="模型价格" prop="mprice">
                        <el-input v-model="form.mprice" style="width:200px" clearable placeholder="请输入模型价格"></el-input>
                    </el-form-item>
                    <el-form-item label="渲染价格" prop="xprice">
                        <el-input v-model="form.xprice" style="width:200px" clearable placeholder="请输入渲染价格"></el-input>
                    </el-form-item>
                    <el-form-item label="后期价格" prop="hprice">
                        <el-input v-model="form.hprice" style="width:200px" clearable placeholder="请输入后期价格"></el-input>
                    </el-form-item>
                    <el-form-item label="起止时间" required>
                        <el-col :span="11">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="form.pbt"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="form.pet"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交信息</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'projectForm',
        data() {
            return {
                form: {
                    cname:'',
                    cno:'',
                    pno:'',
                    pname: '',
                    ptype:'',
                    mprice:'',
                    xprice:'',
                    hprice: '',
                    pbt: '',
                    pet: '',
                },
                rules:{
                    cname:[
                        {required:true,message:"请输入客户名称",trigger:'blur'}
                    ],
                    cno:[
                        {required:true,message:"请输入客户编号",trigger:'blur'}
                    ],
                    pname:[
                        {required:true,message:"请输入项目名称",trigger:'blur'}
                    ],
                    pno:[
                        {required:true,message:"请输入项目编号",trigger:'blur'}
                    ],
                    ptype:[
                        {required:true,message:"请输入项目类别",trigger:'blur'}
                    ],
                    mprice:[
                        {required:true,message:"请输入模型价格",trigger:'blur'}
                    ],
                    xprice:[
                        {required:true,message:"请输入渲染价格",trigger:'blur'}
                    ],
                    hprice:[
                        {required:true,message:"请输入后期价格",trigger:'blur'}
                    ]


                }
            };
        },
        methods: {
            checkBlur(event){
                // this.$message.error(event.target.value);//提示输入成功或者输入错误
                //this.$message.success(event.target.value);//成功可以不提示
                //this.form.cno="123"//接收后端传来的编号
                //this.form.cname=""//使错误的值为空
                //用rule定义规则
                let that = this;
                this.editVisible = false;
                this.$axios.get("api/project/testName", {
                    params:{
                        cname:that.form.cname
                    }
                }).then(function (response) {
                    if(response.data!==""){
                        //找到数据填写当前值
                        that.form.cno=response.data;
                    }else{
                        //错误清空数据
                        that.form.cno="";
                        that.form.cname="";
                        that.$message.error("没有该客户");
                    }
                }).catch(function (error) {
                    that.$message.error("客户名称有误");
                    console.log(error+"no customer");
                })


            },
            onSubmit() {
                console.log(this.form);
                let that = this;
                this.editVisible;
                if(this.form.pname!==""&& this.form.cname!==""){
                    this.$axios.post('api/project/add',{
                        cno: that.form.cno,
                        pno: that.form.pno,
                        pname: that.form.pname,
                        ptype: that.form.ptype,
                        mprice: that.form.mprice,
                        xprice: that.form.xprice,
                        hprice: that.form.hprice,
                        pbt: that.form.pbt,
                        pet: that.form.pet
                    }).then(function (response) {
                        if (response.data === 1){
                            that.$message.success('增加成功');
                            this.resetForm("form");
                        }
                        else
                            that.$message.success('增加失败');
                    }).catch(function (error) {
                        console.log(error + '(add failed)');
                    })
                }else{
                    this.$message.error("信息未输入完全");
                }

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>

