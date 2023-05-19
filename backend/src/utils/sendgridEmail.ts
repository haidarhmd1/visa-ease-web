import sgMail from '@sendgrid/mail';
import logging from '../config/logging';
import config from '../config/config';

const NAMESPACE = 'sendgirdEmail';

const emailSender = 'haidar.hmd1@gmail.com';

sgMail.setApiKey(config.sendgridApiKey);

export const sendRegisterEmail = async (
  userEmail: string,
  userFullname: string,
  emailToken: string
): Promise<boolean> => {
  const emailRegister = {
    to: userEmail,
    from: emailSender,
    templateId: 'd-1d5cc8dc97ff440887fd62671a34a58a',
    dynamicTemplateData: {
      subject: 'Verify registration',
      Weblink: 'visastar.org',
      name: userFullname,
      emailToken,
    },
  };

  try {
    await sgMail.send(emailRegister);
    logging.info(NAMESPACE, 'Register Email sent successfully');
    return true;
  } catch (error) {
    logging.info(NAMESPACE, 'error sending Register email', error);
    return false;
  }
};
