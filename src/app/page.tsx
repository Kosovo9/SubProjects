'use client';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  
  const handlePayment = async () => {
    setLoading(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'pro' })
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
    else alert('Error al crear pago');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">WhitePage Pro</h1>
        <p className="text-gray-600 mb-8">Crea tu perfil profesional en 2 minutos. Acepta pagos, agenda citas y recibe reseñas.</p>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
          <h2 className="font-bold text-lg text-gray-900 mb-2">Plan Pro:  MXN/mes</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Perfil profesional con tu foto y especialidad</li>
            <li>Boton de pago con Stripe</li>
            <li>Agenda de citas integrada</li>
            <li>Resenas verificadas</li>
            <li>Soporte 24/7 con IA</li>
          </ul>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold py-4 px-6 rounded-xl hover:opacity-90 transition"
        >
          {loading ? 'Redirigiendo a Stripe...' : 'Crear mi Perfil Ahora'}
        </button>
      </div>
    </div>
  );
}
