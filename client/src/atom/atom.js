import {atom} from "recoil"

export const blogAtom=atom({
    key:"blogAtom",
    default:[]
})

export const loadingAtom=atom({
    key:"loadingAtom",
    default:false
})