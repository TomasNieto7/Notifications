import {
    loadNotis
} from "./socket"


export var dataN = []
export const setDataN = () => {
    loadNotis(data => {
        dataN = data
    })
    console.log(dataN);
}
