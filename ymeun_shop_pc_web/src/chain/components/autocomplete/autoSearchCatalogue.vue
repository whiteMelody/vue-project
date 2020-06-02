<template>
  <div class="wb100">
    <el-autocomplete
        ref="autocomplete"
        v-model="searchValue"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入商品类型"
        :trigger-on-focus="true">
    </el-autocomplete>

  </div>
</template>

<script>

    import { getCatalogue } from  "@/chain/assets/api/store/store"

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
          },
          type: {
            type: String,
            default: 'name',  //name fullName code
          }
        },
        methods: {
          querySearchAsync(queryString, cb) {
            let restaurants = this.restaurants;
            let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
            cb(results);
            this.cb = cb
          },
          createStateFilter(queryString) {
            return (state) => {
              if(typeof(state.value) === 'String' || typeof(state.value) === 'string'){
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
              }
            };
          },

          setInitValue(val){
            this.searchValue = val
          },

          loadData(){

            getCatalogue({keyword: this.searchValue}).then((res)=>{

              if(res.status == 0){

                this.list = res.data.list

                this.restaurants = formatArrayToMap(res.data.list, 'id', 'title')

                this.$emit("changed", {
                  kw: this.searchValue,
                  list: res.data.list
                })
                if(this.cb){
                  this.querySearchAsync(this.searchValue, this.cb)
                }
              }else{
                this.$emit("changed", {
                  kw: '',
                  list: [],
                })
                console.log(res.msg)
              }
            }).catch(error=>{
              this.$emit("changed", {
                kw: '',
                list: [],
              })
              console.log(error)
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
            }, 1);
          }
        }
    }
</script>
