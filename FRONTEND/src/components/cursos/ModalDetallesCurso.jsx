import React, { useState, useRef } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Button,
  Stack,
  Text,
  Divider,
  Tooltip,
} from '@chakra-ui/react';
import { CgEyeAlt } from 'react-icons/cg';

import Moment from 'moment';

export const ModalDetallesCurso = ({ seccion }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const btnRef = useRef();

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  return (
    <>
      <Tooltip hasArrow label="Ver Detalles" placement="auto">
        <IconButton
          aria-label="Ver"
          icon={<CgEyeAlt />}
          fontSize="xl"
          _dark={{ color: 'white', _hover: { bg: 'blue.800' } }}
          colorScheme="blue"
          variant={'ghost'}
          onClick={handleOpenDrawer}
          ml={2}
        />
      </Tooltip>
      <Drawer
        isOpen={isOpenDrawer}
        placement="bottom"
        onClose={handleCloseDrawer}
        finalFocusRef={btnRef}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent _dark={{ bg: 'primary.800' }}>
          <DrawerHeader
            fontWeight="bold"
            bg="blue.600"
            color="gray.200"
            textAlign="center"
          >
            INFORMACIÓN DEL CURSO SELECCIONADO
          </DrawerHeader>
          <DrawerBody>
            <Stack direction="column" mt={6} px={[0, 10, 40, 60]}>
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <Text fontWeight="bold">ID:</Text>
                <Text>{seccion?._id}</Text>
              </Stack>
              <Divider />
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <Text fontWeight="bold">NOMBRE:</Text>
                <Text>{seccion?.nombre}</Text>
              </Stack>
              <Divider />
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <Text fontWeight="bold">DESCRIPCIÓN:</Text>
                <Text>{seccion?.descripcion}</Text>
              </Stack>
              <Divider />
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <Text fontWeight="bold">GRADO:</Text>
                <Text>{seccion?.grado?.nombre}</Text>
              </Stack>
              <Divider />
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <Text fontWeight="bold">SECCION:</Text>
                <Text>{seccion?.seccion?.nombre}</Text>
              </Stack>
              <Divider />
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <Text fontWeight="bold">DOCENTE:</Text>
                <Text>{seccion?.docente?.nombres}</Text>
              </Stack>
              <Divider />
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <Text fontWeight="bold">FECHA CREACIÓN:</Text>
                <Text>
                  {Moment(seccion?.createdAt).format('DD/MM/YY - hh:mm:ss A')}
                </Text>
              </Stack>
              <Divider />
            </Stack>
          </DrawerBody>

          <DrawerFooter
            w="full"
            justifyContent="center"
            textAlign="center"
            alignItems="center"
            display="flex"
          >
            <Button
              colorScheme="blue"
              _dark={{
                bg: 'blue.600',
                color: 'white',
                _hover: { bg: 'blue.700' },
              }}
              size="lg"
              onClick={handleCloseDrawer}
              borderRadius="none"
            >
              OK
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
