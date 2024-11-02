import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
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
  Switch,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { VscEdit } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { getGrados, reset } from '../../features/gradoSlice';
import { ToastChakra } from '../../helpers/toast';
import { useNavigate } from 'react-router-dom';
import { updateCurso } from '../../features/cursoSlice';
import { getSecciones } from '../../features/seccionSlice';
import { getDocentes } from '../../features/docenteSlice';

const ModalEditarCurso = ({ row }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    _id: null,
    nombre: '',
    descripcion: '',
    grado: '',
    seccion: '',
    docente: '',
  };

  const [indice, setIndice] = useState(initialValues);

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
      console.log(message);
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

  const handleModalOpen = data => {
    setIsModalOpen(true);
    setIndice({
      _id: data._id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      grado: data.grado._id,
      seccion: data.seccion._id,
      docente: data.docente._id,
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    dispatch(updateCurso(indice));
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
          variant={'ghost'}
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
          <ModalHeader textAlign="center">ACTUALIZAR SECCION</ModalHeader>
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
                  defaultValue={indice ? indice.nombre : ''}
                  placeholder="Escribe el nombre de la categoria"
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
                  defaultValue={indice ? indice.descripcion : ''}
                  placeholder="Escribe la descripcion de la categoria"
                  type="text"
                  onChange={e =>
                    setIndice({ ...indice, descripcion: e.target.value })
                  }
                  textTransform="uppercase"
                />
              </FormControl>
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">GRADO</FormLabel>
                  <Select
                    placeholder="SELECCIONE EL GRADO ACADEMICO"
                    defaultValue={row?.grado._id}
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
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">SECCION</FormLabel>
                  <Select
                    placeholder="SELECCIONE LA SECCION"
                    defaultValue={row?.seccion._id}
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
              </Stack>
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">DOCENTE</FormLabel>
                  <Select
                    placeholder="SELECCIONE EL DOCENTE"
                    defaultValue={row?.docente._id}
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
              colorScheme="green"
              _dark={{
                bg: 'green.600',
                color: 'white',
                _hover: { bg: 'green.800' },
              }}
              size="lg"
              mr={3}
              isDisabled={
                indice.nombre === '' ||
                indice.grado === '' ||
                indice.seccion === '' ||
                indice.docente === ''
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

export default ModalEditarCurso;
