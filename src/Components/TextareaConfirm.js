import TextArea from "antd/es/input/TextArea"
import {Popconfirm} from "antd"
import React, {useEffect, useState} from "react"

let textareafocus=0
const App=({text})=>{
    const [oldtext,setoldtext]=useState(text)
    const [newtext,setnewtext]=useState(text)
    const[content,setcontent]=useState(text)
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const handleChange=(e)=>{
        setnewtext(e.target.value)
        setcontent(e.target.value)
    }
    const showPopconfirm = () => {
        textareafocus=1
        console.log("获取",textareafocus)
        setOpen(true)
    }
    const handleblur = () => {
        textareafocus=0
        console.log("shiqu",textareafocus)
    }

    const handleOk = (e) => {
        e.stopPropagation()
        setConfirmLoading(true)
        setTimeout(() => {
            setOpen(false)
            setConfirmLoading(false)
            setcontent(newtext)
        }, 2000)

    }

    const handleCancel = () => {
        console.log('Clicked cancel button')
        setOpen(false)
        setcontent(oldtext)
    }
    useEffect(()=>{
        document.addEventListener("click",()=>{
            if(textareafocus===0){
                setcontent(oldtext)
                setOpen(false)
            }
        })
    },[])
    return(
        <Popconfirm
            title="点击提交确认修改"
            cancelText="取消"
            okText="提交"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{
                loading: confirmLoading,
            }}
            onCancel={handleCancel}

        >
            <TextArea  bordered={true} autoSize={true} maxLength={200} onChange={handleChange} onFocus={showPopconfirm} value={content} onBlur={handleblur}></TextArea>

        </Popconfirm>
    )
}
export default App