import {Collapse, Row, Col, DatePicker, Timeline, Switch} from 'antd';
import { EnterOutlined} from "@ant-design/icons";
import moment from 'moment';
import "./BugTableRowExpan.css"
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const {Panel} = Collapse;
const dateFormat = 'YYYY-MM-DD';
const App = () => {
    function onChange() {

    }
    function prevent(e) {
        e.stopPropagation()
    }
    const Header = () => {
        return (<Row justify="center">
            <Col span={23}>
                <Row>
                    <Col onClick={prevent} style={{width:120}}>
                        <EnterOutlined className="entericon"/>
                        <Switch checkedChildren="已归档" unCheckedChildren="正在处理"/>
                    </Col>
                    <Col className="exspanHeader2" style={{marginLeft:20}}>
                        <Row justify="start">
                            <Col>
                                <a>提交时间:</a>
                                <span onClick={prevent}>
                            <DatePicker
                                inputReadOnly
                                locale={locale}
                                style={{width: 120}}
                                defaultValue={moment('2022/09/01', dateFormat)}
                                allowClear={false}
                                bordered={false}
                            />
                        </span>
                            </Col>
                            <Col >
                                <a>计划完成:</a>
                                <span onClick={prevent}>

                                    <DatePicker
                                        inputReadOnly
                                        locale={locale}
                                        style={{width: 120}}
                                        defaultValue={moment('2022/09/01', dateFormat)}
                                        allowClear={false}
                                        bordered={false}
                                    />
                        </span>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Col>

        </Row>)
    }
    return (<Collapse onChange={onChange} ghost>
        <Panel header={<Header/>} key="1" showArrow={false}>
            <Timeline mode="left" className="timeline" style={{paddingLeft:"50px"}}>
                <Timeline.Item>2022-09-22 10:00:32 创建记录</Timeline.Item>
                <Timeline.Item>2022-09-22 10:00:32 由"王小花"修改计划完成时间</Timeline.Item>
            </Timeline>
        </Panel>
    </Collapse>)
}
export default App