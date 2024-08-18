export function roleValidation(roles) {
    return async (req, res, next) => {
        const { role } = req.user;
        const authorized = roles.includes(role);

        if (authorized) {
            console.log("Usuario autorizado:", role);
            next();
        } else {
            console.log("Usuario no autorizado para los roles:", roles);
            res.status(403).send("Acceso denegado: Usuario no autorizado");
        }
    }
}