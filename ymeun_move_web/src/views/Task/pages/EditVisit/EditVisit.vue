<template>
    <div class="wb100 bg-white1" :style="'minHeight:' + minHeight + 'px' ">

        <!--   header   -->
        <Header :title="'填写回访'" :back="true"></Header>

        <div class="wb100">

            <div class="clear4"></div>

            <div class="wb100 f28rem fc-gray3 bg-white lh50rem">

                <div class="pal20 par20 pat10 fc-gray2 lh50rem">
                    <textarea class="wb100 bd-none bg-none" v-model="content" placeholder="请输入回访内容" rows="6"></textarea>
                </div>

            </div>

            <div class="pa20 f26rem fc-gray3">
                历史回访
            </div>

            <div class="clear0"></div>

            <div class="wb100">
                <template v-for="item in list">
                    <div class="pa20 f27rem fc-gray3 lh50rem bg-white">
                        <p>{{item.time}}</p>

                        <div class="clear4 bd-gray bd-b1"></div>

                        <div class="clear4"></div>

                        <p class="fc-gray4">{{item.remarks}}</p>

                    </div>
                    <div class="clear4"></div>
                </template>
            </div>

            <div class="clear0" style="height: 1rem"></div>

            <div 
                class="wb100 fixed" 
                style="bottom: 0;" 
                @click="submit"
                v-loading.fullscreen.lock="subLoding"
                element-loading-text="提交中..."
                element-loading-background="rgba(0, 0, 0, 0.5)"
            >
                <div class="wb100 fc-white bg-green h90rem lh90rem text-center f28rem ">
                    提交
                </div>
            </div>

        </div>

    </div>
</template>
<script>

    import Header from '../../../../components/Header'
    import { Toast } from 'vant';

    import { postEditReview, customerReviewHistory } from "@/assets/api/Task/Task"

    export default {
        data(){
            return {
                minHeight: 0,
                content: '',
                id: '',
                list: [],
                subLoding:false
            }
        },
        components:{
            Header
        },
        methods: {
            submit(){
                let remarks = this.$base.trimStr(this.content)
                if( remarks != '' )
                {
                    this.subLoding = true;
                    postEditReview({remarks: this.content, review_id: this.id,}).then((res)=>{
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
                    Toast("请填写回访内容");
                }
            },
        },
        mounted(){
            this.minHeight = window.innerHeight
            this.id = this.$route.query.id
            this.customer_id = this.$route.query.customer_id
            this.type = this.$route.query.type

            //获取历史回访
            customerReviewHistory({customer_id: this.customer_id, type: this.type,}).then((res)=>{
                if(res.status == 0){
                    this.list = res.data.reviewData
                }
            }).catch((e)=>{
                console.log(e)
            })

        },
    }
</script>
<style scoped>

</style>



    
