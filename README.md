# Licify

Este Proyecxto fue realizado con [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Instrucciones

- Clonar el proyecto
- Ejecutar npm install

### Despliegue

El Proyecto debe desplegarse usando npm start y se inicia en el nagador en: http://localhost:4200/

### Funcionamiento

- El Home esta vacïo, por ende debemos dar click en el boton con ïcono de persona en la parte superior derecha
- Estando allï, podemos iniciar sesiön o registrarnos (constructor, provedor)
- Al iniciar sesión, podemos cerrarla dando click en la parte superior derecha, donde esta el nombre de usuario
- Al registrarme, puedo seleccionar entre constructor o proveedor, y seremos re dirigidos a /login

- Constructor
  - Debemos dar click en Proyectos, donde encontraremos los proyectos creados
  - En el button FAB de la parte inferior derecha, podemos crear proyectos
  - Al crear proyectos se visualizará en cards los proyectos creados con una cover image (Falto desarrollo de imágenes)
  - Los proyectos creados inician con un estado "archivado" lo que quiere decir que no está publicado para los proveedores
  - Al crear un proyecto, se debe colocar el nombre, el rango de fechas (inicio - fin), se añaden items con un nombre y un valor dandfo click en el icono de +.
  - Los proyectos tienen las siguientes opciones
    - En todas las opciones visualizaremos los datos del Proyecto y en la tabla Items, podremos ver los items con el valor incial asignado por el constructor y las propuestas recibidas por cada provedor en cada item
    - Ver (Todos los proyectos)
    - Editar (Los proyectos que no han sido asignados a un proveedor)
    - Archivar/Publicar (Los proyectos que no han sido asignados a un proveedor)
  - Al editar un Proyecto, si este tiene propuestas, podre seleccionar a 1 proveedor para el Proyecto
  - Al editar un Proyecto, puedo editar y eliminar (solo si no se han recibido propuestas de algún proveedor) items, 

- Proveedor
  - Al iniciar sesión como proveedor, debemos dar click en proyectos en el navbar
  - En Proyectos podremos visualizar 3 categorïas:
    - Proyectos Nuevos (Proyectos Publicados por el Constructor, en los que el proveedor no tiene propuestas)
    - Proyectos Aplicados (Proyectos en lo que el proveedor ha hecho propuestas)
    - Proyectos Asignados (Proyectos en los que el constructor eligió al Proveedor como su proveedor)
  - En cada categoría se visualizan, en la parte derecha, las acciones (Ver) para los proyectos
  - Al dar click, en el icono de ojo, visualizaremos los detalles del proyecto y los items con el valor unitario asignado por el Constructor
    - Si es un proyecto nuevo podemos dar click en el boton con icono + de cada item para añadir una propuesta de ese item que podremos visualizar en tiempom real
    - Si es un proyecto aplicado, puedo editar la propuesta realizada en cada item, pero solo puedo ver las propuestas realizadas por el proveedor logueado
    - Si es un proyecto asignado, solo puedo visualizar los detalles de cada Proyecto y los items con el valor incial del constructor y la propuesta realizada por el proveedor logueado
  - Al añadir items, estos no son guardados directamente, se debe guardar (Guardar Y Aplicar) para almacenar la propuesta

### Faltantes de los requisitos y considerados importantes por mi

- Cargar imágenes y asignarlas al Proyecto
- Animaciones en algunas partes
- Validaciones en algunos formularios
- Diseño Responsive
- Pruebas
- Documentación