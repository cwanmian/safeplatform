import {Collapse, Row, Col, DatePicker, Timeline} from 'antd';
import {CaretUpFilled} from "@ant-design/icons";
import moment from 'moment';

const {Panel} = Collapse;
const dateFormat = 'YYYY-MM-DD';
const App = () => {
    function onChange() {

    }

    const Header = () => {
        return (<Row>
            <Col span={6}></Col>
            <Col span={12}>
                <Row>
                    <Col span={2}>
                        <CaretUpFilled style={{color: "#648cd8"}}/>
                    </Col>
                    <Col span={11}>
                        <a>提交时间:</a>
                        <span onClick={(e) => {
                            e.stopPropagation()
                        }}>
                            <DatePicker
                                style={{width: 120}}
                                defaultValue={moment('2022/09/01', dateFormat)}
                                allowClear={false}
                                bordered={false}
                            />
                        </span>
                    </Col>
                    <Col span={11}>
                        <a>计划完成时间:</a>
                        <span onClick={(e) => {
                            e.stopPropagation()
                        }}>

                        <DatePicker
                            style={{width: 120}}
                            defaultValue={moment('2022/09/01', dateFormat)}
                            allowClear={false}
                            bordered={false}
                        />
                        </span>
                    </Col>
                </Row>
            </Col>
            <Col span={6}></Col>
        </Row>)
    }
    return (<Collapse onChange={onChange} ghost>
        <Panel header={<Header/>} key="1" showArrow={false}>
            <Timeline>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            </Timeline>
        </Panel>
    </Collapse>)
}
export default App