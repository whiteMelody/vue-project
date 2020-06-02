<template>
  <el-autocomplete
    v-model="searchValue"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入机构名称"
    :trigger-on-focus="true"
    @select="handleSelect"
    clearable>
  </el-autocomplete>

</template>

<script>
    import { getOrganizeList } from "@/chain/api/organize/organize";
    import { formatArrayToMap } from "@/chain/utils/format";

    export default {
        data() {
          return {
            restaurants: [],
            searchValue: this.initValue ? this.initValue : '',
          };
        },
        props: {
          initValue: {
            type: String,
            default: '',
          },
          orgValue: {
            type: String,
          }
        },
        methods: {
          querySearchAsync(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
            cb(results);
          },
          createStateFilter(queryString) {
            return (state) => {
              return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
          },
          handleSelect(item) {
            this.$emit('matchRecord', Object.assign({}, item))
          },

          setInitValue(val){
            this.searchValue = val
          },
        },

        mounted() {
          getOrganizeList().then((res)=>{
            if(this.orgValue == "DEPT"){
              let _res = res.data.filter(item  => item.orgTypeCode === "COMPANY" || item.orgTypeCode === "DEPT")
              res.data = _res
            }
            this.restaurants = formatArrayToMap(res.data, 'id', 'orgName')
          })
        }

    }
</script>
