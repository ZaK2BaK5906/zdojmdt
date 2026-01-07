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
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="header-logo">⚖️</div>
          <div className="header-title">
            <h1>State Department of Justice</h1>
            <p>Système Gouvernemental Intégré</p>
          </div>
        </div>

        <div className="header-right">
          <div className="header-datetime">
            <p className="date">{currentDate}</p>
            <p className="time">{currentTime}</p>
          </div>

          <div className="header-user">
            <div className="header-user-avatar">AG</div>
            <div className="header-user-info">
              <p className="name">Attorney General</p>
              <p className="role">Clearance Level: Max</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
