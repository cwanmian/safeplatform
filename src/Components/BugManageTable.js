import {
    Button, Col, Input,
    message,
    Pagination,
    Row, Space,
    Table
} from 'antd'
import {PlusOutlined, CaretRightOutlined, SearchOutlined, FilterFilled} from '@ant-design/icons'
import React, {Fragment, useEffect, useRef, useState} from 'react'
import BugTableRowExpan from "./BugTableRowExpan"
import "./BugManageTable.css"
import TextareaConfirm from "./TextareaConfirm";
import IamgesCell from "./IamgesCell";
import DateSelector from "./DateSelector";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Switcher from "./Switcher";
import Selector from "./Selector";
import FilterSearchComp from "./FilterSearchComp";
import "../assets/font-awesome-4.7.0/css/font-awesome.min.css"
import ResizableTitle from "./ResizableTitle"

const App = () => {
    useEffect(() => {
        console.log("tablestart")
        getdata()
        window.addEventListener("resize", () => {
            if (window.innerWidth < 500) {
                setfixtable(false)
                setfinalcolumns((cols) => {
                    cols.map((itm, index) => {
                        if (index === 1) {
                            itm.fixed = false
                        }
                        return itm
                    })
                    return [...cols]
                })
            } else {
                setfixtable(true)
                setfinalcolumns((cols) => {
                    cols.map((itm, index) => {
                        if (index === 1) {
                            itm.fixed = true
                        }
                        return itm
                    })
                    return [...cols]
                })
            }
        })
    }, [])
    const allsearchs = useRef({})
    const allselects = useRef({})
    const getdata = (type, page = 1, pageSize = 10) => {
        console.log("getdata", allselects.current, allsearchs.current)
        axios.post("/getBugList", {
            type: "BUG",
            search: JSON.stringify(allsearchs.current),
            page,
            pageSize,
            filter: JSON.stringify(allselects.current)
        },).then((res) => {
            settableloading(false)
            if (res.data.code === 200) {
                let temrowkeys = []
                let temdata = res.data.res.data.map((item, index) => {
                    item["key"] = item["id"] + ""
                    item["index"] = (page - 1) * pageSize + index + 1
                    temrowkeys.push(item["key"])
                    return item
                })
                setexpandedRowKeys(temrowkeys)
                setpagedata(res.data.res.pagedata)
                setdata(temdata)
            } else {
                message.error(res.data.res)
            }
        }, (res) => {
            settableloading(false)
            message.error("????????????")
            console.log(res)
        })
    }
    const dispatch = useDispatch()
    const [fixtable, setfixtable] = useState(window.innerWidth < 500 ? false : true)
    const [data, setdata] = useState([])
    const [pagedata, setpagedata] = useState({})
    const [tableloading, settableloading] = useState(true)
    const [expandedRowKeys, setexpandedRowKeys] = useState([])
    const [currentpage, setcurrentpage] = useState(1)
    const allFilterInfo = useRef({})
    const handleTableChange = (pagination, filters, sorter) => {
        settableloading(true)
        allFilterInfo.current = {...filters}
        //??????????????????????????????filteredValue
        setfinalcolumns((cols) => {
            Object.keys(allFilterInfo.current).forEach((itm, idx) => {
                cols.map((col) => {
                    if (col.key === itm) {
                        col.filteredValue = allFilterInfo.current[itm]
                    }
                    return col
                })
            })
            return [...cols]
        })
        allselects.current = {...filters}
        Object.keys(filters).forEach((item) => {
            Object.keys(allsearchs.current).forEach((itm) => {
                if (item === itm) {
                    allselects.current[item] = null
                }
            })
        })
        console.log("handleTableChange", filters, allsearchs.current, allselects.current)
        getdata()
    }
    const clearAllFilters = () => {
        settableloading(true)
        allsearchs.current = {}
        allselects.current = {}
        getdata()
    }
    const handleSearch = (col, data, confirm) => {
        console.log("handleSearch", data)
        if (allsearchs.current[col] !== (data[0] ? data[0] : null)) {
            settableloading(true)
            allsearchs.current[col] = data[0] ? data[0] : null
            confirm()
        } else {
            message.warn("???????????????")
        }

    }
    const handleResize = (col) => {
        return (e, {size}) => {
            setfinalcolumns((columns) => {
                columns.forEach((item) => {
                    if (item === col) {
                        item.width = size.width
                    }
                })
                return [...columns]
            })
        }
    }
    const SearchFilterreset = (col, confirm) => {
        settableloading(true)
        allsearchs.current[col] = null
        confirm()
    }
    const getFilterIcon = (filtered, type) => {
        switch (type) {
            case "search":
                return (
                    <i style={{
                        fontSize: 16,
                        color: filtered ? '#1890ff' : undefined,
                    }} className="	fa fa-search"/>
                )
            case "select":
                return (
                    <FilterFilled style={{
                        fontSize: 16,
                        color: filtered ? '#1890ff' : undefined,
                    }}/>
                )
        }

    }
    const columns = [
        {
            title: '??????',
            align: "center",
            width: 85,
            dataIndex: 'index',
            key: 'index',
            render(text, record) {
                return (<>
                    <Row justify="center" style={{cursor: "pointer"}} align="middle" onClick={(e) => {
                        togglerablerow(e, record)
                    }}>
                        <CaretRightOutlined className="icon-CaretRightOutlined icon"/>
                        <a>{record.index}</a>
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
            title: '????????????',
            key: 'content',
            dataIndex: 'content',
            width: 200,
            fixed: fixtable,
            filterIcon: (filted) => {
                return getFilterIcon(filted, "search")
            },
            filteredValue: allFilterInfo.current.content || null,
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => <FilterSearchComp
                selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} confirm={confirm} col="content"
                SearchFilterreset={SearchFilterreset} handlesearch={handleSearch}/>,
            render(text, record) {
                return (
                    <TextareaConfirm text={text} col="content" id={record.id}>

                    </TextareaConfirm>
                )
            }
        },
        {
            title: '??????',
            key: 'bianhao',
            dataIndex: 'bianhao',
            width: 100,
            filterIcon: (filted) => {
                return getFilterIcon(filted, "search")
            },
            filteredValue: allFilterInfo.current.bianhao || null,
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => <FilterSearchComp
                selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} confirm={confirm} col="bianhao"
                SearchFilterreset={SearchFilterreset} handlesearch={handleSearch}/>,
            render(text, record) {
                return (
                    <TextareaConfirm text={text} col="bianhao" id={record.id}>

                    </TextareaConfirm>
                )
            }
        },
        {
            title: '????????????',
            key: 'bankuai',
            width: 160,
            filterSearch: true,
            filterIcon: (filted) => {
                return getFilterIcon(filted, "select")
            },
            filteredValue: allFilterInfo.current.bankuai || null,
            filters: [{
                text: '????????????',
                value: '????????????',
            },
                {
                    text: '????????????',
                    value: '????????????',
                },],
            dataIndex: 'bankuai',
            render: (text, record) => (
                <>
                    <Selector col="bankuai" id={record.id} value={record.bankuai}/>
                </>
            ),
        },
        {
            title: '????????????',
            dataIndex: 'state',
            width: 140,
            key: 'state',
            render(text, record) {
                return <Selector col="state" id={record.id} value={record.state}/>

            }
        },
        {
            title: '????????????',
            dataIndex: 'shuxing',
            key: 'shuxing',
            width: 140,
            render(text, record) {
                return <Selector col="shuxing" id={record.id} value={record.shuxing}/>

            }
        },
        {
            title: "????????????",
            key: "images",
            width: 200,
            render(_, record) {
                return (
                    <IamgesCell images={JSON.parse(record.images)} id={record.id} col="images"/>
                )
            }
        },
        {
            title: '????????????',
            key: 'timerequire',
            dataIndex: 'timerequire',
            width: 100,
            render: (text, record) => (
                <Selector col="timerequire" id={record.id} value={record.timerequire}/>
            ),
        },
        {
            title: '?????????????????????',
            key: 'reasonandfunc',
            dataIndex: 'reasonandfunc',
            width: 260,
            render: (text, record) => (
                <TextareaConfirm text={text} col="reasonandfunc" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '????????????',
            key: 'proposer',
            dataIndex: 'proposer',
            width: 150,
            render: (text, record) => (
                <TextareaConfirm text={text} col="proposer" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '?????????',
            key: 'filler',
            dataIndex: 'filler',
            width: 120,
            render: (text, record) => (
                <TextareaConfirm text={text} col="filler" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '???????????????',
            key: 'devdirector',
            dataIndex: 'devdirector',
            width: 120,
            render: (text, record) => (
                <TextareaConfirm text={text} col="devdirector" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '??????????????????',
            key: 'devcompletetime',
            dataIndex: 'devcompletetime',
            width: 150,
            render: (text, record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="devcompletetime"/>
            ),
        },
        {
            title: '????????????',
            key: 'counterpart',
            dataIndex: 'counterpart',
            width: 120,
            render: (text, record) => (
                <TextareaConfirm text={text} col="counterpart" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '???????????????',
            key: 'tester',
            dataIndex: 'tester',
            width: 120,
            render: (text, record) => (
                <TextareaConfirm text={text} col="tester" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '??????UAT??????',
            key: 'upuattime',
            dataIndex: 'upuattime',
            width: 150,
            render: (text, record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="upuattime"/>
            ),
        },
        {
            title: '????????????????????????',
            key: 'upprodtime',
            dataIndex: 'upprodtime',
            width: 150,
            render: (text, record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="upprodtime"/>
            ),
        },
        {
            title: '????????????',
            key: 'vertifytime',
            dataIndex: 'vertifytime',
            width: 150,
            render: (text, record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="vertifytime"/>
            ),
        },
        {
            title: '??????',
            key: 'remarks',
            dataIndex: 'remarks',
            width: 180,
            render: (text, record) => (
                <TextareaConfirm text={text} col="remarks" id={record.id}>

                </TextareaConfirm>
            ),
        },
        {
            title: '??????????????????',
            key: 'testvertifyimgs',
            width: 200,
            render(_, record) {
                return (
                    <IamgesCell images={JSON.parse(record.testvertifyimgs)} id={record.id} col="testvertifyimgs"/>
                )
            }
        },
        {
            title: 'UAT????????????',
            key: 'testuattime',
            dataIndex: 'testuattime',
            width: 150,
            render: (text, record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="testuattime"/>
            ),
        },
        {
            title: '?????????????????????',
            key: 'prodtestimgs',
            width: 200,
            render(text, record) {
                return (
                    <IamgesCell images={JSON.parse(record.prodtestimgs)} id={record.id} col="prodtestimgs"/>
                )
            }
        },
        {
            title: '????????????????????????',
            key: 'prodtestdate',
            dataIndex: 'prodtestdate',
            width: 150,
            render: (text, record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="prodtestdate"/>
            ),
        },
        {
            title: '??????????????????',
            key: 'requirereviewdate',
            dataIndex: 'requirereviewdate',
            width: 150,
            render: (text, record) => (
                <DateSelector value={text} clearable={true} id={record.id} col="requirereviewdate"/>
            ),
        }
    ]
    const [finalcolumns, setfinalcolumns] = useState(columns.map((col, index) => {
        col.onHeaderCell = () => ({width: col.width, onResize: handleResize(col)})
        return col
    }))
    // const data = [
    //     {
    //         key: '0',
    //         bianhao: '121',
    //         state: "??????UAT????????????",
    //         shuxing: 'BUG',
    //         bankuai: "?????????????????????",
    //         content: "pad?????????????????????????????????????????????????????????",
    //         images: ["./bg.jpg", "./logo512.png"],
    //         timerequire: "???",
    //         reasonandfunc: "??????????????????????????????????????????????????????, ????????????",
    //         proposer: "?????????",
    //         filler: "?????????",
    //         startdate: "2022-09-30",
    //         planoverdate: "2022-09-30",
    //         devdirector: "??????",
    //         devcompletetime: "2022-09-30",
    //         counterpart: "??????",
    //         tester: "?????????",
    //         upuattime: "2022-09-26",
    //         upprodtime: "2022-09-26",
    //         vertifytime: "",
    //         remarks: "????????????????????????",
    //         testvertifyimgs: "",
    //         testuattime: "2022-09-26",
    //         prodtestimgs: ["bg.jpg"],
    //         prodtestdate: "2022-09-26",
    //         requirereviewdate: "2022-09-26",
    //     },
    //     {
    //         key: '1',
    //         bianhao: '121',
    //         state: "??????UAT????????????",
    //         shuxing: 'BUG',
    //         bankuai: "?????????????????????",
    //         content: "pad?????????????????????????????????????????????????????????",
    //         images: ["./bg.jpg", "./logo512.png"],
    //         timerequire: "???",
    //         reasonandfunc: "??????????????????????????????????????????????????????, ????????????",
    //         proposer: "?????????",
    //         filler: "?????????",
    //         startdate: "2022-09-30",
    //         planoverdate: "2022-09-30",
    //         devdirector: "??????",
    //         devcompletetime: "2022-09-30",
    //         counterpart: "??????",
    //         tester: "?????????",
    //         upuattime: "2022-09-26",
    //         upprodtime: "2022-09-26",
    //         vertifytime: "",
    //         remarks: "????????????????????????",
    //         testvertifyimgs: "",
    //         testuattime: "2022-09-26",
    //         prodtestimgs: ["bg.jpg"],
    //         prodtestdate: "2022-09-26",
    //         requirereviewdate: "2022-09-26",
    //     },
    //     {
    //         key: '2',
    //         bianhao: '121',
    //         state: "??????UAT????????????",
    //         shuxing: 'BUG',
    //         bankuai: "?????????????????????",
    //         content: "pad?????????????????????????????????????????????????????????",
    //         images: ["./bg.jpg", "./logo512.png"],
    //         timerequire: "???",
    //         reasonandfunc: "??????????????????????????????????????????????????????, ????????????",
    //         proposer: "?????????",
    //         filler: "?????????",
    //         startdate: "2022-09-30",
    //         planoverdate: "2022-09-30",
    //         devdirector: "??????",
    //         devcompletetime: "2022-09-30",
    //         counterpart: "??????",
    //         tester: "?????????",
    //         upuattime: "2022-09-26",
    //         upprodtime: "2022-09-26",
    //         vertifytime: "",
    //         remarks: "????????????????????????",
    //         testvertifyimgs: "",
    //         testuattime: "2022-09-26",
    //         prodtestimgs: ["bg.jpg"],
    //         prodtestdate: "2022-09-26",
    //         requirereviewdate: "2022-09-26",
    //     },
    //     {
    //         key: '3',
    //         bianhao: '121',
    //         state: "??????UAT????????????",
    //         shuxing: 'BUG',
    //         bankuai: "?????????????????????",
    //         content: "pad?????????????????????????????????????????????????????????",
    //         images: ["./bg.jpg", "./logo512.png"],
    //         timerequire: "???",
    //         reasonandfunc: "??????????????????????????????????????????????????????, ????????????",
    //         proposer: "?????????",
    //         filler: "?????????",
    //         startdate: "2022-09-30",
    //         planoverdate: "2022-09-30",
    //         devdirector: "??????",
    //         devcompletetime: "2022-09-30",
    //         counterpart: "??????",
    //         tester: "?????????",
    //         upuattime: "2022-09-26",
    //         upprodtime: "2022-09-26",
    //         vertifytime: "",
    //         remarks: "????????????????????????",
    //         testvertifyimgs: "",
    //         testuattime: "2022-09-26",
    //         prodtestimgs: ["bg.jpg"],
    //         prodtestdate: "2022-09-26",
    //         requirereviewdate: "2022-09-26",
    //     },
    //     {
    //         key: '4',
    //         bianhao: '121',
    //         state: "??????UAT????????????",
    //         shuxing: 'BUG',
    //         bankuai: "?????????????????????",
    //         content: "pad?????????????????????????????????????????????????????????",
    //         images: ["./bg.jpg", "./logo512.png"],
    //         timerequire: "???",
    //         reasonandfunc: "??????????????????????????????????????????????????????, ????????????",
    //         proposer: "?????????",
    //         filler: "?????????",
    //         startdate: "2022-09-30",
    //         planoverdate: "2022-09-30",
    //         devdirector: "??????",
    //         devcompletetime: "2022-09-30",
    //         counterpart: "??????",
    //         tester: "?????????",
    //         upuattime: "2022-09-26",
    //         upprodtime: "2022-09-26",
    //         vertifytime: "",
    //         remarks: "????????????????????????",
    //         testvertifyimgs: "",
    //         testuattime: "2022-09-26",
    //         prodtestimgs: ["bg.jpg"],
    //         prodtestdate: "2022-09-26",
    //         requirereviewdate: "2022-09-26",
    //     },
    //     {
    //         key: '5',
    //         bianhao: '121',
    //         state: "??????UAT????????????",
    //         shuxing: 'BUG',
    //         bankuai: "?????????????????????",
    //         content: "pad?????????????????????????????????????????????????????????",
    //         images: ["./bg.jpg", "./logo512.png"],
    //         timerequire: "???",
    //         reasonandfunc: "??????????????????????????????????????????????????????, ????????????",
    //         proposer: "?????????",
    //         filler: "?????????",
    //         startdate: "2022-09-30",
    //         planoverdate: "2022-09-30",
    //         devdirector: "??????",
    //         devcompletetime: "2022-09-30",
    //         counterpart: "??????",
    //         tester: "?????????",
    //         upuattime: "2022-09-26",
    //         upprodtime: "2022-09-26",
    //         vertifytime: "",
    //         remarks: "????????????????????????",
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
            <div style={{overflowX:"auto",padding:0,whiteSpace: "nowrap"}}>
                <Button type="primary" icon={<PlusOutlined/>} style={{margin: 10}} onClick={showAddBugModal}>??????Bug</Button>
                <Button type="ghost" style={{margin: 10}} onClick={clearAllFilters}>????????????</Button>
            </div>
            <Table pagination={false}
                   onChange={handleTableChange}
                   loading={tableloading}
                   components={{
                       header: {
                           cell: ResizableTitle
                       }
                   }}
                   columns={finalcolumns} dataSource={data} size="small" scroll={{
                x: 1200,
                y: useSelector((state) => state.IsFullScreenReducer.isFullScreen) ? window.innerHeight - 239 : window.innerHeight - 303
            }} expandable={{
                expandedRowKeys: expandedRowKeys,
                expandedRowRender: (record) => (<BugTableRowExpan {...record}/>),
                expandedRowClassName: () => ("expandedRow"),
                showExpandColumn: false,
                expandRowByClick: true
            }}/>
            <Pagination showTotal={(total) => `?????? ${total} ???`}
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