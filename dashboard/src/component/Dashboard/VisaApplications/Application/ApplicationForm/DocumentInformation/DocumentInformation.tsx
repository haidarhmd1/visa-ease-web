import { Button, Empty, Form, Image, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {
  IDocument,
  IVisaApplicationFormValues,
} from '../../../../../../models/interfaces';
import { BASE_URL } from '../../../../../../services/api';

export const DocumentInformation = ({
  documents,
}: {
  documents: Array<IDocument> | null;
}) => {
  const [form] = Form.useForm();

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (value: IVisaApplicationFormValues) => {
    console.log('value', value);
  };

  if (!documents || documents.length === 0) return <Empty />;

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      layout="vertical"
      onFinish={onFinish}
    >
      <div>
        {documents?.map((documents: IDocument) => {
          return (
            <Form.Item label={documents.documentNameType}>
              <div className="flex">
                <div className="mb-4 overflow-hidden rounded-xl self-center">
                  <Image
                    width={240}
                    src={`${BASE_URL}/${documents.documentImageFilePath}`}
                  />
                </div>
              </div>
              <Form.Item
                name="fileUpload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          );
        })}
      </div>
      <div className="flex justify-end">
        <Button className="justify-self-end" type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};
