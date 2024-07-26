import { convertXlsx } from './convertXlsx';
import { convertCsv } from './convertCsv';
import { convertTxt } from './convertTxt';
import { ChangeEvent } from 'react';

interface Contact {
  name: string;
  phoneNumber: string;
}

function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];

  if (file) {
    const fileType = file.type;

    let convertFunction: (file: File) => Promise<Contact[]>;

    switch (fileType) {
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        convertFunction = convertXlsx;
        break;
      case 'text/csv':
      case 'text/plain':
        convertFunction = convertCsv;
        break;
      case 'text/plain':
        convertFunction = convertTxt;
        break;
      default:
        console.error('Tipo de arquivo não suportado');
        return;
    }

    convertFunction(file)
      .then(data => {
        console.log('Contatos importados:', data);
      })
      .catch(error => console.error('Erro ao processar arquivo:', error));
  }
}
