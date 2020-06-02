<template>
    <div class="wb100">
        <div class="wb100 bg-white1">
            <div class="w110px h50px lh50px fl text-center pointer bd-t2 bd-gray4 fc-gray4 bg-white1">
                版块
            </div>
            <div class="clear0"></div>
        </div>

        <div class="pa20">
            <div class="wb100">
               <p class="fc-green f14px">已购买版块</p>

                <div class="clear4"></div>

                <div class="wb100">

                    <template v-for="item in availableList">

                        <div class="w220px h110px fl bg-green mar20 mab20 radius1">
                            <div class="pa14 fc-white">
                                <p class="f18px h50px lh25px fl w125px">
                                    {{item.title}}
                                </p>
                                <span class="fr bd-white bd-a1 h25px lh25px radius5 w60px text-center pointer" @click="close(item.id)">取消</span>
                                <div class="clear3"></div>
                                <p class="f12px">到期时间：{{formatDate(item.end_time)}}</p>
                            </div>
                        </div>

                    </template>

                    <template  v-if="availableList.length <=0">
                        <div class="w220px h110px fl bg-white1 radius1">
                            <div class="pa14 fc-gray3 text-center">
                                <div class="clear2"></div>
                                <img src="@/assets/img/img-empty.png">
                                <div class="clear2"></div>
                                <p class="fc-gray2">暂未购买版块</p>
                            </div>
                        </div>
                    </template>

                </div>

            </div>

            <div class="clear4 bd-gray bd-b1"></div>
            <div class="clear4"></div>

            <div class="wb100">
                <p class="fc-green f14px">未购买版块</p>

                <div class="clear4"></div>

                <div class="wb100">

                    <template v-for="item in purchasableList">

                        <div class="w220px h110px fl bg-gray1 mar20 mab20 radius1">
                            <div class="pa14 fc-gray3">
                                <p class="f18px h50px lh25px">
                                    {{item.title}}
                                </p>
                                <div class="clear2"></div>
                                <span class="fl bd-gray5 bd-a1 h25px lh25px radius5 w80px text-center pointer" @click="open(item.id)">开通</span>
                            </div>
                        </div>

                    </template>

                    <template  v-if="purchasableList.length <=0">
                        <div class="w220px h110px fl bg-white1 radius1">
                            <div class="pa14 fc-gray3 text-center">
                                <div class="clear2"></div>
                                <img src="@/assets/img/img-empty.png">
                                <div class="clear2"></div>
                                <p class="fc-gray2">无可购买的版块</p>
                            </div>
                        </div>
                    </template>

                </div>

            </div>

        </div>

        <div class="clear0"></div>

        <div class="wb100">
            <el-button @click="back">返回</el-button>
        </div>

        <div class="clear4"></div>
    </div>
</template>

<script>

    import { getPurchasable, opened, cannel, getAvailable } from  "@/assets/api/home/home"

    export default {
        name: "OpeningSection",
        props: ['id'],
        components: {

        },
        data() {
            return {
                purchasableList: [],
                availableList: [],
            }
        },
        created() {},
        methods: {

            formatDate(str){
                return str.substring(0, str.length-3)
            },

            back(){
                this.$parent.openTabControl()
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
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
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
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });


            },
            loadData(){
                getPurchasable({
                    enterpriseId: this.id,
                    start: 1,
                    perpage: 999,
                }).then(res=>{
                    if(res.status == 0){
                        this.purchasableList = res.data.list
                    }
                })
                getAvailable({
                    enterpriseId: this.id,
                    start: 1,
                    perpage: 999,
                }).then(res=>{
                    if(res.status == 0){
                        this.availableList = res.data.list
                    }
                })

            },
        },
        mounted() {
            this.loadData()
        },
        watch:{
            id(c,o){
                this.loadData()
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
