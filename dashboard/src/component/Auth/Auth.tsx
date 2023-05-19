import { Col, Radio, RadioChangeEvent, Row } from 'antd';
import { Login } from './Login';
import { Register } from './Register';
import { useState } from 'react';

export const Auth = () => {
  const [authForm, setAuthForm] = useState<string>('login');

  const onChangeLoginRegister = ({ target: { value } }: RadioChangeEvent) => {
    setAuthForm(value);
  };

  return (
    <Row className="h-screen">
      <Col className="flex bg-slate-50" span={10}>
        <Row className="w-full">
          <Col span={24} className="grid m-auto">
            <div className="justify-self-center">
              <Radio.Group
                defaultValue={authForm}
                onChange={onChangeLoginRegister}
              >
                <Radio.Button value="login">Login</Radio.Button>
                <Radio.Button value="register">Register</Radio.Button>
              </Radio.Group>
            </div>
          </Col>
          <Col span={24}>
            {authForm === 'login' ? (
              <Login />
            ) : (
              <Register setAuthForm={setAuthForm} />
            )}
          </Col>
        </Row>
      </Col>
      <Col className="bg-green-400" span={14}></Col>
    </Row>
  );
};
