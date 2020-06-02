<template>
  <div class="Plate" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>
        <p>板块管理</p>
        <span>-{{titleText}}</span>
    </header>
    <div class="box">
        <div class="purchase_yes" v-loading="availableListLoading">
            <h3>已购买板块</h3>
            <ul class="nothing"  v-if="availableList.length <=0">
                <li>
                    <i><img src="@/assets/img/img-empty.png"></i>
                    <p>暂未购买版块</p>
                </li>
            </ul>
            <ul v-else>
                <li v-for="(item,index) in availableList" :key="index">
                    <div>
                        <p>{{item.title}}</p>
                        <span @click="close(item.id)">取消</span>
                    </div>
                    <time>到期时间：{{item.end_time | _endTimeFormat}}</time>
                </li>
            </ul>
        </div>
        <div class="purchase_no" v-loading="purchasableListLoading">
            <h3>未购买板块</h3>
            <ul class="nothing"  v-if="purchasableList.length <=0">
                <li>
                    <i><img src="@/assets/img/img-empty.png"></i>
                    <b>无可购买的版块</b>
                </li>
            </ul>
            <ul v-else>
                <li v-for="(item,index) in purchasableList" :key="index">
                    <p>{{item.title}}</p>
                    <span @click="open(item.id)">开通</span>
                </li>
            </ul>
        </div>
    </div>
    
  </div>
</template>

<script>

import { getPurchasable, opened, cannel, getAvailable } from  "@/assets/api/home/home"
export default {
  name: "Plate",
  components: {
  },
  data() {
    return {
        boxMaxHeight:"",
        purchasableList:[],
        availableList:[],
        id:this.$route.query.id,
        titleText:this.$route.query.titleText,
        availableListLoading:false,
        purchasableListLoading:false,
    }
  },
  created() {},
  methods: {
      
     loadData(){
        this.availableListLoading = true;
        this.purchasableListLoading = true;
        getPurchasable({
            enterpriseId: this.id,
            start: 1,
            perpage: 999,
        }).then(res=>{
            if(res.status == 0){
                this.purchasableList = res.data.list
                this.purchasableListLoading = false;
            }
        })
        getAvailable({
            enterpriseId: this.id,
            start: 1,
            perpage: 999,
        }).then(res=>{
            if(res.status == 0){
                this.availableList = res.data.list
                this.availableListLoading = false;
            }
        })

    },

    close(functionalityId){
        this.$confirm('确定取消该版块？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            cannel({
                enterpriseId: this.id,
                functionalityId
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        message: '版块取消成功',
                        type: 'success'
                    });
                    this.loadData()
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }
            })
        }).catch(() => {
            console.log("cannel-- no");
        });

    },

    open(functionalityId){
        this.$confirm('确定开通该版块？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            opened({
                enterpriseId: this.id,
                functionalityId
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        message: '版块开通成功',
                        type: 'success'
                    });
                    this.loadData()
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }
            })
        }).catch(() => {
            console.log("opened-- no");
        });
    },

 
  },
  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
    this.loadData()
  },

  
};
</script>

<style scoped lang="scss">
.Plate{
    margin: 20px;
    background: #fff;
    padding: 0 20px;
    header{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid #E5E5E5;
        color: #333;
        // span{
        //     color: #999;
        // }
    }
    .box{
        .purchase_yes{
            border-bottom: 1px solid #E5E5E5;
            h3{
                font-weight: normal;
                color: #00BF9D;
                margin-top: 20px;
            }
            ul{
                padding-top: 16px;
                display: flex;
                flex-wrap: wrap;
                li{
                    width: 192px;
                    padding: 13px 15px;
                    height: 84px;
                    margin-bottom: 20px;
                    margin-right: 20px;
                    background: #00BF9D;
                    border-radius:5px;
                    color: #fff;
                    div{
                        display: flex;
                        height: 68px;
                        p{
                            flex: 1;
                            font-size: 18px;
                            overflow: hidden;
                        }
                        span{
                            cursor: pointer;
                            width: 60px;
                            height: 26px;
                            line-height: 26px;
                            border: 1px solid #C0EDE5;
                            border-radius:13px;
                            text-align: center;
                        }
                    }
                }
            }
            .nothing{
                li{
                    background: rgba(208, 208, 208, 0.5);
                    color: #333;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
            }
        } 
        .purchase_no{
            h3{
                font-weight: normal;
                color: #666666;
                margin-top: 20px;
            }
            ul{
                padding-top: 16px;
                display: flex;
                flex-wrap: wrap;
                li{
                    width: 192px;
                    padding: 13px 15px;
                    height: 84px;
                    margin-bottom: 20px;
                    margin-right: 20px;
                    background: rgba(208,208,208,0.5);
                    border-radius:5px;
                    color: #888888;
                    p{
                        font-size: 18px;
                        height: 58px;
                        overflow: hidden;
                    }
                    span{
                        cursor: pointer;
                        width: 60px;
                        height: 26px;
                        line-height: 26px;
                        border: 1px solid #C2C2C2;
                        border-radius:13px;
                        text-align: center;
                        color: #999;
                        display: block;
                    }
                }
            }
            .nothing{
                li{
                    background: rgba(208, 208, 208, 0.5);
                    color: #333;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    b{
                        font-weight: normal;
                    }
                    
                }
            }
        } 
    }
}
</style>
