<template>
  <div class="wb100">
    <el-autocomplete
        ref="autocomplete"
        v-model="searchValue"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入客户电话"
        :trigger-on-focus="true">
    </el-autocomplete>

  </div>
</template>

<script>

  import {customerList, getListByKeyword} from  "@/chain/assets/api/client/client"

  import { formatArrayToMap, formatArrayToStringMap } from "@/chain/utils/format"

  export default {
    data() {
      return {
        restaurants: [],
        list: [],
        searchValue: this.initValue ? this.initValue : '',
        timeout: 0,
        cb: null,
      };
    },
    props: {
      initValue: {
        type: String,
        default: '',
      }
    },
    methods: {
      querySearchAsync(queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        cb(results);
        this.cb = cb
      },
      createStateFilter(queryString) {
        return (state) => {
          if(typeof(state.value) === 'String' || typeof(state.value) === 'string') {
            return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          }
        };
      },

      setInitValue(val){
        this.searchValue = val
      },

      loadData(){

        getListByKeyword({keyword: this.searchValue, perpage: 9999}).then((res)=>{
          if(res.status == 0){
            this.list = res.data.list
            this.restaurants = formatArrayToMap(res.data.list, 'id', 'mobile')
            this.$emit("changed", {
              kw: this.searchValue,
              list: res.data.list
            })
            if(this.cb){
              this.querySearchAsync(this.searchValue, this.cb)
            }
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
      }

    },

    mounted() {
      if(!this.$base.isNull(this.initValue)){
        this.loadData()
      }
    },
    watch: {
      searchValue(curVal, oldVal) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.loadData()
        }, 200);
      }
    }
  }
</script>
