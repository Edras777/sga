import React, { useEffect, useState } from 'react';
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
  Select as SelectChakra,
  Stack,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { VscAdd } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { RiRefreshLine } from 'react-icons/ri';

import { ToastChakra } from '../../helpers/toast';
import { useNavigate } from 'react-router-dom';
import { getCursosXGrado, reset } from '../../features/cursoSlice';
import { createCalificacion } from '../../features/estudianteSlice';

// Función para calcular el promedio
function calcularPromedio(bimestres) {
  let suma = 0;
  let count = 0;

  // Recorremos los bimestres y sumamos los que tienen un valor
  for (const bimestre of bimestres) {
    if (bimestre !== '') {
      suma += parseFloat(bimestre);
      count++;
    }
  }

  // Calculamos el promedio si hay bimestres válidos
  return count > 0 ? (suma / count).toFixed(2) : '';
}

const ModalRegistrarCalificacion = ({ estudiante, grado }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    codigo: '',
    estudiante: estudiante,
    ciclo: new Date().getFullYear().toString(),
    curso: '',
    primer_bimestre: '',
    segundo_bimestre: '',
    tercer_bimestre: '',
    cuarto_bimestre: '',
    quinto_bimestre: '',
    promedio: '',
  };

  const [indice, setIndice] = useState(initialValues);

  const bg = useColorModeValue('white', 'gray.900');

  const { cursosGrado, isLoading, isError, message } = useSelector(
    state => state.cursos
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      ToastChakra('Error', message, 'error', 1000);
    }

    dispatch(getCursosXGrado(grado));

    return () => {
      dispatch(reset());
    };
  }, [grado, navigate, isError, message, dispatch]);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  const handleSave = e => {
    e.preventDefault();
    indice.promedio = calcularPromedio([
      indice.primer_bimestre,
      indice.segundo_bimestre,
      indice.tercer_bimestre,
      indice.cuarto_bimestre,
      indice.quinto_bimestre,
    ]);
    dispatch(createCalificacion(indice));
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  const handleClickGenerateCode = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result1 = '';

    const charactersLength = characters.length;

    for (let i = 0; i < 10; i++) {
      result1 += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    setIndice({ ...indice, codigo: result1.toUpperCase() });
  };

  const ChakraStyle = {
    option: provided => ({
      ...provided,
      bg: bg,
      cursor: 'pointer',
      borderRadius: 'xs',
      fontWeight: 'semibold',
      _hover: {
        bg: 'blue.500',
        color: 'white',
        fontWeight: 'semibold',
      },
    }),
    multiValue: provided => ({
      ...provided,
      bg: '#0078ff1c',
      borderColor: 'blue.500',
      fontSize: '10px',
      size: 'small',
      color: 'blue.500',
      borderWidth: '1px',
      fontWeight: 'semibold',
    }),
    placeholder: provided => ({
      ...provided,
      bg: 'none',
      fontSize: '14px',
      cursor: 'inherit',
    }),
  };

  const anio = new Date().getFullYear();

  const anios = [
    { value: anio - 1, label: anio - 1 },
    { value: anio, label: anio },
    { value: anio + 2, label: anio + 2 },
    { value: anio + 3, label: anio + 3 },
    { value: anio + 4, label: anio + 4 },
    { value: anio + 5, label: anio + 5 },
  ];

  return (
    <>
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
        Nuevo Registro de Calificacion
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        size="6xl"
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSave}>
          <ModalContent _dark={{ bg: 'primary.900' }} borderRadius="none">
            <ModalHeader textAlign="center">
              REGISTRAR NUEVA CALIFICACION
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">CODIGO</FormLabel>
                  <InputGroup size="md">
                    <Input
                      type={'text'}
                      placeholder="Ingrese el codigo"
                      value={indice.codigo !== '' ? indice.codigo : ''}
                      onChange={e =>
                        setIndice({
                          ...indice,
                          codigo: e.target.value.toUpperCase(),
                        })
                      }
                      textTransform={'uppercase'}
                    />
                    <InputRightElement width="2.5rem">
                      <Tooltip hasArrow label="Generar codigo" placement="auto">
                        <IconButton
                          aria-label="Buscar"
                          colorScheme={'yellow'}
                          rounded={'full'}
                          size={'sm'}
                          onClick={handleClickGenerateCode}
                        >
                          <Icon as={RiRefreshLine} />
                        </IconButton>
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
              <Stack
                spacing={4}
                direction="row"
                justifyContent="space-between"
                mt={2}
              >
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">CICLO</FormLabel>
                  <SelectChakra
                    defaultValue={indice?.ciclo}
                    onChange={e =>
                      setIndice({ ...indice, ciclo: e.target.value })
                    }
                  >
                    {anios.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </SelectChakra>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontWeight={'semibold'}>CURSO</FormLabel>
                  <SelectChakra
                    placeholder="Selecciona una opción"
                    onChange={e =>
                      setIndice({ ...indice, curso: e.target.value })
                    }
                  >
                    {cursosGrado.map(curso => (
                      <option key={curso._id} value={curso._id}>
                        {curso.nombre}
                      </option>
                    ))}
                  </SelectChakra>
                </FormControl>
              </Stack>
              <Stack
                spacing={2}
                direction="column"
                justifyContent="space-between"
                mt={2}
              >
                <FormControl>
                  <FormLabel fontWeight="semibold">PRIMER BIMESTRE</FormLabel>
                  <Input
                    placeholder="Ingrese la calificacion"
                    onChange={e =>
                      setIndice({ ...indice, primer_bimestre: e.target.value })
                    }
                    type="number"
                    textTransform={'uppercase'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">SEGUNDO BIMESTRE</FormLabel>
                  <Input
                    placeholder="Ingrese la calificacion"
                    onChange={e =>
                      setIndice({ ...indice, segundo_bimestre: e.target.value })
                    }
                    type="number"
                    textTransform={'uppercase'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">TERCER BIMESTRE</FormLabel>
                  <Input
                    placeholder="Ingrese la calificacion"
                    onChange={e =>
                      setIndice({ ...indice, tercer_bimestre: e.target.value })
                    }
                    type="number"
                    textTransform={'uppercase'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">CUARTO BIMESTRE</FormLabel>
                  <Input
                    placeholder="Ingrese la calificacion"
                    onChange={e =>
                      setIndice({ ...indice, cuarto_bimestre: e.target.value })
                    }
                    type="number"
                    textTransform={'uppercase'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">QUINTO BIMESTRE</FormLabel>
                  <Input
                    placeholder="Ingrese la calificacion"
                    onChange={e =>
                      setIndice({ ...indice, quinto_bimestre: e.target.value })
                    }
                    type="number"
                    textTransform={'uppercase'}
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
                colorScheme="messenger"
                _dark={{
                  bg: 'messenger.500',
                  color: 'white',
                  _hover: { bg: 'messenger.600' },
                }}
                size="lg"
                mr={3}
                type="submit"
                isDisabled={!indice?.codigo || !indice?.ciclo || !indice?.curso}
                borderRadius="none"
              >
                REGISTRAR CALIFICACION
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ModalRegistrarCalificacion;
