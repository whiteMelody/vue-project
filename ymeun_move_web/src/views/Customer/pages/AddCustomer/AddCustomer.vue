<template>
  <div class="AddCustomer"  v-loading="loading && id != ''" :style="'min-height:'+ minHeight +'px' ">
    <Header :title="titleText" :back="true" :fixed="true"></Header>
    <div class="box">
        <ul class="bg-white">
            <li>
                <label>
                    <b>*</b>
                    <span>姓名</span>
                </label>
                <p><input type="text" placeholder="请输入" v-model="username"></p>
                <i></i>
            </li>
            <li>
                <label>
                    <b>*</b>
                    <span>电话</span>
                </label>
                <p><input  type="number" pattern="[0-9]*" maxlength="11" placeholder="请输入" v-model="phone"></p>
                <i></i>
            </li>
            <li @click="popShow('sex')">
                <label>
                    <b>*</b>
                    <span>性别</span>
                </label>
                <p>
                    <strong v-if="sexActive == null">请选择</strong>
                    <a v-else>{{sexActive.name}}</a>
                </p>
                <i class="iconfont iconxiangyou"></i>
            </li>
        </ul>
        <ul class="bg-white">
            <li @click="popShow('counselor')">
                <label>
                    <b>*</b>
                    <span>顾问</span>
                </label>
                <p>
                    <strong v-if="counselorActive == null">请选择</strong>
                    <a v-else>{{counselorActive.text}}</a>
                </p>
                <i class="iconfont iconxiangyou"></i>
            </li>
            <li @click="popShow('developer')">
                <label>
                    <b></b>
                    <span>开发者</span>
                </label>
                <p>
                    <strong v-if="developerActive == null">请选择</strong>
                    <a v-else>{{developerActive.text}}</a>
                </p>
                <i class="iconfont iconxiangyou"></i>
            </li>
        </ul>
        <ul class="bg-white">
            <li @click="popShow('project')">
                <label>
                    <b></b>
                    <span>项目</span>
                </label>
                <p>
                    <strong v-if="projectActive == null">请选择</strong>
                    <a v-else>{{projectActive[0].name+'-'+projectActive[1].name}}</a>
                </p>
                <i class="iconfont iconxiangyou"></i>
            </li>
            <li @click="popShow('channel')">
                <label>
                    <b>*</b>
                    <span>渠道</span>
                </label>
                <p>
                    <strong v-if="channelActive == null">请选择</strong>
                    <a v-else>{{channelActive[0].name+'-'+channelActive[1].name}}</a>
                </p>
                <i class="iconfont iconxiangyou"></i>
            </li>
            <li class="remark">
                <label>
                    <b>*</b>
                    <span>客户需求</span>
                </label>
                <p><textarea placeholder="请输入" v-model="remark"></textarea></p>
            </li>
        </ul>
    </div>
    <div class="pal50 par50 btns">
        <div 
            class="wb100 fc-white bg-green h80rem lh80rem text-center f28rem radius8" 
            @click="postSub"
            v-loading.fullscreen.lock="subLoding"
            element-loading-text="提交中..."
            element-loading-background="rgba(0, 0, 0, 0.5)"
        >
            提交
        </div>
    </div>

        <van-actionsheet
            v-model="sexShow"
            :actions="sexActions"
            @select="sexSelect"
            cancel-text="取消"
        />
        <van-popup v-model="counselorShow" position="bottom">
            <van-picker
                show-toolbar
                :columns="counselorColumns"
                @cancel="counselorCancel"
                @confirm="counselorConfirm"
            />
        </van-popup>

        <van-popup v-model="developerShow" position="bottom">
            <van-picker
                show-toolbar
                :columns="developerColumns"
                @cancel="developerCancel"
                @confirm="developerConfirm"
            />
        </van-popup>
  
        <div class="pop_boxs">
            <van-popup v-model="projectShow" position="bottom">
                <div class="pop_box">
                    <div class="header">
                        <span @click="projectCancel">取消</span>
                        <a v-if="projectActiveText != '请选择'" @click="projectConfirm">确定</a>
                    </div>
                    <div class="text">{{projectActiveText}}</div>
                    <ul v-show="projectActiveText == '请选择'">
                        <li 
                            @click="projectListConfirm(index)" 
                            v-for="(item , index) in  projectLIst" 
                            :class="projectListIndex == index ? 'active' :''"
                            :key="index"
                        >
                            <span>{{item.name}}</span>
                            <i class="iconfont iconduihao"></i>
                        </li>
                    </ul>
                    <ul class="children" v-show="projectActiveText != '请选择'">
                        <li 
                            @click="projectLIstChildrenConfirm(index)"
                            v-for="(item , index) in  projectActiveList" 
                            :class="projectLIstChildrenIndex == index ? 'active' :''"
                            :key="index"
                        >
                            <span>{{item.name}}</span>
                            <i class="iconfont iconduihao"></i>
                        </li>
                    </ul>
                </div>
            </van-popup>
        </div>

        <div class="pop_boxs">
            <van-popup v-model="channelShow" position="bottom">
                <div class="pop_box">
                    <div class="header">
                        <span @click="channelCancel">取消</span>
                        <a v-if="channelActiveText != '请选择'" @click="channelConfirm">确定</a>
                    </div>
                    <div class="text">{{channelActiveText}}</div>
                    <ul v-show="channelActiveText == '请选择'">
                        <li 
                            @click="channelListConfirm(index)" 
                            v-for="(item , index) in  channelLIst" 
                            :class="channelListIndex == index ? 'active' :''"
                            :key="index"
                        >
                            <span>{{item.name}}</span>
                            <i class="iconfont iconduihao"></i>
                        </li>
                    </ul>
                    <ul class="children" v-show="channelActiveText != '请选择'">
                        <li 
                            @click="channelLIstChildrenConfirm(index)"
                            v-for="(item , index) in  channelActiveList" 
                            :class="channelLIstChildrenIndex == index ? 'active' :''"
                            :key="index"
                        >
                            <span>{{item.name}}</span>
                            <i class="iconfont iconduihao"></i>
                        </li>
                    </ul>
                </div>
            </van-popup>
        </div>

    
  </div>
