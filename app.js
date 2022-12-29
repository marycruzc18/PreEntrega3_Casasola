const stockProductos = [
    { 
        id: 1, 
        nombre: "Anillo", 
        cantidad:1,
        precio: 2000,
        img: "./assets/images/anillo_2.jpg"

  },
  {  
        id: 2, 
        nombre: "Lentes", 
        cantidad:1,
        precio: 2500,
        img: "./assets/images/lentes_2.jpg"

   },
   { 
        id: 3, 
        nombre: "Aros", 
        cantidad:1,
        precio: 3000,
        img: "./assets/images/zarcillos_3.jpg"

   },
    {
        id: 4, 
        nombre: "Pulsera", 
        cantidad:1,
        precio: 3500,
        img: "./assets/images/pulsera_2.jpg"

   },  
   { 
        id: 5, 
        nombre: "Anillo Reina", 
        cantidad:1,
        precio: 3800,
        img: "./assets/images/anillo_4.jpg"

   },
   { 
        id: 6, 
        nombre: "Cadena", 
        cantidad:1,
        precio: 4500,
        img: "./assets/images/cadena_3.jpg"

   },
]

let carrito = []

const contenedor = document.querySelector('#contenedor')
const carritoContenedor = document.querySelector('#carritoContenedor')
const vaciarCarrito = document.querySelector('#vaciarCarrito')
const precioTotal = document.querySelector('#precioTotal')

document.addEventListener('DOMContentLoaded', () =>{
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito()
})

stockProductos.forEach((prod) => {
    const {id,nombre,cantidad,precio,img} = prod
    contenedor.innerHTML += `

           <div class="col-12 col-lg-4 col-md-6">
            <div class="card mt-3" style="width: 18rem;">
                <img class="card-img-top mt-2" src="${img}" alt="Anillo">
                <div class="card-body card-p">
                  <h5 class="card-title">${nombre}</h5>
                  <p class="card-text">Precio: ${precio}</p>
                  <p class="card-text">Cantidad: ${cantidad}</p>

                  <button onclick="agregarProducto(${id})" class="btn btn_principal">Agregar al Carrito</button>
                </div>
              </div>
            </div>
    
    `
})

vaciarCarrito.addEventListener('click', () => {
    carrito.length = []
    mostrarCarrito()
})


function agregarProducto(id){

    const existeProducto = carrito.some(prod => prod.id === id)

    if(existeProducto){
        const prod = carrito.map(prod => {
            if(prod.id === id){
                prod.cantidad++
            }
            
        })
    }else{
                const item = stockProductos.find((prod) => prod.id === id)
                carrito.push(item)
            }
       
    

   
    mostrarCarrito()

}

const mostrarCarrito = () => {
    const modalBody = document.querySelector('.modal .modal-body')
    
    modalBody.innerHTML= ''
    carrito.forEach((prod)=>{
        const {id,nombre,img,cantidad,precio} =prod
        modalBody.innerHTML +=` 
        <div class= "modal-contenedor"> 
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>

        <div> 
        <p> Producto: ${nombre}</p>
        <p> Precio: ${precio}</p>
        <p> Cantidad: ${cantidad}</p>

        <button onclick= "eliminarProducto(${id})"  class="btn btn-danger">Eliminar</button>
        </div>
        
        </div>
        `
    })

    if(carrito.length === 0){
        modalBody.innerHTML = `
        <p class="text-center  parrafo"> ¡Aún no agregaste nada al carrito! </p>
        
        `
    }


    carritoContenedor.textContent = carrito.length

    precioTotal.textContent = carrito.reduce((acumulador, prod) => acumulador + prod.cantidad * prod.precio,0)

    guardarStorage()
}




function eliminarProducto(id){
    const eliminoId = id
    carrito = carrito.filter((elimino) => elimino.id !== eliminoId)
    mostrarCarrito()
}

function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}
