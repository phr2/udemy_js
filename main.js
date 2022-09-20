

//agrego este comentariossss
const todos = JSON.parse (localStorage.getItem('todos')) || []; //creamos un array vacío en donde guardar la info que ingrese el usuario, al poner localStorage.getItems estamos queriendo buscar los todos en el localstorage pero si no los encuentra va a utilizar un arreglo vacío si no los encuentra, pero ojo que son string, entonces para transformarlo en Arreglo usamos JSON.parse
const render = () => {
    const todoList = document.getElementById('todo-list');
    /* TODO LO SIGUIENTE LO REEMPLAZAMOS X UN .MAP
    todoList.innerHTML = ''; /*esto es para que no se dupliquen los ingresos anteriores al seguir ingresando elementos x usuario, eliminamos por completo el inner HTML x completo
    for(let i=0; i< todos.length; i++) {
        todoList.innerHTML += '<li>' + todos[i] + '</li>'; /* agregamos los elementos y concatenamos para armar el html x cada indice i
    }
    */
    const todosTemplate = todos.map (t =>  '<li>' + t + '</li>');/*t es el elementos que vamos a iterar, y esta funcion map va a iterar tantas veces t haya, es decir tantas entradas haga el usuario, o sea tantas t haya en el array y nos va a devolver un nuevo array de la misma longitud que el array todos //que retorne una concatenación para poder transformarlo en un string*/
    
    /*lo que estamos haciendo con map es pedir que a todos los elementos t los estamos concatenando  dentro de un li, ahora sí; agregamos esto a nuestro listado*/
    todoList.innerHTML = todosTemplate.join(''); /*acá lo que estamos haciendo es agregar a nuestro listadopero como es un array usamos el .join que lo que hace es tomar todos los elementos de un array y juntarlo mediante lo que indiquemos dentro de los paréntesis, en este caso un string vacio y esa concatenacion la vamos a incorporar a el innerHTML de nuestro todoList*/
    const elementos = document.querySelectorAll('#todo-list li') //queremos todos los elementos de un listado todo list y lo guardamos en una constante que creo llamada elementos
    elementos.forEach ( (elemento, i /*elemento que iteramos li y un índice i*/) => {
        //agregamos un evento click para que se ejecute algo
        elemento.addEventListener('click', () => {
            //eliminamos el elemnto html al hacer click
            elemento.parentNode.removeChild(elemento)
            //pero si luego de borrar un elemento agregamos otro, van a volver a aparecer porque todavía no hemos borrado del arreglo los elementos, para eso llamamos a splice indicando el indice del elemento y la cantidad de elementos a borrar:
            todos.splice(i, 1);
            actualizaTodos(todos);
            render ()/*llamamos a la funcion de render siempre y cuando nosotros borremos una entrada, con esto hacemos que se modifique el índice al borrar entradas, al llamar a la función dentro de la función se llama recursividad, con eso actualizamos el índice que sin el render no se actualizaba*/
        })  
       
    })
}
const actualizaTodos = (todos) => {
    const todoStrings = JSON.stringify(todos) //lo transformamos en string y lo guardamos en una constante
    localStorage.setItem('todos', todoStrings) //reemplazamos todos los todos
} //funcion creada para actualizar los Todos

window.onload = () => {
    render() //una vez que abra, tratará de renderizar todos los elementos dentro de nuestros todos
    const form = document.getElementById('todo-form'); /*tomamos nuestro formulario, obtenemos la referencia de nuestro form y lo guardamos una referencia del formulario en const form*/
    form.onsubmit = (e) => { //reemplazamos la funcion que este tenia en onsubmit
        e.preventDefault();  //para prevenir que se refresque la página
        const todo = document.getElementById('todo'); /*llamamos (vamos) la referencia todo, al campo todo*/
        const todoText = todo.value; /*llamamos al texto y sacamos el valor que este tiene y lo guardamos en una const todoText*/
        todo.value = ''; /*luego reemplazamos su valor por un string vacio */
        todos.push(todoText);//agregamos al array lo ingresado x usuario
        /*ahora construimos con la instrucción de for un HTML en donde incorporamos esta informacion guardada en el array*/
        actualizaTodos(todos);
        render ()
            
              }
    
}
//ahora por mas que actualizemos la página los datos siguen estando