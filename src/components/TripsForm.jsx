import { useEffect, useState } from 'react'
import AddIcon from './icons/AddIcon'
import SaveIcon from './icons/SaveIcon'
import CancelIcon from './icons/CancelIcon'

const TripsForm = ({ onSave }) => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
      operador: '',
      tipoOperador: '',
      unidad: '',
      proyecto: '',
      ruta: '',
      fechaSalida: '',
      fechaLlegada: '',
      kmSalida: '',
      kmLlegada: '',
      diferencia: '',
      observaciones: ''
    })

    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
      const requiredFields = [
        formData.operador,
        formData.tipoOperador,
        formData.unidad,
        formData.proyecto,
        formData.ruta,
        formData.fechaSalida,
        formData.fechaLlegada,
        formData.kmSalida,
        formData.kmLlegada,
        formData.diferencia
      ]

      const allFieldsFilled = requiredFields.every(field => field.trim() !== '')
      setIsFormValid(allFieldsFilled)
    }, [formData])
  
    const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
    }
  
    const handleSave = () => {
      onSave(formData)
      setShowForm(false)
      setFormData({
        operador: '',
        tipoOperador: '',
        unidad: '',
        proyecto: '',
        ruta: '',
        fechaSalida: '',
        fechaLlegada: '',
        kmSalida: '',
        kmLlegada: '',
        diferencia: '',
        observaciones: ''
      })
    }
  
    return (
      <div>
        <div className='add-button-space'>
          <button className="add-button" onClick={() => setShowForm(true)}>
            <AddIcon />
            <span className='sr-only'>Agregar</span>
          </button>
        </div>
        
        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <h2>Agregar Nuevo Viaje</h2>
              <form className="trips-form">
                <div className="form-row">
                  <label>
                    Operador:
                    <input type="text" name="operador" required value={formData.operador} onChange={handleInputChange} />
                  </label>
                  <label>
                    Tipo de Operador:
                    <input type="text" name="tipoOperador" required value={formData.tipoOperador} onChange={handleInputChange} />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Unidad:
                    <input type="text" name="unidad" required value={formData.unidad} onChange={handleInputChange} />
                  </label>
                  <label>
                    Proyecto:
                    <input type="text" name="proyecto" required value={formData.proyecto} onChange={handleInputChange} />
                  </label>
                </div>
                <label>
                  Ruta:
                  <input type="text" name="ruta" required value={formData.ruta} onChange={handleInputChange} />
                </label>
                <div className="form-row">
                  <label>
                    Fecha de Salida:
                    <input type="date" name="fechaSalida" required value={formData.fechaSalida} onChange={handleInputChange} />
                  </label>
                  <label>
                    Fecha de Llegada:
                    <input type="date" name="fechaLlegada" required value={formData.fechaLlegada} onChange={handleInputChange} />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    km Salida:
                    <input type="number" name="kmSalida" required value={formData.kmSalida} onChange={handleInputChange} />
                  </label>
                  <label>
                    km Llegada:
                    <input type="number" name="kmLlegada" required value={formData.kmLlegada} onChange={handleInputChange} />
                  </label>
                </div>
                <label>
                  Diferencia:
                  <input type="number" name="diferencia" required value={formData.diferencia} onChange={handleInputChange} />
                </label>
                <label>
                  Observaciones:
                  <textarea name="observaciones" value={formData.observaciones} onChange={handleInputChange} />
                </label>
                <div className="button-group">
                  <button type="button" className="save-button" onClick={handleSave} disabled={!isFormValid}>
                    <SaveIcon />
                    <span className='sr-only'>Guardar</span>
                  </button>
                  <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                    <CancelIcon />
                    <span className='sr-only'>Cancelar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }
  
  export default TripsForm