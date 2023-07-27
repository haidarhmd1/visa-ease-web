import { Alert, Button, Skeleton } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { VisaApplications } from './VisaApplications';
import { Application } from './VisaApplications/Application';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../../services/api';
import { Outlet } from './Outlet/Outlet';
import { Countries } from './Countries';

export const Dashboard = () => {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ['getMe'],
    queryFn: getMe,
    refetchOnWindowFocus: false,
  });

  return (
    <Outlet fullname={data?.data.fullname}>
      {isLoading && <Skeleton active />}
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
      {data?.data && (
        <Routes>
          <Route path="/visa-application" element={<VisaApplications />} />
          <Route path="/visa-application/:id" element={<Application />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:id" element={<Application />} />
        </Routes>
      )}
    </Outlet>
  );
};
