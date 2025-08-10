
import React, { useState, useEffect, useCallback } from 'react';
import { getUsers } from '../../services/api';
import { User, UserFilters, Pagination } from '../../types';
import { Search, ChevronDown, UserPlus, Upload, Download, Edit, Eye, History, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<UserFilters>({
    search: '', status: 'all', role: 'all', subsidiary: 'all', tier: 'all', hasTitle: 'all', dateFrom: '', dateTo: ''
  });
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const fetchUsersData = useCallback(async () => {
    setLoading(true);
    const data = await getUsers(filters, { page: pagination.page, limit: pagination.limit });
    setUsers(data.users);
    setPagination(data.pagination);
    setLoading(false);
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPagination({ ...pagination, page: 1 }); // Reset to first page on filter change
  };
  
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(users.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };
  
  const StatusBadge = ({ status }: { status: User['status'] }) => {
    const styles = {
      approved: 'bg-green-500/10 text-green-400',
      pending: 'bg-yellow-500/10 text-yellow-400',
      suspended: 'bg-red-500/10 text-red-400',
      denied: 'bg-gray-500/10 text-gray-400',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{status}</span>;
  };
  
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Filters & Actions */}
      <div className="bg-haut-surface rounded-lg p-4 border border-haut-border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative md:col-span-2 lg:col-span-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-haut-muted" size={20} />
            <input type="text" name="search" placeholder="Buscar por nome, email, empresa..." value={filters.search} onChange={handleFilterChange} className="w-full pl-10 pr-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent" />
          </div>
          <select name="status" value={filters.status} onChange={handleFilterChange} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent"><option value="all">Todos os Status</option><option value="approved">Aprovado</option><option value="pending">Pendente</option><option value="suspended">Suspenso</option><option value="denied">Negado</option></select>
          <select name="role" value={filters.role} onChange={handleFilterChange} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent"><option value="all">Todos os Perfis</option><option value="admin">Admin</option><option value="user">Usuário</option></select>
          <select name="tier" value={filters.tier} onChange={handleFilterChange} className="w-full px-4 py-2 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent"><option value="all">Todos os Níveis</option><option value="gold">Gold</option><option value="silver">Silver</option><option value="bronze">Bronze</option></select>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 transition"><UserPlus size={18} /> Novo Usuário</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70 transition"><Upload size={18} /> Importar</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-haut-border text-white rounded-lg hover:bg-haut-border/70 transition"><Download size={18} /> Exportar</button>
          </div>
          {selectedUsers.length > 0 && (
             <div className="flex items-center gap-2 text-sm">
                <span className="text-white">{selectedUsers.length} selecionados</span>
                <button className="px-3 py-1 bg-haut-border text-white rounded hover:bg-haut-border/70">Alterar Status</button>
                <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40">Suspender</button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-haut-surface rounded-lg overflow-hidden border border-haut-border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-haut-border/20">
              <tr>
                <th className="p-4 w-12 text-left"><input type="checkbox" onChange={handleSelectAll} checked={selectedUsers.length === users.length && users.length > 0} className="w-4 h-4 rounded bg-haut-border border-haut-border text-haut-accent focus:ring-haut-accent"/></th>
                <th className="p-4 text-left text-sm font-semibold text-haut-muted">Usuário</th>
                <th className="p-4 text-left text-sm font-semibold text-haut-muted">Email/Telefone</th>
                <th className="p-4 text-left text-sm font-semibold text-haut-muted">Empresa/Subsidiária</th>
                <th className="p-4 text-left text-sm font-semibold text-haut-muted">Títulos</th>
                <th className="p-4 text-left text-sm font-semibold text-haut-muted">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-haut-muted">Último Acesso</th>
                <th className="p-4 text-left text-sm font-semibold text-haut-muted">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center p-8 text-haut-muted">Carregando usuários...</td></tr>
              ) : users.map(user => (
                <tr key={user.id} className="border-t border-haut-border hover:bg-haut-border/10">
                  <td className="p-4"><input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleSelectOne(user.id)} className="w-4 h-4 rounded bg-haut-border border-haut-border text-haut-accent focus:ring-haut-accent"/></td>
                  <td className="p-4"><div className="flex items-center gap-3"><img src={user.avatar_url} className="w-10 h-10 rounded-full object-cover bg-haut-border" alt="Avatar"/><div className="font-semibold text-white">{user.full_name}</div></div></td>
                  <td className="p-4"><p className="text-white">{user.email}</p><p className="text-sm text-haut-muted">{user.phone}</p></td>
                  <td className="p-4"><p className="text-white">{user.business_name}</p><p className="text-sm text-haut-muted">{user.subsidiary?.name}</p></td>
                  <td className="p-4"><div className="flex gap-1 flex-wrap">{user.titles.map(t => <span key={t.title.id} className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: t.title.color, color: '#0F0F0F'}}>{t.title.name}</span>)}</div></td>
                  <td className="p-4"><StatusBadge status={user.status} /></td>
                  <td className="p-4 text-haut-muted text-sm">{user.last_login_at ? new Date(user.last_login_at).toLocaleString('pt-BR') : 'Nunca'}</td>
                  <td className="p-4"><div className="flex gap-1"><button className="p-2 text-haut-muted hover:text-white"><Edit size={16}/></button><button className="p-2 text-haut-muted hover:text-white"><Eye size={16}/></button><button className="p-2 text-haut-muted hover:text-red-400"><XCircle size={16}/></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="p-4 border-t border-haut-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-haut-muted">Mostrando {users.length} de {pagination.total} usuários</p>
            <div className="flex items-center gap-2">
                <button onClick={() => setPagination(p => ({...p, page: p.page - 1}))} disabled={pagination.page <= 1} className="p-2 rounded-md bg-haut-border disabled:opacity-50"><ChevronLeft size={16}/></button>
                <span className="text-sm">Página {pagination.page} de {pagination.totalPages}</span>
                <button onClick={() => setPagination(p => ({...p, page: p.page + 1}))} disabled={pagination.page >= pagination.totalPages} className="p-2 rounded-md bg-haut-border disabled:opacity-50"><ChevronRight size={16}/></button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
