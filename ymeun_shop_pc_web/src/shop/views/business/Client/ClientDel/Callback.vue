<template>
  <div class="Callback">

    <div class="titles">
      
		<div>回访数据统计</div>
		<em></em>
		<ul>
			<li>
				<p>应回访次数（次）</p>
				<span class="fc-blue6">{{userData.total | _NumFormat}}</span>
			</li>
			<li>
				<p>已回访次数（次）</p>
				<span class="fc-gray2">{{userData.finish | _NumFormat}}</span>
			</li>
			<li>
				<p>未回访次数（次）</p>
				<span class="fc-blue6">{{userData.wait | _NumFormat}}</span>
			</li>
		</ul>
        
    </div>


    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="false" v-on:listLoaded="getLoaded">
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
           
                <el-form-item>
                    <el-select v-model="condition.type" placeholder="请选择回访类型" readonly="" clearable>
                        <el-option :label="'全部回访类型'" :value="'0'"></el-option>
                        <el-option v-for="[key, val] in _dictTypesOfVisitsType" :key="key" :label="val"
                                    :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="condition.usersId" placeholder="请选择回访人员" readonly="" clearable>
                        <el-option :label="'全部回访人员'" :value="'0'"></el-option>
                        <el-option v-for="item in $store.getters.roleListMap" :key="item.key" :label="item.value"
                                    :value="item.key"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="danger" class="h32px" @click="centerDialogVisible = true;">添加主动回访</el-button>
                </el-form-item>
                
          </el-form>
          

          <el-table slot="list" :data="demoList" stripe border>

            <el-table-column prop="index" align="center" label="序号" width="60">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            
            <el-table-column prop="type" align="center" label="回访类型">
              <template slot-scope="scope">
                {{ scope.row.type.label }}
              </template>
            </el-table-column>

            <el-table-column prop="status" align="center" label="回访状态">
              <template slot-scope="scope">
                <div class="list_status">
                    <span class="weizhifu" v-if="scope.row.status.value == 0">{{scope.row.status.label}}</span>
                    <span class="weizhifu" v-else-if="scope.row.status.value == 3">{{scope.row.status.label}}</span>
                    <span class="zhifu" v-else>{{scope.row.status.label}}</span>
                </div>
              </template>
            </el-table-column>
            
            <el-table-column prop="review_time" align="center" label="回访日期">
              <template slot-scope="scope">
                {{ timeSubsrting(scope.row.review_time)}}
              </template>
            </el-table-column>
            
            <el-table-column prop="member" align="center" label="回访人员">
              <template slot-scope="scope">
                {{ scope.row.member.name }}
              </template>
            </el-table-column>
            
            <el-table-column prop="remarks" align="center" :show-overflow-tooltip="true" label="回访情况">
              <template slot-scope="scope">
                {{ scope.row.remarks }}
              </template>
            </el-table-column>
            
            <el-table-column prop="updated_at" align="center" label="回访完成时间">
              <template slot-scope="scope" v-if="scope.row.status.value != 0">
                {{ scope.row.updated_at | _endTimeFormat}}
              </template>
            </el-table-column>

          </el-table>
        </base-list>
    </div>

    
    <!-- 填写回访内容 -->
    <el-dialog :visible.sync="centerDialogVisible" width="30%" :show-close="false">
      <div class="MagessBox">
        <div class="title">
          <span>添加主动回访</span>
          <i class="iconfont iconguanbi1" @click="CancelClick"></i>
        </div>
        <div class="infoBox">
          <div class="bolk">
            <span class="mar20">
              <i class="iconStyle">*</i>回访时间
            </span>
            <el-date-picker
              v-model="ContentTime"
              :clearable="false"
              type="date"
              placeholder="请选择回访时间"
              align="center"
              class="wb73"
              @change="myChange"
            ></el-date-picker>
          </div>
          <div class="texta mat20" v-show="isContentShow == true">
            <span class="mar23 mal10" style="white-space: nowrap;">回访内容</span>
            <div class="input">
              <textarea placeholder="请输入回访内容......" v-model="ContentData"></textarea>
            </div>
          </div>

          <div class="texta mat20" v-show="isContentShow == false">
            <span class="mar23 mal10" style="white-space: nowrap;">回访备注</span>
            <div class="input">
              <textarea placeholder="请输入回访备注......" v-model="RemarksData"></textarea>
            </div>
          </div>
        </div>
        <div class="buttom">
          <el-button @click="CancelClick">取消</el-button>
            <template v-if="disabled">
                <el-button type="primary" disabled>提交中...</el-button>
            </template>
            <template v-else>
                <el-button type="primary" @click="SubmitClick">确定</el-button>
            </template>

        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getReviewList , ReturnVisitData} from "@/shop/assets/api/client/client";
