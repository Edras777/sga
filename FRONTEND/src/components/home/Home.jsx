import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chart2 from './Chart2';
import GraficoBar from './Bar';

import { getReportes, reset } from '../../features/reporteSlice';
import { SpinnerComponent } from '../../helpers/spinner';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bg = useColorModeValue('white', 'primary.900');

  const { user } = useSelector(state => state.auth);

  const { reportes, isLoading, message } = useSelector(state => state.reportes);

  useEffect(() => {
    console.log('usuario', user);
    if (!user) {
      return navigate('/login');
    } else {
      navigate('/inicio');
    }

    if (!user?.token) {
      return navigate('/login');
    } else {
      navigate('/inicio');
    }

    dispatch(getReportes());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, message, navigate, user]);

  if (isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <Flex w="full" alignItems="center" justifyContent="center" mb={4}>
      <Stack spacing={4} w="full" direction={'column'}>
        <Box shadow="base" bg={bg} color="white" w="full" py={3} px={4}>
          <Heading
            fontWeight="bold"
            _light={{ color: 'primary.900' }}
            fontSize={{ base: 'sm', lg: '2xl' }}
            textAlign={'center'}
          >
            BIENVENIDO AL SISTEMA DE GESTIÓN ACADÉMICA
          </Heading>
        </Box>
        <Box>
          <Stack
            w="full"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Box
              p={4}
              boxShadow={'base'}
              bg="white"
              _dark={{ bg: 'primary.800' }}
              w="full"
            >
              <Text
                fontSize={{ base: 'xs', lg: 'xl' }}
                fontWeight="bold"
                mb={4}
                textAlign={'center'}
              >
                Cantidad de estudiantes por genero
              </Text>
              <GraficoBar reportes={reportes} />
            </Box>
            <Box
              p={4}
              boxShadow={'base'}
              bg="white"
              _dark={{ bg: 'primary.800' }}
              w="full"
            >
              <Text
                fontSize={{ base: 'xs', lg: 'xl' }}
                fontWeight="bold"
                mb={4}
                textAlign={'center'}
              >
                Monto recaudado anual / total
              </Text>
              <Chart2 reportes={reportes} />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Home;
