import React, { useEffect, useState } from 'react';
import { getNotificaciones } from './api';

function NotificacionesBar({ usuarioId }) {
  const [notificaciones, setNotificaciones] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getNotificaciones(usuarioId);
        setNotificaciones(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [usuarioId]);

  // Contador de no leídas
  const noLeidas = notificaciones.filter(n => !n.leida).length;

  return (
    <>
      {/* Botón flotante de campana */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '50%',
          width: 56,
          height: 56,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 3000,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Notificaciones"
      >
        {/* Icono de campana SVG */}
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z" fill="#333"/>
        </svg>
        {noLeidas > 0 && (
          <span style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'red',
            color: '#fff',
            borderRadius: '50%',
            width: 20,
            height: 20,
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {noLeidas}
          </span>
        )}
      </button>

      {/* Popup de notificaciones */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 100,
          right: 30,
          width: 320,
          background: '#fff',
          border: '1px solid #ccc',
          zIndex: 3001,
          maxHeight: 400,
          overflowY: 'auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          borderRadius: 8
        }}>
          <div style={{padding: 10, borderBottom: '1px solid #eee', background: '#f5f5f5', fontWeight: 'bold'}}>
            Notificaciones
            <button onClick={() => setOpen(false)} style={{
              float: 'right', border: 'none', background: 'transparent', fontSize: 18, cursor: 'pointer'
            }}>✖</button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {notificaciones.map(n => (
              <li key={n.id} style={{
                padding: 8,
                borderBottom: '1px solid #eee',
                background: n.leida ? '#f9f9f9' : '#e6f7ff'
              }}>
                <strong>{n.mensaje}</strong>
                <br />
                <small>{new Date(n.fecha_creacion).toLocaleString()}</small>
              </li>
            ))}
            {notificaciones.length === 0 && (
              <li style={{padding: 8, color: '#888'}}>Sin notificaciones</li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default NotificacionesBar;