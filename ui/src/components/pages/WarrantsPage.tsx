import React, { useState } from 'react';
import { IoAdd, IoCreate, IoTrash, IoSearch, IoDocument } from 'react-icons/io5';
import Modal from '../common/Modal';
import type { Warrant } from '../../mock/warrants';
import { mockWarrants } from '../../mock/warrants';

const WarrantsPage: React.FC = () => {
  const [warrants, setWarrants] = useState<Warrant[]>(mockWarrants);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedWarrant, setSelectedWarrant] = useState<Warrant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'arrest' | 'search' | 'subpoena' | 'seizure'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'executed' | 'expired' | 'cancelled'>('all');

  // Filter warrants
  const filteredWarrants = warrants.filter((warrant) => {
    const matchesSearch =
      warrant.warrantNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warrant.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warrant.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || warrant.type === filterType;
    const matchesStatus = filterStatus === 'all' || warrant.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Add new warrant
  const handleAddWarrant = (newWarrant: Omit<Warrant, 'id'>) => {
    const warrant: Warrant = {
      ...newWarrant,
      id: String(warrants.length + 1),
    };
    setWarrants([...warrants, warrant]);
    setIsAddModalOpen(false);
  };

  // Edit warrant
  const handleEditWarrant = (updatedWarrant: Warrant) => {
    setWarrants(warrants.map((w) => (w.id === updatedWarrant.id ? updatedWarrant : w)));
    setIsEditModalOpen(false);
    setSelectedWarrant(null);
  };

  // Delete warrant
  const handleDeleteWarrant = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce mandat ?')) {
      setWarrants(warrants.filter((w) => w.id !== id));
    }
  };

  // Open modals
  const openViewModal = (warrant: Warrant) => {
    setSelectedWarrant(warrant);
    setIsViewModalOpen(true);
  };

  const openEditModal = (warrant: Warrant) => {
    setSelectedWarrant(warrant);
    setIsEditModalOpen(true);
  };

  // Get type label
  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      arrest: 'Mandat d\'arrêt',
      search: 'Mandat de perquisition',
      subpoena: 'Assignation',
      seizure: 'Ordre de saisie',
    };
    return labels[type] || type;
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      active: 'Actif',
      executed: 'Exécuté',
      expired: 'Expiré',
      cancelled: 'Annulé',
    };
    return labels[status] || status;
  };

  return (
    <div className="content">
      <div className="content-header">
        <div className="content-header-top">
          <h2>Mandats & Actes judiciaires</h2>
        </div>
        <p>Gestion des mandats d'arrêt, perquisitions, assignations et ordres de saisie</p>
      </div>

      <div className="content-body">
        {/* Action Bar */}
        <div className="action-bar">
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <IoAdd />
            Émettre un mandat
          </button>

          <div className="search-filters">
            <div className="search-input-wrapper">
              <span className="search-icon">
                <IoSearch />
              </span>
              <input
                type="text"
                placeholder="Rechercher un mandat..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
            >
              <option value="all">Tous les types</option>
              <option value="arrest">Mandats d'arrêt</option>
              <option value="search">Perquisitions</option>
              <option value="subpoena">Assignations</option>
              <option value="seizure">Saisies</option>
            </select>

            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="executed">Exécuté</option>
              <option value="expired">Expiré</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>
        </div>

        {/* Warrants Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>N° Mandat</th>
                <th>Type</th>
                <th>Cible / Sujet</th>
                <th>Motif</th>
                <th>Émis par</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWarrants.map((warrant) => (
                <tr key={warrant.id}>
                  <td className="table-id">{warrant.warrantNumber}</td>
                  <td>
                    <span className={`badge badge-${warrant.type === 'arrest' ? 'danger' : 'info'}`}>
                      {getTypeLabel(warrant.type)}
                    </span>
                  </td>
                  <td>{warrant.targetName}</td>
                  <td className="table-truncate">{warrant.reason}</td>
                  <td>{warrant.issuedBy}</td>
                  <td>{new Date(warrant.issuedDate).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <span
                      className={`badge badge-${
                        warrant.status === 'active'
                          ? 'success'
                          : warrant.status === 'executed'
                          ? 'info'
                          : 'warning'
                      }`}
                    >
                      {getStatusLabel(warrant.status)}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-icon" onClick={() => openViewModal(warrant)} title="Voir détails">
                        <IoDocument />
                      </button>
                      <button className="btn-icon" onClick={() => openEditModal(warrant)} title="Éditer">
                        <IoCreate />
                      </button>
                      <button
                        className="btn-icon btn-danger"
                        onClick={() => handleDeleteWarrant(warrant.id)}
                        title="Supprimer"
                      >
                        <IoTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredWarrants.length === 0 && (
            <div className="empty-state">
              <p>Aucun mandat trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Warrant Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Émettre un nouveau mandat"
        size="large"
      >
        <WarrantForm onSubmit={handleAddWarrant} onCancel={() => setIsAddModalOpen(false)} />
      </Modal>

      {/* Edit Warrant Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedWarrant(null);
        }}
        title="Modifier le mandat"
        size="large"
      >
        {selectedWarrant && (
          <WarrantForm
            initialData={selectedWarrant}
            onSubmit={handleEditWarrant}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedWarrant(null);
            }}
          />
        )}
      </Modal>

      {/* View Warrant Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedWarrant(null);
        }}
        title="Détails du mandat"
        size="large"
      >
        {selectedWarrant && <WarrantDetails warrant={selectedWarrant} />}
      </Modal>
    </div>
  );
};

// Warrant Form Component
interface WarrantFormProps {
  initialData?: Warrant;
  onSubmit: (warrant: any) => void;
  onCancel: () => void;
}

const WarrantForm: React.FC<WarrantFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    warrantNumber: initialData?.warrantNumber || '',
    type: initialData?.type || 'arrest',
    targetName: initialData?.targetName || '',
    targetId: initialData?.targetId || '',
    reason: initialData?.reason || '',
    issuedBy: initialData?.issuedBy || '',
    issuedDate: initialData?.issuedDate || new Date().toISOString().split('T')[0],
    expiryDate: initialData?.expiryDate || '',
    status: initialData?.status || 'active',
    location: initialData?.location || '',
    notes: initialData?.notes || '',
    executedBy: initialData?.executedBy || '',
    executedDate: initialData?.executedDate || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...initialData, ...formData } : formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="warrantNumber">N° Mandat *</label>
          <input
            type="text"
            id="warrantNumber"
            name="warrantNumber"
            value={formData.warrantNumber}
            onChange={handleChange}
            placeholder="AW-2024-0001"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type de mandat *</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} required>
            <option value="arrest">Mandat d'arrêt</option>
            <option value="search">Mandat de perquisition</option>
            <option value="subpoena">Assignation</option>
            <option value="seizure">Ordre de saisie</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="targetName">Cible / Sujet *</label>
          <input
            type="text"
            id="targetName"
            name="targetName"
            value={formData.targetName}
            onChange={handleChange}
            placeholder="Nom complet ou lieu"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetId">ID Citoyen (si applicable)</label>
          <input
            type="text"
            id="targetId"
            name="targetId"
            value={formData.targetId}
            onChange={handleChange}
            placeholder="CID-1234"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="reason">Motif / Chef d'accusation *</label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Description détaillée du motif..."
          rows={3}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="issuedBy">Émis par *</label>
          <input
            type="text"
            id="issuedBy"
            name="issuedBy"
            value={formData.issuedBy}
            onChange={handleChange}
            placeholder="Nom du juge ou de l'autorité"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Localisation</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Los Santos County"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="issuedDate">Date d'émission *</label>
          <input
            type="date"
            id="issuedDate"
            name="issuedDate"
            value={formData.issuedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiryDate">Date d'expiration</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Statut *</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} required>
            <option value="active">Actif</option>
            <option value="executed">Exécuté</option>
            <option value="expired">Expiré</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>

        {formData.status === 'executed' && (
          <div className="form-group">
            <label htmlFor="executedBy">Exécuté par</label>
            <input
              type="text"
              id="executedBy"
              name="executedBy"
              value={formData.executedBy}
              onChange={handleChange}
              placeholder="Nom de l'agent"
            />
          </div>
        )}
      </div>

      {formData.status === 'executed' && (
        <div className="form-group">
          <label htmlFor="executedDate">Date d'exécution</label>
          <input
            type="date"
            id="executedDate"
            name="executedDate"
            value={formData.executedDate}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="notes">Notes / Instructions</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes additionnelles, instructions spéciales..."
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Annuler
        </button>
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Mettre à jour' : 'Émettre le mandat'}
        </button>
      </div>
    </form>
  );
};

// Warrant Details Component
interface WarrantDetailsProps {
  warrant: Warrant;
}

const WarrantDetails: React.FC<WarrantDetailsProps> = ({ warrant }) => {
  return (
    <div className="warrant-details">
      <div className="detail-grid">
        <div className="detail-item">
          <label>N° Mandat</label>
          <p>{warrant.warrantNumber}</p>
        </div>
        <div className="detail-item">
          <label>Type</label>
          <p>{warrant.type === 'arrest' ? 'Mandat d\'arrêt' : warrant.type === 'search' ? 'Perquisition' : warrant.type === 'subpoena' ? 'Assignation' : 'Saisie'}</p>
        </div>
        <div className="detail-item">
          <label>Cible / Sujet</label>
          <p>{warrant.targetName}</p>
        </div>
        {warrant.targetId && (
          <div className="detail-item">
            <label>ID Citoyen</label>
            <p>{warrant.targetId}</p>
          </div>
        )}
        <div className="detail-item full-width">
          <label>Motif</label>
          <p>{warrant.reason}</p>
        </div>
        <div className="detail-item">
          <label>Émis par</label>
          <p>{warrant.issuedBy}</p>
        </div>
        <div className="detail-item">
          <label>Date d'émission</label>
          <p>{new Date(warrant.issuedDate).toLocaleDateString('fr-FR')}</p>
        </div>
        {warrant.expiryDate && (
          <div className="detail-item">
            <label>Date d'expiration</label>
            <p>{new Date(warrant.expiryDate).toLocaleDateString('fr-FR')}</p>
          </div>
        )}
        {warrant.location && (
          <div className="detail-item">
            <label>Localisation</label>
            <p>{warrant.location}</p>
          </div>
        )}
        <div className="detail-item">
          <label>Statut</label>
          <p>
            <span
              className={`badge badge-${
                warrant.status === 'active'
                  ? 'success'
                  : warrant.status === 'executed'
                  ? 'info'
                  : 'warning'
              }`}
            >
              {warrant.status === 'active' ? 'Actif' : warrant.status === 'executed' ? 'Exécuté' : warrant.status === 'expired' ? 'Expiré' : 'Annulé'}
            </span>
          </p>
        </div>
        {warrant.executedBy && (
          <>
            <div className="detail-item">
              <label>Exécuté par</label>
              <p>{warrant.executedBy}</p>
            </div>
            {warrant.executedDate && (
              <div className="detail-item">
                <label>Date d'exécution</label>
                <p>{new Date(warrant.executedDate).toLocaleDateString('fr-FR')}</p>
              </div>
            )}
          </>
        )}
        {warrant.notes && (
          <div className="detail-item full-width">
            <label>Notes</label>
            <p>{warrant.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarrantsPage;
