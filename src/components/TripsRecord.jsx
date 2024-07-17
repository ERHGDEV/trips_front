import React, { useState, useEffect } from 'react'
import formatDate from '../services/formatDate'
import EditIcon from './icons/EditIcon'
import DeleteIcon from './icons/DeleteIcon'
import TripDetailsModal from './TripsDetailsModal'
import Notification from './Notification'

const TripsRecord = ({ trips, onDelete, onEdit }) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth)
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })
 
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getVisibleColumns = () => {
    if (screenSize >= 1920) {
      return ['Operador', 'Tipo', 'Unidad', 'Proyecto', 'Ruta', 'Salida', 'Llegada', 'km Salida', 'km Llegada', 'Diferencia', 'Acciones']
    } else if (screenSize >= 1440) {
      return ['Operador', 'Tipo', 'Unidad', 'Proyecto', 'Ruta', 'Salida', 'Llegada', 'km Salida', 'km Llegada', 'Diferencia', 'Acciones']
    } else if (screenSize >= 720) {
      return ['Operador', 'Unidad', 'Ruta', 'Salida', 'Llegada', 'Acciones']
    } else if (screenSize >= 375) {
      return ['Salida', 'Ruta', 'Acciones']
    } else {
      return ['Salida', 'Acciones']
    }
  }

  const visibleColumns = getVisibleColumns()

  const openDetailsModal = (trip) => {
    setSelectedTrip(trip)
  }

  const closeDetailsModal = () => {
    setSelectedTrip(null)
  }

  return (
    <section className="trips-record">
      <h2>Bitácora de viajes</h2>
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {trips.length === 0 ? (
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        {visibleColumns.includes('Operador') && <th>Operador</th>}
                        {visibleColumns.includes('Tipo') && <th>Tipo</th>}
                        {visibleColumns.includes('Unidad') && <th>Unidad</th>}
                        {visibleColumns.includes('Proyecto') && <th>Proyecto</th>}
                        {visibleColumns.includes('Ruta') && <th>Ruta</th>}
                        {visibleColumns.includes('Salida') && <th>Salida</th>}
                        {visibleColumns.includes('Llegada') && <th>Llegada</th>}
                        {visibleColumns.includes('km Salida') && <th>km Salida</th>}
                        {visibleColumns.includes('km Llegada') && <th>km Llegada</th>}
                        {visibleColumns.includes('Diferencia') && <th>Diferencia</th>}
                        {visibleColumns.includes('Observaciones') && <th>Observaciones</th>}
                        {visibleColumns.includes('Acciones') && <th>Acciones</th>}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={visibleColumns.length}>
                          Esperando viajes...
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {visibleColumns.includes('Operador') && <th>Operador</th>}
                {visibleColumns.includes('Tipo') && <th>Tipo</th>}
                {visibleColumns.includes('Unidad') && <th>Unidad</th>}
                {visibleColumns.includes('Proyecto') && <th>Proyecto</th>}
                {visibleColumns.includes('Ruta') && <th>Ruta</th>}
                {visibleColumns.includes('Salida') && <th>Salida</th>}
                {visibleColumns.includes('Llegada') && <th>Llegada</th>}
                {visibleColumns.includes('km Salida') && <th>km Salida</th>}
                {visibleColumns.includes('km Llegada') && <th>km Llegada</th>}
                {visibleColumns.includes('Diferencia') && <th>Diferencia</th>}
                {visibleColumns.includes('Observaciones') && <th>Observaciones</th>}
                {visibleColumns.includes('Acciones') && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {trips.map((trip, index) => (
                <tr key={trip.id} className={index === trips.length - 1 ? 'last-cell' : ''}>
                  {visibleColumns.includes('Operador') && <td>{trip.operador}</td>}
                  {visibleColumns.includes('Tipo') && <td>{trip.tipoOperador}</td>}
                  {visibleColumns.includes('Unidad') && <td>{trip.unidad}</td>}
                  {visibleColumns.includes('Proyecto') && <td>{trip.proyecto}</td>}
                  {visibleColumns.includes('Ruta') && <td>{trip.ruta}</td>}
                  {visibleColumns.includes('Salida') && <td>{formatDate(trip.fechaSalida)}</td>}
                  {visibleColumns.includes('Llegada') && <td>{formatDate(trip.fechaLlegada)}</td>}
                  {visibleColumns.includes('km Salida') && <td>{trip.kmSalida}</td>}
                  {visibleColumns.includes('km Llegada') && <td>{trip.kmLlegada}</td>}
                  {visibleColumns.includes('Diferencia') && <td>{trip.kmLlegada - trip.kmSalida}</td>}
                  {visibleColumns.includes('Observaciones') && <td>{trip.observaciones}</td>}
                  {visibleColumns.includes('Acciones') && (
                    <td>
                      {screenSize >= 1440 ? (
                        <div className='action-area'>
                          <button className='action-buttons' onClick={() => openDetailsModal(trip)}>
                            <EditIcon />
                            <span className="sr-only">Editar</span>
                          </button>
                          <button className='action-buttons' onClick={() => onDelete(trip.id)}>
                            <DeleteIcon />
                            <span className="sr-only">Eliminar</span>
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => openDetailsModal(trip)} className='action-buttons'>
                          Detalle
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedTrip && <TripDetailsModal trip={selectedTrip} onClose={closeDetailsModal} onDelete={onDelete} onEdit={onEdit} />}
    </section>
  )
}

export default TripsRecord