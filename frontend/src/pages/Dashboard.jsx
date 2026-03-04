import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { fetchUserById, updateUserProfile } from '../services/services';

const Dashboard = () => {
  const { id, user, login } = useContext(AuthContext);
  const userId = id?.id;

  const [profile, setProfile] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) return;
      const data = await fetchUserById(userId);
      if (data && data.status === 'success') {
        setProfile(data.user);
        setEditName(data.user.name);
        setEditEmail(data.user.email);
      }
    };
    loadProfile();
  }, [userId]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;
    setSavingProfile(true);
    setProfileMessage('');
    try {
      const data = await updateUserProfile(userId, {
        name: editName,
        email: editEmail,
        password: editPassword || undefined,
      });
      if (data && data.status === 'success') {
        setProfile(data.user);
        setEditPassword('');
        // Actualizamos el contexto para que el nombre se vea en el header
        login(data.user.name, userId, data.user.role || 'user');
        setProfileMessage('Datos actualizados correctamente.');
      } else {
        setProfileMessage('No se pudieron actualizar los datos.');
      }
    } catch (err) {
      setProfileMessage('Error al actualizar los datos.');
    } finally {
      setSavingProfile(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/${id.id}/address`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, city, postalCode, country, isDefault }),
      });

      if (response.status === "success") {
        // aqui poner notificacion de exito
      }
    } catch (error) {
      console.error('Add address failed:', error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h1>

        <section className="mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-3">
            Datos de tu cuenta
          </h2>
          {profile ? (
            <>
              <div className="mb-4 text-sm text-gray-700 space-y-1">
                <p><span className="font-semibold">Nombre actual:</span> {profile.name}</p>
                <p><span className="font-semibold">Email actual:</span> {profile.email}</p>
                <p><span className="font-semibold">Rol:</span> {profile.role}</p>
                <p><span className="font-semibold">Creado el:</span> {new Date(profile.created_at).toLocaleString()}</p>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nueva contraseña (opcional)
                  </label>
                  <input
                    type="password"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {profileMessage && (
                  <p className="text-sm text-gray-700">{profileMessage}</p>
                )}
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  {savingProfile ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </form>
            </>
          ) : (
            <p className="text-sm text-gray-600">Cargando datos de la cuenta...</p>
          )}
        </section>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-700 mb-3">Añadir dirección</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ciudad
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código Postal
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              País
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="isDefault"
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="isDefault" className="text-sm text-gray-700">
              Usar como dirección por defecto
            </label>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Guardar dirección
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard