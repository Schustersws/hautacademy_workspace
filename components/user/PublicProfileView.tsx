
import React from 'react';
import { User, UserTitle } from '../../types';
import { Mail, Phone, Briefcase, Link as LinkIcon, MapPin, Award } from 'lucide-react';
import { TitleIcon } from '../helpers/TitleIcon';

const ProfileTitles: React.FC<{ titles: UserTitle[] }> = ({ titles }) => {
  if (!titles || titles.length === 0) {
    return null;
  }

  // Sort by priority to find the main title
  const sortedTitles = [...titles].sort((a, b) => (a.title.priority || 100) - (b.title.priority || 100));
  const mainTitle = sortedTitles[0];
  const otherTitles = sortedTitles.slice(1);

  return (
    <div className="bg-haut-dark/50 rounded-lg p-6 mt-6 border border-haut-border">
      <h3 className="text-white font-semibold mb-4">Títulos e Conquistas</h3>
      
      {mainTitle && (
        <div className="mb-6 p-4 bg-haut-surface rounded-lg border border-haut-border">
          <div className="flex items-center gap-4">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg"
              style={{ 
                backgroundColor: mainTitle.title.color + '20',
                color: mainTitle.title.color,
                border: `3px solid ${mainTitle.title.color}`
              }}
            >
              <TitleIcon iconKey={mainTitle.title.icon_key} />
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: mainTitle.title.color }}>TÍTULO PRINCIPAL</p>
              <h4 className="text-xl font-bold text-white">{mainTitle.title.name}</h4>
              <p className="text-haut-muted">Membro desde {new Date(mainTitle.granted_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      )}

      {otherTitles.length > 0 && (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {otherTitles.map(userTitle => (
              <div key={userTitle.id} className="group relative">
                <div 
                  className="w-full aspect-square rounded-lg flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition"
                  style={{ 
                    backgroundColor: userTitle.title.color + '20',
                    color: userTitle.title.color,
                    border: `1px solid ${userTitle.title.color}`
                  }}
                >
                  <TitleIcon iconKey={userTitle.title.icon_key} />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-haut-dark text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                  {userTitle.title.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-haut-dark rotate-45"></div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};


const PublicProfileView: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div className="animate-fadeIn bg-haut-surface rounded-lg overflow-hidden border border-haut-border">
            {/* Banner e Avatar */}
            <div className="relative h-48 bg-haut-dark">
                {user.banner_url && <img src={user.banner_url} alt="Banner" className="w-full h-full object-cover" />}
            </div>
            <div className="relative px-6">
                <div className="absolute -top-16">
                    <img src={user.avatar_url} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-haut-surface object-cover bg-haut-dark" />
                </div>
            </div>

            {/* User Info */}
            <div className="pt-20 px-6 pb-6">
                <h1 className="text-3xl font-bold text-white">{user.full_name}</h1>
                
                {user.show_business && user.business_name && (
                    <p className="text-lg text-haut-muted mt-1">{user.business_name}</p>
                )}

                {user.bio && (
                    <p className="text-haut-text mt-4 max-w-2xl">{user.bio}</p>
                )}

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {user.show_email && <InfoPill icon={<Mail size={16}/>} text={user.email} href={`mailto:${user.email}`} />}
                    {user.show_phone && <InfoPill icon={<Phone size={16}/>} text={user.phone} />}
                    {user.show_business && user.business_category && <InfoPill icon={<Briefcase size={16}/>} text={user.business_category} />}
                    {user.show_address && user.address && <InfoPill icon={<MapPin size={16}/>} text={user.address} />}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                    {user.show_social && user.instagram_url && <SocialLink href={user.instagram_url} text="Instagram" />}
                    {user.show_social && user.linkedin_url && <SocialLink href={user.linkedin_url} text="LinkedIn" />}
                    {user.show_social && user.website_url && <SocialLink href={user.website_url} text="Website" />}
                </div>

                <ProfileTitles titles={user.titles} />
            </div>
        </div>
    );
};

const InfoPill: React.FC<{ icon: React.ReactNode, text?: string, href?: string }> = ({ icon, text, href }) => {
    if (!text) return null;
    const content = (
        <div className="flex items-center gap-2 p-3 bg-haut-dark rounded-lg border border-haut-border w-full">
            <span className="text-haut-accent">{icon}</span>
            <span className="text-white">{text}</span>
        </div>
    );
    return href ? <a href={href}>{content}</a> : content;
};

const SocialLink: React.FC<{ href: string, text: string }> = ({ href, text }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-haut-dark border border-haut-border rounded-full hover:border-haut-accent hover:text-haut-accent transition">
        <LinkIcon size={14} />
        <span className="font-semibold">{text}</span>
    </a>
);


export default PublicProfileView;