
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { requestAccess } from '../services/api';
import { AccessRequestData } from '../types';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const RequestAccessPage: React.FC = () => {
  const [formData, setFormData] = useState<Omit<AccessRequestData, 'terms_accepted'>>({
    full_name: '',
    email: '',
    phone: '',
    organization: '',
    role_requested: '',
    segment: '',
    invitation_code: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      setError('Você precisa aceitar os termos e a política de privacidade.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await requestAccess({ ...formData, terms_accepted: termsAccepted });
      setSuccess(true);
    } catch (err: any) {
      setError(err.error || 'Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-haut-dark flex items-center justify-center px-4 animate-fadeIn">
        <div className="max-w-md w-full text-center">
          <div className="bg-green-500/10 border border-green-500 p-8 rounded-lg">
            <CheckCircle className="text-green-400 w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Solicitação Recebida!
            </h2>
            <p className="text-haut-muted">
              Recebemos sua solicitação de acesso. Você será notificado por e-mail 
              assim que sua solicitação for revisada pela nossa equipe.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 px-6 py-3 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 transition"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-haut-dark py-12 px-4 animate-fadeIn">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Solicitar Acesso</h2>
          <p className="text-haut-muted mt-2">
            Peça acesso ao ecossistema Haut. Responderemos por e-mail.
          </p>
        </div>

        <div className="bg-haut-surface p-8 rounded-lg border border-haut-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg flex items-center gap-2">
                <AlertTriangle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-haut-muted mb-2">Nome Completo *</label>
                <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} className="w-full px-4 py-3 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-haut-muted mb-2">E-mail Corporativo *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-haut-muted mb-2">Telefone/WhatsApp</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent" placeholder="(00) 00000-0000" />
              </div>

              <div>
                <label className="block text-sm font-medium text-haut-muted mb-2">Organização/Unidade *</label>
                <input type="text" name="organization" required value={formData.organization} onChange={handleChange} className="w-full px-4 py-3 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-haut-muted mb-2">Perfil Solicitado *</label>
                <select name="role_requested" required value={formData.role_requested} onChange={handleChange} className="w-full px-4 py-3 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent appearance-none">
                  <option value="">Selecione...</option>
                  <option value="parceiro">Parceiro</option>
                  <option value="aluno">Aluno</option>
                  <option value="instrutor">Instrutor</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-haut-muted mb-2">Segmento/Vertical *</label>
                <select name="segment" required value={formData.segment} onChange={handleChange} className="w-full px-4 py-3 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent appearance-none">
                  <option value="">Selecione...</option>
                  <option value="medical">Medical</option>
                  <option value="beauty">Beauty</option>
                  <option value="tech">Tech</option>
                  <option value="clinics">Clinics</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-haut-muted mb-2">Código de Convite (opcional)</label>
                <input type="text" name="invitation_code" value={formData.invitation_code} onChange={handleChange} className="w-full px-4 py-3 bg-haut-dark border border-haut-border rounded-lg text-white focus:outline-none focus:border-haut-accent" placeholder="Se você recebeu um código de convite" />
              </div>
            </div>

            <div>
              <label className="flex items-start text-haut-muted">
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1 mr-3 h-4 w-4 rounded bg-haut-border border-haut-border text-haut-accent focus:ring-haut-accent"/>
                <span className="text-sm">
                  Li e aceito os <Link to="/terms" className="text-haut-accent hover:underline">Termos de Uso</Link> e 
                  a <Link to="/privacy" className="text-haut-accent hover:underline">Política de Privacidade</Link> do 
                  Haut Academy Workspace.
                </span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 transition disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Enviando...' : 'Enviar Solicitação'}
            </button>
          </form>
        </div>

        <p className="text-center text-haut-muted/70 text-sm mt-6">
          Já tem uma conta? <Link to="/login" className="text-haut-accent hover:underline font-semibold">Fazer Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RequestAccessPage;
