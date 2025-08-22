import {atom} from "recoil"

export const blogAtom=atom({
    key:"blogAtom",
    default:[]
})

export const userDataAtom=atom({
    key:"userDataAtom",
    default:[]
})


export const loadingAtom=atom({
    key:"loadingAtom",
    default:false
})

export const commentAtom=atom({
    key:"commentAtom",
    default:[]
});

export const likeAtom=atom({
    key:"likeAtom",
    default: 0
});

export const isLikeAtom=atom({
    key:"isLikeAtom",
    default: false
});