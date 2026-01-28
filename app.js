const listaServicios = document.getElementById("lista-servicios");
const btnAgregarServicio = document.getElementById("btn-agregar-servicio");
const totalInput = document.getElementById("total-input");
const btnGenerarPDF = document.getElementById("btn-generar-pdf");
const pdfContainer = document.getElementById("pdf");
const fechaActualInput = document.getElementById("fecha-actual");

const hoy = new Date();
const año = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, '0');
const día = String(hoy.getDate()).padStart(2, '0');
fechaActualInput.value = `${año}-${mes}-${día}`;

function crearItemServicio() {
    const div = document.createElement("div");
    div.classList.add("servicio-item");

    div.innerHTML = `
        <input type="text" class="servicio-descripcion" placeholder="Descripción del servicio">
        <button type="button" class="btn-eliminar-servicio">X</button>
    `;

    const btnEliminar = div.querySelector(".btn-eliminar-servicio");
    btnEliminar.addEventListener("click", () => {
        if (listaServicios.children.length > 1) {
            div.remove();
        }
    });

    return div;
}

btnAgregarServicio.addEventListener("click", () => {
    const itemNuevo = crearItemServicio();
    listaServicios.appendChild(itemNuevo);
});

btnGenerarPDF.addEventListener("click", () => {
    pdfContainer.innerHTML = "";

    const nombre = document.getElementById("cliente-nombre").value;
    const direccion = document.getElementById("cliente-direccion").value;
    const fechaActual = document.getElementById("fecha-actual").value;
    const fechaValidezInput = document.getElementById("fecha-validez").value;
    const totalValor = document.getElementById("total-input").value || "0";

    let fechaActualFormato = "-";
    if (fechaActual) {
        const [año, mes, día] = fechaActual.split('-');
        fechaActualFormato = `${día}-${mes}-${año}`;
    }

    let fechaValidezFormato = "-";
    if (fechaValidezInput) {
        const [año, mes, día] = fechaValidezInput.split('-');
        fechaValidezFormato = `${día}-${mes}-${año}`;
    }

    let filasServicios = "";
    listaServicios.querySelectorAll(".servicio-item").forEach((item) => {
        const descrip = item.querySelector(".servicio-descripcion").value;

        if (descrip.trim()) {
            filasServicios += `
                <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${descrip}</td>
                </tr>
            `;
        }
    });

    pdfContainer.innerHTML = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #000; background: #ffffff; padding: 20px; line-height: 1.6;">
            
            <div style="border-bottom: 3px solid #000; padding-bottom: 10px; margin-bottom: 10px; display: flex; align-items: center; gap: 15px;">
                <img src="logo.png" alt="Logo" style="width: 60px; height: 60px; object-fit: contain;">
                <div>
                    <h2 style="margin: 0 0 3px 0; font-size: 20px; font-weight: 600;">PILAR GOMEZ</h2>
                    <p style="margin: 2px 0; font-size: 12px; color: #555;">Servicio de Pinturas</p>
                    <p style="margin: 2px 0; font-size: 11px; color: #777;">Julio C. Gómez | Cel: 3454 12 5296 | julio.c.gomez@hotmail.com</p>
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h1 style="font-size: 28px; margin: 0; font-weight: 700;">Presupuesto</h1>
                <div style="text-align: right;">
                    <p style="margin: 0; font-size: 11px; color: #777; font-weight: 500;">FECHA</p>
                    <p style="margin: 3px 0 0 0; font-size: 14px; color: #000; font-weight: 600;">${fechaActualFormato}</p>
                </div>
            </div>

            <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; margin-bottom: 10px; background: #fafafa;">
                <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; color: #333;">Datos del Cliente</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: #777; font-weight: 500;">NOMBRE</p>
                        <p style="margin: 0; font-size: 13px; color: #000; font-weight: 500;">${nombre || '-'}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: #777; font-weight: 500;">DIRECCIÓN</p>
                        <p style="margin: 0; font-size: 13px; color: #000; font-weight: 500;">${direccion || '-'}</p>
                    </div>
                </div>
            </div>

            <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; margin-bottom: 10px; background: #fafafa;">
                <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; color: #333;">Servicios</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tbody>
                        ${filasServicios}
                    </tbody>
                </table>
            </div>

            <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; margin-bottom: 10px; background: #fafafa;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="margin: 0; font-size: 16px; font-weight: 600;">Total a pagar</h2>
                    <h2 style="margin: 0; font-size: 24px; font-weight: 700; color: #000;">$${parseFloat(totalValor).toFixed(2)}</h2>
                </div>
            </div>

            <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; background: #fafafa;">
                <p style="margin: 0; font-size: 11px; color: #777; font-weight: 500;">PRESUPUESTO VÁLIDO HASTA</p>
                <p style="margin: 3px 0 0 0; font-size: 14px; color: #000; font-weight: 600;">${fechaValidezFormato}</p>
            </div>

            <div style="text-align: center; margin-top: 10px; padding-top: 8px; border-top: 1px solid #e0e0e0; font-size: 11px; color: #999;">
                <p style="margin: 0;">Documento generado automáticamente | PILAR GOMEZ Servicios de Pintura</p>
            </div>
        </div>`;

    pdfContainer.style.setProperty('display', 'block', 'important');
    pdfContainer.style.setProperty('background', '#ffffff', 'important');

    const nombrePDF = nombre.trim() || "presupuesto";
    const nombreArchivo = `presupuesto-${nombrePDF}.pdf`;

    html2pdf()
        .from(pdfContainer)
        .set({
            margin: [3, 3, 3, 3],
            filename: nombreArchivo,
            html2canvas: { scale: 2, useCORS: true, scrollY: 0, windowHeight: 1200 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        })
        .save()
        .then(() => {
            pdfContainer.style.setProperty('display', 'none', 'important');
        });
});