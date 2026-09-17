
// ==========================================
// PRODUCTOS SELECCIONADOS
// ==========================================

let productosSeleccionados = [];



// ==========================================
// ELEMENTOS HTML
// ==========================================

const productos =
    document.querySelectorAll(".product");

const summaryItems =
    document.getElementById("summaryItems");

const totalElemento =
    document.getElementById("total");

const cantidadProductos =
    document.getElementById("cantidadProductos");



// ==========================================
// SELECCIONAR PRODUCTO
// ==========================================

productos.forEach(function(producto) {

    producto.addEventListener("click", function() {


        const nombre =
            producto.dataset.nombre;


        const precio =
            parseFloat(producto.dataset.precio);


        const imagen =
            producto.dataset.imagen;



        // Buscar si ya existe

        const productoExistente =
            productosSeleccionados.find(
                function(item) {

                    return item.nombre === nombre;

                }
            );



        // Si ya existe aumenta la cantidad

        if (productoExistente) {

            productoExistente.cantidad++;

        }

        // Si no existe lo agrega

        else {

            productosSeleccionados.push({

                nombre: nombre,

                precio: precio,

                imagen: imagen,

                cantidad: 1

            });

        }



        // Marcar producto

        producto.classList.add("selected");


        // Actualizar resumen

        actualizarSolicitud();

    });

});



// ==========================================
// ACTUALIZAR SOLICITUD
// ==========================================

function actualizarSolicitud() {


    summaryItems.innerHTML = "";


    let total = 0;

    let cantidadTotal = 0;



    // ======================================
    // CARRITO VACÍO
    // ======================================

    if (productosSeleccionados.length === 0) {

        summaryItems.innerHTML = `

            <p class="empty">

                Selecciona los productos que deseas cotizar.

            </p>

        `;


        totalElemento.textContent = "$0";

        cantidadProductos.textContent = "0";


        return;

    }



    // ======================================
    // MOSTRAR PRODUCTOS
    // ======================================

    productosSeleccionados.forEach(
        function(producto, index) {


            const subtotal =
                producto.precio *
                producto.cantidad;


            total += subtotal;


            cantidadTotal +=
                producto.cantidad;



            const item =
                document.createElement("div");


            item.classList.add("summary-item");



            item.innerHTML = `

                <div class="summary-product">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                    >

                    <div>

                        <strong>
                            ${producto.nombre}
                        </strong>

                        <span>
                            $${producto.precio.toFixed(2)}
                        </span>

                    </div>

                </div>


                <div class="summary-actions">

                    <button
                        class="quantity-btn"
                        onclick="disminuirCantidad(${index})"
                    >
                        -
                    </button>


                    <strong>
                        ${producto.cantidad}
                    </strong>


                    <button
                        class="quantity-btn"
                        onclick="aumentarCantidad(${index})"
                    >
                        +
                    </button>


                    <button
                        class="delete-btn"
                        onclick="eliminarProducto(${index})"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>


                <strong class="subtotal">

                    $${subtotal.toFixed(2)}

                </strong>

            `;


            summaryItems.appendChild(item);

        }
    );



    // ======================================
    // MOSTRAR TOTAL
    // ======================================

    totalElemento.textContent =
        "$" + total.toFixed(2);


    cantidadProductos.textContent =
        cantidadTotal;

}



// ==========================================
// AUMENTAR CANTIDAD
// ==========================================

function aumentarCantidad(index) {

    productosSeleccionados[index].cantidad++;

    actualizarSolicitud();

}



// ==========================================
// DISMINUIR CANTIDAD
// ==========================================

function disminuirCantidad(index) {


    if (
        productosSeleccionados[index].cantidad > 1
    ) {

        productosSeleccionados[index].cantidad--;

    }

    else {

        eliminarProducto(index);

        return;

    }


    actualizarSolicitud();

}



// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function eliminarProducto(index) {


    const nombre =
        productosSeleccionados[index].nombre;


    productosSeleccionados.splice(index, 1);



    // Quitar selección visual

    productos.forEach(function(producto) {

        if (
            producto.dataset.nombre === nombre
        ) {

            producto.classList.remove("selected");

        }

    });



    actualizarSolicitud();

}



// ==========================================
// BUSCADOR
// ==========================================

const buscador =
    document.getElementById("buscarProducto");


buscador.addEventListener("input", function() {


    const texto =
        buscador.value.toLowerCase().trim();



    productos.forEach(function(producto) {


        const nombre =
            producto.dataset.nombre.toLowerCase();


        const descripcion =
            producto
                .querySelector("p")
                .textContent
                .toLowerCase();



        if (
            nombre.includes(texto) ||
            descripcion.includes(texto)
        ) {

            producto.style.display = "";

        }

        else {

            producto.style.display = "none";

        }

    });

});



// ==========================================
// ENVIAR SOLICITUD
// ==========================================

const btnEnviar =
    document.getElementById("btnEnviar");


btnEnviar.addEventListener("click", function() {


    if (
        productosSeleccionados.length === 0
    ) {

        alert(
            "Selecciona al menos un producto."
        );

        return;

    }



    const nombre =
        document.getElementById("nombre").value;


    const empresa =
        document.getElementById("empresa").value;


    const notas =
        document.getElementById("notas").value;



    // Crear solicitud

    const solicitud = {

        cliente: nombre,

        empresa: empresa,

        notas: notas,

        productos: productosSeleccionados,

        fecha: new Date().toLocaleString(),

        total: productosSeleccionados.reduce(
            function(total, producto) {

                return total +
                    producto.precio *
                    producto.cantidad;

            },
            0
        )

    };



    // Guardar solicitud

    localStorage.setItem(
        "solicitudTecnoSell",
        JSON.stringify(solicitud)
    );



    alert(
        "Solicitud de cotización enviada correctamente."
    );



    // Limpiar selección

    productosSeleccionados = [];


    productos.forEach(function(producto) {

        producto.classList.remove("selected");

    });


    actualizarSolicitud();

});

