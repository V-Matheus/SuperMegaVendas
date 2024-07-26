import * as XLSX from 'xlsx';

interface Contact {
  name: string;
  phoneNumber: string;
}

export function convertXlsx(file: File): Promise<Contact[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

        const result: Contact[] = json.slice(1).map(row => ({
          name: row[0] || '',
          phoneNumber: row[1] || ''
        })).filter(contact => contact.name && contact.phoneNumber);

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error: ProgressEvent<FileReader>) => reject(error);
    
    reader.readAsArrayBuffer(file);
  });
}
