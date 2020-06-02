<template>
  <div class="ForeshadowingFillIn">
    <div class="customerInFoBox">
      <div class="customerInFo">
        <div class="name">
          <span>{{customerObj.customerName}}</span>
          <i  class="iconfont" :class="customerObj.sex == 0 ? 'iconnv' : 'iconnan'"></i>
        </div>
        <div class="mobileAndAge">
          <span>电话：{{customerObj.mobile}}</span>
          <span class="mal50">年龄：{{customerObj.age}}</span>
        </div>
      </div>

      <div class="customerFillIn">
        <div class="title">
          <i>*</i>术后铺垫记录
        </div>
        <div class="inputBox">
          <textarea placeholder="请填写客户的术后铺垫记录..." v-model="dataObj.content"></textarea>
        </div>
        <div class="bottomBox">
           <el-button @click="$router.go(-1)">取 消</el-button>
           <el-button type="primary" @click="Submission" v-if="bottomIsShow">确 定</el-button>
           <el-button type="primary" disabled v-else>提交中...</el-button>
        </div>
      </div>
    </div>
    <div class="HistoryList">
      <div class="title">历史记录</div>
      <base-list ref="demoTable" :condition="condition"
                  :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
          <el-table slot="list" :data="demoList" border stripe>
              <el-table-column prop="time" align="center" label="时间">
                <template slot-scope="scope">
                    {{scope.row.time | _endTimeFormat}}
                </template>
              </el-table-column>

              <el-table-column prop="content" align="center" :show-overflow-tooltip="true" label="详情">
                <template slot-scope="scope">
                    {{ scope.row.content }}
                </template>
              </el-table-column>
          </el-table>
      </base-list>
    </div>
  </div>
</template>
<script>
import { getList,taskModify } from "@/shop/assets/api/informatization/Foreshadowing";
export default {
  name: "ForeshadowingFillIn",
  data() {
    return {
      condition: {
        customer_id: this.$route.query.customerId,
        status: 1
      },  
      demoList: [],                      // table数组
      pageSearch: getList,       // 分页查询api接口
      
      customerObj:{},
      dataObj:{
        content:'',
        id:this.$route.query.taskId,
      },
      bottomIsShow:true
    };
  },
  components: {},
  methods: {
    Submission() {
      this.bottomIsShow = false;
      if (this.dataObj.content) {
        taskModify(this.dataObj).then(res => {
          if (res.status == 0) {
            this.$message({
              message: "填写成功!",
              type: 'success',
              duration:'1000',
              onClose:() => {
                this.$router.go(-1);
                this.bottomIsShow = true;
              }
            });
          }else {
            this.$message({
              message: res.msg,
              duration:'1500',
              type: 'error'
            });
            this.bottomIsShow = true;
          }
        });
      }else {
         this.$message({
          message: '请填写客户的术后铺垫记录...',
          type: 'warning',
          duration:'1500',
        });
        this.bottomIsShow = true;
      }
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    getList({customer_id:this.$route.query.customerId,start: 1,perpage: 15}).then(res => {
      if (res.status == 0) {
        this.customerObj = res.data.list[0];
      }
    });
    taskModify({id:this.$route.query.taskId}).then(res => {
      if (res.status == 0) {
        this.dataObj.content = res.data.content;
      }
    });
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {},

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
@import './ForeshadowingFillIn.scss';
</style>