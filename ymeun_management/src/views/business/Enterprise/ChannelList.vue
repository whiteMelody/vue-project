<template>
  <div class="ChannelList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>
        <div>
            <p>渠道列表</p>
            <span>-{{titleText}}</span>
        </div>
        <el-button type="primary" @click="dialogForm = true;">添加大类</el-button>
    </header>
    <div class="box">
        <el-table :data="tableData" row-key="id" border lazy stripe
            :tree-props="{children: 'items', hasChildren: 'hasChildren'}"
            v-loading="loading">
            <el-table-column prop="name" align="center" label="大类名称" width="180">
                <template slot-scope="scope" v-if="scope.row.items">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="二级渠道名称">
                <template slot-scope="scope" v-if="!scope.row.items">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column prop="address" align="center" label="操作" width="180">
                <template slot-scope="scope" v-if="scope.row.items">
                    <p class="operation_btn">
                        <span class="color1" @click="dialogFormTow = true; dialogFormText = scope.row.name; formTow.towName = ''; formTow.channelParentId = scope.row.id">添加二级</span>
                    </p>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="upPage"
                @current-change="nextPage"
                :current-page="1"
                :page-sizes="[5, 10, 15, 20, 100]"
                :page-size="15"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                :hide-on-single-page="true">
            </el-pagination>
        </div>
    </div>

    <div class="dialog_box">
        <el-dialog title="添加大类" :visible.sync="dialogForm" :before-close="clearForm" width="366px">
        <div class="el_dialog_box">
            <el-form ref="myForm" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="大类名称" prop="name">
                    <el-input type="text" v-model.trim="form.name" placeholder="请输入大类名称" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clearForm">取 消</el-button>
                <template v-if="disabled">
                    <el-button type="primary" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="handleSubmit">确认</el-button>
                </template>
            </div>
        </div> 
        </el-dialog>
    </div>

    <div class="dialog_box">
        <el-dialog :title="dialogFormText" :visible.sync="dialogFormTow" :before-close="clearForm" width="366px">
        <div class="el_dialog_box">
            <el-form ref="myForm" :model="formTow" :rules="rules2" label-width="80px">
                <el-form-item label="二级名称" prop="towName">
                    <el-input type="text" v-model.trim="formTow.towName" placeholder="请输入二级名称" clearable></el-input>
                </el-form-item>
            </el-form>
            <div class="shop_list">
                <div class="shop_header">
                    <p>请选择需要添加的门店<i>（必选）</i></p>
                    <div>
                        <el-checkbox v-model="storeCheckbox" @change="shopListFn(0)">全选</el-checkbox>
                    </div>
                </div>
                <ul>
                    <li :class="{active:item.isSelected}" v-for="(item , index) in storeList" :key="index" @click="shopListFn(1,item)"><p>{{item.name}}</p></li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clearForm">取 消</el-button>
                <template v-if="disabledTow">
                    <el-button type="primary" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="handleSubmit">确认</el-button>
                </template>
            </div>
        </div> 
        </el-dialog>
    </div>
    
  </div>
</template>

<script>

