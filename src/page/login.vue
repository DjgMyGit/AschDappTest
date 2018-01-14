<template>
    <div class="page">
        <el-form  
                ref="form" 
                :model="form">
            <el-form-item   lable="密码" 
                            prop="sercret"
                            label-width="80px"
                            :rules="[{require:true,message:'密码不能为空'}]">
                <el-input type="password" v-model="form.secret"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import Config  from "../config.js"
    import axios from "axios";
    export default{
        data(){
            return {
                button_loading:false,
                form:{
                    secret:""
                }
            }
        },
        methods:{
            onSubmit(){
                this.$refs["form"].validate(valid=>{
                    if(valid){
                        this.subForm();
                    }else{
                        return false;
                    }
                })
                console.log(this.form)
            },
            subForm(){
                this.button_loading=true;
               // Config.ser
                
                axios.post(Config.SerVice_dapp+Config.api.login,{
                    secret:this.form.secret
                })
                .then(data=>data.data)
                .then(data=>{
                    if(data.success){
                        this.$message({
                            message:'登录成功',
                            type:'success',
                        });
                        this.$router.replace("home");
                        this.$store.dispatch("setAccount",{account:data.account,secret:this.form.secret});
                    }else{
                        this.$message({
                            type:'error',
                            message:data.error
                        })
                    }
                }).catch(err=>{
                    console.error(err)
                })
            }
        }
    }
</script>
<style>
    
</style>