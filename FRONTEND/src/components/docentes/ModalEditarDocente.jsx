import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import { VscEdit } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { updateDocente } from '../../features/docenteSlice';
import moment from 'moment';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';

const ModalEditarDocente = ({ row }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    _id: null,
    nombres: '',
    apellidos: '',
    CUI: '',
    correo: '',
    celular: '',
    fecha_nacimiento: '',
    estado: '',
  };

  const [indice, setIndice] = useState(initialValues);

  const handleModalOpen = data => {
    setIsModalOpen(true);
    setIndice(data);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    dispatch(updateDocente(indice));
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip hasArrow label="Editar" placement="auto">
        <IconButton
          colorScheme="blackAlpha"
          _dark={{ color: 'white', _hover: { bg: 'whiteAlpha.200' } }}
          aria-label="Editar"
          icon={<Icon as={VscEdit} fontSize="2xl" />}
          variant="ghost"
          onClick={() => handleModalOpen(row)}
          ml={2}
        />
      </Tooltip>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        size="5xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent _dark={{ bg: 'primary.900' }} borderRadius="none">
          <ModalHeader textAlign="center">ACTUALIZAR DOCENTE</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              direction="column"
              justifyContent="space-between"
              p={4}
            >
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl>
                  <FormLabel fontWeight={'semibold'}>NOMBRES</FormLabel>
                  <Input
                    defaultValue={indice ? indice.nombres : ''}
                    placeholder="Escribe el nombre del docente"
                    type="text"
                    onChange={e =>
                      setIndice({
                        ...indice,
                        nombres: e.target.value.toUpperCase(),
                      })
                    }
                    textTransform="uppercase"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={'semibold'}>APELLIDOS</FormLabel>
                  <Input
                    defaultValue={indice ? indice.apellidos : ''}
                    placeholder="Escribe los apellidos"
                    type="text"
                    onChange={e =>
                      setIndice({
                        ...indice,
                        apellidos: e.target.value.toUpperCase(),
                      })
                    }
                    textTransform="uppercase"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight={'semibold'}>CUI</FormLabel>
                  <Input
                    defaultValue={indice ? indice.CUI : ''}
                    placeholder="XXXXXXXXXXXXX"
                    type="number"
                    onChange={e => {
                      setIndice({
                        ...indice,
                        CUI:
                          e.target.value.length > 13
                            ? indice.CUI
                            : e.target.value,
                      });
                      e.target.value =
                        e.target.value.length > 13
                          ? indice.CUI
                          : e.target.value;
                    }}
                  />
                  <FormHelperText textColor={'red.500'}>
                    {indice.CUI?.length > 0 && indice.CUI?.length !== 13
                      ? 'El CUI debe tener 13 caracteres'
                      : ''}
                  </FormHelperText>
                </FormControl>
              </Stack>

              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl>
                  <FormLabel fontWeight={'semibold'}>CORREO</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EmailIcon color="gray.400" />}
                    />
                    <Input
                      defaultValue={indice ? indice.correo : ''}
                      placeholder="Escribe el correo"
                      type="email"
                      onChange={e =>
                        setIndice({ ...indice, correo: e.target.value })
                      }
                    />
                  </InputGroup>
                </FormControl>

                <FormControl fontWeight={'semibold'}>
                  <FormLabel>CELULAR</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<PhoneIcon color="gray.400" />}
                    />
                    <Input
                      defaultValue={indice ? indice.celular : ''}
                      placeholder="xxxxxxxx"
                      type="number"
                      onChange={e => {
                        e.target.value =
                          e.target.value.length > 8
                            ? indice.celular
                            : e.target.value;
                        setIndice({ ...indice, celular: e.target.value });
                      }}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>

              <FormControl>
                <FormLabel fontWeight={'semibold'}>
                  FECHA DE NACIMIENTO
                </FormLabel>
                <Input
                  value={
                    !indice.fecha_nacimiento
                      ? ''
                      : moment
                          .utc(indice?.fecha_nacimiento)
                          .format('YYYY-MM-DD')
                  }
                  onChange={e =>
                    setIndice({ ...indice, fecha_nacimiento: e.target.value })
                  }
                  type="date"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                <RadioGroup
                  onChange={e => setIndice({ ...indice, estado: e })}
                  value={indice?.estado}
                >
                  <Stack direction="row">
                    <Radio value={'ACTIVO'}>ACTIVO</Radio>
                    <Radio value={'INACTIVO'}>INACTIVO</Radio>
                    <Radio value={'RETIRADO'}>RETIRADO</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              _dark={{
                bg: 'red.500',
                color: 'white',
                _hover: { bg: 'red.600' },
              }}
              size="lg"
              mr={3}
              onClick={handleModalClose}
              borderRadius="none"
            >
              CANCELAR
            </Button>
            <Button
              colorScheme="green"
              _dark={{
                bg: 'green.600',
                color: 'white',
                _hover: { bg: 'green.800' },
              }}
              size="lg"
              mr={3}
              isDisabled={
                indice.nombres === '' ||
                indice.apellidos === '' ||
                indice.CUI === '' ||
                indice.correo === '' ||
                indice.celular === '' ||
                indice.fecha_nacimiento === '' ||
                indice.estado === ''
              }
              onClick={handleUpdate}
              borderRadius="none"
            >
              ACTUALIZAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditarDocente;
