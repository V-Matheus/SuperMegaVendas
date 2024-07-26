'use client';

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
} from '@nextui-org/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { createGroup } from '@/services/createGroup';
import { Groupo } from '@/services/types';
import { switchFiles } from '@/helpers/switchFiles';
import { getInfoUser } from '@/services/getInfoUser';
import { createContact } from '@/services/createContact';

export default function UserPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [groups, setGroups] = useState<Groupo[]>([]);
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [groupIdActive, setGroupIdActive] = useState('');
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, erros } = await getInfoUser();
        setDados(data);

        if (erros) {
          throw new Error(erros.statusText);
        }

        setGroups(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [groupIdActive]);

  useEffect(() => {
    window.localStorage.setItem('groupId', groupIdActive);
  }, [groupIdActive]);

  async function handleCreateGroup() {
    try {
      let contacts: any[] = [];
      if (file) {
        contacts = await switchFiles({
          target: { files: [file] },
        } as ChangeEvent<HTMLInputElement>);
      }
      const { data: dataGroup, erros: errosGroup } = await createGroup({
        name,
      });

      window.localStorage.setItem('groupId', dataGroup.id);

      const { data: dataContact, erros: errosContact } = await createContact(
        contacts,
      );

      const newGroupWithContacts = {
        ...dataGroup,
        contacts: dataContact,
      };

      setGroups((prevGroups) => [...prevGroups, newGroupWithContacts]);
      setGroupIdActive(dataGroup.id);

      if (errosGroup) {
        throw new Error(errosGroup.statusText);
      }
      if (errosContact) {
        throw new Error(errosContact.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  const filteredGroups = groups.filter((group) => group.id === groupIdActive);

  return (
    <main className="flex flex-col-reverse lg:flex-row space-y-4 h-screen">
      <div className="w-full lg:w-96 bg-gray-300">
        <div className="p-6 space-y-12">
          <h2 className="text-gray-800 text-2xl">Seus grupos</h2>

          <div className="space-y-8 h-[30rem] overflow-y-scroll">
            {groups.map((grup) => (
              <div
                key={grup.id}
                onClick={() => setGroupIdActive(grup.id)}
                className="bg-gray-600 w-auto h-16 rounded flex justify-between p-4 items-center cursor-pointer"
              >
                <h3 className="text-gray-100 text-1xl">{grup.name}</h3>
                <span className="text-gray-100 text-1xl">
                  {`${grup.contacts?.length || 0} contatos`}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <Button
              onPress={onOpen}
              className="py-4 px-8 rounded bg-gray-600 text-gray-200 flex-1"
            >
              CRIAR GRUPO
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full lg:w-[40rem]">
          <Table isStriped aria-label="Example static collection table">
            <TableHeader className="bg-gray-600">
              <TableColumn>NOME</TableColumn>
              <TableColumn>NÚMERO</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={'Nenhum contato nesse grupo.'}
            >
              {filteredGroups.flatMap((group) =>
                group.contacts.map((contact) => (
                  <TableRow key={contact.phoneNumber}>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.phoneNumber}</TableCell>
                  </TableRow>
                ))
              )}
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
              <ModalBody className="flex w-full h-64 flex-wrap md:flex-nowrap gap-4">
                <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
                  <label className="flex flex-col">
                    Qual o nome do grupo?
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-4 px-4 py-2 border-solid border-2 border-gray-800/50 rounded"
                      type="text"
                    />
                  </label>

                  <label className="flex flex-col">
                    Anexe um arquivo com as informações do teu grupo
                    <input
                      onChange={handleFileChange}
                      className="mt-4 px-4 py-2"
                      type="file"
                    />
                  </label>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button
                  onClick={handleCreateGroup}
                  className="text-gray-900"
                  onPress={onClose}
                >
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
