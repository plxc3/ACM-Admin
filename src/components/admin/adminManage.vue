<template>
    <div class="">
        <!------------------------------ dataBox ------------------------------>
        <div class="dataBox">
            <span class="data-name">用户名</span>
            <span class="data-changPassword button" @click="updatePassword()">修改密码</span>
            <span class="data-changPassword button" @click="allExcel()">全部队伍Excel表</span>
            <span class="data-changPassword button" @click="loginOut()">登出</span>
        </div>
        <!------------------------------ uniBox ------------------------------>
        <div class="uniBox card">
            <span class="data-changPassword button" @click="closeRole()" style="background-color:#EA2027;">关闭权限</span>
            <span class="data-changPassword button" @click="openRole()" style="background-color: #C4E538;">开启权限</span>
            <br>
            <br>
            <span class="data-changPassword button" @click="deleteGroup()">删除当前学校</span>
            <span class="data-changPassword button" @click="resetPassword()">重置当前学校密码</span>
            <input class="uni-cearch" type="text" v-model="input" name="" placeholder="输入关键字搜索学校" />
            <span class="data-changPassword button" @click="clear()">全部学校</span>
            <p class="uni-item" v-for="i in schools" @click="goInput(i)">{{i.uniName}}</p>
        </div>
        <!------------------------------ groupsBox ------------------------------>
        <div class="groupsBox">
            <div class="groups-item card" v-for="i in teams">
                <p class="group-name">{{i.teamName}}</p>
                <p class="group-name">{{i.teamEngName}}</p>
                <p class="group-state">
                    <el-select v-model="i.state" placeholder="请选择" @change="goChange(i)">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </p>
                <table>
                    <thead>
                    <tr>
                        <th>职位</th>
                        <th>姓名</th>
                        <th>拼音</th>
                        <th>性别</th>
                        <th>T恤尺码</th>
                    </tr>
                    </thead>
                    <tr>
                        <th>教练</th>
                        <th>{{i.coachName}}</th>
                        <th>{{i.coachPinyin}}</th>
                        <th>{{i.coachSex}}</th>
                        <th>{{i.coachTsize}}</th>
                    </tr>
                    <tr>
                        <th>队员1</th>
                        <th>{{i.name1}}</th>
                        <th>{{i.pinyin1}}</th>
                        <th>{{i.sex1}}</th>
                        <th>{{i.tsize1}}</th>
                    </tr>
                    <tr>
                        <th>队员2</th>
                        <th>{{i.name2}}</th>
                        <th>{{i.pinyin2}}</th>
                        <th>{{i.sex2}}</th>
                        <th>{{i.tsize2}}</th>
                    </tr>
                    <tr>
                        <th>队员3</th>
                        <th>{{i.name3}}</th>
                        <th>{{i.pinyin3}}</th>
                        <th>{{i.sex3}}</th>
                        <th>{{i.tsize3}}</th>
                    </tr>
                </table>
            </div>
        </div>

        <!--<el-dialog-->
                <!--title="提示"-->
                <!--:visible.sync="dialogVisible"-->
               <!--&gt;-->
            <!--<el-input placeholder="请输入新密码" v-model="admin.password" show-password></el-input>-->
            <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="surePassword()">确 定</el-button>-->
  <!--</span>-->
        <!--</el-dialog>-->

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
        >
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="surePassword('ruleForm')">确 定</el-button>
                    <!--<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>-->
                    <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
  </span>
        </el-dialog>

    </div>
</template>

