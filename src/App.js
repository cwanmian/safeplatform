import Icon ,{AlertFilled, BugFilled, CalendarFilled, UserOutlined,LogoutOutlined} from '@ant-design/icons';
import {ConfigProvider, Layout, Menu, Row, Col, Avatar, Dropdown, Space, Skeleton, message, Drawer} from 'antd';
import Body from "./Body";
import React, {useState} from 'react';
import 'antd/dist/antd.min.css';
import "./App.css"
import {useDispatch, useSelector} from "react-redux";
import Body1 from "./Body1";
import BugMangeTable from "./Components/BugMangeTable";
import {useEffect} from "react";
import {Fragment} from "react";
import axios from "axios";

const {Content, Footer, Sider, Header} = Layout;
ConfigProvider.config({
    theme: {
        primaryColor: '#015beb',
    },
});
const App = () => {
    useEffect(() => {
        getuserinfo()
    }, [])
    const [userinfo, setuserinfo] = useState({})
    const [showSkeleton, setshowSkeleton] = useState(!true)
    const [fullLogo, setFullLogo] = useState(true)
    const selectedMenuKeys = useSelector(state => state.ActiveMenuIdReducer)
    const dispatch = useDispatch()
    const getMenuItem = (label, key, icon, children, type, onClick) => {
        return {label, key, icon, children, type, onClick}
    }
    const menus = [getMenuItem("Bug管理", 'bugmanager', <BugFilled/>, null, null, () => {
        dispatch({
            type: "addBodyItem", data: {
                title: 'Bug管理',
                content: <BugMangeTable/>,
                key: "bugmanager",
            }
        })
        dispatch({type: "setActiveKey", data: "bugmanager"})
    }),
        getMenuItem("优化管理", 'updatemanager', <AlertFilled/>, null, null, () => {
            dispatch({
                type: "addBodyItem", data: {
                    title: '优化管理',
                    content: <Body1/>,
                    key: "updatemanager",
                }
            })
            dispatch({type: "setActiveKey", data: "updatemanager"})
        }), getMenuItem("操作日志", 'log', <CalendarFilled/>, null, null, () => {
            dispatch({
                type: "addBodyItem", data: {
                    title: '操作日志',
                    content: <Body1/>,
                    key: "log",
                }
            })
            dispatch({type: "setActiveKey", data: "log"})
        })]
    const logoutSvg=()=>(
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
            <path
                d="M468.2 466.9V108.7c0-24.7 20-44.8 44.8-44.8s44.8 20 44.8 44.8V467c0 24.7-20 44.8-44.8 44.8s-44.8-20.1-44.8-44.9z m253-351.7c-33.5-17.6-73.8 6-73.8 43.8 0 19.2 11.4 35.9 28.4 44.9C800.3 270 880.2 409.4 857.4 564.3 834.8 717.8 707 840.6 552.8 857.8 343 881.2 164.7 716.9 164.7 511.7c0-134.1 76.2-250.8 187.7-308.9 15.7-8.2 26.3-23.7 26.3-41.4v-4.1c0-37.1-39.5-60-72.4-42.8-157.8 82.3-260.5 255.8-238 450.6 23.6 203.8 189.5 369 393.4 391.6 270.3 30 499.2-180.7 499.2-445-0.1-172.2-97.2-321.6-239.7-396.5z"
                p-id="2380" fill="#13227a"></path>
        </svg>)
    const LogoutIcon=(props)=><Icon component={logoutSvg} {...props}></Icon>
    const getuserinfo = () => {
        axios.post("./getUserInfo").then((res) => {
            console.log(res)
            if (res.data.code === 200) {
                setshowSkeleton(false)
                setuserinfo(res.data.res)
            } else {
                message.error(res.data.res)
            }
        }, (res) => {
            message.error(res.code)
            console.log(res)
        })
    }
    const logout = () => {
        window.location.href = "./logout"
    }
    const Avatarmenu = (<Menu style={{width:150}} items={[{
        key: '1',
        label: (
            <Space onClick={logout} align="center">
                <LogoutIcon style={{
                    fontSize: '23px',
                }}/>退出
            </Space>
        ),
    },{
        key: '2',
        label: (
            <Space onClick={logout} align="center">
                <LogoutIcon style={{
                    fontSize: '23px',
                }}/>退出
            </Space>
        ),
    },]}>

    </Menu>)
    return (
        <Layout className="content">
            <Sider
                style={{overflow: "hidden"}}
                breakpoint="lg"
                collapsedWidth="50"
                collapsible
                onCollapse={(v) => {
                    setFullLogo(!v)
                }}
            >
                {fullLogo ? <div className="logo">
                    BugManager
                </div> : <div className="minilogo">
                    BM
                </div>}
                {showSkeleton ? <Skeleton active/> : <Menu
                    selectable
                    theme="dark"
                    items={menus}
                    selectedKeys={selectedMenuKeys}
                    onClick={(item) => {
                        dispatch({type: "setMenuActiveKey", data: item.key})
                    }}
                />}

            </Sider>
            <Layout>
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {showSkeleton ? "" : <Row>
                        <Col span={20}></Col>
                        <Col span={4}>
                            <Dropdown overlay={Avatarmenu} placement="bottom" trigger={['click']}>
                                <Space size="small" style={{cursor: "pointer", userSelect: "none"}}>
                                    <Avatar icon={<UserOutlined/>}></Avatar>
                                    <a>{userinfo.uname}</a>
                                </Space>
                            </Dropdown>
                        </Col>
                    </Row>}
                </Header>
                <Content
                    style={{
                        margin: '10px 10px 0',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 16,
                            minHeight: 360,
                        }}
                    >
                        {showSkeleton?<Skeleton active/>:<Body></Body>}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    筑信云 ©2022 Created by CCWME
                </Footer>

            </Layout>

        </Layout>
    )
};

export default App;