const project = {
    state: {
        projectList: [],
        projectList1: [],
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

    }
  }
  
  export default project