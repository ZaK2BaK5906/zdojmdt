import React, { useState } from 'react';
import { IoAdd, IoCreate, IoTrash, IoSearch } from 'react-icons/io5';
import Modal from '../common/Modal';
import type { Law } from '../../mock/laws';
import { mockLaws } from '../../mock/laws';

const LawsPage: React.FC = () => {
  const [laws, setLaws] = useState<Law[]>(mockLaws);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'penal' | 'civil'>('all');

  // Filter laws
  const filteredLaws = laws.filter((law) => {
    const matchesSearch =
      law.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      law.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      law.article.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || law.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Add new law
  const handleAddLaw = (newLaw: Omit<Law, 'id' | 'createdAt' | 'lastModified'>) => {
    const law: Law = {
      ...newLaw,
      id: String(laws.length + 1),
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };
    setLaws([...laws, law]);
    setIsAddModalOpen(false);
  };

  // Edit law
  const handleEditLaw = (updatedLaw: Law) => {
    setLaws(
      laws.map((law) =>
        law.id === updatedLaw.id
          ? { ...updatedLaw, lastModified: new Date().toISOString().split('T')[0] }
          : law
      )
    );
    setIsEditModalOpen(false);
    setSelectedLaw(null);
  };

  // Delete law
  const handleDeleteLaw = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette loi ?')) {
      setLaws(laws.filter((law) => law.id !== id));
    }
  };

  // Open edit modal
  const openEditModal = (law: Law) => {
    setSelectedLaw(law);
    setIsEditModalOpen(true);
  };

  return (
    <div className="content">
      <div className="content-header">
        <div className="content-header-top">
          <h2>Codification des lois</h2>
        </div>
        <p>Gestion du Code Pénal et du Code Civil de l'État</p>
      </div>

      <div className="content-body">
        {/* Action Bar */}
        <div className="action-bar">
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <IoAdd />
            Ajouter une loi
          </button>

          <div className="search-filters">
            <div className="search-input-wrapper">
              <span className="search-icon">
                <IoSearch />
              </span>
              <input
                type="text"
                placeholder="Rechercher une loi..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as 'all' | 'penal' | 'civil')}
            >
              <option value="all">Tous les codes</option>
              <option value="penal">Code Pénal</option>
              <option value="civil">Code Civil</option>
            </select>
          </div>
        </div>

        {/* Laws Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Article</th>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Peine / Amende</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLaws.map((law) => (
                <tr key={law.id}>
                  <td className="table-id">{law.code}</td>
                  <td>{law.article}</td>
                  <td>{law.title}</td>
                  <td>
                    <span className={`badge badge-${law.category === 'penal' ? 'danger' : 'info'}`}>
                      {law.category === 'penal' ? 'Pénal' : 'Civil'}
                    </span>
                  </td>
                  <td>
                    {law.fine && law.fine > 0 ? (
                      <span>${law.fine.toLocaleString()}</span>
                    ) : null}
                    {law.jailTime && law.jailTime > 0 ? (
                      <span> | {law.jailTime} mois</span>
                    ) : null}
                    {!law.fine && !law.jailTime ? <span>—</span> : null}
                  </td>
                  <td>
                    <span className={`badge badge-${law.status === 'active' ? 'success' : 'warning'}`}>
                      {law.status === 'active' ? 'Actif' : law.status === 'draft' ? 'Brouillon' : 'Archivé'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-icon" onClick={() => openEditModal(law)} title="Éditer">
                        <IoCreate />
                      </button>
                      <button
                        className="btn-icon btn-danger"
                        onClick={() => handleDeleteLaw(law.id)}
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

          {filteredLaws.length === 0 && (
            <div className="empty-state">
              <p>Aucune loi trouvée</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Law Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter une nouvelle loi"
        size="large"
      >
        <LawForm onSubmit={handleAddLaw} onCancel={() => setIsAddModalOpen(false)} />
      </Modal>

      {/* Edit Law Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedLaw(null);
        }}
        title="Modifier la loi"
        size="large"
      >
        {selectedLaw && (
          <LawForm
            initialData={selectedLaw}
            onSubmit={handleEditLaw}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedLaw(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

// Law Form Component
interface LawFormProps {
  initialData?: Law;
  onSubmit: (law: any) => void;
  onCancel: () => void;
}

const LawForm: React.FC<LawFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    code: initialData?.code || '',
    title: initialData?.title || '',
    category: initialData?.category || 'penal',
    article: initialData?.article || '',
    description: initialData?.description || '',
    penalty: initialData?.penalty || '',
    fine: initialData?.fine || 0,
    jailTime: initialData?.jailTime || 0,
    createdBy: initialData?.createdBy || 'Current User',
    status: initialData?.status || 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...initialData, ...formData } : formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'fine' || name === 'jailTime' ? Number(value) : value,
    }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="code">Code *</label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="CP-001"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Catégorie *</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} required>
            <option value="penal">Code Pénal</option>
            <option value="civil">Code Civil</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="article">Article *</label>
          <input
            type="text"
            id="article"
            name="article"
            value={formData.article}
            onChange={handleChange}
            placeholder="Article 221-1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Statut *</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} required>
            <option value="active">Actif</option>
            <option value="draft">Brouillon</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="title">Titre *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Homicide volontaire"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description détaillée de la loi..."
          rows={4}
          required
        />
      </div>

      {formData.category === 'penal' && (
        <>
          <div className="form-group">
            <label htmlFor="penalty">Peine (description)</label>
            <input
              type="text"
              id="penalty"
              name="penalty"
              value={formData.penalty}
              onChange={handleChange}
              placeholder="Réclusion criminelle..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fine">Amende ($)</label>
              <input
                type="number"
                id="fine"
                name="fine"
                value={formData.fine}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="jailTime">Temps de prison (mois)</label>
              <input
                type="number"
                id="jailTime"
                name="jailTime"
                value={formData.jailTime}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>
          </div>
        </>
      )}

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Annuler
        </button>
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
};

export default LawsPage;
