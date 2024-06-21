// Importa el módulo 'express-handlebars'
import exphbs from 'express-handlebars';

// Crea una instancia de Handlebars con opciones de configuración específicas
const hbs = exphbs.create({
  // Configura las opciones de tiempo de ejecución de Handlebars
  runtimeOptions: {
    // Permite el acceso a propiedades prototipo por defecto
    allowProtoPropertiesByDefault: true,
    // Permite el acceso a métodos prototipo por defecto
    allowProtoMethodsByDefault: true,
  }
});

// Exporta la configuración de Handlebars para su uso en otras partes de la aplicación
export default hbs;
