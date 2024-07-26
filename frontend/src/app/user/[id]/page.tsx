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

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getGroups } from '@/services/getGroups';

export default function UserPage() {
  const { id } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, erros } = await getGroups(id);
        console.log(data);
        

        if (erros) {
          throw new Error(erros.statusText);
        }

        setGroups(data)
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <main className="flex h-screen">
      <div className=" w-96 bg-gray-300">
        <div className="p-6 space-y-12">
          <h2 className="text-gray-800 text-2xl">Seus grupos</h2>

          <div className="space-y-8 h-[30rem] overflow-y-scroll">
            {groups.map((grupo, index) => (
              <div
                key={index}
                className="bg-gray-600 w-auto h-16 rounded flex justify-between p-4 items-center"
              >
                <h3 className="text-gray-100 text-1xl">Grupo {index + 1}</h3>
                <span className="text-gray-100 text-1xl">
                  5 pessoas cadastradas
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <Button
              onPress={onOpen}
              className="py-4 px-8 rounded bg-gray-600 text-gray-200 flex-1"
              type="submit"
            >
              CRIAR GRUPO
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-[40rem]">
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

      <Modal size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl">
                Crie um novo grupo
              </ModalHeader>
              <ModalBody className="flexw-full h-64 flex-wrap md:flex-nowrap gap-4">
                <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
                  <label className="flex flex-col">
                    Qual o nome do grupo?
                    <input
                      className="mt-4 px-4 py-2 border-solid border-2 border-gray-800/50 rounded"
                      type="text"
                    />
                  </label>

                  <label className="flex flex-col">
                    Anexe um arquivo com as informações do teu grupo
                    <input className="mt-4 px-4 py-2" type="file" />
                  </label>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button className="text-gray-900" onPress={onClose}>
                  Enviar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}
