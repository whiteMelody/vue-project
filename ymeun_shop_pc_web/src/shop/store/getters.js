import { formatArrayToMap } from "@/shop/utils/format"

const getters = {
    //登录用户
    currentUser: state => state.user.currentUser.name ? state.user.currentUser : JSON.parse(localStorage.getItem('CURRENT_USER')),
    
    //别名
    roleName: state => state.roles.roleName.shopkeeper ? state.roles.roleName : JSON.parse(localStorage.getItem('ROLENAME')),

    //消息数量
    messageCount: state => state.user.messageCount ? state.user.messageCount : JSON.parse(localStorage.getItem('MESSAGE_COUNT')),

    //所有角色
    roleList: (state) => {
        let roleList = state.roles.roleList.length ? state.roles.roleList : JSON.parse(localStorage.getItem('ROLELIST'))
        if(roleList){
            if(roleList.length) return roleList
            else    return []
        }else{
            return []
        }
    },
    roleListMap: (state) => {
        return formatArrayToMap( getters.roleList(state) , 'users_id', 'name')
    },

    staffList: (state) => {
        return getters.roleList(state).filter(item => item.role_id === 3 || item.role_id === 4 || item.role_id === 5)
    },
    staffListMap: (state) => {
        return formatArrayToMap( getters.staffList(state), 'users_id', 'name')
    },

    staffList2: (state) => {
        return getters.roleList(state).filter(item => item.role_id === 2 || item.role_id === 3 || item.role_id === 4 || item.role_id === 5)
    },
    staffListMap2: (state) => {
        return formatArrayToMap( getters.staffList2(state), 'users_id', 'name')
    },

    counselorCosmetologistList: (state) => {
        return getters.roleList(state).filter(item => item.role_id === 3 || item.role_id === 4)

    },
    counselorCosmetologistMap: (state) => {
        return formatArrayToMap( getters.counselorCosmetologistList(state), 'users_id', 'name')
    },

    developer:  (state) => {
        return getters.roleList(state).filter(item => item.role_id === 1)
    },
    developerMap: (state) => {
        return formatArrayToMap( getters.developer(state), 'users_id', 'name')
    },

    shopManager: (state) => {
        return getters.roleList(state).filter(item => item.role_id === 2)
    },
    shopManagerMap: (state) => {
        return formatArrayToMap( getters.shopManager(state), 'users_id', 'name')
    },

    counselor: (state) => {
        return getters.roleList(state).filter(item => item.role_id === 3)
    },
    counselorMap:  (state) => {
        return formatArrayToMap( getters.counselor(state), 'users_id', 'name')
    },
    counselorMapNotMe:  (state) => (users_id) => {
        return formatArrayToMap( getters.counselor(state).filter(item => item.users_id != users_id), 'users_id', 'name')
    },

    cosmetologist: (state) => {
        return getters.roleList(state).filter(item => item.role_id === 4)
    },
    cosmetologistMap:  (state) => {
        return formatArrayToMap( getters.cosmetologist(state), 'users_id', 'name')
    },
    cosmetologistMapNotMe:  (state) => (users_id) => {
        return formatArrayToMap( getters.cosmetologist(state).filter(item => item.users_id != users_id), 'users_id', 'name')
    },
    //前台
    reception: (state) => {
        return getters.roleList(state).filter(item => item.role_id === 5)
    },
    receptionMap:  (state) => {
        return formatArrayToMap( getters.reception(state), 'users_id', 'name')
    },
    receptionMapNotMe:  (state) => (users_id) =>  {
        return formatArrayToMap( getters.reception(state).filter(item => item.users_id != users_id), 'users_id', 'name')
    },
    //开发人员
    exploit: (state) => {
        return getters.roleList(state).filter(item => item.role_id === 3)
    },
    exploitMap:  (state) => {
        return formatArrayToMap( getters.exploit(state), 'users_id', 'name')
    },
    exploitMapNotMe:  (state) => (users_id) => {
        return formatArrayToMap( getters.exploit(state).filter(item => item.users_id != users_id), 'users_id', 'name')
    },

    loadingBtn: state => state.loading.status,

    treatmentRoomList: state => state.treatmentRoom.treatmentRoomList.length ? state.treatmentRoom.treatmentRoomList : JSON.parse(localStorage.getItem('TREATMENTROOMLIST')),
    treatmentRoomListMap: (state) => {
        return formatArrayToMap( getters.treatmentRoomList(state), 'id', 'name')
    },

    projectList: (state) => {
        let projectList = state.project.projectList.length ? state.project.projectList : JSON.parse(localStorage.getItem('PROJECTLIST'))
        if(projectList){
            if(projectList.length) return projectList
            else    return []
        }else{
            return []
        }
    },
    projectList1: (state) => {
        let projectList = state.project.projectList1.length ? state.project.projectList1 : JSON.parse(localStorage.getItem('PROJECTLIST1'))
        if(projectList){
            if(projectList.length) return projectList
            else    return []
        }else{
            return []
        }
    },
    projectAllList: (state) => {
        let projectList = state.project.projectAllList.length ? state.project.projectAllList : JSON.parse(localStorage.getItem('PROJECTAllLIST'))
        if(projectList){
            if(projectList.length) return projectList
            else    return []
        }else{
            return []
        }
    },

    projectListMap: (state) => {
        return formatArrayToMap( getters.projectList(state), 'id', 'name')
    },

    //未停用和有下级的项目
    projectList1Map: (state) => {
        //剔除没有子级的项目
        let __tmp = getters.projectList(state)
        let _tmp = JSON.parse(JSON.stringify(__tmp))
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0)    _tmp.splice(i, 1)
        }
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0)    _tmp.splice(i, 1)
        }
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0)    _tmp.splice(i, 1)
        }
        return formatArrayToMap( _tmp , 'id', 'name' )
    },

    //未停用和有下级的项目 筛选计入业绩和不计入业绩
    projectList11Map: (state) => (type, items_volume) => {

        let _tmp = []

        let projectList = getters.projectList(state)
        if(projectList.length){
            _tmp = JSON.parse(JSON.stringify(projectList))

            if(type == 1){
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 1)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 1)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
            }else{
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 0)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 0)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
            }

            if(type == 1){
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 1)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 1)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
            }else{
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 0)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 0)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
            }

        }

        return formatArrayToMap( _tmp , 'id', 'name' )

    },

    projectList11: (state) => (type, items_volume) => {

        let _tmp = []

        let projectList = getters.projectList(state)
        if(projectList.length){
            _tmp = JSON.parse(JSON.stringify(projectList))

            if(type == 1){
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 1)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 1)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
            }else{
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 0)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 0)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
            }

            if(type == 1){
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 1)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 1)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
            }else{
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 0)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
                //筛选
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children){
                        let _t = _tmp[i].children.filter(item => item.disabled_volume == 0)
                        if(_t.length == 0){
                            _tmp.splice(i, 1)
                        }
                    }
                }
                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].children) {
                        if (_tmp[i].children.length == 0) {
                            _tmp.splice(i, 1)
                        }
                    }
                }
            }

        }

        return _tmp

    },


    //未停用项目List
    projectList2: (state) => (pid, id) => {
        let projectList = getters.projectList(state)
        if(projectList.length){
            let _c = projectList.find(item => item.id === pid)
            let __c = null
            if(_c){
                __c = _c.children.find(item => item.id === id)
            }
            return __c
        }
    },

    //未停用项目Map
    projectList2Map: (state) => (id) => {
        let projectList = getters.projectList(state)
        if(projectList.length){
            let _t = projectList.find(item => item.id === id)
            if(_t)  return formatArrayToMap(_t.children, 'id', 'name')
            else    return []
        }else{
            return []
        }
    },

    //所有项目Map
    projectAllList2Map2: (state) => (id) => {
        let projectList = getters.projectAllList(state)
        if(projectList.length){
            let _t = projectList.find(item => item.id === id)
            if(_t)  return formatArrayToMap(_t.children, 'id', 'name')
            else    return []
        }else{
            return []
        }
    },

    //所有项目List
    projectAllList2: (state) => (id) => {
        let projectList = getters.projectAllList(state)
        if(projectList.length){
            let _t = projectList.find(item => item.id === id)
            if(_t)  return _t.children
            else    return []
        }else{
            return []
        }
    },

    //所有项目和有下级的项目
    projectAllList2Map: (state) => {
        let __tmp = getters.projectAllList(state)
        let _tmp = JSON.parse(JSON.stringify(__tmp))
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0)    _tmp.splice(i, 1)
        }
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0)    _tmp.splice(i, 1)
        }
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0)    _tmp.splice(i, 1)
        }
        return formatArrayToMap( _tmp , 'id', 'name' )
    },

    projectList22: (state) => (id, type, items_volume) => {
        let projectList = getters.projectList(state)
        if(projectList.length){
            let _t = projectList.find(item => item.id === id)
            if(_t){
                if(type){
                    if(type == 1){
                        return _t.children.filter(item => item.disabled_volume == 1)
                    }else{
                        return _t.children.filter(item => item.disabled_volume == 0)
                    }
                }
                return _t.children.filter(item => item.disabled_volume == 0 )
            }
            else
                return []
        }
    },

    getProject: (state) => (pid, id) => {
        let projectList = getters.projectList(state)
        if(projectList.length){
            let _t = projectList.find(item => item.id === pid)
            if(_t){
                let child = projectList.find(item => item.id === pid).children
                if(child)
                    return child.find(item => item.id === id)
                else
                    return {}
            }else{
                return {}
            }
        }else{
            return {}
        }
    },

    channelList: (state) => {
        let channelList = state.channel.channelList.length ? state.channel.channelList : JSON.parse(localStorage.getItem('CHANNELLIST'))
        if(channelList){
            if(channelList.length) return channelList
            else    return []
        }else{
            return []
        }
    },
    channelListMap: (state) => {
        return formatArrayToMap(getters.channelList(state), 'id', 'name')
    },
    channelList1: (state) => {
        let channelList = state.channel.channelList1.length ? state.channel.channelList1 : JSON.parse(localStorage.getItem('CHANNELLIST1'))
        if(channelList){
            if(channelList.length) return channelList
            else    return []
        }else{
            return []
        }
    },
    channelList1Map: (state) => {
        //剔除没有子级的渠道
        let __tmp = getters.channelList(state)
        let _tmp = JSON.parse(JSON.stringify(__tmp))
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0)    _tmp.splice(i, 1)
        }
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0)    _tmp.splice(i, 1)
        }
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0)    _tmp.splice(i, 1)
        }
        return formatArrayToMap( _tmp, 'id', 'name' )
    },
    channelList11Map: (state) => (flag) => {
        //剔除没有子级的渠道
        let __tmp = getters.channelList(state)
        if(flag)
            __tmp = __tmp.filter(item => item.chain == 1)
        let _tmp = JSON.parse(JSON.stringify(__tmp))
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0)    _tmp.splice(i, 1)
        }
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0)    _tmp.splice(i, 1)
        }
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children.length == 0)    _tmp.splice(i, 1)
        }
        return formatArrayToMap( _tmp, 'id', 'name' )
    },
    channelList2Map: (state) => (id) => {
        let channelList = getters.channelList(state)
        if(channelList.length){
            let _t = channelList.find(item => item.id === id)
            if(_t)
                return formatArrayToMap(_t.children, 'id', 'name')
            else
                return []
        }else{
            return []
        }
    },

    businessList: (state) => {
        let businessList = state.business.businessList.length ? state.business.businessList : JSON.parse(localStorage.getItem('BUSINESSLIST'))
        if(businessList){
            if(businessList.length) return businessList
            else    return []
        }else{
            return []
        }
    },
    businessListMap: (state) => {
        return formatArrayToMap( getters.businessList(state), 'id', 'fullname' )
    },

    shopList: (state) => {
        let shopList = state.shop.shopList.length ? state.shop.shopList : JSON.parse(localStorage.getItem('SHOPLIST'))
        if(shopList){
            if(shopList.length) return shopList
            else    return []
        }else{
            return []
        }
    },
    shopListMap: (state) => {
        return formatArrayToMap( getters.shopList(state), 'id', 'name' )
    },
    shopListMap2: (state) => (id) => {
        return formatArrayToMap( getters.shopList(state).filter(item => item.id != id), 'id', 'name' )
    },

}
export default getters
