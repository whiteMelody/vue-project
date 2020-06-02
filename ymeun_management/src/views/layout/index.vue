<template>
    <el-container>
        <app-header></app-header>
        <NavItem></NavItem>
<!--        <el-container class="elContainer">-->
            <div :style="'min-height: '+minHeight+'px;width: 100%;background-color: #f8f8f8;width: calc(100% - 160px);padding-left:160px;padding-top:50px' ">
                <div class="contentRoute">
                    <div class="mainBackground">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
<!--        </el-container>-->
    </el-container>
</template>

<script>
    import NavItem from './navItem'
    import AppHeader from './appHeader'

    export default {
        name: "index",
        components: {
            AppHeader,
            NavItem
        },
        data() {
            return{
                minHeight: 0
            }
        },
        mounted(){
            this.minHeight = window.innerHeight - 50;
        }
    }
</script>

<style scoped>
    .elContainer {
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        /*position: absolute;*/
        /*left: 160px;*/
        /*top: 50px;*/
        width: calc(100% - 160px);
    }
    .contentRoute{
        padding: 0;
    }

    .mainBackground {
        /* padding: 15px 20px; */
        background-color: #f8f8f8;
        /*box-shadow: 0 1px 1px 0px rgba(0, 34, 77, 0.06);*/
    }
</style>
