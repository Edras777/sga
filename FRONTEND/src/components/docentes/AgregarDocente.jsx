import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { createDocente } from '../../features/docenteSlice';

const AgregarDocente = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    nombres: '',
    apellidos: '',
    CUI: '',
    correo: '',
    celular: '',
    fecha_nacimiento: '',
    estado: '',
  };

  const [indice, setIndice] = useState(initialValues);

  const [cargando, setCargando] = useState(false);

  const handleSave = e => {
    setCargando(true);
    e.preventDefault();
    dispatch(createDocente(indice)).then(() => {
      setCargando(false);
      navigate('/docentes');
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
            <Link to={'/docentes'}>
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
              Agregar Nuevo Docente
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
                <FormLabel fontWeight={'semibold'}>NOMBRES</FormLabel>
                <Input
                  placeholder="Escribe los nombres"
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
              <FormControl isRequired>
                <FormLabel fontWeight={'semibold'}>APELLIDOS</FormLabel>
                <Input
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
            </Stack>

            <FormControl isRequired>
              <FormLabel fontWeight={'semibold'}>CUI</FormLabel>
              <Input
                placeholder="XXXXXXXXXXXXX"
                type="number"
                onChange={e => {
                  setIndice({
                    ...indice,
                    CUI:
                      e.target.value.length > 13 ? indice.CUI : e.target.value,
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

            <FormControl isRequired>
              <FormLabel fontWeight={'semibold'}>CORREO</FormLabel>
              <Input
                placeholder="Ejemplo: usuario@gmail.com"
                type="email"
                onChange={e => setIndice({ ...indice, correo: e.target.value })}
                textTransform="uppercase"
              />
            </FormControl>

            <FormControl isRequired fontWeight={'semibold'}>
              <FormLabel>CELULAR</FormLabel>
              <InputGroup>
                <Input
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

            <FormControl isRequired>
              <FormLabel fontWeight={'semibold'}>FECHA DE NACIMIENTO</FormLabel>
              <Input
                type="date"
                onChange={e =>
                  setIndice({ ...indice, fecha_nacimiento: e.target.value })
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
              <RadioGroup onChange={e => setIndice({ ...indice, estado: e })}>
                <Stack direction="row">
                  <Radio value={'ACTIVO'}>ACTIVO</Radio>
                  <Radio value={'INACTIVO'}>INACTIVO</Radio>
                  <Radio value={'RETIRADO'}>RETIRADO</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
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
                indice.correo === '' ||
                indice.celular === '' ||
                indice.fecha_nacimiento === '' ||
                indice.estado === ''
              }
              borderRadius="none"
            >
              Guardar
            </Button>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default AgregarDocente;