</template>
<script>
import Header from '../../../../components/Header';
import { Toast } from 'vant';
import { getStoreMembers , getStoreItem , getStoreChannel , addCustomer , getUserData } from '@/assets/api/Data/AddCustomer';
import { REG_PHONE } from '@/utils/Reg';
export default {
  name: "AddCustomer",
  data() {
    return {
        id:'',
        titleText:'',
        minHeight: 0,
        username:'',
        phone:"",
        sexShow: false,
        sexActive:null,
        sexActions: [
            { name: '请选择', disabled: true },
            { name: '男',key:'1'},
            { name: '女',key:'0' },
        ],
        
        counselorShow:false,
        counselorActive:null,
        counselorColumns: [],

        developerShow:false,
        developerActive:null,
        developerColumns: [],

        projectShow:false,
        projectActive:null,
        projectActiveText:'请选择',
        projectActiveList:[],
        projectLIst:[],
        projectListIndex:null,
        projectLIstChildrenIndex:null,

        channelShow:false,
        channelActive:null,
        channelActiveText:"请选择",
        channelActiveList:[],
        channelLIst:[],
        channelListIndex:null,
        channelLIstChildrenIndex:null,

        remark:"",

        subLoding:false,
        loading : false
    };
  },
  components: {
    Header,
    Toast
  },
  methods: {

    getUserDataFn(){
        let postData = {
            customer_id:this.id
        }
        getUserData(postData).then(res => {
            // console.log(res);
            setTimeout(() => {
                this.loading = false;
            },200)

            this.username = res.data.name;
            this.phone = res.data.mobile;
            this.sexActive = {
                name: res.data.sex.label,
                key: res.data.sex.value
            }
            this.counselorActive = {
                text : res.data.adviser.name,
                users_id : res.data.adviser.users_id,
            }
            if(res.data.development.users_id != 0)
            {
                this.developerActive = {
                    text : res.data.development.name,
                    users_id : res.data.development.users_id,
                }
            }
             
            if(res.data.item[0].users_id != 0)
            {
                this.projectActive = res.data.item;
            }
            
            this.channelActive = res.data.channel;
            this.remark = res.data.complaint
        }).catch((e)=>{
            console.log(e)
        })
    },

    
    //性别选择
    sexSelect(item) {
        this.sexShow = false;
        // console.log(item);
        this.sexActive = item;
        // this.$forceUpdate()
    },

    //显示选项
    popShow(str){
        switch (str) {
            case "sex":
                this.sexShow = true;
                break;
            case "counselor":
                this.counselorShow = true;
                break;
            case "project":
                this.projectShow = true;
                break;
            case "channel":
                this.channelShow = true;
                break;
            case "developer":
                this.developerShow = true;
                break;
            default:
                break;
        }
    },
    //获取顾问
    getUserFn(){
        let postData = {
            role_id:3
        }
        getStoreMembers(postData).then(res => {
            // console.log(res);
            res.data.map((item , index) => {
                item.text = item.name,
                item.key = item.users_id
            })
            this.counselorColumns = res.data
        }).catch((e)=>{
            console.log(e)
        })
    },
    counselorCancel(){
        this.counselorShow = false;
    },
    counselorConfirm(item){
        this.counselorShow = false;
        this.counselorActive = item;
    },
    
    //获取开发者
    getDeveloperFn(){
        getStoreMembers().then(res => {
            res.data.map((item , index) => {
                item.text = item.name,
                item.key = item.users_id
            })
            this.developerColumns = res.data
        }).catch((e)=>{
            console.log(e)
        })
    },
    developerCancel(){
        this.developerShow = false;
    },
    developerConfirm(item){
        this.developerShow = false;
        this.developerActive = item;
    },

    //获取门店-项目
    getShowProjectFn(type,pid,fn){
        let postData = {
            getItem:type,
            p_id:pid
        }
        getStoreItem(postData).then(res => {
            if(pid == undefined)
            {
                this.projectLIst = res.data;
            }
            else
            {
                this.projectActiveList = res.data;
                fn()

            }
            // this.$forceUpdate();
        }).catch((e)=>{
            console.log(e)
        })
    },
    projectCancel(){
        this.projectShow = false;
        this.projectActiveText = '请选择';
        this.projectListIndex = null;
        this.projectLIstChildrenIndex = null;
    },
    projectConfirm() {
        if(this.projectLIstChildrenIndex != null)
        {
            var arr = [
                this.projectLIst[this.projectListIndex],
                this.projectActiveList[this.projectLIstChildrenIndex],
            ]
            this.projectActive = arr;
            this.projectShow = false;
            this.projectActiveText = '请选择';
            this.projectListIndex = null;
            this.projectLIstChildrenIndex = null;
        }
        else
        {
            Toast('请完善资料');
        }
    },
    projectListConfirm(index){
        
        this.projectListIndex = index;
        this.getShowProjectFn(2,this.projectLIst[index].id,() =>{
            this.projectActiveText = this.projectLIst[index].name;
        })

    },
    projectLIstChildrenConfirm(index){
        this.projectLIstChildrenIndex = index;
        // this.$forceUpdate()
    },

    
    //获取门店-渠道
    getShowChannelFn(type,pid,fn){
        let postData = {
            getChannel:type,
            p_id:pid
        }
        getStoreChannel(postData).then(res => {
            if(pid == undefined)
            {
                this.channelLIst = res.data;
            }
            else
            {
                this.channelActiveList = res.data;
                fn()
            }
            this.$forceUpdate();
        }).catch((e)=>{
            console.log(e)
        })
    },
    channelCancel(){
        this.channelShow = false;
        this.channelActiveText = '请选择';
        this.channelListIndex = null;
        this.channelLIstChildrenIndex = null;
    },
    channelConfirm() {
        if(this.channelLIstChildrenIndex != null)
        {
            var arr = [
                this.channelLIst[this.channelListIndex],
                this.channelActiveList[this.channelLIstChildrenIndex],
            ]
            this.channelActive = arr;
            this.channelShow = false;
            this.channelActiveText = '请选择';
            this.channelListIndex = null;
            this.channelLIstChildrenIndex = null;
        }
        else
        {
            Toast('请完善资料');
        }
    },
    channelListConfirm(index){
        this.channelListIndex = index;
        this.getShowChannelFn(2,this.channelLIst[index].id,() =>{
            this.channelActiveText = this.channelLIst[index].name;
        })
    },
    channelLIstChildrenConfirm(index){
        this.channelLIstChildrenIndex = index;
        // this.$forceUpdate()
    },

    //提交
    postSub(){
        let username = this.username;
        let tel = this.phone;
        let sex = this.sexActive;
        if(this.sexActive != null)
        {
            sex = this.sexActive.key;
        }
        let itemid = this.projectActive , itempid = this.projectActive;
        if(this.projectActive != null)
        {
            itempid = this.projectActive[0].id;
            itemid = this.projectActive[1].id;
        }
        else
        {
            itempid = "";
            itemid = "";
        }
        let channelpid = this.channelActive , channelid = this.channelActive;
        if(this.channelActive != null)
        {
            channelpid = this.channelActive[0].id;
            channelid = this.channelActive[1].id;
        }

        let consultationid = this.counselorActive;
        if(this.counselorActive != null )
        {
            consultationid = this.counselorActive.users_id;
        }

        let developerid = this.developerActive;
        if(this.developerActive != null )
        {
            developerid = this.developerActive.users_id;
        }

        let complaint = this.$base.trimStr(this.remark);
        if(username != '' && tel != '' && REG_PHONE.test(tel) && sex != null  && channelpid != null && consultationid != null && complaint != '')
        {
            
            let postData = {
                sex:sex,
                name:username,
                mobile:tel,
                consultation_id:consultationid,
                channel_pid:channelpid,
                channel_id:channelid,
                item_pid:itempid,
                item_id:itemid,
                complaint:complaint,
                customer_id:this.id,
                development:developerid
            }
            this.subLoding = true
            addCustomer(postData).then(res => {
                // console.log(res);
                setTimeout(() => {
                    this.subLoding = false;
                    if( res.status == 0 )
                    {
                        Toast({
                            message: '提交成功',
                            type: 'success',
                            duration:1500,
                            onClose:()=>{
                                window.history.go(-1)
                            }
                        });
                    }
                    else
                    {
                        Toast(res.msg);
                    }
                },1000)
            }).catch((e)=>{
                console.log(e)
            })
        }
        else
        {
            Toast('请完善资料');
        }
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    if(this.$route.query.id == undefined)
    {
        this.titleText = "新增顾客";
    }
    else
    {
        this.titleText = "修改顾客";
        this.id = this.$route.query.id;
        this.loading = true;
        this.getUserDataFn()
    }

    //获取顾问
    this.getUserFn()
    //获取门店-项目
    this.getShowProjectFn(1)
    //获取门店-渠道
    this.getShowChannelFn(1)
    //获取开发者
    this.getDeveloperFn()
  
  
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.minHeight = window.innerHeight
  },

  // 更新前状态
  beforeUpdate() {
  },

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
@import "./AddCustomer.scss";
</style>



    
