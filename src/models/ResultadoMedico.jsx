class ResultadoMedico {
    constructor(id, cedulaPaciente, cedulaDoctor, tipo, fechaEmision, url) {
        this.id = id;
        this.cedulaPaciente = cedulaPaciente;
        this.cedulaDoctor = cedulaDoctor;
        this.tipo = tipo;
        this.fechaEmision = fechaEmision;
        this.url = url;
    }
}

export default ResultadoMedico;