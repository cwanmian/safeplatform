import {Collapse} from 'antd';
const { Panel } = Collapse;
const App = () => {
    function onChange() {

    }
    const Header=()=>{
        return(<div style={{height:20}}>001</div>)
    }
    return (<Collapse onChange={onChange} ghost>
        <Panel header={<Header/>} key="1">
            <p>{"text"}</p>
        </Panel>
    </Collapse>)
}
export default App