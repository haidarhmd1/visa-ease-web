import { Tabs } from 'antd';
import { UserInfo } from './UserInfo';
import { FlightInformation } from './FlightInformation';
import { DocumentInformation } from './DocumentInformation';
import { AgreementInformation } from './AgreementInformation';
import { ISingleApplication } from '../../../../../models/interfaces';

export const ApplicationForm = ({
  singleApplication,
}: {
  singleApplication: ISingleApplication;
}) => {
  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      items={[
        {
          label: `User Info`,
          key: 'user_Info',
          children: <UserInfo userInfo={singleApplication?.user} />,
        },
        {
          label: `Flight Information`,
          key: 'flight_info',
          children: (
            <FlightInformation
              flightInformation={singleApplication?.FlightInformation}
            />
          ),
        },
        {
          label: `Documents`,
          key: 'documents',
          children: (
            <DocumentInformation documents={singleApplication?.Documents} />
          ),
        },
        {
          label: `Agreement`,
          key: 'agreement',
          children: (
            <AgreementInformation agreement={singleApplication?.Agreement} />
          ),
        },
      ]}
    />
  );
};
