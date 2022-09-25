import { SisternodeOutlined } from '@ant-design/icons';
import {Card, Col, Row, Statistic} from 'antd';
import React from 'react';
import "./BugStatistic.css"
const App = () => (
    <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
            <Card className="StatisticCard-1">
                <Statistic title="今日新增问题" value={11} prefix={<SisternodeOutlined />} />
            </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
            <Card className="StatisticCard-2">
                <Statistic title="Bug类问题(已解决/总数)" value={119} suffix="/ 132" />
            </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
            <Card className="StatisticCard-3">
                <Statistic title="优化类问题(已解决/总数)" value={93} suffix="/ 112" />
            </Card>
        </Col>
        <Col span={6}>
            {/*<Card className="StatisticCard-4">*/}
            {/*    <Statistic title="Unmerged" value={93} suffix="/ 100" />*/}
            {/*</Card>*/}
        </Col>
    </Row>
);

export default App;