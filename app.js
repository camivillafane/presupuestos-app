const tablaServicios = document.getElementById("tabla-servicios");
const tbody = tablaServicios.querySelector("tbody");
const btnAgregarServicio = document.getElementById("btn-agregar-servicio");
const totalSpan = document.getElementById("total");
const btnGenerarPDF = document.getElementById("btn-generar-pdf");
const pdfContainer = document.getElementById("pdf");

function calcularTotal() {
    let total = 0;

    const precios = document.querySelectorAll(".servicio-precio");

    precios.forEach((input) => {
        const valor = parseFloat(input.value);
        if (!isNaN(valor)) {
            total += valor;
        }
    });

    totalSpan.textContent = `$${total.toFixed(2)}`;
}

function crearFilaServicio() {
    const tr = document.createElement("tr");
    tr.classList.add("fila-servicio");

    tr.innerHTML = `
        <td><input type="text" class="servicio-descripcion" placeholder="Descripcion del servicio"></td>
        <td><input type="number" class="servicio-precio" placeholder="0" min="0" step="0.01"></td>
        <td><button type="button" class="btn-eliminar">X</button></td>
    `;

    const inputPrecio = tr.querySelector(".servicio-precio");
    inputPrecio.addEventListener("input", calcularTotal);

    const btnEliminar = tr.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", () => {
        if (tbody.children.length > 1) {
            tr.remove();
            calcularTotal();
        }
    })

    return tr;
    
}

btnAgregarServicio.addEventListener("click", () => {
    const filaNueva = crearFilaServicio();
    tbody.appendChild(filaNueva);
});

document.querySelectorAll(".servicio-precio").forEach((input) => {
    input.addEventListener("input", calcularTotal);
});

calcularTotal();

btnGenerarPDF.addEventListener("click", () => {
    pdfContainer.innerHTML = "";

    const nombre = document.getElementById("cliente-nombre").value;
    const email = document.getElementById("cliente-email").value;
    const telefono = document.getElementById("cliente-telefono").value;
    const direccion = document.getElementById("cliente-direccion").value;
    const fechaValidez = document.getElementById("fecha-validez").value;

    let filasServicios = "";
    tbody.querySelectorAll("tr").forEach((fila) => {
        const descrip = fila.querySelector(".servicio-descripcion").value;
        const precio = fila.querySelector(".servicio-precio").value || 0;

        filasServicios += `
            <tr>
                <td>${descrip}</td>
                <td>$${parseFloat(precio).toFixed(2)}</td>
            </tr>
        `;
    });

    pdfContainer.innerHTML = `
        <div style="font-family: Arial; padding: 20px;">
            <h1>Presupuesto</h1>

            <h3>Datos del Cliente</h3>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Dirección:</strong> ${direccion}</p>

            <h3>Servicios</h3>
            <table width="100%" border="1" cellspacing="0" cellpadding="7">
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    ${filasServicios}
                </tbody>
            </table>

            <h2>Total: ${totalSpan.textContent}</h2>
            <p><strong>Presupuesto válido hasta:</strong> ${fechaValidez}</p>
        </div>
    `;

    pdfContainer.style.display = "block";

    html2pdf()
        .from(pdfContainer)
        .set({
            margin: 10,
            filename: "presupuesto.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        })
        .save()
        .then(() => {
            pdfContainer.style.display = "none";
        });
});
