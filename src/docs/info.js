export const info = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API de Usuarios", // Cambia el título a algo relevante
        version: "1.0.0",
        description: "API para la gestión de usuarios",
      },
      servers: [
        {
          url: "http://localhost:8080", // URL base de tu servidor
        },
      ],
    },
    apis: ["./src/docs/*.yml"], // Aquí incluyes los archivos yml
  };
  