<template>

    <div class="wb100 f14px bg-white1">
        <div class="pal24 par24 pat20 pab20">
            <div class="pal19 par19 bg-white">
                <div class="wb100">
                    <div class="lh50px h50px f16px fc-gray4">
                        {{info.customer.name}}
                        <span class="fc-gray3 mal20">
                            档案完成度<span class="fc-red f18px">{{info.customer.percentage}}</span>
                        </span>

                        <div class="fr fc-gray4">
                            <span class="fl pointer" :class="isDone ? 'fc-gray2': 'fc-gray4'" @click="loadData(false)">未完成：{{info.customer.notLabelCount}}（道）</span>
                            <span class="fl mal20 mar20 fc-gray">|</span>
<!--                            <span class="fr pointer" :class="isDone ? 'fc-gray4': 'fc-gray2'" @click="loadData(true)">已完成：{{ info.totalCount ? info.totalCount : info.customer.totalLabelCount - info.customer.notLabelCount}}（道）</span>-->
                            <span class="fr pointer" :class="isDone ? 'fc-gray4': 'fc-gray2'" @click="loadData(true)">已完成：{{info.customer.completeLabelCount}}（道）</span>
                        </div>

                    </div>

                    <div class="clear0 bd-b1 bd-gray"></div>

                    <div class="clear2"></div>

                    <div class="condition">
                        <ul>
                            <li 
                            v-for="(item , index) in conditionList" 
                            :key="index" 
                            :class="{'active' : conditionIndex == index}" 
                            @click="conditionListFn(index,item.id)"
                            >{{item.name}}</li>
                        </ul>
                    </div>
                    <div class="clear0 bd-b1 bd-gray"></div>

                    <div class="clear2"></div>

                    <div class="wb85 center f14px fc-gray3" v-loading="loading">

                        <template v-if="isDone">
                            <div class="wb100">

                                <template v-if="disabled">
                                    <div class="w100px h40px lh40px bg-blue6 fc-white text-center fr radius1">
                                        保存中...
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="w100px h40px lh40px bg-blue6 fc-white text-center fr radius1" @click="save">
                                        保存修改
                                    </div>
                                </template>


                            </div>
                        </template>

                        <el-form ref="form" :model="form" label-width="100px">

                            <template v-for="(item, index) in info.label">
                                <p class="h50px lh50px fc-gray4 f16px">{{index + 1}}、{{item.problem}}</p>
                                <div class="clear2"></div>

                                <!-- 单选 -->
                                <template v-if="item.type == 1">
                                    <el-form-item label-width="0">
                                        <el-radio-group v-model="item.userAnswer">
                                            <el-radio :label="item2.content" :key="item2.id" :value="item2" v-for="(item2,key) in item.content"></el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </template>

                                <!-- 多选 -->
                                <template v-else-if="item.type == 2">
                                    <el-form-item label-width="0">
                                        <el-checkbox-group v-model="item.userAnswer" class="fl" :value="item.answer_id">
                                            <el-checkbox :label="item2.content" :key="item2.id" :value="item2.id" v-for="(item2,key) in item.content"></el-checkbox>
                                        </el-checkbox-group>
                                        <el-button class="el-icon-plus fl mal20 pa5 mat3" size="mini" @click="openDialog(item)"></el-button>
                                    </el-form-item>
                                </template>

                                <!-- 文本框 -->
                                <template v-else-if="item.type == 3">
                                    <el-input type="textarea" v-model="item.userAnswer" :value="item.content" placeholder="请输入..."></el-input>
                                </template>

                                <!-- 多条文本框 -->
                                <template v-else-if="item.type == 4">
                                    <template v-for="item2 in item.title">
                                        <div class="wb50 fl">
                                            <el-form-item :label="item2.title">
                                                <el-input type="text" v-model.trim="item2.userAnswer" placeholder="请输入内容..." clearable></el-input>
                                            </el-form-item>
                                        </div>
                                    </template>

                                </template>

                                <!-- 多条多选 -->
                                <template v-else-if="item.type == 5">
                                    <template v-for="item2 in item.title">
                                        <el-form-item :label="item2.title">
                                            <el-checkbox-group v-model="item2.userAnswer" class="fl">
                                                <el-checkbox :label="item3.content" :key="item3.id" :value="item3.content" v-for="(item3,key) in item2.content"></el-checkbox>
                                            </el-checkbox-group>
                                            <el-button class="el-icon-plus fl mal20 pa5 mat3" size="mini" @click="openDialog(item2)"></el-button>
                                        </el-form-item>
                                    </template>
                                </template>

                                <div class="clear2 bd-b1 bd-gray"></div>
                                <div class="clear2"></div>

                            </template>

                            <div class="clear2"></div>

                        </el-form>

                        <div class="clear0"></div>

                    </div>

                </div>

                <div class="clear4"></div>

                
                <template v-if="!isDone">
                    <template v-if="noData">
                        <div class="wb100">

                            <template v-if="disabled">
                                <div class="w400px h40px lh40px bg-blue6 fc-white text-center center radius1">
                                    保存中...
                                </div>
                            </template>
                            <template v-else>
                                <div class="w400px h40px lh40px bg-blue6 fc-white text-center center radius1 pointer" @click="save(false)">
                                    保存并填写下一页
                                </div>
                            </template>

                            <template v-if="disabled">
                                <p class="fc-blue6 text-center lh40px">保存中...</p>
                            </template>
                            <template v-else>
                                <p class="fc-blue6 text-center lh40px pointer" @click="save(true)">仅保存，暂时就这些</p>
                            </template>

                        </div>
                        <div class="clear4"></div>
                    </template>
                    <template v-else>
                        <p class="text-center fc-gray2 f16px">这类问题已全部回答，去填写其他问题吧</p>
                        <div class="clear6"></div>
                    </template>
                </template>

                <template v-else>
                    <div class="text-center">
                        <el-pagination class="page" @size-change="size=>pageInfo.size=size"
                                       layout="total, sizes, prev, pager, next, jumper"
                                       :current-page.sync="pageInfo.pageStart" :page-sizes="pageInfo.pageArr"
                                       :page-size="pageInfo.size" :total="info.totalCount">
                        </el-pagination>
                    </div>
                </template>

            </div>

        </div>

        <!--   添加&修改选项弹窗   -->
        <el-dialog :title="isEdit ? '修改选项' : '添加选项'" :visible.sync="dialogEdit" width="400px">
            <el-form :model="dialogEditParam">
                <el-form-item label>
                    <el-input v-model="dialogEditParam.contentVal" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hideDialog">取 消</el-button>
                <template v-if="disabled">
                    <el-button type="primary" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="addOptions">确 定</el-button>
                </template>
            </div>
        </el-dialog>

    </div>

