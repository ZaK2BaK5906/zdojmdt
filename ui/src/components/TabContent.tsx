import React from 'react';
import type { Section, Subsection } from '../types';

interface TabContentProps {
  section: Section;
  subsection: Subsection;
}

const TabContent: React.FC<TabContentProps> = ({ section, subsection }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 px-8 py-6">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-3xl">{section.icon}</span>
          <h2 className="text-3xl font-bold text-white">{section.title}</h2>
        </div>
        <p className="text-slate-400 text-lg ml-12">{subsection.title}</p>
      </div>

      {/* Content Area */}
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Dossiers actifs"
            value="248"
            change="+12%"
            icon="📊"
            trend="up"
          />
          <StatCard
            title="En attente"
            value="67"
            change="-5%"
            icon="⏳"
            trend="down"
          />
          <StatCard
            title="Résolus aujourd'hui"
            value="32"
            change="+8%"
            icon="✅"
            trend="up"
          />
          <StatCard
            title="Priorité haute"
            value="15"
            change="+3"
            icon="🔴"
            trend="neutral"
          />
        </div>

        {/* Main Content Section */}
        <div className="space-y-6">
          {/* Search & Filters */}
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Rechercher dans cette section..."
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                <span className="mr-2">🔍</span>
                Rechercher
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                <span className="mr-2">⚙️</span>
                Filtres
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      ID Dossier
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Titre
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Assigné à
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr
                      key={item}
                      className="hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-400">
                        #{String(item).padStart(6, '0')}
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        Exemple de dossier {subsection.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-900/30 text-green-400 border border-green-700">
                          Actif
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        Agent Smith
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                        {new Date().toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-400 hover:text-blue-300 mr-3">
                          Voir
                        </button>
                        <button className="text-slate-400 hover:text-slate-300">
                          Éditer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-slate-800 px-6 py-4 flex items-center justify-between border-t border-slate-700">
              <p className="text-sm text-slate-400">
                Affichage 1-5 sur 248 résultats
              </p>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                  Précédent
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  1
                </button>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                  2
                </button>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                  3
                </button>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                  Suivant
                </button>
              </div>
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
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => {
  const trendColor =
    trend === 'up'
      ? 'text-green-400'
      : trend === 'down'
      ? 'text-red-400'
      : 'text-slate-400';

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 hover:border-blue-600 transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className={`text-sm font-semibold ${trendColor}`}>{change}</span>
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-slate-400">{title}</p>
    </div>
  );
};

export default TabContent;
