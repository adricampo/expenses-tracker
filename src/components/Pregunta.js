import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import Error from "./Error"

const Pregunta = ({ guardarPresupuesto, guardarRestante, actualizarPregunta }) => {

    // definir estado
    const [ cantidad, guardarCantidad ] = useState(0)
    const [ error, guardarError ] = useState(false)

    // función que lee el presupuesto
    const definirPresupuesto = e => {
        guardarCantidad( parseInt(e.target.value, 10) )
    }

    // submit para definir presupuesto
    const agregarPresupuesto = e => {
        e.preventDefault()

        // Conseguir cantidad valida
        if(cantidad < 1 || isNaN(cantidad)){
            guardarError(true)
            return
        }

        // si se pasa la validación
        guardarError(false);
        guardarPresupuesto(cantidad)
        guardarRestante(cantidad)
        actualizarPregunta(false)
    }


    return (
        <Fragment>
            <h2>Define tu presupuesto</h2>

            { error ? <Error mensaje="Cantidad no valida" /> : null }
    
            <form
                onSubmit={agregarPresupuesto}
            >
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={definirPresupuesto}
                >
                </input>
                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir presupuesto"
                >
                </input>
            </form>
        </Fragment>

    )
}

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}

export default Pregunta;