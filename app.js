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
    const fechaValidezInput = document.getElementById("fecha-validez").value;

    let fechaFormato = "-";
    if (fechaValidezInput) {
        const fecha = new Date(fechaValidezInput);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        fechaFormato = `${dia}-${mes}-${anio}`;
    }

    let filasServicios = "";
    tbody.querySelectorAll("tr").forEach((fila) => {
        const descrip = fila.querySelector(".servicio-descripcion").value;
        const precio = fila.querySelector(".servicio-precio").value || 0;

        filasServicios += `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${descrip}</td>
                <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right;">$${parseFloat(precio).toFixed(2)}</td>
            </tr>
        `;
    });

    pdfContainer.innerHTML = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #000; background: #ffffff; padding: 40px; line-height: 1.6;">
            
            <div style="border-bottom: 3px solid #000; padding-bottom: 20px; margin-bottom: 20px;">
                <h2 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">PILAR GOMEZ</h2>
                <p style="margin: 5px 0; font-size: 14px; color: #555;">Servicio de Pinturas</p>
                <p style="margin: 5px 0; font-size: 12px; color: #777;">Julio C. Gómez | Cel: 3454 12 5296 | julioc.gomez@hotmail.com</p>
            </div>

            <h1 style="text-align: center; font-size: 32px; margin: 0 0 30px 0; font-weight: 700;">Presupuesto</h1>

            <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin-bottom: 15px; background: #fafafa;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; color: #333;">Datos del Cliente</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="margin: 0 0 6px 0; font-size: 12px; color: #777; font-weight: 500;">NOMBRE</p>
                        <p style="margin: 0; font-size: 14px; color: #000; font-weight: 500;">${nombre || '-'}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 6px 0; font-size: 12px; color: #777; font-weight: 500;">EMAIL</p>
                        <p style="margin: 0; font-size: 14px; color: #000; font-weight: 500;">${email || '-'}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 6px 0; font-size: 12px; color: #777; font-weight: 500;">TELÉFONO</p>
                        <p style="margin: 0; font-size: 14px; color: #000; font-weight: 500;">${telefono || '-'}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 6px 0; font-size: 12px; color: #777; font-weight: 500;">DIRECCIÓN</p>
                        <p style="margin: 0; font-size: 14px; color: #000; font-weight: 500;">${direccion || '-'}</p>
                    </div>
                </div>
            </div>

            <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin-bottom: 15px; background: #fafafa;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; color: #333;">Servicios</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid #000;">
                            <th style="padding: 10px; text-align: left; font-weight: 600; font-size: 13px; color: #000;">Descripción</th>
                            <th style="padding: 10px; text-align: right; font-weight: 600; font-size: 13px; color: #000;">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filasServicios}
                    </tbody>
                </table>
            </div>

            <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin-bottom: 15px; background: #fafafa;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="margin: 0; font-size: 18px; font-weight: 600;">Total a pagar</h2>
                    <h2 style="margin: 0; font-size: 28px; font-weight: 700; color: #000;">${totalSpan.textContent}</h2>
                </div>
            </div>

            <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background: #fafafa;">
                <p style="margin: 0; font-size: 12px; color: #777; font-weight: 500;">PRESUPUESTO VÁLIDO HASTA</p>
                <p style="margin: 6px 0 0 0; font-size: 16px; color: #000; font-weight: 600;">${fechaFormato}</p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999;">
                <p style="margin: 0;">Documento generado automáticamente | PILAR GOMEZ Servicios de Pintura</p>
            </div>
        </div>
    `;

    pdfContainer.style.setProperty('display', 'block', 'important');
    pdfContainer.style.setProperty('background', '#ffffff', 'important');

    html2pdf()
        .from(pdfContainer)
        .set({
            margin: [10, 10, 10, 10],
            filename: "presupuesto.pdf",
            html2canvas: { scale: 2, useCORS: true, scrollY: 0, windowHeight: 1400 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        })
        .save()
        .then(() => {
            pdfContainer.style.setProperty('display', 'none', 'important');
        });
});
