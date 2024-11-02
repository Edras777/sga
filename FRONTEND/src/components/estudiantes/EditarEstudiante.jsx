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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { FaArrowLeft } from 'react-icons/fa';
import { SpinnerComponent } from '../../helpers/spinner';
import { RiFileList2Fill } from 'react-icons/ri';
import {
  getEstudiante,
  updateEstudiante,
  reset,
} from '../../features/estudianteSlice';
import { getGrados } from '../../features/gradoSlice';
import moment from 'moment';
import {
  getSeccionesXGrado,
  reset as resetSeccion,
} from '../../features/seccionSlice';

const EditarEstudiante = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  const { grados } = useSelector(state => state.grados);
  const { secciones } = useSelector(state => state.secciones);

  const { isLoading, isError, message } = useSelector(
    state => state.estudiantes
  );

  const params = useParams();

  const initialValues = {
    _id: null,
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

    dispatch(getEstudiante(params.id)).then(res => {
      setIndice({
        _id: res.payload._id,
        nombres: res.payload.nombres,
        apellidos: res.payload.apellidos,
        CUI: res.payload.CUI,
        sexo: res.payload.sexo,
        correo: res.payload.correo,
        celular: res.payload.celular,
        domicilio: res.payload.domicilio,
        fecha_nacimiento: res.payload.fecha_nacimiento,
        nombre_padres: res.payload.nombre_padres,
        celular_padres: res.payload.celular_padres,
        correo_padres: res.payload.correo_padres,
        colegio_procedencia: res.payload.colegio_procedencia,
        grado: res.payload.grado._id,
        seccion: res.payload.seccion._id,
        observaciones: res.payload.observaciones,
        estado: res.payload.estado,
      });
      dispatch(getSeccionesXGrado(res?.payload?.grado?._id));
    });

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch, params.id]);

  const handleUpdateSave = e => {
    e.preventDefault();

    dispatch(updateEstudiante(indice)).then(() => {
      navigate('/estudiantes');
    });
  };

  if (isLoading) {
    return <SpinnerComponent />;
  }

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
              Modificar Estudiante Seleccionado
            </Text>
          </HStack>
        </Stack>
      </Box>

      <form onSubmit={handleUpdateSave}>
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
                  placeholder="Escribe el apellidos"
                  defaultValue={indice?.apellidos}
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
                  defaultValue={indice?.nombres}
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
                  defaultValue={indice?.CUI}
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
                  textTransform={'uppercase'}
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
                  value={indice?.grado}
                  onChange={e => {
                    if (!e.target.value) {
                      setIndice({
                        ...indice,
                        grado: '',
                        seccion: '',
                      });

                      return dispatch(resetSeccion());
                    }

                    setIndice({ ...indice, grado: e.target.value });
                    dispatch(getSeccionesXGrado(e.target.value));
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
                  value={indice?.seccion}
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
              <RadioGroup
                onChange={e => setIndice({ ...indice, sexo: e })}
                value={indice?.sexo}
              >
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
                defaultValue={indice?.correo}
                type="email"
                onChange={e => setIndice({ ...indice, correo: e.target.value })}
                textTransform={'uppercase'}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight={'semibold'}>CELULAR</FormLabel>
              <Input
                placeholder="Escribe su # celular"
                defaultValue={indice?.celular}
                type="text"
                onChange={e => {
                  e.target.value =
                    e.target.value.length > 8 ? indice.celular : e.target.value;
                  setIndice({ ...indice, celular: e.target.value });
                }}
                textTransform={'uppercase'}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight={'semibold'}>DOMICILIO</FormLabel>
              <Input
                placeholder="Escribe su domicilio"
                defaultValue={indice?.domicilio}
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
                value={moment
                  .utc(indice?.fecha_nacimiento)
                  .format('YYYY-MM-DD')}
                onChange={e =>
                  setIndice({ ...indice, fecha_nacimiento: e.target.value })
                }
                type="date"
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
                defaultValue={indice?.nombre_padres}
                onChange={e =>
                  setIndice({
                    ...indice,
                    nombre_padres: e.target.value.toUpperCase(),
                  })
                }
                type="text"
                textTransform={'uppercase'}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight={'semibold'}>
                CELULAR DE LOS PADRES O ENCARGADO
              </FormLabel>
              <Input
                placeholder="Ejemplo: 987654321, 987654322"
                defaultValue={indice?.celular_padres}
                onChange={e => {
                  e.target.value =
                    e.target.value.length > 8
                      ? indice.celular_padres
                      : e.target.value;
                  setIndice({ ...indice, celular_padres: e.target.value });
                }}
                type="text"
                textTransform={'uppercase'}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight={'semibold'}>
                CORREO DE LOS PADRES O ENCARGADO
              </FormLabel>
              <Input
                placeholder="Ejemplo: usuario@gmail.com"
                defaultValue={indice?.correo_padres}
                onChange={e =>
                  setIndice({ ...indice, correo_padres: e.target.value })
                }
                type="text"
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
                  defaultValue={indice?.colegio_procedencia}
                  onChange={e =>
                    setIndice({
                      ...indice,
                      colegio_procedencia: e.target.value.toUpperCase(),
                    })
                  }
                  type="text"
                  textTransform={'uppercase'}
                />
              </FormControl>
            </Stack>
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
            </Stack>

            <Stack spacing={4} direction="row" justifyContent="right">
              <Button
                colorScheme="green"
                _dark={{
                  bg: 'green.500',
                  color: 'white',
                  _hover: { bg: 'green.600' },
                }}
                size="lg"
                type="submit"
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
                Actualizar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default EditarEstudiante;
