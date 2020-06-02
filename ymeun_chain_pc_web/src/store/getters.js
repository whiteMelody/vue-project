import { formatArrayToMap, formatArrayToStringMap } from "@/utils/format"

const getters = {
    //登录用户
    currentUser: state => state.user.currentUser.name ? state.user.currentUser : JSON.parse(localStorage.getItem('CURRENT_USER')),
    //消息数量
    messageCount: state => state.user.messageCount ? state.user.messageCount : JSON.parse(localStorage.getItem('MESSAGE_COUNT')),

    //所有角色
    roleList: state => state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST')),
    roleListMap: (state) => {
        return formatArrayToMap( state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST')) , 'users_id', 'name' )
    },

    staffList: (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return roleList.filter(item => item.role_id === 3 || item.role_id === 4 || item.role_id === 5 )
        }
    },
    staffListMap: (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return formatArrayToMap( roleList.filter(item => item.role_id === 3 || item.role_id === 4 || item.role_id === 5) , 'users_id', 'name' )
        }
    },

    counselorCosmetologistList: (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return roleList.filter(item => item.role_id === 3 || item.role_id === 4)
        }
    },
    counselorCosmetologistMap: (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return formatArrayToMap( roleList.filter(item => item.role_id === 3 || item.role_id === 4) , 'users_id', 'name' )
        }
    },

    developer:  (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return roleList.filter(item => item.role_id === 1)
        }
    },
    developerMap: (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return formatArrayToMap( roleList.filter(item => item.role_id === 1) , 'users_id', 'name' )
        }
    },
    //店长
    shopManager: (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return roleList.filter(item => item.role_id === 2)
        }
    },
    shopManagerMap: (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return formatArrayToMap( roleList.filter(item => item.role_id === 2) , 'users_id', 'name' )
        }
    },
    //顾问
    counselor: (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return roleList.filter(item => item.role_id === 3)
        }
    },
    counselorMap:  (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return formatArrayToMap( roleList.filter(item => item.role_id === 3) , 'users_id', 'name' )
        }
    },
    counselorMapNotMe:  (state) => (users_id) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return formatArrayToMap( roleList.filter(item => item.role_id === 3 && item.users_id != users_id) , 'users_id', 'name' )
        }
    },
    //美容师
    cosmetologist: (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return roleList.filter(item => item.role_id === 4)
        }
    },
    cosmetologistMap:  (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return formatArrayToMap( roleList.filter(item => item.role_id === 4) , 'users_id', 'name' )
        }
    },
    cosmetologistMapNotMe:  (state) => (users_id) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return formatArrayToMap( roleList.filter(item => item.role_id === 4 && item.users_id != users_id) , 'users_id', 'name' )
        }
    },
    //前台
    reception: (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return roleList.filter(item => item.role_id === 5)
        }
    },
    receptionMap:  (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return formatArrayToMap( roleList.filter(item => item.role_id === 5) , 'users_id', 'name' )
        }
    },
    receptionMapNotMe:  (state) => (users_id) =>  {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList.length){
            return formatArrayToMap( roleList.filter(item => item.role_id === 5 && item.users_id != users_id) , 'users_id', 'name' )
        }
    },
    //loading
    loadingBtn: state => state.loading.status,
    //治疗间
    treatmentRoomList: state => state.treatmentRoom.treatmentRoomList.length ? state.treatmentRoom.treatmentRoomList : JSON.parse(localStorage.getItem('TREATMENTROOMLIST')),
    treatmentRoomListMap: (state) => {
        return formatArrayToMap( state.treatmentRoom.treatmentRoomList.length ? state.treatmentRoom.treatmentRoomList : JSON.parse(localStorage.getItem('TREATMENTROOMLIST')), 'id', 'name' )
    },

    //项目
    projectList: state => state.project.projectList.length ? state.project.projectList : JSON.parse(localStorage.getItem('PROJECTLIST')),
    projectList1: state => state.project.projectList1.length ? state.project.projectList1 : JSON.parse(localStorage.getItem('PROJECTLIST1')),
    projectListMap: (state) => {
        let projectList = state.project.projectList.length ? state.project.projectList : JSON.parse(localStorage.getItem('PROJECTLIST'))
        if(projectList.length){
            return formatArrayToMap(projectList, 'id', 'name')
        }
    },
    projectList1Map: (state) => {
        //剔除没有子级的项目
        let __tmp = state.project.projectList.lprojectList2Mapength ? state.project.projectList : JSON.parse(localStorage.getItem('PROJECTLIST'))

        let _tmp = JSON.parse(JSON.stringify(__tmp))

        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0){
                _tmp.splice(i, 1)
            }
        }
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0){
                _tmp.splice(i, 1)
            }
        }
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0){
                _tmp.splice(i, 1)
            }
        }
        return formatArrayToMap( _tmp , 'id', 'name' )
    },
    projectList2: (state) => (pid, id) => {
        let projectList = state.project.projectList.length ? state.project.projectList : JSON.parse(localStorage.getItem('PROJECTLIST'))
        if(projectList.length){
            let _c = projectList.find(item => item.id === pid)
            let __c = null
            if(_c){
                __c = _c.children.find(item => item.id === id)
            }
            return __c
        }
    },
    projectList2Map: (state) => (id) => {
        let projectList = state.project.projectList.length ? state.project.projectList : JSON.parse(localStorage.getItem('PROJECTLIST'))
        if(projectList.length){
            return formatArrayToMap(projectList.find(item => item.id === id).children, 'id', 'name')
        }
    },
    projectList22: (state) => (id) => {
        let projectList = state.project.projectList.length ? state.project.projectList : JSON.parse(localStorage.getItem('PROJECTLIST'))
        if(projectList.length){
            return projectList.find(item => item.id === id).children
        }
    },

    //渠道
    channelList: state => state.channel.channelList.length ? state.channel.channelList : JSON.parse(localStorage.getItem('CHANNELLIST')),
    channelListMap: (state) => {
        let channelList =  state.channel.channelList.length ? state.channel.channelList : JSON.parse(localStorage.getItem('CHANNELLIST'))
        if(channelList.length){
            return formatArrayToMap(channelList, 'id', 'name')
        }
    },
    channelList1: state => state.channel.channelList1.length ? state.channel.channelList1 : JSON.parse(localStorage.getItem('CHANNELLIST1')),
    channelList1Map: (state) => {
        //剔除没有子级的渠道
        let __tmp = state.channel.channelList.length ? state.channel.channelList : JSON.parse(localStorage.getItem('CHANNELLIST'))

        let _tmp = JSON.parse(JSON.stringify(__tmp))

        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0){
                _tmp.splice(i, 1)
            }
        }
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0){
                _tmp.splice(i, 1)
            }
        }
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0){
                _tmp.splice(i, 1)
            }
        }
        return formatArrayToMap( _tmp, 'id', 'name' )
    },
    channelList2Map: (state) => (id) => {
        let channelList =  state.channel.channelList.length ? state.channel.channelList : JSON.parse(localStorage.getItem('CHANNELLIST'))
        if(channelList.length){
            return formatArrayToMap(channelList.find(item => item.id === id).children, 'id', 'name')
        }
    },

}
export default getters
