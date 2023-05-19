import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorHandler } from 'middlewares/error';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import * as fs from 'fs/promises';
import dashboardRoutes from './routes/v1/dashboard';
import userRoutes from './routes/v1/user';
import visaRoutes from './routes/v1/visa';
import logging from './config/logging';
import config from './config/config';
import { FILE_PATH } from './middlewares/upload';

const NAMESPACE = 'server';
const prisma = new PrismaClient();

dotenv.config();
const app = express();

// Initialize global middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// global middlewares
app.use(errorHandler);

// Routers
app.use(express.static('src/public/documents'));
app.use('/v1/dashboard', dashboardRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/visa', visaRoutes);

// cron.schedule('0 0 * * *', async () => {
//   const cutoffDate = new Date();
//   cutoffDate.setDate(cutoffDate.getDate() - 7);
//   const deletedRecords = await prisma.visaApplication.deleteMany({
//     where: {
//       status: 'CANCELLED',
//       updatedAt: { lt: cutoffDate.toISOString() },
//     },
//   });
//   console.log(`Deleted ${deletedRecords.count} records`);
// });

// cron.schedule(
//   '* * * * *',
//   async () => {
//     const cutoffDate = new Date();
//     cutoffDate.setDate(cutoffDate.getDate() - 7);
//     const deletedRecords = await prisma.visaApplication.deleteMany({
//       where: {
//         status: 'CANCELLED',
//         updatedAt: { lt: cutoffDate.toISOString() },
//       },
//     });
//     console.log(`Deleted ${deletedRecords.count} expired visa applications`);
//   },
//   {
//     scheduled: true,
//     timezone: 'Europe/Berlin',
//   }
// );

cron.schedule('* * * * *', async () => {
  try {
    const expiredVisaApplications = await prisma.visaApplication.findMany({
      where: {
        status: 'CANCELLED',
        updatedAt: {
          lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      select: {
        id: true,
        Documents: true,
        Agreement: true,
        FlightInformation: true,
      },
    });

    const deleteVisaApplication = prisma.visaApplication.deleteMany({
      where: {
        status: 'CANCELLED',
        updatedAt: {
          lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const deleteDocuments = prisma.documents.deleteMany({
      where: {
        visa_ApplicationId: {
          in: expiredVisaApplications.map(v => v.id),
        },
      },
    });

    const deleteAgreement = prisma.agreement.deleteMany({
      where: {
        visa_ApplicationId: {
          in: expiredVisaApplications.map(v => v.id),
        },
      },
    });

    const deleteFlightInformation = prisma.flightInformation.deleteMany({
      where: {
        visa_ApplicationId: {
          in: expiredVisaApplications.map(v => v.id),
        },
      },
    });

    const documentsToDelete = await prisma.documents.findMany({
      where: {
        visa_ApplicationId: {
          in: expiredVisaApplications.map(v => v.id),
        },
      },
      select: {
        documentImageFilePath: true,
      },
    });

    await documentsToDelete.map(d =>
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.unlink(
        path.join(FILE_PATH, '/documents/', d.documentImageFilePath as string)
      )
    );

    await prisma.$transaction([
      deleteDocuments,
      deleteAgreement,
      deleteFlightInformation,
      deleteVisaApplication,
    ]);

    console.log(
      `Deleted ${expiredVisaApplications.length} expired VisaApplications`
    );
  } catch (error) {
    console.error(error);
  }
});

app.listen(config.server.SERVER_PORT, async () => {
  logging.info(
    NAMESPACE,
    `server have been lift off at ${config.server.SERVER_PORT} 🚀`
  );
});
