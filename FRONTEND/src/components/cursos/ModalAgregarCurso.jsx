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
import { getSecciones } from '../../features/seccionSlice';
import { getDocentes } from '../../features/docenteSlice';
import { createCurso } from '../../features/cursoSlice';

const ModalAgregarCurso = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    nombre: '',
    descripcion: '',
    grado: '',
    seccion: '',
    docente: '',
  };

  const { user } = useSelector(state => state.auth);
  const { grados, isError, message } = useSelector(state => state.grados);
  const {
    secciones,
    isError: isErrorSeccion,
    message: messageSeccion,
  } = useSelector(state => state.secciones);
  const {
    docentes,
    isError: isErrorDocente,
    message: messageDocente,
  } = useSelector(state => state.docentes);

  useEffect(() => {
    if (isError) {
      ToastChakra('Error', message, 'error', 1000);
    }
    if (isErrorSeccion) {
      ToastChakra('Error', messageSeccion, 'error', 1000);
    }
    if (isErrorDocente) {
      ToastChakra('Error', messageDocente, 'error', 1000);
    }

    if (!user) {
      navigate('/login');
    } else if (!user?.token) {
      navigate('/login');
    }

    dispatch(getGrados());
    dispatch(getSecciones());
    dispatch(getDocentes());

    return () => {
      dispatch(reset());
    };
  }, [
    user,
    navigate,
    isError,
    message,
    dispatch,
    isErrorDocente,
    isErrorSeccion,
    messageDocente,
    messageSeccion,
  ]);

  const [indice, setIndice] = useState(initialValues);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  const handleSave = () => {
    dispatch(createCurso(indice));
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
                <FormControl isRequired>
                  <FormLabel fontWeight={'semibold'}>SECCION</FormLabel>
                  <Select
                    placeholder="Selecciona una opción"
                    onChange={e =>
                      setIndice({ ...indice, seccion: e.target.value })
                    }
                  >
                    {secciones.map(seccion => (
                      <option key={seccion._id} value={seccion._id}>
                        {seccion.nombre}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontWeight={'semibold'}>DOCENTE</FormLabel>
                  <Select
                    placeholder="Selecciona una opción"
                    onChange={e =>
                      setIndice({ ...indice, docente: e.target.value })
                    }
                  >
                    {docentes.map(docente => (
                      <option key={docente._id} value={docente._id}>
                        {docente.nombres}
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
              isDisabled={
                indice.nombre === '' ||
                indice.grado === '' ||
                indice.seccion === '' ||
                indice.docente === ''
              }
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

export default ModalAgregarCurso;
