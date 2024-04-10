class Usuario {

    constructor(cedula, usuario, contraseña, nombreCompleto, sexo, edad, correo) {
        this.cedula = cedula;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.nombreCompleto = nombreCompleto;
        this.sexo = sexo;
        this.edad = edad;
        this.correo = correo;
    }

    get cedula() {
        return this.cedula;
    }

    set cedula(value) {
        this.cedula = value;
    }

    get usuario() {
        return this.usuario;
    }

    set usuario(value) {
        this.usuario = value;
    }

    get contraseña() {
        return this.contraseña;
    }

    set contraseña(value) {
        this.contraseña = value;
    }

    get nombreCompleto() {
        return this.nombreCompleto;
    }

    set nombreCompleto(value) {
        this.nombreCompleto = value;
    }

    get sexo() {
        return this.sexo;
    }

    set sexo(value) {
        this.sexo = value;
    }

    get edad() {
        return this.edad;
    }

    set edad(value) {
        this.edad = value;
    }

    get correo() {
        return this.correo;
    }

    set correo(value) {
        this.correo = value;
    }
}

export default Usuario;