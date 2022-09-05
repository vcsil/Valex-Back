/* eslint-disable @typescript-eslint/no-throw-literal */

import * as employeeRepository from '../../repositories/employeeRepository';
import * as companyRepository from '../../repositories/companyRepository';
import * as cardRepository from '../../repositories/cardRepository';
import { TransactionTypes, CardInsertData } from '../../repositories/cardRepository';
import { generateCard } from './generateCard';

async function findCompanyByApiKey(apiKey: string) {
  const company = await companyRepository.findByApiKey(apiKey);

  if (!company) throw { code: 'Not Found', message: 'Company not found' };

  return company; 
}

export async function findEmployeeById(employeeId: number) {
  const employee = await employeeRepository.findById(employeeId);

  if (!employee) throw { code: 'Not Found', message: 'Employee not found' };

  return employee; 
}

async function findCardByTypeAndEmployeeId(
  type: TransactionTypes,
  employeeId: number,
) {
  const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId);

  if (card) throw {
    code: 'Conflict',
    message: `Employee already has a card with type ${type}`,
  };

  return;
}

export async function createCard(apiKey: string, employeeId: number, type: TransactionTypes) {
  await findCompanyByApiKey(apiKey);
  await findEmployeeById(employeeId);
  await findCardByTypeAndEmployeeId(type, employeeId);

  const { numberCard, cvvCardEncrypted, nameCard, expirationDate } = await generateCard(employeeId);

  const cardData: CardInsertData = {
    number: numberCard,
    expirationDate,
    employeeId,
    cardholderName: nameCard,
    securityCode: cvvCardEncrypted,
    isVirtual: true,
    isBlocked: true,
    type,
  };

  await cardRepository.insert(cardData);
}