export const idValidation = (req, res, next) => {
    if (req.body.id && req.body.id !== req.params.productId) {
        // Si se cumple la condición anterior, responde con un estado 404 (No encontrado)
        // y un mensaje JSON indicando que el producto no puede cambiar su ID.
        res.status(404).json({ msg: 'El ID del producto no puede ser cambiado' });
    } else {
        // Si la condición no se cumple, llama a la siguiente función middleware en la cadena.
        // Esto permite que el flujo de la solicitud continúe.
        next();
    }
}
