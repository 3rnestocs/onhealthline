class Suscripcion {
    constructor(id, cedulaPaciente, tipo, precio, fechaInicio, fechaVencimiento, estado) {
        this.id = id;
        this.cedulaPaciente = cedulaPaciente;
        this.tipo = tipo;
        this.precio = precio;
        this.fechaInicio = fechaInicio;
        this.fechaVencimiento = fechaVencimiento;
        this.estado = estado;
    }
}

export default Suscripcion;