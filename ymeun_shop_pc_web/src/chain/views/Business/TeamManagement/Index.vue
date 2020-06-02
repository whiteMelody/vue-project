<template>
    <div class="wb100 f14px">
        <div class="wb100 bg-white">
            <template v-for="(item, index) in arrs">
                <div class="w110px h50px lh50px fl text-center pointer" :class="tabIndex == index ? 'bd-t2 bd-gray4 fc-gray4 bg-white1' : 'fc-gray3'" @click="tabIndex = index">
                    {{item}}
                </div>
            </template>
            <div class="clear0"></div>
        </div>

        <div class="wb100 f14px bg-white1">
            <div class="pal24 par24 pat20 pab20">
                <div class="pal19 par19 bg-white">
                    <template v-if="tabIndex == 0">
                        <employee-data></employee-data>
                    </template>
                    <template v-if="tabIndex == 1">
                        <job-name-setting></job-name-setting>
                    </template>
                    <div class="clear4"></div>
                </div>
            </div>
        </div>

        <div class="clear0"></div>

    </div>
</template>

<script>

    import EmployeeData from './EmployeeData'
    import JobNameSetting from './JobNameSetting'

    export default {
        name: "OperationStatement",
        components: {
            EmployeeData, JobNameSetting
        },
        data() {
            return {
                arrs: ['员工管理', '岗位名称设置' ],
                tabIndex: 0
            }
        },
        mounted() {
            
        },
        methods: {

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