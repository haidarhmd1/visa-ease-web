import { useMutation } from '@tanstack/react-query';
import { Button, Card, Form, Input } from 'antd';
import { registerUserProfile } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { IRegisterUser } from '../../../models/interfaces';
import { Dispatch, SetStateAction } from 'react';

type RegisterProps = {
  setAuthForm: Dispatch<SetStateAction<string>>;
};

export const Register = ({ setAuthForm }: RegisterProps) => {
  const [form] = Form.useForm();

  const { mutate, isLoading } = useMutation(registerUserProfile, {
    onSuccess: () => {
      toast.success('User successfully registerd!');
      setAuthForm('login');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const onFinish = (values: IRegisterUser): void => {
    mutate(values);
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log(errorInfo);
  };

  return (
    <Card
      className="self-center m-auto text-center w-8/12"
      title="Register"
      bordered={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>
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
          <Button loading={isLoading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
