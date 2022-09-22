import React, {useEffect} from "react";
const App=()=>{
    useEffect(()=>{
        console.log("start")
        return()=>{
            console.log("over")
        }
    },[])
    return(
        <div><input type="text"/></div>
    )
}
export default App