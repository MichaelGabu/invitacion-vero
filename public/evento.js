// La ubicación y el programa incluyen datos de muestra editables.
window.invitacionVero = {
  nombre: "Vero",
  fechaISO: "2027-02-27T17:00:00-05:00",
  fecha: "Sábado 27 de febrero de 2027",
  hora: "5:00 p. m.",
  lugar: "Hacienda Luz de Luna",
  direccion: "Camino de las Glicinas, km 4 · Subachoque, Cundinamarca",
  // El lugar es ficticio. El mapa de muestra abre el municipio.
  mapa: "https://www.google.com/maps/search/?api=1&query=Subachoque%2C+Cundinamarca%2C+Colombia",
  oracion: "Gracias, Dios, por estos quince años y por las manos que me han acompañado hasta aquí. Que nunca me falte la ilusión de descubrir lo que hay más allá de mi ventana.",
  familia: "Juan Jaramillo y Julieth Cortes",
  vestuario: "Formal de noche",
  ellas: "Vestido largo o midi. El lavanda está reservado para Vero.",
  ellos: "Traje oscuro con camisa clara.",
  fechaLimite: "13 de febrero de 2027",
  itinerario: [
    { titulo: "Bienvenida", hora: "5:00 p. m.", descripcion: "Nos encontramos en el jardín para el cóctel de bienvenida." },
    { titulo: "Entrada de Vero", hora: "5:30 p. m.", descripcion: "Se abren las puertas y empieza mi noche de quince." },
    { titulo: "Fotos", hora: "6:00 p. m.", descripcion: "Una foto contigo bajo los faroles del jardín." },
    { titulo: "Brindis", hora: "6:30 p. m.", descripcion: "Unas palabras de mis padres y un brindis por lo que viene." },
    { titulo: "Cena", hora: "7:00 p. m.", descripcion: "Compartiremos la mesa en el salón principal." },
    { titulo: "Vals y fiesta", hora: "8:00 p. m.", descripcion: "Después de mi primer vals, la pista es de todos." },
    { titulo: "Despedida", hora: "11:00 p. m.", descripcion: "Un último abrazo antes de volver a casa." },
  ],
  fotos: [], canciones: [],
  // El enlace general muestra esta familia mientras no haya una fuente de invitados.
  // Para recuperar la entrada general, cambie invitadoMuestra a null.
  invitadoMuestra: { nombre: "Familia Rivera", asientos: 3 },
  invitadosCSV: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdhe7k3UYa8CNk5-Xo0m8rFw-ox27kYgFp8swOPcfYHAIIBFGXQmfm4RQCNt1offFsitQgVheEHIqI/pub?gid=0&single=true&output=csv",
  contactos: [], whatsapp: "",
  proyectoFirebase: "", coleccionInvitados: "guests", soloConCodigo: false,
};