import { channelList , channelAdd , storeList } from "@/assets/api/home/home"
export default {
  name: "ChannelList",
  components: {
  },
  data() {
    return {
        condition:{
            start: 1,
            perpage: 15,
            channelParentId: 0,
            e_id:this.$route.query.e_id,
        },
        e_id:this.$route.query.e_id,
        titleText:this.$route.query.titleText,
        boxMaxHeight:"",
        total:0,
        tableData: [],
        loading:false,
        form: {
            name:""
        },
        dialogForm: false,                //弹窗控制器
        disabled: false,
        formTow: {
            towName:""
        },
        dialogFormTow: false,                //弹窗控制器
        dialogFormText:"",
        disabledTow: false,
        rules: {
            gameid: [{required: true, message: '请选择游戏', trigger: 'change'}],
            name: [{required: true, message: '请输入大类名称', trigger: 'blur'}],
            // towName: [{required: true, message: '请输入二级名称', trigger: 'blur'}],
        },
        rules2: {
            towName: [{required: true, message: '请输入二级名称', trigger: 'blur'}],
        },
        storeCheckbox:false,
        storeList:[],
    }
  },
  created() {},
  methods: {
      
      // 提交表单
    handleSubmit() {
      this.$refs.myForm.validate((valid) => {
        if (valid) {
          this.dialogForm ? this.addChannel() : this.addChannelTow();
        } else {
          this.$message({
            message: '请检查表单',
            type: 'error',
          })
        }
      })
    },

    addChannel(){
        channelAdd({name: this.form.name, channelParentId: 0, storeId: 0, e_id: this.e_id, }).then(res=>{
            if(res.status == 0){
                this.$message({
                    message: '渠道新增成功',
                    type: 'success',
                    onClose:()=>{
                        this.disabled = false
                        this.dialogForm = false
                        this.clearForm()
                        this.loadData()
                    }
                });
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                    onClose:()=>{
                        this.disabled = false
                    }
                });
            }
        }).catch(error=>{
            console.log("channelAdd--- no");
            this.disabled = false
        })
    },

    addChannelTow(){
        let _arr = [];
        for(let i=0; i<this.storeList.length; i++){
            if(this.storeList[i].isSelected){
                _arr.push({
                    id: this.storeList[i].id
                })
            }
        }

        if(_arr.length == 0){
            this.$message({
                message: '请选择门店',
                type: 'error'
            });
            this.disabledTow = false
            return
        }
       
        channelAdd({name: this.formTow.towName, channelParentId: this.formTow.channelParentId, e_id: this.e_id,  storeId: JSON.stringify(_arr)}).then(res=>{
            if(res.status == 0){
                this.$message({
                    message: '二级渠道新增成功',
                    type: 'success',
                    onClose:()=>{
                        this.disabledTow = false
                        this.dialogFormTow = false
                        this.clearForm()
                        this.loadData()
                    }
                });
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                    onClose:()=>{
                        this.disabledTow = false
                    }
                });
            }
        }).catch(error=>{
            console.log("channelAdd--- no");
            this.disabledTow = false
        })
    },

    //选中门店
    shopListFn(type,item){
        switch (type) {
            case 0:
                this.storeList.map((item , index) => {
                    item.isSelected = this.storeCheckbox
                })
                break;
            case 1:
                item.isSelected = !item.isSelected
                break;
            default:
                break;
        }
        let _flag = true;
        this.storeList.map((item , index) => {
            if(item.isSelected == false) _flag = false
        })
        this.storeCheckbox = _flag
    },

    loadData(){
        this.loading = true;
        channelList(this.condition).then(res=>{
            if(res.status == 0){
                this.tableData = res.data.list
                this.total = res.data.total;
                this.loading = false;
            }
        })
        
    },

    upPage(val) {
      this.condition.perpage = val;
      this.loadData();
    },
    nextPage(val) {
      this.condition.start = val;
      this.loadData();
    },
    // 清除表单数据
    clearForm() {
        this.dialogForm = false;
        this.dialogFormTow = false;
        this.form = {
            name:""
        }
        this.formTow = {
            towName:""
        }
        this.storeList.map((item , index) => {
            item.isSelected = false
        })
    },
 
  },
  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
    this.loadData()
      storeList({ e_id: this.e_id }).then(res=>{
          if(res.status == 0){
              if(res.data.list.length > 0){
                  res.data.list.map((item , index) => {
                      item.isSelected = false;
                  })
              }
              this.storeList = res.data.list
          }
      })
  },
  
};
</script>

<style scoped lang="scss">
.ChannelList{
    margin: 20px;
    background: #fff;
    padding: 0 20px;
    header{
        height: 50px;
        border-bottom: 1px solid #E5E5E5;
        display: flex;
        align-items: center;
        div{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex: 1;
            color: #333;
            // span{
            //     color: #999;
            // }
        }
    }
    .box{
        padding-top: 20px;
       
    }
}
 .shop_list{
    border-top: 1px solid #E5E5E5;
    padding-top: 18px;
    .shop_header{
        display: flex;
        p{
            flex: 1;
            i{
                font-style: normal;
                color: #EC414D;
            }
        }
    }
    ul{
        padding-top: 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li{
            width: 156px;
            display: flex;
            justify-content: center;
            height: 40px;
            align-items: center;
            border:1px solid #E5E5E5;
            border-radius:5px;
            margin-bottom: 10px;
            cursor: pointer;
            p{
                overflow: hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                width: 140px;
                text-align: center;
            }
            &.active{
                background:rgba(227,236,255,1);
                border:1px solid rgba(98,122,173,1);
                border-radius:5px;
                color: #627AAD;
            }
        }
    }
}
</style>
