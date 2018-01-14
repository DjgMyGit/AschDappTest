<template>
    <div class="tran">
        <div class="Block">
            <h5>余额</h5>
            <p style="font-size:20px">{{banlance}}</p>
            <p style="font-size:12px">{{Cy}}</p>
        </div>
        <h4>转账</h4>
         <el-form 
                :model="form" 
                ref="form"
                label-position="left" 
                label-width="80px"
                > 
             <el-form-item lable="发送者" label-width="80px" >
                 <el-input :disabled="true" v-model="form.address" placeholder="接收者地址"></el-input>
             </el-form-item>   
             <el-form-item lable="接收者地址">
                 <el-input v-model="form.recept_address" placeholder="接收者地址"></el-input>
             </el-form-item>
             <el-form-item lable="货币">
                 <el-input :disabled="true" v-model="form.Cy" placeholder="接收者地址"></el-input>
             </el-form-item>
             <el-form-item lable="金额">
                 <el-input  type="number" v-model="form.number" placeholder="金额"></el-input>
             </el-form-item>
             <el-form-item>
                 <el-button type="primary" @click="onSubmit"> 确认</el-button>
                  <el-button>取消</el-button>
             </el-form-item>
         </el-form>
    </div>
</template>

<script>
   import Axios from "axios"
   import AschJs from "asch-js"
   import Config from "../../config"
    export default{
        data(){
            var cy=Config.cy.split(".")[1];
            var address="";
            var banlance=0;
            if(this.$store.state.accout){
                address=this.$store.state.accout.address;
                var ss=this.$store.state.accout.balances;
                if(ss.length>0){
                   ss.map(item=>{
                      if( item.currency==Config.cy){
                        banlance=item.balance;
                      }
                   }) 
                }
            }
            if(banlance>0){
                banlance=Number(banlance/10000000);
            }
            
            
            return{
                btn_loading:false,
                banlance:banlance,
                Cy:cy,
                form:{
                    address:address,
                    recept_address:"",
                    number:0,
                    Cy:cy
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
            },
            subForm(){

                this.btn_loading=true;
                var dapp=Config.dappid;
                var fee=String(0.1 * 100000000);
                var secret=this.$store.state.secret;
                var type=3;
                var option={
                    fee:fee,
                    type:type,
                    args:[Config.cy,this.form.number*100000000,this.form.recept_address]
                }
                var url=Config.SerVice_dapp+Config.api.transactionSigned;
                var transaction=AschJs.dapp.createInnerTransaction(option,secret);
                Axios.put(url,transaction,{
                    headers:{
                       magic:"594fe0f3",
                       version:' '
                    }
                }).then(data=>data.data)
                .then(data=>{
                    if(data.success){
                        this.$message({
                            message:"交易成功",
                            type:"success"
                        })
                    }else{
                        this.$message({
                            message:data.error,
                            type:"error"

                        })
                    }

                })

            }
        }


    }
</script>
<style>
    .tran{
        text-align: left;
        color:black;
    }
    .Block{
        padding:20px;
        background: #409eff;
        display: inline-block;
        border-radius: 4px;
        color:#fff;
        font-size: 14px;
        line-height: 20px;
    }
    form{
        margin-top:20px;
    }
</style>