<script>
    import teamApi from "../../api/team"
    import proApi from "../../api/pro"
    import roleApi from "../../api/role"
    import manageApi from "../../api/manage"
    import cookie from 'js-cookie'
    export default {
        name: "adminManage",
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            return{
                ruleForm: {
                    password: '',
                    checkPass: '',
                },
                rules: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
            },
                dialogVisible2:false,
                dialogVisible: false,
                proxyId:"",
                admin:{
                    password:''
                },
                input:'',
                adminList:[],
                schoolList:[],
                options:[{
                    value: '比赛未开始',
                    label: '比赛未开始'
                },
                    {
                        value: '比赛进行中',
                        label: '比赛进行中'
                    }
                    ,
                    {
                        value: '一等奖',
                        label: '一等奖'
                    },
                    {
                        value: '二等奖',
                        label: '二等奖'
                    },
                    {
                        value: '三等奖',
                        label: '三等奖'
                    },
                    {
                        value: '未获奖',
                        label: '未获奖'
                    }]
            }
        },
        methods:{
            getAdminList(){
                teamApi.getAdminList()
                    .then(res=>{
                        this.adminList=res.data.TeamList
                    })
            },
            /**
             * 获取学校列表
             */
            getSchoolList(){
                proApi.getProList()
                    .then(res=>{
                        this.schoolList=res.data.ProList
                    })
            },
            /**
             * 更新state
             */
            goChange(i){
                teamApi.updateTeam(i)
                    .then((res)=>{
                        this.$message({
                            type:"success",
                            message:res.msg
                        })
                    })
            },
            updatePassword(){
                this.admin.password=''
                this.dialogVisible=true
            },
            surePassword(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.admin.password=this.ruleForm.password
                        proApi.changePassword(this.admin)
                            .then(res=>{
                                this.$message({
                                    type:"success",
                                    message:res.msg
                                })
                                this.dialogVisible=false
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            loginOut(){
                cookie.set("admintoken",'')
                this.$store.commit("adminOut")
                this.$router.push(({path:"/adminMain"}))
            },
            goInput(i){
                this.input=i.uniName
                this.proxyId=i.id
            },
            allExcel(){
                this.$router.push({path:"/excel"})
            },
            deleteGroup(){
                this.$confirm('此操作将删除学校, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$confirm('此操作将删除学校, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        console.log(this.proxyId)
                        if(this.proxyId==''){
                            this.$message({
                                type:"warning",
                                message:"未点击选择学校"
                            })
                        }else {
                            teamApi.deletedSchool(this.proxyId)
                                .then(res=>{
                                    this.$message({
                                        type:"success",
                                        message:res.msg
                                    })
                                    this.getAdminList()
                                    this.getSchoolList()
                                })
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            resetPassword(){
                this.$confirm('此操作将重置该学校密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$confirm('此操作将重置该学校密码, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        console.log(this.proxyId)
                        if(this.proxyId==''){
                            this.$message({
                                type:"warning",
                                message:"未点击选择学校"
                            })
                        }else {
                            teamApi.resetPassword(this.proxyId)
                                .then(res=>{
                                    this.$message({
                                        type:"success",
                                        message:res.msg
                                    })
                                })
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消重置'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消重置'
                    });
                });
            },
            clear(){
                this.input=''
                this.proxyId=""
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            closeRole(){
                this.$confirm('此操作将重置学校权限, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$confirm('此操作将重置该学权限, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // console.log(this.proxyId)
                        if(this.proxyId==''){
                            roleApi.closeRoleAll()
                                .then(res=>{
                                    this.$message({
                                        type:"success",
                                        message:res.msg
                                    })
                                    manageApi.closeRegister()
                                        .then(res=>{
                                            this.$message({
                                                type:"success",
                                                message:res.msg
                                            })
                                        })
                                })
                        }else {
                            roleApi.closeRoleById(this.proxyId)
                                .then(res=>{
                                    this.$message({
                                        type:"success",
                                        message:res.msg
                                    })
                                })
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消重置'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消重置'
                    });
                });
            },
            openRole(){
                this.$confirm('此操作将打开学校权限, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$confirm('此操作将打开该学权限, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // console.log(this.proxyId)
                        if(this.proxyId==''){
                            roleApi.openRoleAll()
                                .then(res=>{
                                    this.$message({
                                        type:"success",
                                        message:res.msg
                                    })
                                    manageApi.openRegister()
                                        .then(res=>{
                                            this.$message({
                                                type:"success",
                                                message:res.msg
                                            })
                                        })
                                })

                        }else {
                            roleApi.openRoleById(this.proxyId)
                                .then(res=>{
                                    this.$message({
                                        type:"success",
                                        message:res.msg
                                    })
                                })
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消打开'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消打开'
                    });
                });
            }
        },
        created(){
            this.getAdminList()
            this.getSchoolList()
            this.admin.id=cookie.get("admintoken")
        },
        computed:{
            schools:function () {
                return this.schoolList.filter((item)=>item.uniName.match(this.input))
            },
            teams:function () {
                return this.adminList.filter((item)=>item.uniName.match(this.input))
            }
        }
    }
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
    }
    table {
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
        word-wrap: break-word;
        word-break: break-all;
    }

    table td, table th {
        border: 1px solid #cad9ea;
        color: #555;
        padding: 5px 0px;
        outline: none;
    }

    table thead th {
        padding: 2px 60px;
        background-color: #CCE8EB;
        /*min-width: 100px;*/
        color: #333;
    }
    table tr:nth-child(odd) {
        background: #fff;
    }
    table tr:nth-child(even) {
        background: #F5FAFA;
    }
    select {
        height: 100%;
        font-size: 18px;
        text-align: center;
        border: none;
        color: #555;
        outline: none;
        background: transparent;
    }
    .button {
        padding: 3px 10px;
        font-size: 15px;
        font-weight: 500;
        text-align: center;
        /*word-wrap: none;*/
        border-radius: 15px;
        background: #8aedbb;
        border: solid 1px #333;
        transition: box-shadow 0.4s;
        user-select: none;
    }
    .button:hover {
        box-shadow: 0 0 10px #555;
    }
    .card {
        /*border-radius: 10px;*/
        border: solid 1px #333;
        box-shadow: 0 0 10px #555;
        background: #eee;
    }
    .active {
        color: #0b3580;
    }
    /********  dataBox  ********/
    .dataBox {
        width: 30%;
        margin: 10px 0px;
        text-align: center;
        /*word-break: none;*/
    }
    .data-name {
        font-size: 30px;
        font-weight: 700;
        text-align: center;
        margin: 0 20px;
        user-select: none;
    }
    .data-changeName, .data-changPassword, .all {
        margin: 0 5px;
        white-space:nowrap;
    }

    /********  uniBox  ********/

    .uniBox {
        position: fixed;
        width: 25%;
        min-width: 250px;
        max-height: calc(100vh - 100px);
        padding: 10px 20px;
        margin: 0 3%;
        text-align: center;
        overflow-y: auto;
    }
    .uni-cearch {
        font-size: 15px;
        padding: 2px 10px;
        margin: 10px;
        outline: none;
    }
    .uni-all, .uni-item {
        font-size: 20px;
        padding: 2px 10px;
        margin: 10px;
        background: white;
        word-wrap: break-word;
        border: solid 1px #888;
        border-radius: 10px;
        /*transition: 0.5;*/
        font-weight: 500;
        user-select: none;
    }
    .uni-all:hover, .uni-item:hover {
        color: #0b3580;
    }
    .uni-all {
        font-weight: 800;
    }

    /********  groupsBox  ********/

    .groupsBox {
        position: fixed;
        width: 70%;
        max-height: 100vh;
        right: 0px;
        top: 0px;
        padding: 20px auto;
        overflow-y: auto;
    }
    .groups-item {
        width: 700px;
        margin: 10px auto;
        padding: 20px 30px;
    }
    .group-name {
        font-size: 30px;
        line-height: 40px;
        padding: 0 15px;
        background: #88bba2;
        border-radius: 6px;
        text-align: center;
        outline: none;
    }
    .group-state {
        padding: 2px 10px;
        margin: 10px 20px;
        line-height: 20px;
        border-radius: 15px;
        border: solid 1px #333;
        background: #50c6df;
        text-align: center;
    }
    .group-state > select{
        font-size: 18px;
        font-weight: 900;
        color: #084e1d;
    }
    .group-state > select > option {
        font-size: 18px;
        font-weight: 900;
    }

    /********  allBox  ********/

    .allBox {
        width: 95%;
        padding: 10px 1%;
        margin: 10px 0px;
        position: fixed;
        top: 0;
        left: 1.5%;
        overflow: auto;
        background: #eee;
        box-shadow: 0 0 10px #666;
        font-size: 13px;
        /*opacity: 0;*/
        /*pointer-events: auto;*/
        transition: .5s;
        /*pointer-events: none;*/
        transform: translate(0, -30px);
    }
    .allBox > table {
        margin-top: 10px;
        width: 100%;
    }
    .allBox > table td, .allBox >table th {
        border: 1px solid black;
    }
    .allBox table thead th {
        min-width: 10px;
    }
</style>
