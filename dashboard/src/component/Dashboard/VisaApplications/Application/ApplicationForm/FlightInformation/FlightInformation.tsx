import { Button, DatePicker, DatePickerProps, Form, Input, Radio } from 'antd';
import moment from 'moment';
import {
  IFlightInformation,
  IVisaApplicationFormValues,
} from '../../../../../../models/interfaces';

export const FlightInformation = ({
  flightInformation,
}: {
  flightInformation: IFlightInformation | null;
}) => {
  const [form] = Form.useForm();

  const initialValues = {
    expectedTravelStartDate:
      moment(flightInformation?.expectedTravelStartDate) || '',
    expectedReturnFlightDate:
      moment(flightInformation?.expectedReturnFlightDate) || '',
    cruise: flightInformation?.cruise || '',
    invoiceRecipientSameAsApplicant:
      flightInformation?.invoiceRecipientSameAsApplicant || '',
    additionalAddress: flightInformation?.additionalAddress || '',
    kindOfTrip: flightInformation?.kindOfTrip || '',
  };

  const onDatePickerStartFlightChange: DatePickerProps['onChange'] = (
    date,
    dateString
  ) => {
    console.log(moment(dateString).format('YYYY-MM-DD'));
  };

  const onDatePickerReturnFlightChange: DatePickerProps['onChange'] = (
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
        <Form.Item
          name="expectedTravelStartDate"
          label="Reise-Beginndatum / Travel start date"
        >
          <DatePicker onChange={onDatePickerStartFlightChange} />
        </Form.Item>
        <Form.Item
          name="expectedReturnFlightDate"
          label="Rückflugdatum / Return flight date"
        >
          <DatePicker onChange={onDatePickerReturnFlightChange} />
        </Form.Item>
        <Form.Item name="cruise" label="Kreuzfahrt / Cruise">
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="invoiceRecipientSameAsApplicant"
          label="Rechnungsempfänger ist auch Antragsteller? / Invoice Recipient is same as Aplicant? "
        >
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="additionalAddress"
          label="Additional Address / Address vom Rechnungsempfänger"
        >
          <Input placeholder="Additional Address / Address vom Rechnungsempfänger" />
        </Form.Item>
        <Form.Item name="kindOfTrip" label="Art des Visums / Kind of Visa">
          <Radio.Group>
            <Radio value="SINGLE_ENTRY">Single Entry</Radio>
            <Radio value="MULTIPLE_ENTRY">Multi Entry</Radio>
          </Radio.Group>
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