</template>

<script>

    import { 
        getSeeXFiles, 
        getCustomerNotCompleteXFilesList, 
        getCustomerCompleteXFilesList, 
        postCustomerAddXFiles, 
        postAddLabelContent,
        getCustomerLabelType
    } from "@/shop/assets/api/client/privateArchives"

    export default {
        name: "PrivateArchives",
        components: {

        },
        data() {
            return {
                isEdit: false,
                disabled: false,
                dialogEdit: false,
                dialogEditParam: {},
                customerId: '',
                info: {
                    customer: {
                        notLabelCount: 0,
                        totalLabelCount: 0,
                    }
                },
                form:{},
                isDone: false,
                noData:true,
                oldAnswers: {},

                pageInfo: this.$defalutPage(),
                typeId:'',
                conditionList:[],
                conditionIndex:[],
                loading:false,
            }
        },
        mounted() {
            this.customerId = this.$route.query.customerId
            this.isDone = this.$route.query.isDone ? this.$route.query.isDone : false
            this.getCustomerLabelTypeFn()

        },
        methods: {
            // 筛选条件类型选择
            conditionListFn(index,id){
                this.conditionIndex = index;
                this.typeId = id
                this.loadData()
            },
             // 私密档案问题类型列表
            getCustomerLabelTypeFn(){
                getCustomerLabelType({
                    customerId: this.customerId,
                }).then(res => {
                    this.conditionList = res.data
                    
                    if(res.data.length > 0){
                        this.typeId = res.data[0].id

                    }
                    this.loadData(this.isDone)

                }).catch(error=>{
                    console.log("getCustomerLabelType no");
                })
            },
            openDialog(item){
                this.dialogEdit = true
                this.dialogEditParam = item
            },
            hideDialog(){
                this.dialogEdit = false
            },
            addOptions(){
                this.dialogEdit = false
                this.disabled = true
                //2 多选
                //5 多个多选
                postAddLabelContent({
                    customerId: this.customerId,
                    labelId: this.dialogEditParam.label_id || this.dialogEditParam.id,
                    type: this.dialogEditParam.type,
                    content: this.dialogEditParam.contentVal,
                    titleId: this.dialogEditParam.title_id || this.dialogEditParam.id,
                }).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            message: '添加选项成功',
                            type: 'success'
                        });
                        this.loadData()
                        this.disabled = false
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

            getAnswers(){
                let data = this.info.label

                let _tmp = []

                for(let i=0; i<data.length; i++){
                    if(data[i].type == 1){
                        if(data[i].userAnswer){

                            let _t = data[i].content.find(item => item.content == data[i].userAnswer)

                            _tmp.push({
                                problem: {
                                    singular: {
                                        id: _t.label_id || _t.id,
                                        answer_id: _t.answer_id || _t.id,
                                        label_id: _t.label_id,
                                        value: _t.userAnswer,
                                    },
                                    type: 1,
                                },
                                id: data[i].id,
                            })

                        }else{
                            _tmp.push({
                                problem: {
                                    singular: {
                                        id: data[i].id,
                                        answer_id: false,
                                        label_id: data[i].label_id || data[i].id,
                                        value: false,
                                    },
                                    type: 1,
                                },
                                id: data[i].id,
                            })
                        }
                    }else if(data[i].type == 2){
                        if(data[i].userAnswer.length){
                            let __tmp = []
                            for(let j=0; j<data[i].userAnswer.length; j++){

                                for(let k=0; k<data[i].content.length; k++){

                                    if(data[i].userAnswer[j] == data[i].content[k].content){
                                        __tmp.push({
                                            id: data[i].content[k].id,
                                            title_id: data[i].content[k].title_id || data[i].content[k].id,
                                            label_id: data[i].content[k].label_id,
                                            content: data[i].content[k].content,
                                        })
                                    }
                                }


                            }
                            _tmp.push({
                                problem: {
                                    complex: {
                                        id: data[i].id,
                                        title_id: data[i].title_id || data[i].id,
                                        value: __tmp,
                                    },
                                    type: 2,
                                },
                                id: data[i].id,
                            })
                        }else{
                            _tmp.push({
                                problem: {
                                    complex: {
                                        id: data[i].id,
                                        title_id: data[i].title_id || data[i].id,
                                        value: false,
                                    },
                                    type: 2,
                                },
                                id: data[i].id,
                            })
                        }
                    }if(data[i].type == 3){
                        if(data[i].userAnswer){
                            _tmp.push({
                                problem: {
                                    text: {
                                        id: data[i].id,
                                        title_id: data[i].title_id || data[i].id,
                                        label_id: data[i].label_id,
                                        value: data[i].userAnswer,
                                    },
                                    type: 3,
                                },
                                id: data[i].id,
                            })
                        }else{
                            _tmp.push({
                                problem: {
                                    text: {
                                        id: data[i].id,
                                        title_id: data[i].title_id || data[i].id,
                                        label_id: data[i].label_id,
                                        value: null,
                                    },
                                    type: 3,
                                },
                                id: data[i].id,
                            })
                        }
                    }if(data[i].type == 4){
                        let __tmp = []
                        for(let k=0; k<data[i].title.length; k++){
                            if(data[i].title[k].userAnswer){
                                __tmp.push({
                                    id: data[i].title[k].id,
                                    title_id: data[i].title[k].title_id || data[i].title[k].id,
                                    label_id: data[i].title[k].label_id,
                                    content: data[i].title[k].userAnswer,
                                })
                            }else{
                                __tmp.push({
                                    id: data[i].title[k].id,
                                    title_id: data[i].title[k].title_id || data[i].title[k].id,
                                    label_id: data[i].title[k].label_id,
                                    content: null,
                                })
                            }
                        }
                        if(__tmp.length){
                            _tmp.push({
                                problem: {
                                    multiple_text: {
                                        id: data[i].id,
                                        title_id: data[i].title_id || data[i].id,
                                        value: __tmp,
                                    },
                                    type: 4,
                                },
                                id: data[i].id,
                            })
                        }else{
                            _tmp.push({
                                problem: {
                                    multiple_text: {
                                        id: data[i].id,
                                        title_id: data[i].title_id || data[i].id,
                                        value: null,
                                    },
                                    type: 4,
                                },
                                id: data[i].id,
                            })
                        }

                    }if(data[i].type == 5){
                        let ___tmp = []

                        for(let k=0; k<data[i].title.length; k++){
                            if(data[i].title[k].userAnswer.length){
                                let __tmp = []

                                for(let j=0; j<data[i].title[k].userAnswer.length; j++){
                                    if(data[i].title[k].userAnswer[j]){
                                        for(let k1=0; k1<data[i].title.length; k1++){
                                            let _t = data[i].title[k1].content.filter(item => item.content == data[i].title[k].userAnswer[j])
                                            if(_t.length){
                                                __tmp.push({
                                                    id: _t[0].id,
                                                    title_id: _t[0].title_id || _t[0].id,
                                                    label_id: _t[0].label_id,
                                                    content: _t[0].content,
                                                })
                                            }
                                        }
                                    }
                                }
                                ___tmp.push(__tmp[0])
                            }else{
                                ___tmp.push({
                                    id: false,
                                    title_id: data[i].title[k].title_id || data[i].title[k].id,
                                    label_id: data[i].title[k].label_id,
                                    content: false,
                                })
                            }
                        }


                        if(___tmp.length){
                            _tmp.push({
                                problem: {
                                    multiple_checkbox: {
                                        id: data[i].id,
                                        title_id: data[i].title_id || data[i].id,
                                        value: ___tmp,
                                    },
                                    type: 5,
                                },
                                id: data[i].id,
                            })
                        }else{
                            _tmp.push({
                                problem: {
                                    multiple_checkbox: {
                                        id: data[i].id,
                                        title_id: data[i].title_id || data[i].id,
                                        value: false,
                                    },
                                    type: 5,
                                },
                                id: data[i].id,
                            })
                        }


                        // if(data[i].userAnswer.length){
                        //     let __tmp = []
                        //     for(let j=0; j<data[i].userAnswer.length; j++){
                        //         for(let k=0; k<data[i].content.length; k++){
                        //             if(data[i].userAnswer[j] == data[i].content[k].content){
                        //                 __tmp.push({
                        //                     id: data[i].content[k].id,
                        //                     // label_id: data[i].content[k].label_id,
                        //                     content: data[i].content[k].userAnswer,
                        //                 })
                        //             }
                        //         }
                        //     }
                        //     _tmp.push({
                        //         problem: {
                        //             multiple_checkbox: {
                        //                 id: data[i].id,
                        //                 value: __tmp,
                        //             },
                        //             type: 2,
                        //         }
                        //     })
                        // }

                    }

                }

                return _tmp
            },

            loadData(type){

                this.isDone = type
                this.loading = true;
                //已完成
                if(type){
                    getCustomerCompleteXFilesList({customerId: this.customerId, start: this.pageInfo.pageStart, perpage: this.pageInfo.size,labelTypeId:this.typeId }).then(res=>{
                        if(res.status == 0){
                            res.data.label.length > 0 ? this.noData = true : this.noData = false

                            let _tmp = res.data
                            for(let i=0; i<_tmp.label.length; i++){
                                if(_tmp.label[i].type == 4){
                                    for(let j=0; j<_tmp.label[i].title.length; j++){
                                        _tmp.label[i].title[j].userAnswer =  _tmp.label[i].title[j].content
                                    }
                                }
                                if(_tmp.label[i].type == 1){
                                    _tmp.label[i].userAnswer = _tmp.label[i].content.find(item => item.checked === 1).content
                                }
                                if(_tmp.label[i].type == 3){
                                    _tmp.label[i].userAnswer = _tmp.label[i].content
                                }
                                if(_tmp.label[i].type == 2){
                                    _tmp.label[i].userAnswer = []
                                    let _t = _tmp.label[i].content.filter(item => item.checked === 1)
                                    for(let t=0; t<_t.length; t++){
                                        _tmp.label[i].userAnswer.push(_t[t].content)
                                    }
                                }else if(_tmp.label[i].type == 5){
                                    for(let j=0; j<_tmp.label[i].title.length; j++){
                                        _tmp.label[i].title[j].userAnswer = []
                                        let _t = _tmp.label[i].title[j].content.filter(item => item.checked === 1)
                                        for(let t=0; t<_t.length; t++){
                                            _tmp.label[i].title[j].userAnswer.push(_t[t].content)
                                        }
                                    }
                                }
                            }

                            this.info = _tmp

                            let _answers = this.getAnswers()

                            this.oldAnswers = JSON.parse(JSON.stringify(_answers))

                        }else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error',
                            });
                        }
                        this.loading = false;
                    }).catch(error=>{
                        this.$message({
                            showClose: true,
                            message: error,
                            type: 'error',
                        });
                        this.loading = false;
                    })

                }else{
                    //未完成
                    getCustomerNotCompleteXFilesList({customerId: this.customerId, limit:10,labelTypeId:this.typeId}).then(res=>{
                        if(res.status == 0){
                            let _tmp = res.data
                            res.data.label.length > 0 ? this.noData = true : this.noData = false
                            for(let i=0; i<_tmp.label.length; i++){
                                if(_tmp.label[i].type == 2){
                                    _tmp.label[i].userAnswer = []
                                }else if(_tmp.label[i].type == 5){
                                    for(let j=0; j<_tmp.label[i].title.length; j++){
                                        _tmp.label[i].title[j].userAnswer = []
                                    }
                                }
                            }

                            this.info = _tmp

                        }else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error',
                            });
                        }
                        this.loading = false;
                    }).catch(error=>{
                        this.$message({
                            showClose: true,
                            message: error,
                            type: 'error',
                        });
                        this.loading = false;
                    })
                }


            },

            save(flag){

                let _answers = this.getAnswers()

                this.disabled = true

                if(this.isDone){
                    //修改

                    //检索已修改项

                    let _oldAnswers = this.oldAnswers
                    let _updates = []
                    for(let i=0; i<_oldAnswers.length; i++){
                        for(let j=0; j<_answers.length; j++){
                            if( JSON.stringify(_answers[j]) != JSON.stringify(_oldAnswers[i]) && _answers[j].id == _oldAnswers[i].id){
                                _updates.push(_answers[j])
                            }
                        }
                    }

                    if(_updates.length<=0){
                        this.$message({
                            message: '没有修改项',
                            type: 'error'
                        });
                        this.disabled = false
                        return
                    }

                    postCustomerAddXFiles({params: JSON.stringify(_updates), customerId: this.customerId }).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                message: '修改私密档案成功',
                                type: 'success'
                            });
                            this.loadData(this.isDone)
                            this.disabled = false
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
                }else{

                    postCustomerAddXFiles({params: JSON.stringify(_answers), customerId: this.customerId }).then(res=>{
                        if(res.status == 0){

                            if(flag){
                                this.$message({
                                    showClose: true,
                                    message: '填写私密档案成功',
                                    type: 'success',
                                    onClose:()=>{
                                        this.$router.go(-1)
                                        this.disabled = false
                                    }
                                });
                            }else{
                                this.$message({
                                    message: '填写私密档案成功',
                                    type: 'success'
                                });
                                this.loadData(this.isDone)
                                this.disabled = false
                            }

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
        watch: {
            pageInfo: {
                deep: true,
                handler: function () {
                    this.loadData(this.isDone)
                }
            }
        }

    }

</script>

<style scoped lang="scss">
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
.condition{
    ul{
        display: flex;
        flex-wrap: wrap;
        li{
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            line-height: 34px;
            padding: 0 .1rem;
            margin: 0 .2rem .2rem 0;
            cursor: pointer;
            color: #666666;
            font-size: .14px;
            &.active{
                border: 1px solid #78DAE9;
                color: #0DC9E4;
                background: #EBFCFF;
            }
        }
    }
}
</style>
