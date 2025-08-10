
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HardHat } from 'lucide-react';

const Placeholder: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
    const location = useLocation();
    const dashboardPath = isAdmin ? '/admin/dashboard' : '/dashboard';

    return (
         <div className="flex flex-col items-center justify-center text-center p-8 bg-haut-dark min-h-screen">
            <HardHat className="text-haut-accent w-24 h-24 mb-6" />
            <h1 className="text-4xl font-bold text-white mb-2">Página em Construção</h1>
            <p className="text-lg text-haut-muted mb-4">A funcionalidade para <code className="bg-haut-surface px-2 py-1 rounded-md text-haut-accent">{location.pathname}</code> ainda está sendo desenvolvida.</p>
            <Link 
                to={dashboardPath} 
                className="px-6 py-3 bg-haut-accent text-haut-dark font-bold rounded-lg hover:brightness-90 transition"
            >
                Voltar para o Dashboard
            </Link>
        </div>
    );
};

export default Placeholder;