export default {
  name: "Callback",
  data() {
    return {
      userData:'',
      counselor:{
          counselor:"",
      },
      condition: {
        customerId:this.$route.query.id
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getReviewList,       // 分页查询api接口
      isContentShow:null,

      disabled: false,
      centerDialogVisible: false,
      ContentTime:'',
      ContentData:'',
      RemarksData:'',
    };
  },
  watch: {
    daterangeTimer(c, o) {
      this.condition.startTime = this.$base.dateTimeToDate(c[0],'date2');
      this.condition.endTime = this.$base.dateTimeToDate(c[1],'date2');
    }
  },
  components: {},
  methods: {
    loadData() {
      this.$refs.demoTable.loadData();
    },

    myChange(value) {
      let time = this.$base.dateTimeToDate(value,'date2')
      console.log(this.$base.isToday(time));
      if (this.$base.isToday(time)) {
        this.isContentShow = true;
      }else {
        this.isContentShow = false;
      }
    },
    getLoaded(data){
      this.userData = data.analisis
    },
    // 取消
    CancelClick() {
      this.centerDialogVisible = false;
      this.ReturnLIstIsShow = false;
    },

    // 截取时间
    timeSubsrting(str) {
      return str.substring(0,str.length - 8);
    },
    
    // 时间
    pVBClick(s) {
      return s < 10 ? "0" + s : s;
    },
    // 提交
    SubmitClick() {
      // console.log(this.ContentData);
      // console.log(this.RemarksData);
      if (this.ContentTime == "" && this.ContentData == "") {
        this.$message({
          message: "回访内容和时间必须填写一个",
          type: "warning"
        });
      } else {
        if (this.ContentTime != "") {
          let time = new Date(this.ContentTime);
          let dateTime =
            time.getFullYear() +
            "-" +
            this.pVBClick(time.getMonth() + 1) +
            "-" +
            this.pVBClick(time.getDate());
          this.ContentTime = dateTime;
        }
        let Data = {
          customerId: this.condition.customerId,
          reviewTime: this.ContentTime,
          content: this.ContentData,
          target: this.RemarksData
        };
        this.disabled = true
        ReturnVisitData(Data).then(res => {
          console.log(res);
          if (res.status == 0) {
            this.$message({
              message: "填写成功",
              type: "success",
              onClose: () => {
                this.centerDialogVisible = false;
                this.ContentTime = '';
                this.ContentData = '';
                this.RemarksData = '';
                this.loadData()
                  this.disabled = false
              }
            });
          }else{
              this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error',
              });
              this.disabled = false
          }
        }).catch(error=>{
            this.$message({
                showClose: true,
                message: error,
                type: 'error',
            });
            this.disabled = false
        })
      }
    },
  },
  // 创建前状态
  beforeCreate() {
    
  },

  // 创建完毕状态
  created() {},

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
.Callback {
  margin: 24px 20px;
  .MagessBox {
    padding: 0 0.2rem;
    .title {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;

      span {
        font-size: 0.16rem;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }

    .textBox {
      padding: 0.2rem;
      text-align: center;
      font-size: 0.16rem;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .infoBox {
      padding-top: 0.2rem;
      span {
        .iconStyle {
          font-style: normal;
          color: #ec414d;
          margin-right: 0.05rem;
        }
      }
      .texta {
        display: flex;
        .input {
          height: 80px;
          width: 74%;
          border: 1px solid #e5e5e5;
          padding: 0.14rem;
          overflow: hidden;
          border-radius: 5px;

          textarea {
            width: 100%;
            height: 100%;
            border: none;
            font-size: 0.14rem;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }

    .buttom {
      padding: 0.2rem 0;
      display: flex;
      justify-content: flex-end;

      div {
        cursor: pointer;
        width: 0.56rem;
        height: 32px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .cancel {
        border: 1px solid rgba(192, 192, 192, 1);
        margin-right: 0.2rem;
      }

      .submit {
        background: rgba(13, 201, 229, 1);
        color: rgba(255, 255, 255, 1);
      }
    }
  }
	.titles{
		background: #fff;
		margin-bottom: 20px;
		padding: 20px;
		display: flex;
		align-items: center;
		height: 60px;
		div{
			width: 175px;
			text-align: center;
			font-size: 16px;
			color: #333;
		}
		em{
			width: 1px;
			height: 40px;
			background: #E5E5E5;
			margin-right: .6rem;
		}
		ul{
			overflow: hidden;
			flex: 1;
			li{
				width: 2.4rem;
				float: left;
				padding-right: .2rem;
				p{
					color: #666666;
				}
				span{
					font-size: 24px;
					width: 2.4rem;
					display: block;
					padding-top: .16rem;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
	.box {
		margin-bottom: 40px;
		padding: 20px;
		background-color: #ffffff;
	}
}
</style>

<style>

.Callback .list_status span{
    display: block;
    width: .8rem;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
    color: #fff;
    border-radius:2px;
}
.Callback .list_status .zhifu{
    background: #9FDB9D;
}
.Callback .list_status .weizhifu{
    background: #FEB78C;
}
</style>
 
