'use client';

import { useParams } from 'next/navigation';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/table';

export default function UserPage() {
  const { id } = useParams();

  return (
    <main className="flex h-screen">
      <div className=" w-96 bg-gray-300">
        <h1 className="text-gray-800 font-bold text-3xl p-6">Olá Matheus</h1>
        <h2 className="text-gray-800 text-2xl p-6">Seus grupos</h2>

        <div className="space-y-8 h-[30rem] overflow-y-scroll">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
            <div
              key={index}
              className="bg-gray-600 w-auto h-16 mx-6 rounded flex justify-between p-4 items-center"
            >
              <h3 className="text-gray-100 text-1xl">Grupo {index + 1}</h3>
              <span className="text-gray-100 text-1xl">
                5 pessoas cadastradas
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="h-[30rem] w-[40rem]">
          <Table isStriped aria-label="Example static collection table">
            <TableHeader className="bg-gray-600" w-full h-full>
              <TableColumn>NOME</TableColumn>
              <TableColumn>NÚMERO</TableColumn>
            </TableHeader>
            <TableBody
              w-full
              h-fullemptyContent={'Nenhuma contato nesse grupo.'}
            >
              <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>84988596033</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Zoey Lang</TableCell>
                <TableCell>84988596033</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Jane Fisher</TableCell>
                <TableCell>84988596033</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>William Howard</TableCell>
                <TableCell>84988596033</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
