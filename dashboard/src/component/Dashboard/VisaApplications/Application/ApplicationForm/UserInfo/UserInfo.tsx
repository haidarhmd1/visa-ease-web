import { Button, DatePicker, DatePickerProps, Form, Input, Select } from 'antd';
import moment from 'moment';
import {
  IVisaApplicant,
  IVisaApplicationFormValues,
} from '../../../../../../models/interfaces';

export const UserInfo = ({ userInfo }: { userInfo: IVisaApplicant }) => {
  const [form] = Form.useForm();

  const initialValues = {
    fullName: userInfo.fullname,
    gender: userInfo.gender,
    street: userInfo.street,
    zipCode: userInfo.zipCode,
    country: userInfo.country,
    email: userInfo.email,
    phone: userInfo.phone,
    dob: moment(userInfo.dob),
    nationality: userInfo.nationality,
    profession: userInfo.profession,
  };

  const onDatePickerStartFlightChange: DatePickerProps['onChange'] = (
    date,
    dateString
  ) => {
    console.log(moment(dateString).format('YYYY-MM-DD'));
  };

  const onFinish = (value: IVisaApplicationFormValues) => {
    console.log('value', value);
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={initialValues}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item name="fullName" label="Name, Vorname / Surame, first name">
          <Input placeholder="Name, Vorname / Surame, first name" />
        </Form.Item>
        <Form.Item name="gender" label="Geschlecht / Gender">
          <Select placeholder="Select a Gender">
            <Select.Option value="male">male</Select.Option>
            <Select.Option value="female">female</Select.Option>
            <Select.Option value="other">other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="dob" label="Date of Birth / Geburtsdatum">
          <DatePicker onChange={onDatePickerStartFlightChange} />
        </Form.Item>
        <Form.Item name="email" label="E-Mail">
          <Input placeholder="E-Mail" />
        </Form.Item>
        <Form.Item name="phone" label="Telefon / Phone">
          <Input placeholder="Telefon / Phone" />
        </Form.Item>
        <Form.Item name="country" label="Land / Country">
          <Input placeholder="Land / Country" />
        </Form.Item>
        <Form.Item name="street" label="Straße, Nr. / Street, Nr">
          <Input placeholder="Straße, Nr. / Street, Nr" />
        </Form.Item>
        <Form.Item name="zipCode" label="PLZ, Stadt / ZIP code, city">
          <Input placeholder="PLZ, Stadt / ZIP code, city" />
        </Form.Item>
        <Form.Item name="nationality" label="Staatsbürgerschaft / Citizenship">
          <Input placeholder="Staatsbürgerschaft / Citizenship" />
        </Form.Item>
        <Form.Item name="profession" label="Beruf / Occupation">
          <Input placeholder="Beruf / Occupation" />
        </Form.Item>
        <div className="flex justify-end">
          <Button className="justify-self-end" type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </>
  );
};
