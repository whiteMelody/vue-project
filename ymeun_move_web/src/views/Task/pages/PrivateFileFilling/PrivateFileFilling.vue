<template>
<!-- 咨询 -->
  <div class="PrivateFileFilling" :style="'min-height:'+ minHeight +'px' ">
    <!--   header   -->
    <Header :title="'私密档案'" :back="true"></Header>
    <div class="user">
        <p>{{userData.name}}</p>
        <span>档案完成度：<b :class="percentageColor">{{userData.percentage}}</b></span>
        <span>未完成：<b>{{userData.completeLabelCount}}</b>/{{userData.totalLabelCount}}</span>
    </div>

    <div class="message">
        <div class="message_list" v-for="(item,index) in labelList" :key="index">
            <div class="import" v-if="item.type == 4">
                <h3>{{index+1}}、{{item.problem}}</h3>
                <ul>
                    <li 
                        v-for="(itemName , indexName) in item.title" 
                        :key="indexName"
                    ><input type="text" :placeholder="'请输入'+itemName.title+'...'" v-model="itemName.texts"></li>
                </ul>
            </div>
            <div class="textareas" v-else-if="item.type == 3">
                <h3>{{index+1}}、{{item.problem}}</h3>
                <p><textarea placeholder="请输入..." v-model="item.textareas"></textarea></p>
            </div>
            <div class="checkbox_title" v-else-if="item.type == 5">
                <h3>{{index+1}}、{{item.problem}}</h3>
                <ul>
                    <li v-for="(itemName , indexName) in item.title" :key="indexName">
                        <h4>{{itemName.title}}（多选）</h4>
                        <div>
                            <p 
                                v-for="(itemNameTow , indexNameTow) in itemName.content" 
                                :key="indexNameTow"
                                @click="checkboxTitlePitchOn(index,indexName,indexNameTow)" 
                                :class="{active : itemNameTow.checkboxs}"
                            >{{itemNameTow.content}}</p>
                            <a @click="addLabelFn(index,indexName)">+</a>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="checkboxs" v-else-if="item.type == 2">
                <h3>{{index+1}}、{{item.problem}}(多选)</h3>
                <div>
                    <p 
                        v-for="(itemName , indexName) in item.content" 
                        :key="indexName" 
                        @click="checkboxsPitchOn(index,indexName)" 
                        :class="{active : itemName.checkboxs}"
                    >{{itemName.content}}</p>
                    <a @click="addLabelFn(index)">+</a>
                </div>
            </div>
            <div class="radio" v-else-if="item.type == 1">
                <h3>{{index+1}}、{{item.problem}}(单选)</h3>
                <div>
                    <p 
                        v-for="(itemName , indexName) in item.content" 
                        :key="indexName" 
                        @click="radioPitchOn(index,indexName)" 
                        :class="item.radios == indexName ? 'active' : ''"
                    >{{itemName.content}}</p>
                </div>
            </div>
        </div>
    </div>

    <van-dialog v-model="addShow" title="新增选项" show-cancel-button @confirm="addLabelConfirmFn" @cancel="addLabelCancelFn">
        <p class="box"><input type="text" placeholder="请输入添加项..." v-model="addLabelText"></p>
    </van-dialog>

    <div class="footer">
        <span 
            @click="taskAddLabelFn('return')" 
            v-loading.fullscreen.lock="subLoding"
            element-loading-text="提交中..."
            element-loading-background="rgba(0, 0, 0, 0.5)"
        >仅保存</span>
        <a 
            @click="taskAddLabelFn('refresh')"
            v-loading.fullscreen.lock="subLoding"
            element-loading-text="提交中..."
            element-loading-background="rgba(0, 0, 0, 0.5)"
        >保存并填写一页</a>
    </div>


  </div>
