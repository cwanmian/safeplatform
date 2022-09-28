import {
    Button, Col,
    message,
    Pagination,
    Row,
    Table
} from 'antd'
import {PlusOutlined, CaretRightOutlined} from '@ant-design/icons'
import React, {Fragment, useEffect, useState} from 'react'
import BugTableRowExpan from "./BugTableRowExpan"
import "./BugManageTable.css"
import TextareaConfirm from "./TextareaConfirm";
import IamgesCell from "./IamgesCell";
import DateSelector from "./DateSelector";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Switcher from "./Switcher";
import Selector from "./Selector";


const App = () => {
    useEffect(() => {
        console.log("tablestart")
        getdata()
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
    const getdata = (type, page = 1, pageSize = 10) => {
        axios.post("/getBugList", null, {params: {type: "BUG", page, pageSize}}).then((res) => {
            settableloading(false)
            if (res.data.code === 200) {
                let temrowkeys = []
                let temdata = res.data.res.data.map((item) => {
                    item["key"] = item["id"] + ""
                    temrowkeys.push(item["key"])
                    return item
                })
                setexpandedRowKeys(temrowkeys)
                console.log(temrowkeys)
                setpagedata(res.data.res.pagedata)
                setdata(temdata)

            } else {
                message.error(res.data.res)
            }
        }, (res) => {
            settableloading(false)
            message.error("通讯错误")
            console.log(res)
        })
    }
    const dispatch = useDispatch()
    const [fixtable, setfixtable] = useState(window.innerWidth < 500 ? false : true)
    const [tableheight, settableheight] = useState(window.innerWidth > 500 ? window.innerHeight - 370 : window.innerHeight - 250)
    const [data, setdata] = useState([])
    const [pagedata, setpagedata] = useState({})
    const [tableloading, settableloading] = useState(true)
    const [expandedRowKeys, setexpandedRowKeys] = useState([])
    const [currentpage, setcurrentpage] = useState(1)
    const columns = [
        {
            title: '编号',
            align: "center",
            width: 85,
            dataIndex: 'bianhao',
            key: 'bianhao',
            render(text, record) {
                return (<>
                    <Row justify="center" style={{cursor: "pointer"}} align="middle" onClick={(e) => {
                        togglerablerow(e, record)
                    }}>
                        <CaretRightOutlined className="icon-CaretRightOutlined icon"/>
                        <a>{text}</a>
                    </Row>
                    <Row>
                        <Col style={{width: 120}}>
                            <Switcher col="state2" id={record.id} checked={record.state2}/>
                        </Col>
                    </Row>
                </>)
            },
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
                    <TextareaConfirm text={text} col="content" id={record.id}>

                    </TextareaConfirm>
                )
            }
        },
        {
            title: '问题板块',
            key: 'bankuai',
            width: 160,
            dataIndex: 'bankuai',
            render: (text, record) => (
                <>
                    <Selector col="bankuai" id={record.id} value={record.bankuai}/>
                </>
            ),
        },
        {
            title: '问题状态',
            dataIndex: 'state',
            width: 140,
            key: 'state',
            render(text, record) {
                return <Selector col="state" id={record.id} value={record.state}/>

            }
        },
        {
            title: '问题属性',
            dataIndex: 'shuxing',
            key: 'shuxing',
            width: 140,
            render(text, record) {
                return <Selector col="shuxing" id={record.id} value={record.shuxing}/>

            }
        },
        {
            title: "问题照片",
            key: "images",
            width: 200,
            render(_, record) {
                return (
                    <IamgesCell images={JSON.parse(record.images)} id={record.id} col="images"/>
                )
            }
        },
        {
            title: '时限要求',
            key: 'timerequire',
            dataIndex: 'timerequire',
            width: 100,
            render: (text, record) => (
                <Selector col="timerequire" id={record.id} value={record.timerequire}/>
            ),
        },
        {
            title: '原因及解决措施',
            key: 'reasonandfunc',
            dataIndex: 'reasonandfunc',
            width: 260,
            render: (text, record) => (
                <TextareaConfirm text={text} col="reasonandfunc" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '提出单位',
            key: 'proposer',
            dataIndex: 'proposer',
            width: 150,
            render: (text, record) => (
                <TextareaConfirm text={text} col="proposer" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '填写人',
            key: 'filler',
            dataIndex: 'filler',
            width: 120,
            render: (text, record) => (
                <TextareaConfirm text={text} col="filler" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '开发负责人',
            key: 'devdirector',
            dataIndex: 'devdirector',
            width: 120,
            render: (text, record) => (
                <TextareaConfirm text={text} col="devdirector" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '开发完成时间',
            key: 'devcompletetime',
            dataIndex: 'devcompletetime',
            width: 150,
            render: (text,record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="devcompletetime"/>
            ),
        },
        {
            title: '现场对接',
            key: 'counterpart',
            dataIndex: 'counterpart',
            width: 120,
            render: (text, record) => (
                <TextareaConfirm text={text} col="counterpart" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '测试负责人',
            key: 'tester',
            dataIndex: 'tester',
            width: 120,
            render: (text, record) => (
                <TextareaConfirm text={text} col="tester" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '升级UAT时间',
            key: 'upuattime',
            dataIndex: 'upuattime',
            width: 150,
            render: (text,record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="upuattime"/>
            ),
        },
        {
            title: '升级生产环境时间',
            key: 'upprodtime',
            dataIndex: 'upprodtime',
            width: 150,
            render: (text,record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="upprodtime"/>
            ),
        },
        {
            title: '验证时间',
            key: 'vertifytime',
            dataIndex: 'vertifytime',
            width: 150,
            render: (text,record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="vertifytime"/>
            ),
        },
        {
            title: '备注',
            key: 'remarks',
            dataIndex: 'remarks',
            width: 180,
            render: (text, record) => (
                <TextareaConfirm text={text} col="remarks" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '测试端验证图',
            key: 'testvertifyimgs',
            width: 200,
            render(_, record) {
                return (
                    <IamgesCell images={JSON.parse(record.testvertifyimgs)} id={record.id} col="testvertifyimgs"/>
                )
            }
        },
        {
            title: 'UAT测试时间',
            key: 'testuattime',
            dataIndex: 'testuattime',
            width: 150,
            render: (text,record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="testuattime"/>
            ),
        },
        {
            title: '生产环境验证图',
            key: 'prodtestimgs',
            width: 200,
            render(text, record) {
                return (
                    <IamgesCell images={JSON.parse(record.prodtestimgs)} id={record.id} col="prodtestimgs"/>
                )
            }
        },
        {
            title: '生产环境测试时间',
            key: 'prodtestdate',
            dataIndex: 'prodtestdate',
            width: 150,
            render: (text,record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="prodtestdate"/>
            ),
        },
        {
            title: '需求评审日期',
            key: 'requirereviewdate',
            dataIndex: 'requirereviewdate',
            width: 150,
            render: (text,record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="requirereviewdate"/>
            ),
        }
    ]
    // const data = [
    //     {
    //         key: '0',
    //         bianhao: '121',
    //         state: "普联UAT测试通过",
    //         shuxing: 'BUG',
    //         bankuai: "移动端指挥中心",
    //         content: "pad端登陆，点击智慧安全，弹出密码错误界面",
    //         images: ["./bg.jpg", "./logo512.png"],
    //         timerequire: "高",
    //         reasonandfunc: "考核这个的逻辑是只要整改了就算整改了, 需要修改",
    //         proposer: "运维组",
    //         filler: "王小龙",
    //         startdate: "2022-09-30",
    //         planoverdate: "2022-09-30",
    //         devdirector: "陈真",
    //         devcompletetime: "2022-09-30",
    //         counterpart: "刘秀",
    //         tester: "陈晓红",
    //         upuattime: "2022-09-26",
    //         upprodtime: "2022-09-26",
    //         vertifytime: "",
    //         remarks: "需要抓紧时间完成",
    //         testvertifyimgs: "",
    //         testuattime: "2022-09-26",
    //         prodtestimgs: ["bg.jpg"],
    //         prodtestdate: "2022-09-26",
    //         requirereviewdate: "2022-09-26",
    //     },
    //     {
    //         key: '1',
    //         bianhao: '121',
    //         state: "普联UAT测试通过",
    //         shuxing: 'BUG',
    //         bankuai: "移动端指挥中心",
    //         content: "pad端登陆，点击智慧安全，弹出密码错误界面",
    //         images: ["./bg.jpg", "./logo512.png"],
    //         timerequire: "高",
    //         reasonandfunc: "考核这个的逻辑是只要整改了就算整改了, 需要修改",
    //         proposer: "运维组",
    //         filler: "王小龙",
    //         startdate: "2022-09-30",
    //         planoverdate: "2022-09-30",
    //         devdirector: "陈真",
    //         devcompletetime: "2022-09-30",
    //         counterpart: "刘秀",
    //         tester: "陈晓红",
    //         upuattime: "2022-09-26",
    //         upprodtime: "2022-09-26",
    //         vertifytime: "",
    //         remarks: "需要抓紧时间完成",
    //         testvertifyimgs: "",
    //         testuattime: "2022-09-26",
    //         prodtestimgs: ["bg.jpg"],
    //         prodtestdate: "2022-09-26",
    //         requirereviewdate: "2022-09-26",
    //     },
    //     {
    //         key: '2',
    //         bianhao: '121',
    //         state: "普联UAT测试通过",
    //         shuxing: 'BUG',
    //         bankuai: "移动端指挥中心",
    //         content: "pad端登陆，点击智慧安全，弹出密码错误界面",
    //         images: ["./bg.jpg", "./logo512.png"],
    //         timerequire: "高",
    //         reasonandfunc: "考核这个的逻辑是只要整改了就算整改了, 需要修改",
    //         proposer: "运维组",
    //         filler: "王小龙",
    //         startdate: "2022-09-30",
    //         planoverdate: "2022-09-30",
    //         devdirector: "陈真",
    //         devcompletetime: "2022-09-30",
    //         counterpart: "刘秀",
    //         tester: "陈晓红",
    //         upuattime: "2022-09-26",
    //         upprodtime: "2022-09-26",
    //         vertifytime: "",
    //         remarks: "需要抓紧时间完成",
    //         testvertifyimgs: "",
    //         testuattime: "2022-09-26",
    //         prodtestimgs: ["bg.jpg"],
    //         prodtestdate: "2022-09-26",
    //         requirereviewdate: "2022-09-26",
    //     },
    //     {
    //         key: '3',
    //         bianhao: '121',
    //         state: "普联UAT测试通过",
    //         shuxing: 'BUG',
    //         bankuai: "移动端指挥中心",
    //         content: "pad端登陆，点击智慧安全，弹出密码错误界面",
    //         images: ["./bg.jpg", "./logo512.png"],
    //         timerequire: "高",
    //         reasonandfunc: "考核这个的逻辑是只要整改了就算整改了, 需要修改",
    //         proposer: "运维组",
    //         filler: "王小龙",
    //         startdate: "2022-09-30",
    //         planoverdate: "2022-09-30",
    //         devdirector: "陈真",
    //         devcompletetime: "2022-09-30",
    //         counterpart: "刘秀",
    //         tester: "陈晓红",
    //         upuattime: "2022-09-26",
    //         upprodtime: "2022-09-26",
    //         vertifytime: "",
    //         remarks: "需要抓紧时间完成",
    //         testvertifyimgs: "",
    //         testuattime: "2022-09-26",
    //         prodtestimgs: ["bg.jpg"],
    //         prodtestdate: "2022-09-26",
    //         requirereviewdate: "2022-09-26",
    //     },
    //     {
    //         key: '4',
    //         bianhao: '121',
    //         state: "普联UAT测试通过",
    //         shuxing: 'BUG',
    //         bankuai: "移动端指挥中心",
    //         content: "pad端登陆，点击智慧安全，弹出密码错误界面",
    //         images: ["./bg.jpg", "./logo512.png"],
    //         timerequire: "高",
    //         reasonandfunc: "考核这个的逻辑是只要整改了就算整改了, 需要修改",
    //         proposer: "运维组",
    //         filler: "王小龙",
    //         startdate: "2022-09-30",
    //         planoverdate: "2022-09-30",
    //         devdirector: "陈真",
    //         devcompletetime: "2022-09-30",
    //         counterpart: "刘秀",
    //         tester: "陈晓红",
    //         upuattime: "2022-09-26",
    //         upprodtime: "2022-09-26",
    //         vertifytime: "",
    //         remarks: "需要抓紧时间完成",
    //         testvertifyimgs: "",
    //         testuattime: "2022-09-26",
    //         prodtestimgs: ["bg.jpg"],
    //         prodtestdate: "2022-09-26",
    //         requirereviewdate: "2022-09-26",
    //     },
    //     {
    //         key: '5',
    //         bianhao: '121',
    //         state: "普联UAT测试通过",
    //         shuxing: 'BUG',
    //         bankuai: "移动端指挥中心",
    //         content: "pad端登陆，点击智慧安全，弹出密码错误界面",
    //         images: ["./bg.jpg", "./logo512.png"],
    //         timerequire: "高",
    //         reasonandfunc: "考核这个的逻辑是只要整改了就算整改了, 需要修改",
    //         proposer: "运维组",
    //         filler: "王小龙",
    //         startdate: "2022-09-30",
    //         planoverdate: "2022-09-30",
    //         devdirector: "陈真",
    //         devcompletetime: "2022-09-30",
    //         counterpart: "刘秀",
    //         tester: "陈晓红",
    //         upuattime: "2022-09-26",
    //         upprodtime: "2022-09-26",
    //         vertifytime: "",
    //         remarks: "需要抓紧时间完成",
    //         testvertifyimgs: "",
    //         testuattime: "2022-09-26",
    //         prodtestimgs: ["bg.jpg"],
    //         prodtestdate: "2022-09-26",
    //         requirereviewdate: "2022-09-26",
    //     },
    // ]
    const togglerablerow = (e, record) => {
        let contentnode = e.currentTarget.parentNode.parentNode.nextSibling.firstChild.firstChild.firstChild
        if (contentnode.style.height === "0px") {
            e.currentTarget.firstChild.className = "icon-CaretRightOutlined icon icon-CaretRightOutlined-rotate"
            contentnode.style.height = contentnode.scrollHeight + "px"
            contentnode.parentNode.parentNode.className = "ant-table-cell"
        } else {
            e.currentTarget.firstChild.className = "icon-CaretRightOutlined icon"
            contentnode.style.height = "0px"
            contentnode.parentNode.parentNode.className = "ant-table-cell td-noborder"
        }
    }
    const handlePageChange = (page, pageSize) => {
        settableloading(true);
        getdata("BUG", page, pageSize);
        setcurrentpage(page)
    }
    const showAddBugModal = () => {
        dispatch({type: "open", data: ""})
    }
    return (
        <Fragment>
            <Button type="primary" icon={<PlusOutlined/>} style={{margin: 10}} onClick={showAddBugModal}>提交Bug</Button>
            <Table pagination={false}
                   loading={tableloading}
                   columns={columns} dataSource={data} size="small" scroll={{
                x: 1200,
                y: tableheight
            }} expandable={{
                expandedRowKeys: expandedRowKeys,
                expandedRowRender: (record) => (<BugTableRowExpan {...record}/>),
                expandedRowClassName: () => ("expandedRow"),
                showExpandColumn: false,
                expandRowByClick: true
            }}/>
            <Pagination showTotal={(total) => `总共 ${total} 条`}
                        style={{marginTop: 20}} size="small"
                        total={pagedata.total}
                        current={currentpage}
                        showSizeChanger showQuickJumper
                        onChange={(page, pageSize) => {
                            handlePageChange(page, pageSize)
                        }}
            />
        </Fragment>
    )
}

export default App