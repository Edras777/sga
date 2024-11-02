const getMenuFrontEnd = (role) => {
  const menu = [
    {
      titulo: "Inicio",
      icono: "RiHome5Fill",
      path: "/inicio",
    },
    {
      titulo: "Usuarios",
      icono: "FaUsers",
      path: "/usuarios",
    },
    {
      titulo: "Grados",
      icono: "MdGrade",
      path: "/grados",
    },
  ];

  switch (role) {
    case "ADMIN_ROLE":
      menu.push(
        {
          titulo: "Secciones",
          icono: "MdGrade",
          path: "/secciones",
        },
        {
          titulo: "Cursos",
          icono: "MdGrade",
          path: "/cursos",
        },
        {
          titulo: "Estudiantes",
          icono: "RiUserStarFill",
          path: "/estudiantes",
        },
        {
          titulo: "Pagos",
          icono: "MdMonetizationOn",
          path: "/pagos",
        },
        {
          titulo: "Docentes",
          icono: "FaChalkboardTeacher",
          path: "/docentes",
        },
        {
          titulo: "Equipos",
          icono: "RiComputerFill",
          path: "/equipos",
        },
        {
          titulo: "Libros",
          icono: "RiBook3Fill",
          path: "/libros",
        },
        {
          titulo: "Inmobiliarios",
          icono: "MdTableChart",
          path: "/inmobiliarios",
        },
        // {
        //   titulo: "Calificaciones",
        //   icono: "MdScience",
        //   path: "/calificaciones",
        // },
        {
          titulo: "Reportes",
          icono: "FcPieChart",
          path: "/reportes",
        }
      );
      break;
  }

  return menu;
};

module.exports = {
  getMenuFrontEnd,
};
