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
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Switch,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { VscEdit } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { updateInmobiliario } from '../../features/inmobiliarioSlice';

export const ModalEditarInmobiliario = ({ row, grados }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    _id: null,
    nombre: '',
    codigo: '',
    descripcion: '',
    cantidad: '',
    grado: '',
    observaciones: '',
    estado: true,
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
    dispatch(updateInmobiliario(indice));
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
        size="6xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent _dark={{ bg: 'primary.900' }} borderRadius="none">
          <ModalHeader textAlign="center">
            ACTUALIZAR EL INMOBILIARIO SELECCIONADO
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={3}
              mt={-4}
              direction="column"
              justifyContent="space-between"
              p={2}
            >
              <Stack
                spacing={1}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <FormControl isRequired>
                  <FormLabel fontWeight={'semibold'}>NOMBRE</FormLabel>
                  <Input
                    type="text"
                    defaultValue={indice ? indice.nombre : ''}
                    onChange={e =>
                      setIndice({ ...indice, nombre: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontWeight={'semibold'}>CODIGO</FormLabel>
                  <Input
                    defaultValue={indice ? indice.codigo : ''}
                    type="text"
                    onChange={e =>
                      setIndice({
                        ...indice,
                        codigo: e.target.value.toUpperCase(),
                      })
                    }
                    textTransform="uppercase"
                  />
                  <FormHelperText textColor={'red.500'}>
                    {indice.codigo.length > 0 && indice.codigo.length < 4
                      ? 'debe tener al menos 5 caracteres'
                      : ''}
                  </FormHelperText>
                </FormControl>
              </Stack>

              <Stack spacing={1} direction={{ base: 'column', lg: 'row' }}>
                <FormControl isRequired>
                  <FormLabel fontWeight={'semibold'}>CANTIDAD</FormLabel>
                  <Input
                    defaultValue={indice ? indice.cantidad : ''}
                    placeholder="100"
                    type="number"
                    onChange={e =>
                      setIndice({ ...indice, cantidad: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontWeight={'semibold'}>GRADOS</FormLabel>
                  <Select
                    value={indice.grado !== null ? indice.grado._id : ''}
                    onChange={e =>
                      setIndice({ ...indice, grado: e.target.value })
                    }
                  >
                    {grados.map(grado => (
                      <option key={grado._id} value={grado._id}>
                        {grado.nombre}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <FormControl>
                <FormLabel fontWeight={'semibold'}>DESCRIPCIÓN</FormLabel>
                <Textarea
                  defaultValue={indice ? indice.descripcion : ''}
                  type="text"
                  onChange={e =>
                    setIndice({ ...indice, descripcion: e.target.value })
                  }
                  rows={2}
                />
              </FormControl>

              <Stack direction="row" w={'full'}>
                <FormControl>
                  <FormLabel fontWeight={'semibold'}>OBSERVACIONES</FormLabel>
                  <Textarea
                    defaultValue={indice ? indice.observaciones : ''}
                    type="text"
                    onChange={e =>
                      setIndice({ ...indice, observaciones: e.target.value })
                    }
                    placeholder="Escribe las observaciones acerca del libro"
                    rows={2}
                  />
                </FormControl>
              </Stack>
              <FormControl isRequired>
                <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                <Switch
                  onChange={e =>
                    setIndice({ ...indice, estado: e.target.checked })
                  }
                  value={indice ? indice.estado : false}
                  colorScheme="purple"
                  isChecked={indice.estado === true ? true : false}
                  size="lg"
                />
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
              isDisabled={
                indice.nombre === '' ||
                indice.codigo === '' ||
                indice.grado === '' ||
                indice.cantidad === ''
              }
              colorScheme="green"
              _dark={{
                bg: 'green.600',
                color: 'white',
                _hover: { bg: 'green.800' },
              }}
              size="lg"
              mr={3}
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
