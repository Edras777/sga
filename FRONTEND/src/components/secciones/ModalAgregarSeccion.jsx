import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { VscAdd } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { getGrados, reset } from '../../features/gradoSlice';
import { ToastChakra } from '../../helpers/toast';
import { useNavigate } from 'react-router-dom';
import { createSeccion } from '../../features/seccionSlice';

const ModalAgregarSeccion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    nombre: '',
    descripcion: '',
    grado: '',
  };

  const { user } = useSelector(state => state.auth);
  const { grados, isError, message } = useSelector(state => state.grados);

  useEffect(() => {
    if (isError) {
      ToastChakra('Error', message, 'error', 1000);
    }

    if (!user) {
      navigate('/login');
    } else if (!user?.token) {
      navigate('/login');
    }

    dispatch(getGrados());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const [indice, setIndice] = useState(initialValues);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  const handleSave = () => {
    dispatch(createSeccion(indice));
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  return (
    <>
      <Tooltip hasArrow label="Agregar Nuevo Registro" placement="auto">
        <Button
          colorScheme="messenger"
          _dark={{
            bg: 'messenger.500',
            color: 'white',
            _hover: { bg: 'messenger.600' },
          }}
          aria-label="Agregar"
          leftIcon={<Icon as={VscAdd} fontSize="2xl" />}
          variant="solid"
          rounded={'none'}
          onClick={handleModalOpen}
        >
          Nuevo Registro
        </Button>
      </Tooltip>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        size="5xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent _dark={{ bg: 'primary.900' }} borderRadius="none">
          <ModalHeader textAlign="center">REGISTRAR NUEVA SECCION</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              direction="column"
              justifyContent="space-between"
              p={4}
            >
              <FormControl isRequired>
                <FormLabel fontWeight="semibold">NOMBRE</FormLabel>
                <Input
                  placeholder="ESCRIBE EL NOMBRE"
                  type="text"
                  onChange={e =>
                    setIndice({ ...indice, nombre: e.target.value })
                  }
                  textTransform="uppercase"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold">DESCRIPCIÓN</FormLabel>
                <Textarea
                  placeholder="Escribe la descripcion"
                  type="text"
                  onChange={e =>
                    setIndice({ ...indice, descripcion: e.target.value })
                  }
                  textTransform="uppercase"
                />
              </FormControl>
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl isRequired>
                  <FormLabel fontWeight={'semibold'}>GRADO</FormLabel>
                  <Select
                    placeholder="Selecciona una opción"
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
              colorScheme="messenger"
              _dark={{
                bg: 'messenger.500',
                color: 'white',
                _hover: { bg: 'messenger.600' },
              }}
              size="lg"
              mr={3}
              onClick={handleSave}
              isDisabled={indice.nombre === '' || indice.grado === ''}
              borderRadius="none"
            >
              GUARDAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAgregarSeccion;
