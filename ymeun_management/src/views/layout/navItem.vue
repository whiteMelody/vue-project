<template>
    <el-aside width="160px" class="asideNav relative">

        <div class="wb100">

            <div class="clear10"></div>

            <div class="wb100 text-center fc-white pat15 pab15 pointer " v-for="(item, index) in navItemList" :key="index" @click="tabClick(index,item.router)" :class="{active: tabIndex == index}">
                <img :src="item.img">
                <p>{{item.name}}</p>
            </div>


<!--            <el-menu style="width: 160px; z-index: 9; height: auto; background: transparent" default-active="1" class="el-menu-vertical-demo relative"-->
<!--                     :unique-opened="true"-->
<!--                     @open="handleOpen" @close="handleClose"-->
<!--                     text-color="#fff" active-text-color="#fff">-->

<!--                <el-menu-item index="home" @click="handleRouterPush('Home')">-->
<!--                    <i class="iconfont iconshouye fc-white f16px"></i>-->
<!--                    <span slot="title">企业管理</span>-->
<!--                </el-menu-item>-->

<!--            </el-menu>-->

        </div>

    </el-aside>
</template>

<script>

    export default {
        name: "navItem",
        data() {
            return {
                navItemList:[
                    {name:'企业管理',img:require("@/assets/img/icon-home.png"),router:'/EnterpriseList'},
                    {name:'消息管理',img:require("@/assets/img/img-News.png"),router:'/MessageList'},
                    {name:'任务管理',img:require("@/assets/img/task.png"),router:'/TaskList'},
                    {name:'数据管理',img:require("@/assets/img/icon-data.png"),router:'/Data'}
                ],
                tabIndex :0

            };
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleRouterPush(val) {
                // console.log(val)
                this.$router.push(`/${val}`)
            },
            tabClick(index,routerName) {
                this.tabIndex = index;
                this.$router.push(routerName);
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .asideNav {
        width: 160px;
        height: 100%;
        position: fixed;
        top: 50px;
        bottom: 0;
        left: 0;
        overflow-x: hidden ;
        overflow-y: auto;
        background:#363E46;
        z-index: 99;
    }
    .asideNav::-webkit-scrollbar {
        display: none;
    }

    .active {
        background: #444E58;
    }

</style>
