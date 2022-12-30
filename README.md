# frontend_pagosApi_EU7

## Observaciones
* cambair url raiz en la funcion del archivo `session.js` y `login.js`
```js
// url raiz 'http://127.0.0.1:5500'
function relativeToAbsolute(relativeURL) {
    return new URL(relativeURL, 'http://127.0.0.1:5500').href;
}
```

## Requerimientos
1. Login
    * Vista para el ingreso de los usuarios, este debe ser con email y contraseña.

    * Guardar token en local storage y únicamente mostrar la vista de login si es que el token no existe o es nulo.

    * Si el usuario no está logueado no tendrá acceso a las otras vistas.
2. Vista principal
    + Navbar con links a la vista principal y para añadir un nuevo pago. Administrador: Link a servicios
        * Lista de pagos realizados, cada card o ítem debe contener la siguiente información:
        * Logo del servicio
        * Nombre del servicio
        * Fecha de pago
        * Monto
    + Lista de pagos vencidos, cada card o item debe contener la siguiente información:
        * Logo del servicio
        * Nombre del servicio
        * Fecha de pago
        * Monto
        * Penalidad
3. Vista para añadir un nuevo pago
    + Debe contener un forms con los siguientes campos :  

        * Fecha de vencimiento
        * Servicio (lista desplegable)
        * Monto
        * Tomar en cuenta que la fecha de pago al momento de realizar el post, debe ser la fecha actual.

4. Vista de servicios(únicamente para el administrador)
    * Forms de creación de un nuevo servicio:

    * Forms de modificación de un servicio:

