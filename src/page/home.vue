<template>
    <div>   
<el-container>
  <el-aside width="200px"style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1','1']" >
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
        </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>
        <router-link to="/home/trans">转账</router-link>
        </template>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main style="'height:'+mainHeight+'px'">
        <router-view></router-view>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</el-container>
    </div>
</template>
<script>
    export default{
        data(){
            var height=window.screen.height;
            var mainHeight=height-60*2;
            return {
                mainHeight:mainHeight
            }
        },

    }
</script>
<style>
    .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
 
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
</style>