import React, { useState } from 'react';
import { IoAdd, IoCreate, IoTrash, IoSearch, IoPerson, IoShieldCheckmark } from 'react-icons/io5';
import Modal from '../common/Modal';
import type { User, RolePermissions, UserPermission } from '../../mock/permissions';
import { mockUsers, mockRoles, mockUserPermissions } from '../../mock/permissions';
import { sections } from '../../data/sections';
import type { SectionId } from '../../types';

const PermissionsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roles, setRoles] = useState<RolePermissions[]>(mockRoles);
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>(mockUserPermissions);
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isEditPermissionsModalOpen, setIsEditPermissionsModalOpen] = useState(false);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Get user's role
  const getUserRole = (userId: string): RolePermissions | undefined => {
    const userPerm = userPermissions.find((up) => up.userId === userId);
    if (!userPerm) return undefined;
    return roles.find((r) => r.roleId === userPerm.roleId);
  };

  // Get user's allowed sections
  const getUserSections = (userId: string): SectionId[] => {
    const userPerm = userPermissions.find((up) => up.userId === userId);
    if (!userPerm) return [];
    if (userPerm.customSections) return userPerm.customSections;
    const role = roles.find((r) => r.roleId === userPerm.roleId);
    return role?.allowedSections || [];
  };

  // Filter users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add user
  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const user: User = {
      ...newUser,
      id: `user-${String(users.length + 1).padStart(3, '0')}`,
    };
    setUsers([...users, user]);
    setIsAddUserModalOpen(false);
  };

  // Edit user
  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setIsEditUserModalOpen(false);
    setSelectedUser(null);
  };

  // Delete user
  const handleDeleteUser = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter((u) => u.id !== id));
      setUserPermissions(userPermissions.filter((up) => up.userId !== id));
    }
  };

  // Update user permissions
  const handleUpdatePermissions = (userId: string, roleId: string, customSections?: SectionId[]) => {
    const existingPerm = userPermissions.find((up) => up.userId === userId);
    if (existingPerm) {
      setUserPermissions(
        userPermissions.map((up) =>
          up.userId === userId ? { ...up, roleId, customSections } : up
        )
      );
    } else {
      setUserPermissions([...userPermissions, { userId, roleId, customSections }]);
    }
    setIsEditPermissionsModalOpen(false);
    setSelectedUser(null);
  };

  // Add role
  const handleAddRole = (newRole: Omit<RolePermissions, 'roleId'>) => {
    const role: RolePermissions = {
      ...newRole,
      roleId: `role-${String(roles.length + 1).padStart(3, '0')}`,
    };
    setRoles([...roles, role]);
    setIsAddRoleModalOpen(false);
  };

  // Delete role
  const handleDeleteRole = (roleId: string) => {
    const role = roles.find((r) => r.roleId === roleId);
    if (role?.isSystemRole) {
      alert('Impossible de supprimer un rôle système');
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
      setRoles(roles.filter((r) => r.roleId !== roleId));
      // Remove user permissions with this role
      setUserPermissions(userPermissions.filter((up) => up.roleId !== roleId));
    }
  };

  return (
    <div className="content">
      <div className="content-header">
        <div className="content-header-top">
          <h2>Gestion des Permissions</h2>
        </div>
        <p>Gestion des accès et rôles pour tous les utilisateurs du système</p>
      </div>

      <div className="content-body">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <IoPerson />
            Utilisateurs
          </button>
          <button
            className={`tab-btn ${activeTab === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveTab('roles')}
          >
            <IoShieldCheckmark />
            Rôles
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <>
            <div className="action-bar">
              <button className="btn btn-primary" onClick={() => setIsAddUserModalOpen(true)}>
                <IoAdd />
                Ajouter un utilisateur
              </button>

              <div className="search-filters">
                <div className="search-input-wrapper">
                  <span className="search-icon">
                    <IoSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="Rechercher un utilisateur..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Fonction</th>
                    <th>Département</th>
                    <th>Rôle Système</th>
                    <th>Sections autorisées</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => {
                    const userRole = getUserRole(user.id);
                    const sections = getUserSections(user.id);
                    return (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.department}</td>
                        <td>
                          {userRole ? (
                            <span className="badge badge-info">{userRole.roleName}</span>
                          ) : (
                            <span className="badge badge-warning">Non assigné</span>
                          )}
                        </td>
                        <td>
                          <span className="sections-count">{sections.length} sections</span>
                        </td>
                        <td>
                          <span
                            className={`badge badge-${
                              user.status === 'active'
                                ? 'success'
                                : user.status === 'suspended'
                                ? 'warning'
                                : 'danger'
                            }`}
                          >
                            {user.status === 'active'
                              ? 'Actif'
                              : user.status === 'suspended'
                              ? 'Suspendu'
                              : 'Inactif'}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              className="btn-icon"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsEditPermissionsModalOpen(true);
                              }}
                              title="Gérer permissions"
                            >
                              <IoShieldCheckmark />
                            </button>
                            <button
                              className="btn-icon"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsEditUserModalOpen(true);
                              }}
                              title="Éditer"
                            >
                              <IoCreate />
                            </button>
                            <button
                              className="btn-icon btn-danger"
                              onClick={() => handleDeleteUser(user.id)}
                              title="Supprimer"
                            >
                              <IoTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="empty-state">
                  <p>Aucun utilisateur trouvé</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <>
            <div className="action-bar">
              <button className="btn btn-primary" onClick={() => setIsAddRoleModalOpen(true)}>
                <IoAdd />
                Créer un rôle
              </button>
            </div>

            <div className="roles-grid">
              {roles.map((role) => (
                <div key={role.roleId} className="role-card">
                  <div className="role-card-header">
                    <h3>{role.roleName}</h3>
                    {role.isSystemRole && <span className="badge badge-info">Système</span>}
                  </div>
                  <p className="role-description">{role.description}</p>
                  <div className="role-sections">
                    <p className="role-sections-title">
                      Sections autorisées ({role.allowedSections.length})
                    </p>
                    <div className="role-sections-list">
                      {role.allowedSections.map((sectionId) => {
                        const section = sections.find((s) => s.id === sectionId);
                        return (
                          <span key={sectionId} className="role-section-tag">
                            {section?.title || sectionId}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="role-card-footer">
                    <p className="role-meta">
                      Créé par {role.createdBy} le{' '}
                      {new Date(role.createdDate).toLocaleDateString('fr-FR')}
                    </p>
                    {!role.isSystemRole && (
                      <button
                        className="btn-icon btn-danger"
                        onClick={() => handleDeleteRole(role.roleId)}
                        title="Supprimer"
                      >
                        <IoTrash />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        title="Ajouter un utilisateur"
        size="large"
      >
        <UserForm onSubmit={handleAddUser} onCancel={() => setIsAddUserModalOpen(false)} />
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditUserModalOpen}
        onClose={() => {
          setIsEditUserModalOpen(false);
          setSelectedUser(null);
        }}
        title="Modifier l'utilisateur"
        size="large"
      >
        {selectedUser && (
          <UserForm
            initialData={selectedUser}
            onSubmit={handleEditUser}
            onCancel={() => {
              setIsEditUserModalOpen(false);
              setSelectedUser(null);
            }}
          />
        )}
      </Modal>

      {/* Edit Permissions Modal */}
      <Modal
        isOpen={isEditPermissionsModalOpen}
        onClose={() => {
          setIsEditPermissionsModalOpen(false);
          setSelectedUser(null);
        }}
        title="Gérer les permissions"
        size="large"
      >
        {selectedUser && (
          <PermissionsForm
            user={selectedUser}
            roles={roles}
            currentPermission={userPermissions.find((up) => up.userId === selectedUser.id)}
            onSubmit={(roleId, customSections) =>
              handleUpdatePermissions(selectedUser.id, roleId, customSections)
            }
            onCancel={() => {
              setIsEditPermissionsModalOpen(false);
              setSelectedUser(null);
            }}
          />
        )}
      </Modal>

      {/* Add Role Modal */}
      <Modal
        isOpen={isAddRoleModalOpen}
        onClose={() => setIsAddRoleModalOpen(false)}
        title="Créer un nouveau rôle"
        size="large"
      >
        <RoleForm onSubmit={handleAddRole} onCancel={() => setIsAddRoleModalOpen(false)} />
      </Modal>
    </div>
  );
};

// User Form Component
interface UserFormProps {
  initialData?: User;
  onSubmit: (user: any) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    department: initialData?.department || '',
    badgeNumber: initialData?.badgeNumber || '',
    email: initialData?.email || '',
    assignedBy: initialData?.assignedBy || 'Gov. Williams',
    assignedDate: initialData?.assignedDate || new Date().toISOString().split('T')[0],
    status: initialData?.status || 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...initialData, ...formData } : formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Nom complet *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="role">Fonction *</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Département *</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="badgeNumber">Badge / Matricule</label>
          <input
            type="text"
            id="badgeNumber"
            name="badgeNumber"
            value={formData.badgeNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Statut *</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} required>
            <option value="active">Actif</option>
            <option value="suspended">Suspendu</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
      </div>

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

// Permissions Form Component
interface PermissionsFormProps {
  user: User;
  roles: RolePermissions[];
  currentPermission?: UserPermission;
  onSubmit: (roleId: string, customSections?: SectionId[]) => void;
  onCancel: () => void;
}

const PermissionsForm: React.FC<PermissionsFormProps> = ({
  user,
  roles,
  currentPermission,
  onSubmit,
  onCancel,
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState(currentPermission?.roleId || '');
  const [useCustomSections, setUseCustomSections] = useState(!!currentPermission?.customSections);
  const [customSections, setCustomSections] = useState<SectionId[]>(
    currentPermission?.customSections || []
  );

  const selectedRole = roles.find((r) => r.roleId === selectedRoleId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedRoleId, useCustomSections ? customSections : undefined);
  };

  const toggleSection = (sectionId: SectionId) => {
    if (customSections.includes(sectionId)) {
      setCustomSections(customSections.filter((s) => s !== sectionId));
    } else {
      setCustomSections([...customSections, sectionId]);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="user-info-banner">
        <p>
          <strong>Utilisateur :</strong> {user.name}
        </p>
        <p>
          <strong>Fonction :</strong> {user.role}
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="roleId">Rôle système *</label>
        <select
          id="roleId"
          value={selectedRoleId}
          onChange={(e) => setSelectedRoleId(e.target.value)}
          required
        >
          <option value="">Sélectionner un rôle...</option>
          {roles.map((role) => (
            <option key={role.roleId} value={role.roleId}>
              {role.roleName} - {role.description}
            </option>
          ))}
        </select>
      </div>

      {selectedRole && (
        <div className="role-sections-preview">
          <p className="preview-title">Sections du rôle sélectionné :</p>
          <div className="sections-tags">
            {selectedRole.allowedSections.map((sectionId) => {
              const section = sections.find((s) => s.id === sectionId);
              return (
                <span key={sectionId} className="section-tag">
                  {section?.title || sectionId}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={useCustomSections}
            onChange={(e) => setUseCustomSections(e.target.checked)}
          />
          Utiliser des permissions personnalisées
        </label>
      </div>

      {useCustomSections && (
        <div className="custom-sections-grid">
          {sections.map((section) => (
            <label key={section.id} className="section-checkbox">
              <input
                type="checkbox"
                checked={customSections.includes(section.id as SectionId)}
                onChange={() => toggleSection(section.id as SectionId)}
              />
              {section.title}
            </label>
          ))}
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Annuler
        </button>
        <button type="submit" className="btn btn-primary">
          Appliquer les permissions
        </button>
      </div>
    </form>
  );
};

// Role Form Component
interface RoleFormProps {
  onSubmit: (role: Omit<RolePermissions, 'roleId'>) => void;
  onCancel: () => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    roleName: '',
    description: '',
    allowedSections: [] as SectionId[],
    isSystemRole: false,
    createdBy: 'Gov. Williams',
    createdDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleSection = (sectionId: SectionId) => {
    if (formData.allowedSections.includes(sectionId)) {
      setFormData({
        ...formData,
        allowedSections: formData.allowedSections.filter((s) => s !== sectionId),
      });
    } else {
      setFormData({
        ...formData,
        allowedSections: [...formData.allowedSections, sectionId],
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="roleName">Nom du rôle *</label>
        <input
          type="text"
          id="roleName"
          value={formData.roleName}
          onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Sections autorisées *</label>
        <div className="custom-sections-grid">
          {sections.map((section) => (
            <label key={section.id} className="section-checkbox">
              <input
                type="checkbox"
                checked={formData.allowedSections.includes(section.id as SectionId)}
                onChange={() => toggleSection(section.id as SectionId)}
              />
              {section.title}
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Annuler
        </button>
        <button type="submit" className="btn btn-primary">
          Créer le rôle
        </button>
      </div>
    </form>
  );
};

export default PermissionsPage;
