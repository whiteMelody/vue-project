<template>
    <el-container>
        <!-- <NavItem></NavItem> -->
        <NewNavItem></NewNavItem>
        <el-container class="elContainer">
            <app-header></app-header>
            <div :style="'min-height: '+minHeight+'px;width: 100%;background-color: #f8f8f8'">
                <div class="contentRoute">
                    <div class="mainBackground">
                        <router-view></router-view>
                        <div class="fixed w50px h50px lh50px text-center radius1 pointer myBackTop" v-show="showBackTop" style="bottom: 66px; right: 40px; z-index:9999;" @click="backTop">
                            <i class="iconfont iconshouqi f24px"></i>
                        </div>
                    </div>
                </div>
            </div>
        </el-container>
    </el-container>
</template>

<script>
    import AppHeader from './AppHeader'
    // 新改侧边栏
    import NewNavItem from './NewNavItem'

    import { checkVersion } from "@/chain/assets/api/common/common";

    export default {
        name: "index",
        components: {
            AppHeader,
            NewNavItem
        },
        data() {
            return{
                minHeight: 0,
                showBackTop: false,
            }
        },
        methods: {
            backTop(){
                window.scrollTo(0,0)
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
                        //有版本号

                        if( Number.parseInt(versionCode) < Number.parseInt(res.data.versionCode)){
                            //删除所有缓存，提示退出登录
                            this.$confirm('检测到系统更新，请重新登录', '系统更新', {
                                confirmButtonText: '确定',
                                showCancelButton:false,
                                showClose:false,
                                type: 'warning'
                            }).then(() => {
                                localStorage.clear()
                                window.location.href = "/Login"
                            })

                        }

                    }
                }

            })
        }
    }
</script>

<style scoped>
    .elContainer {
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        /* left: 160px; */
        left: 136px;
        top: 0;
        width: calc(100% - 136px);
    }
    .elContainer::-webkit-scrollbar {
    display: none;
    }
    .contentRoute{
        padding: 0;
        /*padding-top: 0.6rem;*/
        /*padding-left: 0.2rem;*/
        /*padding-right: 0.24rem;*/
    }

    .mainBackground {
        /* padding: 15px 20px; */
        background-color: #f8f8f8;
        /*box-shadow: 0 1px 1px 0px rgba(0, 34, 77, 0.06);*/
    }
    .myBackTop{
        background: rgba(200,200,200,1);
        color: #999999;
    }
    .myBackTop:hover{
        background: rgba(200,200,200,.8);
        color: #FFFFFF;
    }
</style>
