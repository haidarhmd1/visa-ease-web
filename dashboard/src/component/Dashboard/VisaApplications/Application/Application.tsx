import {
  Alert,
  Avatar,
  Button,
  Card,
  Empty,
  Segmented,
  Spin,
  Tabs,
  Tag,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllVisaApplicationsbyUser } from '../../../../services/api';
import { useQuery } from '@tanstack/react-query';
import { ApplicationForm } from './ApplicationForm';
import { useEffect, useState } from 'react';
import { ISingleApplication } from '../../../../models/interfaces';
import { SegmentedValue } from 'antd/es/segmented';
import { useBadgeStatusProcessColor } from '../../../../hooks/useBadgeStatusColor';

export const Application = () => {
  const navigate = useNavigate();
  const { badgeStatusProcessColor } = useBadgeStatusProcessColor();
  const { id } = useParams();

  const [filteredApplication, setFilteredApplication] = useState<
    ISingleApplication | []
  >([]);

  const {
    data: allVisaApplicationsByUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getAllVisaApplicationsbyUser', id],
    queryFn: () => getAllVisaApplicationsbyUser(id),
  });

  useEffect(() => {
    setFilteredApplication(
      allVisaApplicationsByUser?.data.filter(
        (applications: ISingleApplication) =>
          applications.visaProcessingType === 'STANDARD'
      )
    );
  }, [allVisaApplicationsByUser]);

  if (isLoading)
    return (
      <div className="flex h-full w-full">
        <Spin className="self-center justify-self-center" />
      </div>
    );

  if (isError)
    return <Alert type="error" message="There happened to be an Error" />;

  const onChangeSegmentHandler = (value: SegmentedValue): void => {
    const filteredApplicationsByProcessingType =
      allVisaApplicationsByUser.data.filter(
        (applications: ISingleApplication) =>
          applications.visaProcessingType === value
      );

    setFilteredApplication(filteredApplicationsByProcessingType);
  };

  return (
    <div>
      <div className="mb-4">
        <Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
          Back
        </Button>
      </div>

      {!allVisaApplicationsByUser.data.length ? (
        <Card>
          <Empty />
        </Card>
      ) : (
        <div className="mb-4">
          <div className="mb-4">
            <Segmented
              defaultValue="STANDARD"
              onChange={onChangeSegmentHandler}
              options={[
                {
                  label: (
                    <div className="p-2">
                      <Avatar style={{ backgroundColor: '#f56a00' }}>S</Avatar>
                      <div>Standard</div>
                    </div>
                  ),
                  value: 'STANDARD',
                },
                {
                  label: (
                    <div className="p-2">
                      <Avatar style={{ backgroundColor: 'lightgreen' }}>
                        E
                      </Avatar>
                      <div>Express</div>
                    </div>
                  ),
                  value: 'EXPRESS',
                },
              ]}
            />
          </div>
          {Array.isArray(filteredApplication) && filteredApplication.length ? (
            <Tabs
              size="middle"
              tabPosition="left"
              type="card"
              items={filteredApplication.map(
                (singleApplication: ISingleApplication) => {
                  return {
                    label: (
                      <div className="flex">
                        <div className="mr-4">
                          {singleApplication.country.toUpperCase()}
                        </div>
                        <Tag
                          bordered={false}
                          color={badgeStatusProcessColor(
                            singleApplication.status
                          )}
                        >
                          {singleApplication.status}
                        </Tag>
                      </div>
                    ),
                    key: singleApplication.id,
                    children: (
                      <ApplicationForm singleApplication={singleApplication} />
                    ),
                  };
                }
              )}
            />
          ) : (
            <Card>
              <Empty />
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
