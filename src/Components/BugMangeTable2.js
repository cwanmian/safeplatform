import {Button, Drawer, Dropdown, Image, Menu, Popconfirm, Row, Space, Table, Tag, Tooltip} from 'antd'
import {FileAddFilled, PlusOutlined} from '@ant-design/icons'
import React, {Fragment, useEffect, useState} from 'react'
import {Select, Modal} from "antd"
import AddBugForm from "./AddBugForm"
import BugTableRowExpan from "./BugTableRowExpan"
import "./BugManageTable.css"
import TextArea from "antd/es/input/TextArea";
import TextareaConfirm from "./TextareaConfirm";
import IamgesCell from "./IamgesCell";
import DateSelector from "./DateSelector";

const {Option} = Select


const App = () => {
    useEffect(() => {
        console.log("tablestart")
        window.addEventListener("resize", () => {
            if (window.innerWidth < 500) {
                setfixtable(false)
                settableheight(window.innerHeight - 250)

            } else {
                setfixtable(true)
                settableheight(window.innerHeight - 370)
            }
        })
    }, [])
    const [fixtable, setfixtable] = useState(window.innerWidth < 500 ? false : true)
    const [tableheight, settableheight] = useState(window.innerWidth > 500 ? window.innerHeight - 370 : window.innerHeight - 250)
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: "left"
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    const data = [
        {
            key: 1,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
            startdate:'2022-09-06',
            planoverdate:'2022-09-06',
        },
        {
            key: 2,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
            startdate:'2022-09-06',
            planoverdate:'2022-09-06',
        },
        {
            key: 3,
            name: 'Not Expandable',
            age: 29,
            address: 'Jiangsu No. 1 Lake Park',
            description: 'This not expandable',
            startdate:'2022-09-06',
            planoverdate:'2022-09-06',
        },
        {
            key: 4,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            startdate:'2022-09-06',
            planoverdate:'2022-09-06',
        },
    ];
    const [showAddmodal, setAddmodal] = useState(false)
    const [modalvisible, setmodalvisible] = useState(false)
    const [PreviewVisible, setPreviewVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [modalText, setModalText] = useState('确定修改么，你的操作将记入日志')
    const showModal = () => {
        setmodalvisible(true)
    }
    const handleOk = () => {
        setModalText('修改中，请等待')
        setConfirmLoading(true)
        setTimeout(() => {
            setmodalvisible(false)
            setConfirmLoading(false)
            setModalText('确定修改么，你的操作将记入日志')

        }, 500)
    }
    const onCloseDrawer = () => {
        setAddmodal(false)
    }
    const handleCancel = () => {
        setmodalvisible(false)
    }
    const showAddBugModal = () => {
        setAddmodal(true)
    }
    return (
        <Fragment>
            <Button type="primary" icon={<PlusOutlined/>} style={{margin: 10}} onClick={showAddBugModal}>提交Bug</Button>
            <Table
                columns={columns}
                rowSelection={{}}
                scroll={{
                    x: 1200,
                    y: tableheight
                }}
                expandable={{
                    expandedRowRender: (record) => (<BugTableRowExpan {...record}/>),
                    defaultExpandAllRows: true,
                    expandedRowClassName: () => ("expandedRow"),
                    showExpandColumn: true,
                    expandRowByClick: false
                }}
                dataSource={data}
            />
            <Modal
                title="确定修改么"
                open={modalvisible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText={"取消"}
                okText={"确定"}
            >
                <p>{modalText}</p>
            </Modal>
            <Drawer width={600} title="提交Bug" placement="right" onClose={onCloseDrawer} open={showAddmodal}
                    destroyOnClose>
                <AddBugForm/>
            </Drawer>
        </Fragment>
    )
}

export default App