import { Alert, Avatar, Button, List } from 'antd';
import { PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../../services/api';
import { IVisaApplicant } from '../../../models/interfaces';

export const VisaApplications = () => {
  const navigate = useNavigate();
  // const { columns } = useColumns();

  const {
    data: users,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button type="primary" icon={<PlusCircleOutlined />}>
          Add new
        </Button>
        <div className="mb-4 float-right">
          <Button
            type="link"
            onClick={() => refetch()}
            icon={<ReloadOutlined />}
          >
            Reload Data
          </Button>
        </div>
      </div>
      {isError && (
        <Alert
          message="Error"
          description="There was an error loading your data, if this error persists referesh, or call the system admin"
          type="error"
          showIcon
          action={
            <Button onClick={() => refetch()} size="small" danger>
              Retry
            </Button>
          }
        />
      )}
      {isLoading && <List loading />}
      {users?.data && (
        <>
          <List
            bordered
            dataSource={users?.data}
            renderItem={(item: IVisaApplicant, index) => (
              <List.Item extra={<div>content</div>}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                    />
                  }
                  title={
                    <a onClick={() => navigate(item.id)}>{item.fullname}</a>
                  }
                  description={item.email}
                />
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
};
