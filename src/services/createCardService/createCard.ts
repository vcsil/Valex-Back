/* eslint-disable @typescript-eslint/no-throw-literal */

import * as employeeRepository from '../../repositories/employeeRepository';
import * as cardRepository from '../../repositories/cardRepository';
import * as utilsFunctions from '../utils/utilsFunctions';
import { TransactionTypes, CardInsertData } from '../../repositories/cardRepository';
import { generateCard } from './generateCard';

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
  await utilsFunctions.findCompanyByApiKey(apiKey);
  await findEmployeeById(employeeId);
  await findCardByTypeAndEmployeeId(type, employeeId);

  const { numberCard, cvvCardEncrypted, nameCard, expirationDate, cvvCard } = await generateCard(employeeId);

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

  return { numberCard, cvvCard, nameCard, expirationDate };
}