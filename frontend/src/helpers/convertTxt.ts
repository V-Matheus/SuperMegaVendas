interface Contact {
  name: string;
  phoneNumber: string;
}

export function convertTxt(file: File): Promise<Contact[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const text = event.target?.result as string;
        const rows = text.split('\n').map(row => row.split(','));

        const result: Contact[] = rows.map(row => ({
          name: row[0]?.trim() || '',
          phoneNumber: row[1]?.trim() || ''
        })).filter(contact => contact.name && contact.phoneNumber);

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error: ProgressEvent<FileReader>) => reject(error);
    
    reader.readAsText(file);
  });
}
