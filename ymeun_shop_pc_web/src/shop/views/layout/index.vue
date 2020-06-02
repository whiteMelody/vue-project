<template>
    <el-container >
        <!-- <NavItem></NavItem> -->
        <NewNavItem></NewNavItem>
        <el-container class="elContainer">
            <app-header></app-header>
            <div :style="'min-height: '+minHeight+'px;width: 100%;background-color: #f8f8f8'">
                <div class="contentRoute">
                    <div class="mainBackground">
                        <router-view></router-view>
                        <div class="assistant" :style="showBackTop ? 'bottom: 114px;' : 'bottom: 60px;'"  @mouseenter="activeAssistant" @mouseleave="activeAssistant" @click="Close">
                            <img :src="assistantIsShow ? imgUrlOne : imgUrlTwo" alt="">
                        </div>
                        <div class="Popup" :style="showBackTop ? 'bottom: 114px;' : 'bottom: 60px;'" v-show="PopupIsShow">
                            <div class="title">
                                <span>依美云小助手</span>
                                <i class="iconfont iconfork" @click="Close"></i>
                            </div>
                            <div class="centent">
                                <div class="text"><span>{{!listIsShow ? '您想了解哪方面的信息：' : nounName}}</span> <span v-show="listIsShow" @click="listIsShow = !listIsShow">返回上一级</span></div>
                                <div class="bottom" v-if="!listIsShow">
                                    <div class="ButtonGroup" v-for="(item, index) in list" :key="index" @click="switchList(index)">{{item}}</div>
                                </div>
                                <div class="list" v-else v-loading="loading">
                                        <ul v-if="levelIndex == 0">
                                            <li class="no" v-show="!domeList.length">近十天内没有过生日的客户哦</li>
                                            <GeminiScrollbar class="my-scroll-bar" :forceGemini="true" v-if="domeList.length > 7">
                                                <li v-for="(item, index) in domeList" :key="index">
                                                    <div class="name" @click="Jump(item.id)">
                                                        <span :class='{spanIsShow : item.name.length > 5}'>{{item.name}}</span>（{{item.sex.label}}士）
                                                    </div>
                                                    <div class="phone">{{item.mobile}}</div>
                                                    <div class="time">{{item.birthtoday}}</div>
                                                </li>
                                            </GeminiScrollbar>
                                            <li v-for="(item, index) in domeList" :key="index" v-else>
                                                <div class="name" @click="Jump(item.id)">
                                                    <span :class='{spanIsShow : item.name.length > 5}'>{{item.name}}</span>（{{item.sex.label}}士）
                                                </div>
                                                <div class="phone">{{item.mobile}}</div>
                                                <div class="time">{{item.birthtoday}}</div>
                                            </li>
                                        </ul>
                                        <ul v-else-if="levelIndex == 1">
                                            <GeminiScrollbar class="my-scroll-bar" :forceGemini="true">
                                                <li v-for="(item, index) in nounList" :key="index"  class="liList">
                                                    <div>
                                                        <span>{{item.name}}</span>
                                                        <span>{{item.text}}</span>
                                                    </div>
                                                </li>
                                            </GeminiScrollbar>
                                        </ul>
                                </div>
                            </div>
                        </div>
                        <div class="fixed w50px h50px lh50px text-center radius1 pointer myBackTop" v-show="showBackTop" style="bottom: 60px; right: 40px; z-index:9999;" @click="backTop">
                            <i class="iconfont iconshouqi f24px"></i>
                        </div>
                    </div>
                </div>
            </div>
        </el-container>
    </el-container>
</template>

