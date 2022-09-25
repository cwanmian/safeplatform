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

const {Option} = Select


const App = () => {
    useEffect(() => {
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
            title: '编号',
            align: "center",
            width: 60,
            dataIndex: 'bianhao',
            key: 'bianhao',
            fixed: "left"
        },
        {
            title: '具体问题',
            key: 'content',
            dataIndex: 'content',
            width: 200,
            fixed: fixtable,
            render(text, record) {
                return (
                    <TextareaConfirm text={text}>

                    </TextareaConfirm>
                )
            }
        },
        {
            title: '问题板块',
            key: 'bankuai',
            width: 160,
            dataIndex: 'bankuai',
            render: (text, {bankuai}) => (
                <>
                    <Select onSelect={showModal} defaultValue={text} style={{width: 160}} onClick={(e) => {
                        e.stopPropagation()
                    }} showArrow={false} bordered={false} optionLabelProp="children">
                        <Option value="安全人员"><Tag color="blue">安全人员</Tag></Option>
                        <Option value="安全指数"><Tag color="red">安全指数</Tag></Option>
                        <Option value="驾驶舱"><Tag color="volcano">驾驶舱</Tag></Option>
                        <Option value="监督检查"><Tag color="orange">监督检查</Tag></Option>
                        <Option value="其他"><Tag color="lime">其他</Tag></Option>
                        <Option value="项目部详情维护"><Tag color="green">项目部详情维护</Tag></Option>
                        <Option value="学习强安"><Tag color="cyan">学习强安</Tag></Option>
                        <Option value="移动端指挥中心"><Tag color="cyan">移动端指挥中心</Tag></Option>
                        <Option value="应急管理"><Tag color="cyan">应急管理</Tag></Option>
                        <Option value="BI"><Tag color="cyan">BI</Tag></Option>
                    </Select>
                </>
            ),
        },
        {
            title: '问题状态',
            dataIndex: 'state',
            width: 140,
            key: 'quesstate',
            render(text) {
                return <Select onSelect={showModal} defaultValue={text} style={{width: 160}} onClick={(e) => {
                    e.stopPropagation()
                }} showArrow={false} bordered={false} optionLabelProp="children">
                    <Option value="待处理"><Tag color="blue">待处理</Tag></Option>
                    <Option value="开发处理中"><Tag color="red">开发处理中</Tag></Option>
                    <Option value="普联UAT测试通过"><Tag color="volcano">普联UAT测试通过</Tag></Option>
                    <Option value="其他平台处理"><Tag color="orange">其他平台处理</Tag></Option>
                    <Option value="生产环境待验证"><Tag color="lime">生产环境待验证</Tag></Option>
                    <Option value="生产环境验证不通过"><Tag color="green">生产环境验证不通过</Tag></Option>
                    <Option value="中建UAT测试通过"><Tag color="cyan">中建UAT测试通过</Tag></Option>
                    <Option value="中建UAT验证通过"><Tag color="cyan">中建UAT验证通过</Tag></Option>
                    <Option value="UAT待测试"><Tag color="cyan">UAT待测试</Tag></Option>
                </Select>
            }
        },
        {
            title: '问题属性',
            dataIndex: 'shuxing',
            key: 'shuxing',
            width: 140,
            render(text) {
                return (
                    <Select onSelect={showModal} defaultValue={text} style={{width: 120}} onClick={(e) => {
                        e.stopPropagation()
                    }} showArrow={false} bordered={false} optionLabelProp="children">
                        <Option value="BUG"><Tag color="blue">BUG</Tag></Option>
                        <Option value="优化"><Tag color="red">优化</Tag></Option>
                        <Option value="运维组处理"><Tag color="volcano">运维组处理</Tag></Option>
                        <Option value="人力数据问题"><Tag color="orange">人力数据问题</Tag></Option>
                        <Option value="主数据问题"><Tag color="lime">主数据问题</Tag></Option>
                        <Option value="财务数据问题"><Tag color="green">财务数据问题</Tag></Option>
                        <Option value="新增功能"><Tag color="cyan">新增功能</Tag></Option>
                    </Select>
                )
            }
        },
        {
            title: "问题照片",
            key: "imges",
            width: 200,
            render(_, {images}) {
                return (
                    <IamgesCell images={images}/>
                )
            }
        },
        {
            title: '时限要求',
            key: 'timeRequire',
            dataIndex: 'timeRequire',
            width: 100,
            render: (text) => (
                <Select onSelect={showModal} defaultValue={text} style={{width: 120}} onClick={(e) => {
                    e.stopPropagation()
                }} showArrow={false} bordered={false} optionLabelProp="children">
                    <Option value="高"><Tag color="blue">高</Tag></Option>
                    <Option value="低"><Tag color="red">低</Tag></Option>
                </Select>
            ),
        },
        {
            title: '原因及解决措施',
            key: 'reasonAndFunc',
            dataIndex: 'reasonAndFunc',
            width: 260,
            render: (text) => (
                <TextareaConfirm text={text}>

                </TextareaConfirm>
            ),
        },
        {
            title: '提出单位',
            key: 'Proposer',
            dataIndex: 'Proposer',
            width: 150,
            render: (text) => (
                <TextareaConfirm text={text}>

                </TextareaConfirm>
            ),
        },
        {
            title: '填写人',
            key: 'filler',
            dataIndex: 'filler',
            width: 120,
            render: (text) => (
                <TextareaConfirm text={text}>

                </TextareaConfirm>
            ),
        },
        {
            title: '开发负责人',
            key: 'devDirector',
            dataIndex: 'devDirector',
            width: 120,
            render: (text) => (
                <TextareaConfirm text={text}>

                </TextareaConfirm>
            ),
        },
        {
            title: '开发完成时间',
            key: 'devCompleteTime',
            dataIndex: 'devCompleteTime',
            width: 150,
            render: (text) => (
                text
            ),
        },
        {
            title: '现场对接',
            key: 'Counterpart',
            dataIndex: 'Counterpart',
            width: 120,
            render: (text) => (
                <TextareaConfirm text={text}>

                </TextareaConfirm>
            ),
        },
        {
            title: '测试负责人',
            key: 'tester',
            dataIndex: 'tester',
            width: 120,
            render: (text) => (
                <TextareaConfirm text={text}>

                </TextareaConfirm>
            ),
        },
        {
            title: '升级UAT时间',
            key: 'upUattime',
            dataIndex: 'upUattime',
            width: 150,
            render: (text) => (
                text
            ),
        },
        {
            title: '升级生产环境时间',
            key: 'upprodtime',
            dataIndex: 'upprodtime',
            width: 150,
            render: (text) => (
                text
            ),
        },
        {
            title: '验证时间',
            key: 'vertifytime',
            dataIndex: 'vertifytime',
            width: 150,
            render: (text) => (
                text
            ),
        },
        {
            title: '备注',
            key: 'remarks',
            dataIndex: 'remarks',
            width: 180,
            render: (text) => (
                <TextareaConfirm text={text}>

                </TextareaConfirm>
            ),
        },
        {
            title: '测试端验证图',
            key: 'testvertifyimgs',
            dataIndex: 'testvertifyimgs',
            width: 200,
            render: (_, {images}) => (
                <IamgesCell images={images}/>
            ),
        },
        {
            title: 'UAT测试时间',
            key: 'testuattime',
            dataIndex: 'testuattime',
            width: 150,
            render: (text) => (
                text
            ),
        },
        {
            title: '生产环境验证图',
            key: 'prodtestimgs',
            dataIndex: 'prodtestimgs',
            width: 200,
            render: (_, {images}) => (
                <IamgesCell images={images}/>
            ),
        },
        {
            title: '生产环境测试时间',
            key: 'prodtestdate',
            dataIndex: 'prodtestdate',
            width: 150,
            render: (text) => (
                text
            ),
        },
        {
            title: '需求评审日期',
            key: 'requirereviewdate',
            dataIndex: 'requirereviewdate',
            width: 150,
            render: (text) => (
                text
            ),
        }
    ]
    const data = [
        {
            key: '1',
            bianhao: '121',
            state: "普联UAT测试通过",
            shuxing: 'BUG',
            bankuai: "移动端指挥中心",
            content: "pad端登陆，点击智慧安全，弹出密码错误界面",
            images: ["./bg.jpg", "./logo512.png"],
            timeRequire: "高",
            reasonAndFunc: "考核这个的逻辑是只要整改了就算整改了, 需要修改",
            Proposer: "运维组",
            filler: "王小龙",
            devDirector: "陈真",
            devCompleteTime: "2022-09-30",
            Counterpart: "刘秀",
            tester: "陈晓红",
            upUattime: "2022-09-26",
            upprodtime: "2022-09-26",
            vertifytime: "2022-09-26",
            remarks: "需要抓紧时间完成",
            testvertifyimgs: "",
            testuattime: "2022-09-26",
            prodtestimgs: ["bg.jpg"],
            prodtestdate: "2022-09-26",
            requirereviewdate: "2022-09-26",
        },
        {
            key: '2',
            bianhao: '109',
            state: "搁置",
            shuxing: '运维组处理',
            bankuai: "安全指数",
            content: "修改新增应急组织人员提示",
            images: ["./bg.jpg"],
            timeRequire: "高",
            reasonAndFunc: "考核这个的逻辑是只要整改了就算整改了, 需要修改",
            Proposer: "运维组",
            filler: "王小龙",
            devDirector: "陈真",
            devCompleteTime: "2022-09-30",
            Counterpart: "刘秀",
            tester: "陈晓红",
            upUattime: "2022-09-26",
            upprodtime: "2022-09-26",
            vertifytime: "2022-09-26",
            remarks: "需要抓紧时间完成",
            testvertifyimgs: "",
            testuattime: "2022-09-26",
            prodtestimgs: ["bg.jpg"],
            prodtestdate: "2022-09-26",
            requirereviewdate: "2022-09-26",
        },
        {
            key: '3',
            bianhao: '57',
            state: "开发处理中",
            shuxing: '运维组处理',
            bankuai: "学习强安",
            content: "修改新增应急组织人员提示",
            images: ["./bg.jpg"],
            timeRequire: "高",
            reasonAndFunc: "考核这个的逻辑是只要整改了就算整改了, 需要修改",
            Proposer: "运维组",
            filler: "王小龙",
            devDirector: "陈真",
            devCompleteTime: "2022-09-30",
            Counterpart: "刘秀",
            tester: "陈晓红",
            upUattime: "2022-09-26",
            upprodtime: "2022-09-26",
            vertifytime: "2022-09-26",
            remarks: "需要抓紧时间完成",
            testvertifyimgs: "",
            testuattime: "2022-09-26",
            prodtestimgs: ["bg.jpg"],
            prodtestdate: "2022-09-26",
            requirereviewdate: "2022-09-26",
        },
        {
            key: '4',
            bianhao: '57',
            state: "开发处理中",
            shuxing: '运维组处理',
            bankuai: "学习强安",
            content: "修改新增应急组织人员提示",
            images: ["./bg.jpg"],
            timeRequire: "高",
            reasonAndFunc: "考核这个的逻辑是只要整改了就算整改了, 需要修改",
            Proposer: "运维组",
            filler: "王小龙",
            devDirector: "陈真",
            devCompleteTime: "2022-09-30",
            Counterpart: "刘秀",
            tester: "陈晓红",
            upUattime: "2022-09-26",
            upprodtime: "2022-09-26",
            vertifytime: "2022-09-26",
            remarks: "需要抓紧时间完成",
            testvertifyimgs: "",
            testuattime: "2022-09-26",
            prodtestimgs: ["bg.jpg"],
            prodtestdate: "2022-09-26",
            requirereviewdate: "2022-09-26",
        },
        {
            key: '5',
            bianhao: '57',
            state: "开发处理中",
            shuxing: '运维组处理',
            bankuai: "学习强安",
            content: "修改新增应急组织人员提示",
            images: ["./bg.jpg"],
            timeRequire: "高",
            reasonAndFunc: "考核这个的逻辑是只要整改了就算整改了, 需要修改",
            Proposer: "运维组",
            filler: "王小龙",
            devDirector: "陈真",
            devCompleteTime: "2022-09-30",
            Counterpart: "刘秀",
            tester: "陈晓红",
            upUattime: "2022-09-26",
            upprodtime: "2022-09-26",
            vertifytime: "2022-09-26",
            remarks: "需要抓紧时间完成",
            testvertifyimgs: "",
            testuattime: "2022-09-26",
            prodtestimgs: ["bg.jpg"],
            prodtestdate: "2022-09-26",
            requirereviewdate: "2022-09-26",
        },
        {
            key: '6',
            bianhao: '57',
            state: "开发处理中",
            shuxing: '运维组处理',
            bankuai: "学习强安",
            content: "修改新增应急组织人员提示",
            images: ["./bg.jpg"],
            timeRequire: "高",
            reasonAndFunc: "考核这个的逻辑是只要整改了就算整改了, 需要修改",
            Proposer: "运维组",
            filler: "王小龙",
            devDirector: "陈真",
            devCompleteTime: "2022-09-30",
            Counterpart: "刘秀",
            tester: "陈晓红",
            upUattime: "2022-09-26",
            upprodtime: "2022-09-26",
            vertifytime: "2022-09-26",
            remarks: "需要抓紧时间完成",
            testvertifyimgs: "",
            testuattime: "2022-09-26",
            prodtestimgs: ["bg.jpg"],
            prodtestdate: "2022-09-26",
            requirereviewdate: "2022-09-26",
        },
    ]

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
            <Table columns={columns} dataSource={data} size="small" scroll={{
                x: 1200,
                y: tableheight
            }} expandable={{
                expandedRowRender: (record) => (<BugTableRowExpan/>),
                defaultExpandAllRows: () => true,
                expandedRowClassName: () => ("expandedRow"),
                showExpandColumn: false,
                expandRowByClick: false
            }}/>
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