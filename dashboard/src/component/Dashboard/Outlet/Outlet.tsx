import { ReactNode, useContext, useEffect, useState } from 'react';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Button, Result } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../Provider/AuthProvider';
import { Header } from 'antd/es/layout/layout';
import { HeadTitle } from '../../HeadTitle/HeadTitle';
import { useOnlineStatus } from '../../../Provider/OnlineStatusProvider';
import { toast } from 'react-hot-toast';
import { MenuItem, getItem } from './Outlet.helper';

const { Content, Sider } = Layout;

const items: MenuItem[] = [
  getItem('Visa Applications', 'visa-application', <UserOutlined />),
];

export const Outlet = ({
  children,
  fullname,
}: {
  children: ReactNode;
  fullname: string | undefined;
}) => {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();

  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const {
    token: { colorBgContainer, siderBg },
  } = theme.useToken();

  useEffect(() => {
    if (!isOnline) {
      toast.error('You are offline');
      return;
    }
  }, [isOnline]);

  useEffect(() => {
    if (!isAuthenticated) {
      logout();
      navigate('/');
      return;
    }
  }, [isAuthenticated]);

  return (
    <Layout hasSider>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{ background: siderBg, borderRight: '1px solid #f7f7f7' }}
      >
        <div className="h-20 rounded-lg bg-slate-400 m-4" />
        <Menu
          onClick={info => navigate(info.key)}
          defaultSelectedKeys={['overview']}
          mode="inline"
          style={{
            height: '100%',
            borderRight: '1px solid #f7f7f7',
            background: siderBg,
          }}
          items={items}
        />
      </Sider>
      <Layout>
        <Header className="flex p-0 bg-white">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <HeadTitle title={`Welcome, ${fullname ?? ''}`} />
        </Header>
        <Content className="h-screen">
          <div
            className="p-6 min-h-full rounded-md overflow-auto"
            style={{
              background: colorBgContainer,
            }}
          >
            {isOnline ? (
              children
            ) : (
              <Result
                status="404"
                title="Offline"
                subTitle="You internet connection is offline"
              />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
