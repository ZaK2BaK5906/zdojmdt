import React from 'react';

const Header: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 border-b border-blue-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-700 rounded-lg">
            <span className="text-2xl">⚖️</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              State Department of Justice
            </h1>
            <p className="text-sm text-blue-200">
              Système Gouvernemental Intégré
            </p>
          </div>
        </div>

        {/* User Info & Time */}
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="text-sm text-blue-200 capitalize">{currentDate}</p>
            <p className="text-lg font-semibold text-white">{currentTime}</p>
          </div>

          <div className="flex items-center space-x-3 bg-blue-800 px-4 py-2 rounded-lg">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">AG</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Attorney General</p>
              <p className="text-xs text-blue-300">Clearance Level: Max</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
