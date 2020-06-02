<template>

    <div class="wb100 f14px bg-white1">
        <div class="pal24 par24 pat20 pab20">
            <div class="pal19 par19 bg-white">
                <p class="lh50px h50px">
                    <span class="fl f16px fc-gray4">设置{{$store.getters.roleName.adviser}}折扣权限</span>
                </p>

                <div class="clear0"></div>
                <el-alert
                        title="折扣可输入0.1~9.9折，并可保留小数点后一位，例如: 7.5 折"
                        type="warning">
                </el-alert>

                <div class="clear4"></div>

                <div class="wb100">

                    <el-form ref="form" label-width="100px">
                        <template v-for="item in list">
                            <div class="wb25 fl">
                                <el-form-item :label="item.name" prop="discount">
                                    <el-input-number v-model="item.discount" :precision="1" :step="0.1" :min="0.1" :max="9.9" :controls="false"></el-input-number>
                                </el-form-item>
                            </div>
                        </template>
                    </el-form>

                    <div class="clear10"></div>

                    <div class="text-center">
                        <template v-if="disabled">
                            <el-button type="primary" disabled>提交中...</el-button>
                        </template>
                        <template v-else>
                            <el-button type="primary" @click="save">保存设置</el-button>
                        </template>
                    </div>

                    <div class="clear4"></div>

                </div>

            </div>
        </div>
    </div>

</template>

<script>

    import { membersDiscountByAll, membersList } from "@/shop/assets/api/manage/teamManagement"

    export default {
        name: "OperationStatement",
        components: {
        },
        data() {
            return {
                list: [],
                disabled: false,
            }
        },
        mounted() {
            membersList({
                roleId: 3
            }).then(res=>{
                if(res.status == 0){

                    let _tmp = res.data.list

                    for(let i=0; i<_tmp.length; i++){

                        console.log(Number.parseFloat(_tmp[i].discount))
                        console.log(Number.parseFloat(_tmp[i].discount) == 0 || Number.parseFloat(_tmp[i].discount) == 0.0)

                        if(Number.parseFloat(_tmp[i].discount) == 0 || Number.parseFloat(_tmp[i].discount) == 0.0){
                            _tmp[i].discount = ''
                        }
                    }

                    console.log(_tmp)

                    this.list = _tmp

                }else{
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                    });
                }
            }).catch(error=>{
                this.$message({
                    showClose: true,
                    message: error,
                    type: 'error',
                });
            })
        },
        methods: {
            save(){
                let _tmp = []
                for(let i=0; i< this.list.length; i++){
                    _tmp.push({
                        users_id: this.list[i].users_id,
                        discount: this.list[i].discount,
                    })
                }
                this.disabled = true
                membersDiscountByAll({
                    data: JSON.stringify(_tmp)
                }).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            showClose: true,
                            message: `${this.$store.getters.roleName.adviser}折扣设置成功`,
                            type: 'success',
                            onClose:()=>{
                                this.$router.go(-1)
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
            },
        },
        watch: {

        }

    }

</script>

<style scoped lang="scss">

    .is-selected {
        color: #1989FA;
    }
</style>
