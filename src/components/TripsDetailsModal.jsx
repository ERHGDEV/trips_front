import { useState } from 'react'
import formatDate from '../services/formatDate'
import EditIcon from './icons/EditIcon'
import DeleteIcon from './icons/DeleteIcon'
import CancelIcon from './icons/CancelIcon'
import SaveIcon from './icons/SaveIcon'

const TripsDetailsModal = ({ trip, onClose, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editableTrip, setEditableTrip] = useState({ ...trip })
  
  const handleEdit = () => {
    setIsEditing(true)
  }
  
  const handleSave = () => {
    onEdit(trip.id, editableTrip)
    setIsEditing(false)
    onClose()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditableTrip({ ...editableTrip, [name]: value })
  }

  const handleDelete = () => {
    onDelete(trip.id)
    onClose()
  }

  return (
    <div className="trip-detail-modal">
      <div className="trip-detail-modal-content">
        <h2>Detalles del viaje</h2>
        <div className="trip-detail-form">
          <div className="form-row">
            <label>
              Operador
              <input
                className="input-fixed-two"
                type="text"
                name="operador"
                value={editableTrip.operador}
                onChange={handleChange}
                readOnly={true}
              />
            </label>
            <label>
              Tipo
              <input
                className="input-fixed-two"
                type="text"
                name="tipoOperador"
                value={editableTrip.tipoOperador}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Unidad
              <input
                className="input-fixed-two"
                type="text"
                name="unidad"
                value={editableTrip.unidad}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </label>
            <label>
              Proyecto
              <input
                className="input-fixed-two"
                type="text"
                name="proyecto"
                value={editableTrip.proyecto}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Ruta
              <input
                className="input-fixed"
                type="text"
                name="ruta"
                value={editableTrip.ruta}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Salida
              <input
                className="input-fixed-two"
                type="text"
                name="fechaSalida"
                value={formatDate(editableTrip.fechaSalida)}
                onChange={handleChange}
                readOnly={true}
              />
            </label>
            <label>
              Llegada
              <input
                className="input-fixed-two"
                type="text"
                name="fechaLlegada"
                value={formatDate(editableTrip.fechaLlegada)}
                onChange={handleChange}
                readOnly={true}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              km Salida
              <input
                className="input-fixed-two"
                type="text"
                name="kmSalida"
                value={editableTrip.kmSalida}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </label>
            <label>
              km Llegada
              <input
                className="input-fixed-two"
                type="text"
                name="kmLlegada"
                value={editableTrip.kmLlegada}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Diferencia
              <input
                className="input-fixed"
                type="text"
                value={editableTrip.kmLlegada - editableTrip.kmSalida}
                readOnly={!isEditing}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Observaciones
              <textarea
                name="observaciones"
                value={editableTrip.observaciones}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </label>
          </div>
          <div className="trip-detail-button-group">
            {isEditing ? (
              <>
                <button className="trip-detail-save-button" onClick={handleSave}>
                  <SaveIcon />
                  <span className="sr-only">Guardar</span>
                </button>
              </>
            ) : (
              <>
                <button className="trip-detail-edit-button" onClick={handleEdit}>
                  <EditIcon />
                  <span className="sr-only">Editar</span>
                </button>
                <button className="trip-detail-delete-button" onClick={handleDelete}>
                  <DeleteIcon />
                  <span className="sr-only">Eliminar</span>
                </button>
              </>
            )}
            <button className="trip-detail-cancel-button" onClick={onClose}>
              <CancelIcon />
              <span className="sr-only">Cerrar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripsDetailsModal