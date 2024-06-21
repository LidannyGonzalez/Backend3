// Exporta una función llamada 'idValidation' que actúa como middleware para validar el ID del producto en una solicitud.
export const idValidation = (req, res, next) => {
    // Comprueba si el cuerpo de la solicitud (req.body) contiene una propiedad 'id'
    // y si ese 'id' es diferente del 'id' presente en los parámetros de la URL (req.params.productId).
    if (req.body.id && req.body.id !== req.params.productId) {
        // Si se cumple la condición anterior, responde con un estado 404 (No encontrado)
        // y un mensaje JSON indicando que el producto no puede cambiar su ID.
        res.status(404).json({ msg: 'Product cannot change ID 🚫' });
    } else {
        // Si la condición no se cumple, llama a la siguiente función middleware en la cadena.
        // Esto permite que el flujo de la solicitud continúe.
        next();
    }
}
