import React, { useState } from "react"
import PropTypes from "prop-types"
import Error from "./Error"
import shortid from "shortid"

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {

    // definiendo estados
    const [ nombre, guardarNombre ] = useState("")
    const [ cantidad, guardarCantidad ] = useState(0)
    const [ error, guardarError ] = useState(false)

    // función que guarda el nombre del gasto
    const definirGasto = e => {
        guardarNombre(e.target.value)
    }

    // función que guarda la cantidad
    const definirCantidad = e => {
        guardarCantidad( parseInt(e.target.value, 10) )
    }

    // función para cuando usuario agrega un gasto
    const agregarGasto = e => {
        e.preventDefault()

        // validación del gasto
        if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === "") {
            guardarError(true)
            return
        }
        guardarError(false)

        // construir gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        // pasar gasto al compo principal
        guardarGasto(gasto)
        guardarCrearGasto(true)

        // resetear el form
        guardarNombre("")
        guardarCantidad(0)
    }


    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            { error ? <Error mensaje="Ambos casos son obligatorios" /> : null }

            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej.transporte"
                    value={nombre}
                    onChange={definirGasto}
                />
            </div>

            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={definirCantidad}
                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar gasto"
            
            />
        </form>

    )
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;