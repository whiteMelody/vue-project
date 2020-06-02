<template>

  <div class="wb100">
    <div style="height: 1.2rem; clear: both;"></div>
    <div class="wb100 fixed f18rem fc-gray4 text-center bg-white bd-t1 bd-gray" style="bottom: 0; height: .8rem; padding: .2rem 0; z-index: 99999;">
      <template v-for="(item,index) in arrs">
        <template v-if="index == active">
            <div class="wb25 fl h40rem lh40rem pointer fc-green">
              <p><i class="iconfont fc-green f40rem" :class="item.iconActive"></i></p>
              <p>{{item.text}}</p>
            </div>
        </template>
        <template v-else>
            <div class="wb25 fl h40rem lh40rem pointer" @click="changeIndex(index)">
              <p><i class="iconfont f40rem" :class="item.icon"></i></p>
              <p>{{item.text}}</p>
            </div>
        </template>
      </template>
      <div class="clear0"></div>
    </div>
  </div>

</template>

<style>
</style>

<script>

    import { getUserInfo } from "@/assets/api/Data/Login";

    export default{
      /**
       * active int 0~3 当前选中的tab
       */
      props: ['active'],
        data (){
            return {
              arrs: [

              ],
                role_id: -1,
            }
        },
        methods: {
          changeIndex(index){
            if(index == 0)  window.location.href = "index.html"
            if(index == 1)  window.location.href = "customer.html"
            if(index == 2)  window.location.href = "flow.html"
            if(index == 3)  window.location.href = "task.html"
          },
        },
        mounted(){

            getUserInfo().then((res)=>{
                if(res.status == 0){
                    this.role_id = res.data.role_id;
                    if(res.data.role_id == 4){
                        this.arrs = [
                            { text: '数据', icon: 'iconshuju-weixuanzhong', iconActive: 'iconshujuxuanzhong' },
                            { text: '顾客', icon: 'icongukeweixuanzhong', iconActive: 'icongukexuanzhong' },
                            { text: '预约', icon: 'iconliuchengweixuanzhong', iconActive: 'iconliuchengxuanzhong' },
                            { text: '任务', icon: 'iconrenwuweixuanzhong', iconActive: 'iconrenwuxuanzhong' },
                        ]
                    }else{
                        this.arrs = [
                            { text: '数据', icon: 'iconshuju-weixuanzhong', iconActive: 'iconshujuxuanzhong' },
                            { text: '顾客', icon: 'icongukeweixuanzhong', iconActive: 'icongukexuanzhong' },
                            { text: '流程', icon: 'iconliuchengweixuanzhong', iconActive: 'iconliuchengxuanzhong' },
                            { text: '任务', icon: 'iconrenwuweixuanzhong', iconActive: 'iconrenwuxuanzhong' },
                        ]
                    }
                }
            }).catch((e)=>{
                console.log(e)
            });
        }
    }
</script>
