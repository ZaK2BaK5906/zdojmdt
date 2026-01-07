import React from 'react';
import type { Section, Subsection } from '../types';
import { iconMap } from '../data/sections';
import { IoStatsChart, IoTime, IoCheckmarkCircle, IoAlert, IoSearch, IoOptions } from 'react-icons/io5';

interface TabContentProps {
  section: Section;
  subsection: Subsection;
}

const TabContent: React.FC<TabContentProps> = ({ section, subsection }) => {
  return (
    <div className="content">
      <div className="content-header">
        <div className="content-header-top">
          <span className="content-header-icon">
            {React.createElement(iconMap[section.icon])}
          </span>
          <h2>{section.title}</h2>
        </div>
        <p>{subsection.title}</p>
      </div>

      <div className="content-body">
        {/* Stats Grid */}
        <div className="stats-grid">
          <StatCard
            title="Dossiers actifs"
            value="248"
            change="+12%"
            icon={<IoStatsChart />}
            trend="up"
          />
          <StatCard
            title="En attente"
            value="67"
            change="-5%"
            icon={<IoTime />}
            trend="down"
          />
          <StatCard
            title="Résolus aujourd'hui"
            value="32"
            change="+8%"
            icon={<IoCheckmarkCircle />}
            trend="up"
          />
          <StatCard
            title="Priorité haute"
            value="15"
            change="+3"
            icon={<IoAlert />}
            trend="neutral"
          />
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-row">
            <input
              type="text"
              placeholder="Rechercher dans cette section..."
              className="search-input"
            />
            <button className="btn btn-primary">
              <IoSearch />
              Rechercher
            </button>
            <button className="btn btn-secondary">
              <IoOptions />
              Filtres
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID Dossier</th>
                <th>Titre</th>
                <th>Statut</th>
                <th>Assigné à</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item}>
                  <td className="table-id">#{String(item).padStart(6, '0')}</td>
                  <td>Exemple de dossier {subsection.title}</td>
                  <td>
                    <span className="badge badge-success">Actif</span>
                  </td>
                  <td>Agent Smith</td>
                  <td>{new Date().toLocaleDateString('fr-FR')}</td>
                  <td>
                    <div className="table-actions">
                      <a href="#" className="table-link">Voir</a>
                      <a href="#" className="table-link">Éditer</a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <p className="pagination-info">Affichage 1-5 sur 248 résultats</p>
            <div className="pagination-buttons">
              <button className="pagination-btn">Précédent</button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <button className="pagination-btn">Suivant</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-icon">{icon}</span>
        <span className={`stat-change ${trend}`}>{change}</span>
      </div>
      <h3 className="stat-value">{value}</h3>
      <p className="stat-label">{title}</p>
    </div>
  );
};

export default TabContent;
