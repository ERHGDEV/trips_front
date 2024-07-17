import './App.css'
import { useState, useEffect } from 'react'
import tripsService from './services/trips'
import TripsRecord from './components/TripsRecord'
import Header from './components/Header'
import TripsForm from './components/TripsForm'
import Notification from './components/Notification'
import '@fontsource-variable/onest'

function App() {

  const [trips, setTrips] = useState([])
  const [notification, setNotification] = useState({ message: '', type: '' })

  useEffect(() => {
    tripsService
      .getAll()
        .then(data => {
          setTrips(data)
        })
  }, [])

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 1500)
  }

  const handleAddTrip = (newTrip) => {
      
    tripsService
      .create(newTrip)
        .then(data => {
          setTrips([...trips, data])
          showNotification('Viaje agregado', 'success')
        })
        .catch(error => {
          console.log('Error adding trip', error)
          showNotification('Error al agregar viaje', 'error')
        })
  }

  const handleDeleteTrip = (id) => {
    tripsService
      .destroy(id)
        .then(() => {
          setTrips(trips.filter(trip => trip.id !== id))
          showNotification('Viaje eliminado', 'success')
        })
        .catch(error => {
          console.log('Error deleting trip', error)
          showNotification('Error al eliminar viaje', 'error')
        })
  }

  const handleEditTrip = (id, updatedTrip) => {
    tripsService
      .update(id, updatedTrip)
        .then(updatedTrip => {
          setTrips(trips.map(trip => trip.id === id ? updatedTrip : trip))
          showNotification('Viaje actualizado', 'success')
        })
        .catch(error => {
          console.log('Error updating trip', error)
          showNotification('Error al actualizar viaje', 'error')
        })
  }

  return (
    <>
      <Header />

      <TripsForm onSave={handleAddTrip} />

      <TripsRecord trips={trips} onDelete={handleDeleteTrip} onEdit={handleEditTrip} />

      {notification.message && <Notification message={notification.message} type={notification.type} />}
    </>
  )
}

export default App
