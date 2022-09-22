import {Button, Drawer, Space, Table, Tag} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import React, {Fragment, useState} from 'react'
import {Select, Modal} from "antd"
import AddBugForm from "./AddBugForm"
const {Option} = Select


const App = () => {
    const columns = [
        {
            title: '编号',
            dataIndex: 'bianhao',
            key: 'bianhao',
            render: (text, b) => {
                console.dir(b)
                console.dir(text)
                return (<a>{text}</a>)
            },
        },
        {
            title: '问题状态',
            dataIndex: 'state',
            key: 'state',
            render(text) {
                return <Tag color={"geekblue"}>
                    {text}
                </Tag>
            }
        },
        {
            title: '问题属性',
            dataIndex: 'shuxing',
            key: 'shuxing',
            render(text) {
                return (
                    <Select onSelect={showModal} defaultValue={text} style={{width: 120}}>
                        <Option value="BUG">BUG</Option>
                        <Option value="optimize">优化</Option>
                        <Option value="yunweichuli">运维组处理</Option>
                        <Option value="peopledata">人力数据问题</Option>
                        <Option value="maindata">主数据问题</Option>
                        <Option value="financedata">财务数据问题</Option>
                        <Option value="newfunction">新增功能</Option>
                    </Select>
                )
            }
        },
        {
            title: '问题板块',
            key: 'bankuai',
            dataIndex: 'bankuai',
            render: (text, {bankuai}) => (
                <>
                    <Tag color={"pink"}>
                        {text}
                    </Tag>
                </>
            ),
        },
        {
            title: '具体问题',
            key: 'content',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ]
    const data = [
        {
            key: '1',
            bianhao: '121',
            state: "普联UAT测试通过",
            shuxing: 'BUG',
            bankuai: "移动端指挥中心",
        },
        {
            key: '2',
            bianhao: '109',
            state: "搁置",
            shuxing: 'optimize',
            bankuai: "人员信息",
        },
        {
            key: '3',
            bianhao: '57',
            state: "开发处理中",
            shuxing: 'yunweichuli',
            bankuai: "学习强安",
        },
    ]
    const [showAddmodal, setAddmodal] = useState(false)
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [modalText, setModalText] = useState('确定修改么，你的操作将记入日志')
    const showModal = () => {
        setVisible(true)
    }
    const handleOk = () => {
        setModalText('修改中，请等待')
        setConfirmLoading(true)
        setTimeout(() => {
            setVisible(false)
            setConfirmLoading(false)
            setModalText('确定修改么，你的操作将记入日志')

        }, 500)
    }
    const onCloseDrawer=()=>{
        setAddmodal(false)
    }
    const handleCancel = () => {
        setVisible(false)
    }
    const showAddBugModal = () => {
        setAddmodal(true)
    }
    return (
        <Fragment>
            <Button type="primary" icon={<PlusOutlined/>} style={{margin: 10}} onClick={showAddBugModal}>提交Bug</Button>
            <Table columns={columns} dataSource={data} size="small"/>
            <Modal
                title="确定修改么"
                open={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText={"取消"}
                okText={"确定"}
            >
                <p>{modalText}</p>
            </Modal>
            <Drawer title="提交Bug" placement="right" onClose={onCloseDrawer} open={showAddmodal}>
                <AddBugForm/>
            </Drawer>
        </Fragment>
    )
}

export default App