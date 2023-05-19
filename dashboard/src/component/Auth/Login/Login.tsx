import { Button, Card, Form, Input } from 'antd';
import { ILoginUser } from '../../../models/interfaces';
import { useContext, useEffect } from 'react';
import AuthContext from '../../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  const onFinish = (values: ILoginUser): void => {
    login(values);
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log(errorInfo);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate('/dashboard/overview');
  }, [isAuthenticated]);

  return (
    <Card
      className="self-center m-auto text-center w-8/12"
      title="Login"
      bordered={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
