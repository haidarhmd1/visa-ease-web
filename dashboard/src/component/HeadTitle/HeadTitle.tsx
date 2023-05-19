import { Button, Divider, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { ReactNode, useContext } from 'react';
import AuthContext from '../../Provider/AuthProvider';

type HeadTitleProps = {
  title: string | ReactNode;
};

const { Text } = Typography;

export const HeadTitle = ({ title }: HeadTitleProps) => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="w-full">
      <Text className="font-light text-2xl">{title}</Text>
      <Button
        className="float-right mt-4 mr-4"
        type="primary"
        danger
        icon={<LogoutOutlined />}
        onClick={() => logout()}
      >
        Logout
      </Button>
      <Divider />
    </div>
  );
};
