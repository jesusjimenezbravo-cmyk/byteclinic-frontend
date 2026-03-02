const form = document.getElementById("presupuestoForm");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const serviciosSeleccionados = [];
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
    if (cb.value !== "") {
      serviciosSeleccionados.push(cb.value);
    }
  });

  const data = {
    nombre: form.nombre.value,
    email: form.email.value,
    telefono: form.telefono.value,
    tipoEquipo: form.tipoEquipo.value,
    servicios: serviciosSeleccionados,
    envio: false
  };

  const response = await fetch("https://byteclinic.onrender.com/api/presupuesto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (response.ok) {
    resultado.innerHTML = `Tu presupuesto estimado es <strong>${result.total}€</strong>. Te contactaremos en breve.`;
  } else {
    resultado.innerHTML = "Ha ocurrido un error. Revisa los datos.";
  }
});