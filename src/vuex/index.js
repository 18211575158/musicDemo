import musicState from "./state.js"
import mutations from "./mutations.js"
import actions from "./actions.js"
export const storeObj = {
    state:{
        musicState
    },
    mutations:{
        ...mutations
    },
    actions:{
        ...actions
    }
}