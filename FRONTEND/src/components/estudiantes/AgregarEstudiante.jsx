import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { FaArrowLeft } from 'react-icons/fa';
import { RiFileList2Fill } from 'react-icons/ri';
import { createEstudiante } from '../../features/estudianteSlice';
import { getGrados, reset } from '../../features/gradoSlice';
import {
  getSeccionesXGrado,
  reset as resetSeccion,
} from '../../features/seccionSlice';

const AgregarEstudiante = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  const { grados, isError, message } = useSelector(state => state.grados);
  const {
    secciones,
    isError: isErrorSecciones,
    message: messagesSecciones,
  } = useSelector(state => state.secciones);

  useEffect(() => {
    if (isError || isErrorSecciones) {
      ToastChakra('Error', message || messagesSecciones, 'error', 1000);
      console.log(message);
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
  }, [
    user,
    navigate,
    isError,
    message,
    dispatch,
    isErrorSecciones,
    messagesSecciones,
  ]);

  const initialValues = {
    nombres: '',
    apellidos: '',
    CUI: '',
    sexo: '',
    correo: '',
    celular: '',
    domicilio: '',
    fecha_nacimiento: '',
    nombre_padres: '',
    celular_padres: '',
    correo_padres: '',
    colegio_procedencia: '',
    grado: '',
    seccion: '',
    observaciones: '',
    estado: '',
  };

  const [indice, setIndice] = useState(initialValues);

  const [cargando, setCargando] = useState(false);

  const handleSave = e => {
    setCargando(true);
    e.preventDefault();
    dispatch(createEstudiante(indice)).then(() => {
      setCargando(false);
      navigate('/estudiantes');
    });
    setIndice(initialValues);
  };

  return (
    <>
      <Box
        borderRadius="xs"
        boxShadow="base"
        overflow="hidden"
        bg="white"
        _dark={{ bg: 'primary.800' }}
      >
        <Stack spacing={4} direction="row" justifyContent="space-between" p={4}>
          <HStack spacing={4} direction="row">
            <Link to={'/estudiantes'}>
              <IconButton
                icon={<FaArrowLeft />}
                colorScheme="blue"
                rounded="full"
              />
            </Link>
            <Text fontSize="md" fontWeight={'black'}>
              Regresar
            </Text>
          </HStack>
          <HStack spacing={4} direction="row">
            <Text fontSize="lg" fontWeight={'black'}>
              Agregar Nuevo Estudiante
            </Text>
          </HStack>
        </Stack>
      </Box>

      <form onSubmit={handleSave}>
        <Box
          borderRadius="xs"
          boxShadow="base"
          overflow="hidden"
          bg="white"
          _dark={{ bg: 'primary.800' }}
          mt={4}
          p={4}
        >
          <Stack
            spacing={4}
            direction="column"
            justifyContent="space-between"
            p={2}
          >
            <Stack
              spacing={2}
              direction={{ base: 'column', lg: 'row' }}
              justifyContent="space-between"
            >
              <FormControl isRequired>
                <FormLabel fontWeight={'semibold'}>APELLIDOS</FormLabel>
                <Input
                  placeholder="Escribe el apellido"
                  type="text"
                  onChange={e =>
                    setIndice({
                      ...indice,
                      apellidos: e.target.value.toUpperCase(),
                    })
                  }
                  textTransform={'uppercase'}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight={'semibold'}>NOMBRES</FormLabel>
                <Input
                  placeholder="Escribe el nombre"
                  type="text"
                  onChange={e =>
                    setIndice({
                      ...indice,
                      nombres: e.target.value.toUpperCase(),
                    })
                  }
                  textTransform={'uppercase'}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight={'semibold'}>CUI</FormLabel>
                <Input
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
                      e.target.value.length > 13 ? indice.CUI : e.target.value;
                  }}
                />
                <FormHelperText textColor={'red.500'}>
                  {indice.CUI?.length > 0 && indice.CUI?.length !== 13
                    ? 'El CUI debe tener 13 caracteres'
                    : ''}
                </FormHelperText>
              </FormControl>
            </Stack>
            <Stack
              spacing={2}
              direction={{ base: 'column', lg: 'row' }}
              justifyContent="space-between"
            >
              <FormControl isRequired>
                <FormLabel fontWeight={'semibold'}>GRADO</FormLabel>
                <Select
                  placeholder="Selecciona una opción"
                  onChange={e => {
                    if (!e.target.value) return dispatch(resetSeccion());

                    dispatch(getSeccionesXGrado(e.target.value));

                    setIndice({ ...indice, grado: e.target.value });
                  }}
                >
                  {grados.map(grado => (
                    <option key={grado._id} value={grado._id}>
                      {grado.nombre}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight={'semibold'}>SECCIÓN</FormLabel>
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
            </Stack>
            <FormControl isRequired>
              <FormLabel fontWeight={'semibold'}>SEXO</FormLabel>
              <RadioGroup onChange={e => setIndice({ ...indice, sexo: e })}>
                <Stack direction="row">
                  <Radio value={'M'}>MASCULINO</Radio>
                  <Radio value={'F'}>FEMENINO</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel fontWeight={'semibold'}>CORREO</FormLabel>
              <Input
                placeholder="Escribe su correo"
                type="email"
                onChange={e => setIndice({ ...indice, correo: e.target.value })}
                textTransform={'uppercase'}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight={'semibold'}>CELULAR</FormLabel>
              <Input
                placeholder="xxxxxxxx"
                type="number"
                onChange={e => {
                  e.target.value =
                    e.target.value.length > 8 ? indice.celular : e.target.value;
                  setIndice({ ...indice, celular: e.target.value });
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight={'semibold'}>DOMICILIO</FormLabel>
              <Input
                placeholder="Escribe su domicilio"
                type="text"
                onChange={e =>
                  setIndice({ ...indice, domicilio: e.target.value })
                }
                textTransform={'uppercase'}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight={'semibold'}>FECHA DE NACIMIENTO</FormLabel>
              <Input
                type="date"
                onChange={e =>
                  setIndice({ ...indice, fecha_nacimiento: e.target.value })
                }
              />
            </FormControl>
          </Stack>
        </Box>

        <Box
          borderRadius="xs"
          boxShadow="base"
          overflow="hidden"
          bg="white"
          _dark={{ bg: 'primary.800' }}
          mt={3}
        >
          <Stack
            spacing={4}
            direction="row"
            justifyContent="space-between"
            py={3}
            px={6}
          >
            <Text fontSize="md" fontWeight={'black'}>
              Más Detalles del estudiante
            </Text>
            <Icon as={RiFileList2Fill} fontSize="xl" />
          </Stack>
        </Box>

        <Box
          borderRadius="xs"
          boxShadow="base"
          overflow="hidden"
          bg="white"
          _dark={{ bg: 'primary.800' }}
          mt={4}
          p={4}
        >
          <Stack
            spacing={4}
            direction="column"
            justifyContent="space-between"
            p={2}
          >
            <FormControl isRequired>
              <FormLabel fontWeight={'semibold'}>
                NOMBRES Y APELLIDOS DE LOS PADRES O ENCARGADO
              </FormLabel>
              <Input
                placeholder="Ejemplo: JUAN"
                type="text"
                onChange={e =>
                  setIndice({
                    ...indice,
                    nombre_padres: e.target.value.toUpperCase(),
                  })
                }
                textTransform={'uppercase'}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight={'semibold'}>
                CELULAR DE LOS PADRES O ENCARGADO
              </FormLabel>
              <Input
                placeholder="xxxxsxxxx"
                type="text"
                onChange={e => {
                  e.target.value =
                    e.target.value.length > 8
                      ? indice.celular_padres
                      : e.target.value;
                  setIndice({ ...indice, celular_padres: e.target.value });
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight={'semibold'}>
                CORREO DE LOS PADRES O ENCARGADO
              </FormLabel>
              <Input
                placeholder="Ejemplo: usuario@gmail.com"
                type="text"
                onChange={e =>
                  setIndice({ ...indice, correo_padres: e.target.value })
                }
                textTransform={'uppercase'}
              />
            </FormControl>

            <Stack spacing={2} direction={{ base: 'column', lg: 'row' }}>
              <FormControl>
                <FormLabel fontWeight={'semibold'}>
                  COLEGIO DE PROCEDENCIA
                </FormLabel>
                <Input
                  placeholder="Ejemplo: COLEGIO NACIONAL"
                  type="text"
                  onChange={e =>
                    setIndice({
                      ...indice,
                      colegio_procedencia: e.target.value.toUpperCase(),
                    })
                  }
                  textTransform={'uppercase'}
                />
              </FormControl>
            </Stack>

            <Stack
              spacing={2}
              direction={{ base: 'column', lg: 'row' }}
            ></Stack>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel fontWeight={'semibold'}>OBSERVACIONES</FormLabel>
                <Textarea
                  defaultValue={indice ? indice.observaciones : ''}
                  type="text"
                  onChange={e =>
                    setIndice({ ...indice, observaciones: e.target.value })
                  }
                  placeholder="Escribe las observaciones acerca del estudiante"
                  rows={2}
                  textTransform={'uppercase'}
                />
              </FormControl>
              <Stack spacing={4} direction="row">
                <FormControl isRequired>
                  <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                  <RadioGroup
                    onChange={e => setIndice({ ...indice, estado: e })}
                  >
                    <Stack direction="row">
                      <Radio value={'ACTIVO'}>ACTIVO</Radio>
                      <Radio value={'INACTIVO'}>INACTIVO</Radio>
                      <Radio value={'RETIRADO'}>RETIRADO</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Stack>

            <Stack spacing={4} direction="row" justifyContent="right">
              <Button
                colorScheme="messenger"
                _dark={{
                  bg: 'messenger.500',
                  color: 'white',
                  _hover: { bg: 'messenger.600' },
                }}
                loadingText="Guardando..."
                spinnerPlacement="start"
                size="lg"
                type="submit"
                isLoading={cargando ? true : false}
                isDisabled={
                  indice.nombres === '' ||
                  indice.apellidos === '' ||
                  indice.CUI === '' ||
                  indice.sexo === '' ||
                  indice.domicilio === '' ||
                  indice.grado === '' ||
                  indice.seccion === '' ||
                  indice.fecha_nacimiento === '' ||
                  indice.nombre_padres === '' ||
                  indice.celular_padres === '' ||
                  indice.estado === ''
                }
                borderRadius="none"
              >
                Guardar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default AgregarEstudiante;
