const project = {
    state: {
        projectList: [],
        projectList1: [],
        projectAllList: [],
    },
    mutations: {

      SET_PROJECTLIST (state, projectList) {
        localStorage.setItem('PROJECTLIST', JSON.stringify(projectList))
        state.projectList = projectList
      },
        SET_PROJECTLIST1 (state, projectList1) {
        localStorage.setItem('PROJECTLIST1', JSON.stringify(projectList1))
        state.projectList1 = projectList1
      },
        SET_PROJECTALLLIST (state, projectAllList) {
        localStorage.setItem('PROJECTALLLIST', JSON.stringify(projectAllList))
        state.projectAllList = projectAllList
      },

    }
  }
  
  export default project