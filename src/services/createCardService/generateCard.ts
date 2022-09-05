import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import dotenv from 'dotenv';
import dayjs from 'dayjs';
dotenv.config();

import * as cardService from './createCard';

const cryptr = new Cryptr(process.env.TOKEN_CRYPTR || '');

function formatName(fullName: string) {
  const nameArr : string[] = fullName.split(' ');
  const nameCard : string[] = nameArr.map((name, index) => {
    if (index === 0 || index === nameArr.length - 1) {
      return name.toUpperCase();
    } else if (name.length >= 3) {
      return  name[0].toUpperCase();
    } else {
      return '';
    }
  }).filter((name) => name !== '');

  return nameCard.join(' ');
}

export async function generateCard(employeeId: number) {
  const numberCard: string = faker.finance.creditCardNumber('####-####-####-####');
  const cvvCard: string = faker.finance.creditCardCVV();
  const cvvCardEncrypted: string = cryptr.encrypt(cvvCard);

  const { fullName } = await cardService.findEmployeeById(employeeId);
  const nameCard: string = formatName(fullName);

  const expirationDate: string = dayjs().add(5, 'year').format('MM/YY');

  return { numberCard, cvvCardEncrypted, nameCard, expirationDate };
}