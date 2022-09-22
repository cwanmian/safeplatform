import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import {useEffect} from "react";
const App = (props) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    useEffect(()=>{
        console.log("modalfirstset")
    },[])

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <>
            <Modal
                title="确定修改么"
                visible={props.visible}
                onOk={handleOk}
                confirmLoading={props.confirmLoading}
                onCancel={handleCancel}
                cancelText={"取消"}
                okText={"确定"}
            >
                <p>{props.modalText}</p>
            </Modal>
        </>
    );
};

export default App;