</template>
<script>
import Header from "../../../../components/Header";
import { getList , addLabel , taskAddLabel } from '@/assets/api/Data/PrivateFileFilling';
import { Toast } from 'vant';
export default {
  name: "PrivateFileFilling",
  data() {
    return {
        id:"",
        minHeight:0,
        userData:'',
        percentageColor:'',
        labelList:[],
        addShow:false,
        addIndexOne:'',
        addIndexTow:'',
        addLabelText:'',
        subLoding:false
    };
  },
  components: {
    Header
  },

  methods: {
    
    //提交私密档案
    taskAddLabelFn(str){
        let postData ={
            customer_id:this.id,
            problem:{}
        };
        this.labelList.map((item , index) => {
            // let data = {};
            switch (item.type) {
                case 1:
                    if(item.radios != -1)
                    {
                        // data[item.id] = item.content[item.radios].id
                        postData.problem[item.id] = item.content[item.radios].id;
                    }
                    break;
                case 2:
                    // data[item.id] = {"complex": []}
                    postData.problem[item.id] = {"complex": []}
                    var num = 0;
                    item.content.map((itemName , indexName) => {
                        if(itemName.checkboxs)
                        {
                            postData.problem[item.id].complex.push(itemName.id)
                        }
                        else
                        {
                            num++
                        }
                    })
                    if(num >= item.content.length)
                    {
                        postData.problem[item.id].complex.push("false")
                    }
                    // postData.problem.push(data)
                    break;
                case 3:
                    postData.problem[item.id] = {"text": ''}
                    if(item.textareas != '')
                    {
                        postData.problem[item.id].text = item.textareas
                    }
                    else
                    {
                        postData.problem[item.id].text = null
                    }
                    // postData.problem.push(data)
                    break;
                case 4:
                    postData.problem[item.id] = {"multiple_text": {}}
                    item.title.map((itemName , indexName) => {
                        let textArr = {}
                        if(itemName.texts != '')
                        {
                            textArr[itemName.id] = itemName.texts
                        }
                        else
                        {
                            textArr[itemName.id] = null
                        }
                        postData.problem[item.id].multiple_text[itemName.id] = textArr[itemName.id]
                    })
                    // postData.problem.push(data)
                    break;
                case 5:
                    postData.problem[item.id] = {"multiple_checkbox": {}}
                    item.title.map((itemName , indexName) => {
                        postData.problem[item.id].multiple_checkbox[itemName.id] = []
                        var num = 0;
                        itemName.content.map((itemNameTow , indexTow) => {
                            if(itemNameTow.checkboxs)
                            {
                                postData.problem[item.id].multiple_checkbox[itemName.id].push(itemNameTow.id)
                            }
                            else
                            {
                                num++
                            }
                        })
                        if(num >= itemName.content.length)
                        {
                            postData.problem[item.id].multiple_checkbox[itemName.id].push("false")
                        }
                    })
                    // postData.problem.push(data)
                    break;    
                default:
                    break;
            }
        })

        console.log(postData);
        // return;
        this.subLoding = true
        
        taskAddLabel(postData).then(res => {
            console.log(res);
            setTimeout(() => {
                this.subLoding = false;
                if(str == "refresh" && res.status == 0)
                {
                    // window.history.go(0)
                    window.location.reload()
                }
                else if(str == "return" && res.status == 0)
                {
                    window.history.go(-1)
                }
                else
                {
                    Toast(res.msg)
                }
            },1000)
        }).catch((e)=>{
            console.log(e)
        })

    },
    //带标题的选中
    checkboxTitlePitchOn(indexOne,indexTow,indexThree){
        this.labelList[indexOne].title[indexTow].content[indexThree].checkboxs = !this.labelList[indexOne].title[indexTow].content[indexThree].checkboxs;
        this.$forceUpdate();
    },
    //多选选中
    checkboxsPitchOn(indexOne,indexTow){
        this.labelList[indexOne].content[indexTow].checkboxs = !this.labelList[indexOne].content[indexTow].checkboxs;
        this.$forceUpdate();
    },

    //单选选中
    radioPitchOn(indexOne,indexTow){
        this.labelList[indexOne].radios = indexTow;
        this.$forceUpdate();
    },
    //添加取消
    addLabelCancelFn(){
        this.addLabelText = ''
    },
    //添加确认
    addLabelConfirmFn(){
        if(this.addLabelText != '')
        {
            let postData = {};
           
            if(this.addIndexTow == undefined)
            {
                postData = {
                    content:this.addLabelText,
                    type:'2',
                    title_id:0,
                    label_id:this.labelList[this.addIndexOne].id,
                    customer_id:this.id
                }
                // this.labelList[this.addIndexOne].content.push(arr)
            }
            else
            {
                postData = {
                    content:this.addLabelText,
                    type:'5',
                    label_id:this.labelList[this.addIndexOne].id,
                    title_id:this.labelList[this.addIndexOne].title[this.addIndexTow].id,
                    customer_id:this.id
                }
                // this.labelList[this.addIndexOne].title[this.addIndexTow].content.push(arr)
            }
            
            addLabel(postData).then(res => {
                if(res.status == 0)
                {
                    let arr = res.data;
                    arr.checkboxs = true;
                    if(this.addIndexTow == undefined)
                    {
                        this.labelList[this.addIndexOne].content.push(arr)
                    }
                    else
                    {
                        this.labelList[this.addIndexOne].title[this.addIndexTow].content.push(arr)
                    }
                }
                else
                {
                    Toast(res.msg);
                }
            }).catch((e)=>{
                console.log(e)
            })
        }
        else
        {
            Toast('请填写内容');
        }
        this.addLabelText = ''
    },
    //添加弹窗
    addLabelFn(indexOne,indexTow){
        this.addShow = true;
        this.addIndexOne = indexOne;
        this.addIndexTow = indexTow;
    },


    //获取初始数据
    getListFn(){
        let postData = {
            customer_id:this.id,
            limit:6
        }
        getList(postData).then(res => {
            this.userData = res.data.customer;
            this.labelList = res.data.label;
            if(this.userData.fill_in_percentage < 59)
            {
                this.percentageColor = "red"
            }
            else if(this.userData.fill_in_percentage > 59 && this.userData.fill_in_percentage <= 90)
            {
                this.percentageColor = "orange"
            }
            else if(this.userData.fill_in_percentage > 90 && this.userData.fill_in_percentage < 100)
            {
                this.percentageColor = "green"
            }
            else if(this.userData.fill_in_percentage >= 100)
            {
                this.percentageColor = "full"
            }

            this.labelList.map((item , index) => {
                switch (item.type) {
                    case 1:
                        item.radios = -1;
                        break;
                    case 2:
                        item.content.map((itemName , indexName) => {
                            itemName.checkboxs = false
                        })
                        break;
                    case 3:
                        item.textareas = ""
                        break;
                    case 4:
                        item.title.map((itemName , indexName) => {
                            itemName.texts = ''
                        })
                        break;
                    case 5:
                        item.title.map((itemName , indexName) => {
                            itemName.content.map((itemNameTow , indexNameTow) => {
                                itemNameTow.checkboxs = false
                            })
                        })
                        break;    
                    default:
                        break;
                }
            })

        }).catch((e)=>{
            console.log(e)
        })
    }
  },
  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.id = this.$route.query.id
    this.getListFn()
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.minHeight = window.innerHeight
  },

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
@import "./PrivateFileFilling.scss";
</style>