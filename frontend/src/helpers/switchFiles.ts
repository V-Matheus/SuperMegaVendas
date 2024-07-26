import { convertXlsx } from './convertXlsx';
import { convertCsv } from './convertCsv';
import { convertTxt } from './convertTxt';
import { ChangeEvent } from 'react';

interface Contact {
  name: string;
  phoneNumber: string;
}

export function switchFiles(event: ChangeEvent<HTMLInputElement>): Promise<Contact[]> | void {
  const file = event.target.files?.[0];

  if (file) {
    const fileType = file.type;

    let convertFunction: (file: File) => Promise<Contact[]>;

    switch (fileType) {
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        convertFunction = convertXlsx;
        break;
      case 'text/csv':
        convertFunction = convertCsv;
        break;
      case 'text/plain':
        convertFunction = convertTxt;
        break;
      default:
        console.error('Tipo de arquivo não suportado');
        return;
    }

    return convertFunction(file)
      .then(data => {
        console.log('Contatos importados:', data);
        return data;
      })
      .catch(error => {
        console.error('Erro ao processar arquivo:', error);
        return [];
      });
  }
}
