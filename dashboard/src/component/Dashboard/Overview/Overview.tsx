import { Col, Divider, Row, Typography } from 'antd';
import { IUserData } from '../../../models/interfaces';

const { Text } = Typography;

export const Overview = ({ userData }: { userData: IUserData | undefined }) => {
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col span={6} xs={24} md={12} xl={6}>
          <div
            className="p-6 rounded-3xl"
            style={{ backgroundColor: '#e6fff2' }}
          >
            <Text style={{ color: '#389e0d' }}>Visa Applications: Paid</Text>
            <Divider />
            <Text className="font-bold text-lg" style={{ color: '#389e0d' }}>
              0
            </Text>
          </div>
        </Col>
        <Col span={6} xs={24} md={12} xl={6}>
          <div
            className="p-6 rounded-3xl"
            style={{ backgroundColor: '#fff7e6' }}
          >
            <Text className="text-white" style={{ color: '#d46b08' }}>
              Visa Applications: Pending
            </Text>
            <Divider />
            <Text className="font-bold text-lg" style={{ color: '#d46b08' }}>
              0
            </Text>
          </div>
        </Col>
        <Col span={6} xs={24} md={12} xl={6}>
          <div
            className="p-6 rounded-3xl"
            style={{ backgroundColor: '#e6f4ff' }}
          >
            <Text style={{ color: '#0958d9' }}>
              Visa Applications: Completed
            </Text>
            <Divider />
            <Text className="font-bold text-lg" style={{ color: '#0958d9' }}>
              0
            </Text>
          </div>
        </Col>
        <Col span={6} xs={24} md={12} xl={6}>
          <div
            className="p-6 rounded-3xl"
            style={{ backgroundColor: '#fff1f0' }}
          >
            <Text style={{ color: '#cf1322' }}>
              Visa Applications: Cancelled
            </Text>
            <Divider />
            <Text className="font-bold text-lg" style={{ color: '#cf1322' }}>
              0
            </Text>
          </div>
        </Col>
      </Row>
    </div>
  );
};
