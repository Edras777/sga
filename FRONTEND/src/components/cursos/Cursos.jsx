import React, { useEffect } from 'react';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Moment from 'moment';
import { MdFilterList } from 'react-icons/md';
import { CgExport } from 'react-icons/cg';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { AlertEliminar } from './AlertEliminar';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { SpinnerComponent } from '../../helpers/spinner';
import { customStyles } from '../../helpers/customStyles';

import { ModalDetallesCurso } from './ModalDetallesCurso';
import { getCursos, reset } from '../../features/cursoSlice';
import ModalEditarCurso from './ModalEditarCurso';
import ModalAgregarCurso from './ModalAgregarCurso';

const Cursos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { user } = useSelector(state => state.auth);

  const { cursos, isLoading, isError, message } = useSelector(
    state => state.cursos
  );

  if (isError) {
    ToastChakra('Error', message, 'error', 1000);
    console.log(message);
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!user.token) {
      navigate('/login');
    }

    dispatch(getCursos());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const columns = [
    {
      name: 'NOMBRE',
      selector: row => row.nombre,
      sortable: true,
      cellExport: row => row.nombre,
      resizable: true,
    },
    {
      name: 'FECHA CREACIÓN',
      selector: row => Moment(row.createdAt).format('DD/MM/YY - hh:mm:ss A'),
      sortable: true,
      cellExport: row => Moment(row.createdAt).format('DD/MM/YY - hh:mm:ss A'),
      resizable: true,
    },
    {
      name: 'GRADO',
      selector: row => row.grado?.nombre,
      sortable: true,
      cellExport: row => row.grado?.nombre,
      resizable: true,
    },
    {
      name: 'SECCION',
      selector: row => row.seccion?.nombre,
      sortable: true,
      cellExport: row => row.seccion?.nombre,
      resizable: true,
    },
    {
      name: 'DOCENTE',
      selector: row => row.docente?.nombres,
      sortable: true,
      cellExport: row => row.docente?.nombres,
      resizable: true,
    },
    {
      name: 'ACCIONES',
      sortable: true,
      export: false,
      center: true,
      cell: row => (
        <div>
          <ModalDetallesCurso seccion={row} />
          <ModalEditarCurso row={row} />
          <AlertEliminar row={row} />
        </div>
      ),
      width: '220px',
    },
  ];

  const tableData = {
    columns: columns,
    data: cursos,
  };

  createTheme('solarized', {
    text: {
      primary: '#FFF',
      secondary: '#FFF',
      tertiary: '#FFF',
      error: '#FFF',
      warning: '#FFF',
    },
    background: {
      default: '##131516',
      hover: '##131516',
      active: '##131516',
    },
    context: {
      background: '##131516',
      text: '#FFF',
    },
    divider: {
      default: '#FFF opacity 92%',
    },
  });

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
            <ModalAgregarCurso />
          </HStack>
          <HStack spacing={4} direction="row">
            <IconButton
              colorScheme="whatsapp"
              _dark={{
                bg: 'whatsapp.600',
                color: 'white',
                _hover: { bg: 'whatsapp.700' },
              }}
              aria-label="Filters"
              icon={<Icon as={MdFilterList} fontSize="2xl" />}
              variant="ghost"
              rounded="full"
            />
            <IconButton
              colorScheme="messenger"
              _dark={{
                bg: 'messenger.600',
                color: 'white',
                _hover: { bg: 'messenger.700' },
              }}
              aria-label="Exports"
              icon={<Icon as={CgExport} fontSize="xl" />}
              variant="ghost"
              rounded="full"
            />
          </HStack>
        </Stack>
      </Box>
      <Box
        borderRadius="xs"
        overflow="hidden"
        boxShadow={'base'}
        bg="white"
        _dark={{ bg: 'primary.800' }}
        mt={2}
        pt={2}
      >
        <DataTableExtensions
          {...tableData}
          print={false}
          exportHeaders={true}
          filterPlaceholder="BUSCAR"
          numberOfColumns={7}
          fileName={'SECCIONES'}
        >
          <DataTable
            defaultSortField="createdAt"
            defaultSortAsc={false}
            defaultSortOrder="desc"
            pagination={true}
            paginationIconFirstPage={
              <Icon
                as={FiChevronsLeft}
                boxSize={6}
                _dark={{ color: 'gray.300' }}
              />
            }
            paginationIconLastPage={
              <Icon
                as={FiChevronsRight}
                boxSize={6}
                _dark={{ color: 'gray.300' }}
              />
            }
            paginationIconPrevious={
              <Icon
                as={FiChevronLeft}
                boxSize={6}
                _dark={{ color: 'gray.300', _hover: { color: 'white' } }}
              />
            }
            paginationIconNext={
              <Icon
                as={FiChevronRight}
                boxSize={6}
                _dark={{ color: 'gray.300', _hover: { color: 'white' } }}
              />
            }
            paginationRowsPerPageOptions={[5, 10, 25, 50]}
            paginationPerPage={10}
            paginationComponentOptions={{
              rowsPerPageText: 'Filas por pagina:',
              rangeSeparatorText: 'de',
              noRowsPerPage: false,
              selectAllRowsItem: true,
              selectAllRowsItemText: 'Todos',
            }}
            theme={themeTable}
            customStyles={customStyles}
            pointerOnHover={true}
            responsive={true}
            noDataComponent={
              <Text mb={4} fontSize="lg">
                SIN REGISTROS
              </Text>
            }
          />
        </DataTableExtensions>
      </Box>
    </>
  );
};

export default Cursos;
