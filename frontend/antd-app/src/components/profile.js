import { Statistic, Row, Col, Button } from 'antd';

export default class Home extends Component {


    render(){
        return
            (
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Followers" value={112893} />
                </Col>
            </Row>
        );
    }

}
