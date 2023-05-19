import { Button, DatePicker, Form, Input } from 'antd';
import {
  IAgreement,
  IVisaApplicationFormValues,
} from '../../../../../../models/interfaces';

export const AgreementInformation = ({
  agreement,
}: {
  agreement: IAgreement | null;
}) => {
  const [form] = Form.useForm();

  const initialValues = {
    place: agreement?.place || '',
    date: agreement?.date || '',
  };
  const onFinish = (value: IVisaApplicationFormValues) => {
    console.log('value', value);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item name="date" label="Datum / Date">
        <DatePicker disabled />
      </Form.Item>
      <Form.Item name="place" label="Ort / Place">
        <Input placeholder="Ort / Place" />
      </Form.Item>
      <div className="flex justify-end">
        <Button className="justify-self-end" type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};
