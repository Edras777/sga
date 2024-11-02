import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Checkbox,
  HStack,
  Flex,
  Link,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { login, reset } from '../../features/authSlice';
import { ToastChakra } from '../../helpers/toast';
import { FaRegUser } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FiLock } from 'react-icons/fi';
import { Spinner } from 'react-loading-io/dist/Spinner';

const LoginPage = () => {
  const bgAuth = useColorModeValue('gray.50', '#131516');

  const [correo, setCorreo] = useState(
    window.localStorage.getItem('usuario_correo') || ''
  );
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(
    window.localStorage.getItem('usuario_correo') ? true : false
  );
  const { ROLE, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      ToastChakra('Error', message, 'error', 1500, 'top-right');
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, message, navigate, ROLE]);

  const handleLogin = e => {
    e.preventDefault();

    const userData = {
      correo,
      password,
    };
    if (checked) {
      window.localStorage.setItem('usuario_correo', userData.correo);
    } else {
      window.localStorage.removeItem('usuario_correo');
    }

    dispatch(login(userData));
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const content = isLoading ? (
    <Center h={'100vh'} w={'full'} bg={'primary.900'}>
      <Stack spacing={4} px={4} direction="column" align={'center'}>
        <Text fontSize="xl" fontWeight="bold">
          {' '}
          Iniciando Sesión ...{' '}
        </Text>
        <Spinner size={200} type="ball-spin-fade-loader" color="#805ad5" />
      </Stack>
    </Center>
  ) : (
    <form onSubmit={handleLogin}>
      <HStack
        display="flex"
        justify={'center'}
        w={'full'}
        h={'100vh'}
        bg={bgAuth}
        py={{ base: 14, lg: 16 }}
      >
        <Flex w={{ base: 450, lg: 550 }} h="full" alignSelf={'center'}>
          <Box
            borderWidth={1}
            w="full"
            h="full"
            px={{ base: 8, lg: 12 }}
            bg="white"
            _dark={{ bg: 'primary.900' }}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius="lg"
            boxShadow={'base'}
          >
            <Stack
              w="full"
              h="full"
              spacing={4}
              alignItems="center"
              justifyContent="center"
            >
              {/* <Image src={Logo} w={20} /> */}
              <Heading
                textAlign={'center'}
                fontSize="xl"
                fontWeight="bold"
                mt={2}
              >
                Sistema de Gestion Académica
              </Heading>
              <FormControl id="email">
                <FormLabel mt={4}>Correo Electrónico</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    _dark={{ color: 'gray.400' }}
                    children={<FaRegUser color="gray.500" fontSize={18} />}
                  />
                  <Input
                    type="email"
                    value={correo}
                    placeholder="Ingrese su correo"
                    onChange={e => {
                      setCorreo(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    _dark={{ color: 'gray.400' }}
                    children={<FiLock color="gray.500" fontSize={20} />}
                  />
                  <Input
                    value={password}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ingrese su contraseña"
                    onChange={e => setPassword(e.target.value)}
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.75rem"
                      color={'white'}
                      bg="messenger.600"
                      _hover={{ bg: 'messenger.700' }}
                      size="sm"
                      onClick={handleShowClick}
                    >
                      {showPassword ? (
                        <Icon as={ViewIcon} />
                      ) : (
                        <Icon as={ViewOffIcon} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack
                direction="row"
                align={'start'}
                justifyContent="space-between"
                w="full"
                fontSize={'sm'}
              >
                <Checkbox
                  defaultChecked={checked}
                  value={checked}
                  onChange={e => setChecked(e.target.checked)}
                >
                  Recuerdame
                </Checkbox>
                <Link
                  as={NavLink}
                  to="/forgot-password"
                  color="messenger.600"
                  _hover={{ textDecoration: 'none' }}
                >
                  ¿Olvidó su contraseña?
                </Link>
              </Stack>
              <FormControl>
                <Button
                  w="full"
                  colorScheme={'messenger'}
                  _dark={{
                    bg: 'messenger.500',
                    color: 'white',
                    _hover: { bg: 'messenger.700' },
                  }}
                  type="submit"
                  isDisabled={password === '' || correo === ''}
                >
                  Iniciar Sesión
                </Button>
              </FormControl>
              {/* <NavLink to="/register">
                                <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                                    ¿No tiene una cuenta? Regístrese
                                </Text>
                            </NavLink> */}
            </Stack>
          </Box>
        </Flex>
      </HStack>
    </form>
  );

  return content;
};

export default LoginPage;