<script>
    import NavItem from './navItem'
    import AppHeader from './appHeader'
    // 新改侧边栏
    import NewNavItem from './newNavItem'

    import { checkVersion,getBirthdayReminders } from "@/shop/assets/api/common/common";


    export default {
        name: "index",
        components: {
            AppHeader,
            NavItem,
            NewNavItem
        },
        data() {
            return{
                minHeight: 0,
                list:['客户生日提醒','名词解释'],
                nounList:[
                    {name:'备用客户：',text:'从未开过计入业绩单的客户'},
                    {name:'新客：',text:'开过一次计入业绩项目单的客户'},
                    {name:'老客：',text:'开过二次计入业绩项目单的客户'},
                    {name:'邀约回访：',text:'客户预约超时未到店生成的回访'},
                    {name:'满意度回访：',text:'首次划扣会生成'},
                    {name:'未成交回访：',text:'客户到店未开单生成的回访'},
                    {name:'术后邀约回访：',text:'客户划扣后第二天生成'},
                    {name:'主动回访：',text:'主动发起的回访'},
                    {name:`${this.$store.getters.roleName.adviser}邀约划扣回访：`,text:'新客二次上门分诊未划扣生成的回访'},
                    {name:`${this.$store.getters.roleName.technician}邀约划扣回访：`,text:'新客二次上门分诊未划扣生成的回访'},
                    {name:'催款回访：',text:'客户欠款7天后生成的回访'},
                ],
                nounName:'',
                showBackTop: false,
                assistantIsShow: false,
                PopupIsShow: false,
                listIsShow: false,
                loading: false,
                imgUrlOne:require("@/shop/assets/img/assisant/assisantOne.png"),
                imgUrlTwo:require("@/shop/assets/img/assisant/assisantTwo.png"),
                domeList:[],
                levelIndex:'',
            }
        },
        methods: {
            backTop(){
                window.scrollTo(0,0)
            },

            Close() {
                this.PopupIsShow = !this.PopupIsShow;
                if (this.PopupIsShow) {
                    this.listIsShow = false;
                }
            },
            activeAssistant() {
                this.assistantIsShow = !this.assistantIsShow;
            },
            switchList(index) {
                this.listIsShow = true;
                this.levelIndex = index;
                this.loading = true;
                if (index == 0) {
                    this.nounName = '客户生日提醒';
                    this.BirthdayReminders();
                }else if (index == 1) {
                    this.nounName = '名词解释';
                    setTimeout(() => {
                        this.loading = false;
                    },1000);
                }
            },

            BirthdayReminders() {
                let data ={
                    birthdayTime:this.$base.getDateScope(1).endTime,
                    start:1,
                    perpage:20
                }
                getBirthdayReminders(data).then(res => {
                    if (res.status == 0) {
                        this.domeList = res.data.list;
                        this.loading = false;
                    }
                }).catch(error=>{
                    console.log('getBirthdayReminders-----------------no');
                })
            },

            Jump (id) {
                this.$router.push({
                    path:'/ClientDel',
                    query:{id:id,types:0}
                });
                this.Close();
            }
        },
        mounted(){
            this.minHeight = window.innerHeight - 50;

            let _this = this

            window.onscroll = function (e) {

                if($(window).scrollTop() >= 300){
                    _this.showBackTop = true
                }else{
                    _this.showBackTop = false
                }
            }
        },

        updated(){
            checkVersion().then(res=>{

                if(res.status == 0){

                    //获取本地版本号
                    let versionCode = localStorage.getItem('versionCode')

                    if(this.$base.isNull(versionCode)){
                        //没有版本号
                        localStorage.setItem('versionCode', res.data.versionCode)
                    }else{
                        //有版本号checkVersion

                        if( Number.parseInt(versionCode) < Number.parseInt(res.data.versionCode)){
                            //删除所有缓存，提示退出登录
                            this.$confirm('检测到系统更新，请重新登录', '系统更新', {
                                confirmButtonText: '确定',
                                showCancelButton:false,
                                showClose:false,
                                type: 'warning'
                            }).then(() => {
                                localStorage.clear()
                                window.location.href = "/#/Login";
                            })

                        }

                    }
                }

            })
        }
    }
</script>

<style lang="scss" scoped>
@import './index.scss';    
</style>

<style>
    .my-scroll-bar {
        height: 360px;
    }
    /* 背景色 */
    .gm-scrollbar.-vertical {
        /* background-color: #f2f2f2; */
    }

    /* 滚动轨迹 */
    .gm-scrollbar.-horizontal {
        background-color: transparent;
    }

    /* 滚动条颜色 */
    .gm-scrollbar .thumb {
        background-color: #c0c0c0;
    }
    .gm-scrollbar .thumb:hover {
        background-color: #666666;
    }
</style>
