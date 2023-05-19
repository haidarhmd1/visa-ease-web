import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getDocumentsByVisaId = async (
  request: Request,
  response: Response
) => {
  const { visaId } = request.params;

  const documents = await prisma.documents.findMany({
    where: {
      visa_ApplicationId: visaId,
    },
  });

  if (!documents) {
    return response.status(404).send('No Documents found');
  }

  return response.status(200).send(documents);
};

export const uploadDocuments = async (request: Request, response: Response) => {
  // eslint-disable-next-line camelcase
  const { visaId } = request.params;
  const { documentNameType, documentId } = request.body;

  const document = await prisma.documents.upsert({
    where: { id: documentId },
    create: {
      visa_ApplicationId: visaId,
      documentNameType,
      documentImageFilePath: request.file?.filename,
    },
    update: {
      documentImageFilePath: request.file?.filename,
    },
  });

  if (!document) {
    return response.status(500).send('Error saving file');
  }

  return response.status(200).send(document);
};

export const updateDocuments = async (request: Request, response: Response) => {
  const { id } = request.params;
  const document = await prisma.documents.update({
    where: {
      id,
    },
    data: {
      documentImageFilePath: request.file?.filename,
    },
  });

  if (!document) {
    return response.status(500).send('Error updating file');
  }

  return response.status(200).send(document);
};
