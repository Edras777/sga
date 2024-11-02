import React, { useEffect, useState } from 'react';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Select,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { SpinnerComponent } from '../../helpers/spinner';
import { customStyles } from '../../helpers/customStyles';

import moment from 'moment';
import { FaArrowLeft } from 'react-icons/fa';
import { CgEyeAlt } from 'react-icons/cg';
import {
  getCalificacionByStudent,
  reset,
} from '../../features/estudianteSlice';
import ModalRegistrarCalificacion from './ModalRegistrarCalificacion';

const CalificacionEstudiante = ({ location }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const idGrado = searchParams.get('grado');

  const themeTable = useColorModeValue('default', 'solarized');

  const { user } = useSelector(state => state.auth);

  const { calificaciones, isLoading, isError, message } = useSelector(
    state => state.estudiantes
  );

  const [tableRowsData, setTableRowsData] = useState(calificaciones);

  const params = useParams(location);

  const listAnios = [
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: 'all', label: 'TODOS' },
  ];

  const handleClickFilterAnio = async data => {
    console.log(data);
    if (data === 'all') {
      setTableRowsData(calificaciones);
    } else {
      const dataFilter = calificaciones.filter(row => row.ciclo === data);
      setTableRowsData(dataFilter);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (isError) {
      console.log(message);
      ToastChakra('Error', message, 'error', 1000);
    }

    dispatch(getCalificacionByStudent(params.id)).then(data => {
      setTableRowsData(data.payload);
    });

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch, params.id]);

  const columns = [
    {
      name: 'CURSO',
      selector: row => row.curso.nombre,
      sortable: true,
      cellExport: row => row.curso.nombre,
      resizable: true,
    },
    {
      name: 'CICLO',
      selector: row => row.ciclo,
      sortable: true,
      cellExport: row => row.ciclo,
      resizable: true,
      wrap: true,
    },
    {
      name: 'B1',
      selector: row => row.primer_bimestre,
      sortable: true,
      cellExport: row => row.primer_bimestre,
      resizable: true,
    },
    {
      name: 'B2',
      selector: row => row.segundo_bimestre,
      sortable: true,
      cellExport: row => row.segundo_bimestre,
      resizable: true,
    },
    {
      name: 'B3',
      selector: row => row.tercer_bimestre,
      sortable: true,
      cellExport: row => row.tercer_bimestre,
      resizable: true,
    },
    {
      name: 'B4',
      selector: row => row.cuarto_bimestre,
      sortable: true,
      cellExport: row => row.cuarto_bimestre,
      resizable: true,
    },
    {
      name: 'B5',
      selector: row => row.quinto_bimestre,
      sortable: true,
      cellExport: row => row.quinto_bimestre,
      resizable: true,
    },
    {
      name: 'PROMEDIO',
      selector: row => row.promedio,
      sortable: true,
      cellExport: row => row.promedio,
      resizable: true,
    },

    {
      name: 'ACCIONES',
      export: false,
      center: true,
      cell: row => (
        <div>
          <Link
            to={{
              pathname: '/pagos/' + row._id,
            }}
          >
            <Tooltip hasArrow label="Ver Detalles" placement="auto">
              <IconButton
                aria-label="Ver"
                icon={<CgEyeAlt />}
                fontSize="2xl"
                _dark={{ color: 'white', _hover: { bg: 'blue.800' } }}
                colorScheme="blue"
                variant={'ghost'}
              />
            </Tooltip>
          </Link>
        </div>
      ),
    },
  ];

  const tableData = {
    columns: columns,
    data: tableRowsData,
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
      default: '#1e1e1e',
      hover: '#131516',
      active: '#131516',
    },
    context: {
      background: '#1e1e1e',
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
              Calificaciones del Estudiante Seleccionado
            </Text>
          </HStack>
        </Stack>
      </Box>
      <Box
        borderRadius="xs"
        boxShadow="base"
        overflow="hidden"
        bg="white"
        _dark={{ bg: 'primary.800' }}
        mt={2}
      >
        <Stack spacing={4} direction="row" justifyContent="space-between" p={4}>
          <HStack spacing={4} direction="row">
            <ModalRegistrarCalificacion
              estudiante={params.id}
              grado={idGrado}
            />
          </HStack>
          <HStack spacing={4} direction="row">
            <Select
              placeholder="Seleccionar Ciclo"
              onChange={e => handleClickFilterAnio(e.target.value)}
              defaultValue={listAnios[5].value}
            >
              {listAnios.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
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
          fileName={'HISTORIAL_PAGOS' + moment().format('DD_MM_YYYY HH:mm:ss')}
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

export default CalificacionEstudiante;
