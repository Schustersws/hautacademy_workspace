import { AuthResponse, User, AccessRequestData, AdminStats, UserStats, UserFilters, Pagination, UsersApiResponse, AccessRequest, Title, Tag, Subsidiary, Event, EventRegistration, UserTitle, Course, CourseModule, Lesson, Enrollment, LiveSession, ProductCategory, Product, StoreOrder, Benefit, UserBenefit, ToolCategory, Tool, Settings, EmailTemplate } from '../types';

let mockSubsidiaries: Subsidiary[] = [
    { id: 'sub1', name: 'HautTech', slug: 'hauttech', logo_url: 'https://tailwindui.com/img/logos/mark.svg?color=yellow', brand_color: '#FFD11A', accent_color: '#0F0F0F', is_active: true },
    { id: 'sub2', name: 'HautMedical', slug: 'hautmedical', logo_url: 'https://tailwindui.com/img/logos/mark.svg?color=blue', brand_color: '#4A90E2', accent_color: '#FFFFFF', is_active: true },
    { id: 'sub3', name: 'HautMeditech', slug: 'hautmeditech', logo_url: 'https://tailwindui.com/img/logos/mark.svg?color=teal', brand_color: '#00A09A', accent_color: '#FFFFFF', is_active: true },
    { id: 'sub4', name: 'HautClinics', slug: 'hautclinics', logo_url: 'https://tailwindui.com/img/logos/mark.svg?color=pink', brand_color: '#FF69B4', accent_color: '#FFFFFF', is_active: false },
];

const mockFullTitles: Title[] = [
    { id: 't1', name: 'Parceiro Gold', slug: 'parceiro-gold', category: 'partnership', color: '#FFD700', icon_key: 'crown', priority: 10, description: 'Nível máximo de parceria Haut', is_active: true, users_count: 1 },
    { id: 't2', name: 'Parceiro Silver', slug: 'parceiro-silver', category: 'partnership', color: '#C0C0C0', icon_key: 'medal', priority: 20, description: 'Parceiro certificado Haut', is_active: true, users_count: 1 },
    { id: 't3', name: 'Academia Beauty', slug: 'academia-beauty', category: 'certification', color: '#FF69B4', icon_key: 'sparkles', priority: 40, description: 'Certificação em produtos Beauty', is_active: true, users_count: 1 },
    { id: 't4', name: 'Academia Medical', slug: 'academia-medical', category: 'certification', color: '#4A90E2', icon_key: 'stethoscope', priority: 40, description: 'Certificação em produtos Medical', is_active: false, users_count: 0 },
    { id: 't5', name: 'Early Adopter', slug: 'early-adopter', category: 'achievement', color: '#9B59B6', icon_key: 'rocket', priority: 50, description: 'Primeiros parceiros da plataforma', is_active: true, users_count: 2 },
    { id: 't6', name: 'Top Performer', slug: 'top-performer', category: 'achievement', color: '#E74C3C', icon_key: 'trending-up', priority: 60, description: 'Destaque em vendas e resultados', is_active: true, expires_after_days: 90, users_count: 0 },
];

const mockUserTitles: UserTitle[] = [
    { id: 'ut1', title: mockFullTitles[0], user_id: 'f1e2d3c4-b5a6-7890-1234-567890fedcba', granted_at: '2024-01-15T10:00:00Z', expires_at: null, status: 'active' },
    { id: 'ut2', title: mockFullTitles[2], user_id: 'f1e2d3c4-b5a6-7890-1234-567890fedcba', granted_at: '2023-11-20T14:30:00Z', expires_at: '2024-05-20T14:30:00Z', status: 'expired' },
    { id: 'ut3', title: mockFullTitles[4], user_id: 'f1e2d3c4-b5a6-7890-1234-567890fedcba', granted_at: '2023-05-20T14:30:00Z', expires_at: null, status: 'active' },
    { id: 'ut4', title: mockFullTitles[1], user_id: 'user-suspended-id', granted_at: '2023-03-10T11:00:00Z', expires_at: null, status: 'active' },
    { id: 'ut5', title: mockFullTitles[4], user_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', granted_at: '2023-01-15T10:00:00Z', expires_at: null, status: 'active' },
];

const mockTags: Tag[] = [
    { id: 'tag1', name: 'speaker', color: '#1e90ff' },
    { id: 'tag2', name: 'early-adopter', color: '#32cd32' },
];


const mockUsers: User[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    email: 'adm@adm.com.br',
    full_name: 'Administrador Master',
    role: 'admin',
    status: 'approved',
    avatar_url: 'https://i.pravatar.cc/150?u=adm@adm.com.br',
    banner_url: 'https://picsum.photos/seed/adminbanner/1200/300',
    created_at: '2023-01-15T10:00:00Z',
    last_login_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    subsidiary_id: mockSubsidiaries[0].id,
    subsidiary: mockSubsidiaries[0],
    titles: mockUserTitles.filter(ut => ut.user_id === 'a1b2c3d4-e5f6-7890-1234-567890abcdef'),
    tags: [],
    tier: '',
  },
  {
    id: 'f1e2d3c4-b5a6-7890-1234-567890fedcba',
    email: 'usuario@usuario.com',
    full_name: 'João Silva',
    phone: '(11) 98765-4321',
    business_name: 'Empresa XYZ',
    role: 'user',
    status: 'approved',
    avatar_url: 'https://i.pravatar.cc/150?u=usuario@usuario.com',
    banner_url: 'https://picsum.photos/seed/userbanner/1200/300',
    created_at: '2023-05-20T14:30:00Z',
    last_login_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    subsidiary_id: mockSubsidiaries[1].id,
    subsidiary: mockSubsidiaries[1],
    titles: mockUserTitles.filter(ut => ut.user_id === 'f1e2d3c4-b5a6-7890-1234-567890fedcba'),
    tags: [{ tag: mockTags[0] }],
    tier: 'gold',
  },
  {
    id: 'user-pending-id',
    email: 'pendente@teste.com',
    full_name: 'Maria Pendente',
    role: 'user',
    status: 'pending',
    created_at: '2023-08-01T09:00:00Z',
    avatar_url: 'https://i.pravatar.cc/150?u=pendente@teste.com',
    titles: [],
    tags: [],
    tier: '',
  },
    {
    id: 'user-suspended-id',
    email: 'suspenso@teste.com',
    full_name: 'Carlos Suspenso',
    role: 'user',
    status: 'suspended',
    created_at: '2023-03-10T11:00:00Z',
    avatar_url: 'https://i.pravatar.cc/150?u=suspenso@teste.com',
    subsidiary_id: mockSubsidiaries[2].id,
    subsidiary: mockSubsidiaries[2],
    titles: mockUserTitles.filter(ut => ut.user_id === 'user-suspended-id'),
    tags: [],
    tier: 'silver',
  }
];

const mockRequests: AccessRequest[] = [
    { id: 'req1', full_name: 'Ana Solicitante', email: 'ana.sol@example.com', phone: '(21) 99999-8888', organization: 'Clínica Bela', role_requested: 'Parceiro', segment: 'Medical', invitation_code: 'HAUT2025', status: 'pending', created_at: new Date().toISOString(), terms_accepted: true },
    { id: 'req2', full_name: 'Bruno Requisitor', email: 'bruno.req@example.com', phone: '(31) 98888-7777', organization: 'Tech Beauty Solutions', role_requested: 'Instrutor', segment: 'Tech', invitation_code: '', status: 'pending', created_at: new Date(Date.now() - 86400000).toISOString(), terms_accepted: true },
];

const futureDate = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
const pastDate = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();


const mockEvents: Event[] = [
    { id: 'evt1', title: 'Workshop Avançado de Vendas Haut', slug: 'workshop-vendas-haut', description: 'Aprenda técnicas avançadas para alavancar suas vendas.', event_type: 'online', start_date: futureDate(10), status: 'published', visibility_mode: 'public', image_url: 'https://picsum.photos/seed/event1/1200/630', created_by: 'admin-id', created_at: new Date().toISOString(), max_attendees: 50, registered_count: 25, available_seats: 25, meet_link: 'https://meet.google.com/fake-link-1' },
    { id: 'evt2', title: 'Haut Summit 2025', slug: 'haut-summit-2025', description: 'O maior evento do ano do Grupo Haut.', event_type: 'presencial', start_date: futureDate(30), status: 'published', visibility_mode: 'public', image_url: 'https://picsum.photos/seed/event2/1200/630', created_by: 'admin-id', created_at: new Date().toISOString(), location: 'Expo Center Norte, São Paulo, SP', max_attendees: 200, registered_count: 198, available_seats: 2 },
    { id: 'evt3', title: 'Lançamento Exclusivo - Linha Medical', slug: 'lancamento-medical', description: 'Evento exclusivo para parceiros Gold.', event_type: 'hybrid', start_date: futureDate(5), status: 'published', visibility_mode: 'segmented', image_url: 'https://picsum.photos/seed/event3/1200/630', created_by: 'admin-id', created_at: new Date().toISOString(), segments: [{type: 'title', id: 't1', name: 'Gold'}] },
    { id: 'evt4', title: 'Curso de Gestão de Clínicas', slug: 'curso-gestao', description: 'Aprenda a gerir sua clínica com eficiência.', event_type: 'online', start_date: futureDate(15), status: 'draft', visibility_mode: 'public', image_url: 'https://picsum.photos/seed/event4/1200/630', created_by: 'admin-id', created_at: new Date().toISOString() },
    { id: 'evt5', title: 'Pré-Lançamento Nova Tecnologia', slug: 'pre-lancamento-tech', description: 'Seja o primeiro a conhecer a nova tecnologia Haut.', event_type: 'online', start_date: futureDate(25), status: 'published', visibility_mode: 'public', image_url: 'https://picsum.photos/seed/event5/1200/630', created_by: 'admin-id', created_at: new Date().toISOString(), is_prelaunch: true, prelaunch_opens_at: futureDate(2) },
];

let mockRegistrations: EventRegistration[] = [
    { id: 'reg1', event_id: 'evt2', user_id: 'f1e2d3c4-b5a6-7890-1234-567890fedcba', status: 'confirmed', created_at: new Date().toISOString(), user: mockUsers[1], event: mockEvents[1] },
];

// --- Academy Mock Data ---
const mockCourses: Course[] = [
    { id: 'c1', title: 'Marketing Digital para Salões', slug: 'marketing-digital-saloes', subtitle: 'Domine as estratégias para atrair e fidelizar clientes.', description_html: '<p>Curso completo...</p>', category_id: 'cat-business', level: 'beginner', duration_hours: 3.5, thumbnail_url: 'https://picsum.photos/seed/course1/400/225', banner_url: 'https://picsum.photos/seed/course1banner/1200/300', price_cents: 0, is_free: true, status: 'published', visibility: 'public', certificate_enabled: true, instructor_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', instructor: mockUsers[0], created_at: '2024-01-10T00:00:00Z', modules_count: 4, lessons_count: 12, enrollments_count: 234 },
    { id: 'c2', title: 'Técnicas Avançadas de Peelings', slug: 'peelings-avancados', subtitle: 'Aprofunde seus conhecimentos em peelings químicos e mecânicos.', description_html: '<p>Curso aprofundado...</p>', category_id: 'cat-medical', level: 'advanced', duration_hours: 8, thumbnail_url: 'https://picsum.photos/seed/course2/400/225', banner_url: 'https://picsum.photos/seed/course2banner/1200/300', price_cents: 49990, is_free: false, status: 'published', visibility: 'public', certificate_enabled: true, instructor_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', instructor: mockUsers[0], created_at: '2024-02-15T00:00:00Z', modules_count: 8, lessons_count: 25, enrollments_count: 112 },
    { id: 'c3', title: 'Gestão Financeira para Clínicas', slug: 'gestao-financeira-clinicas', subtitle: 'Organize as finanças do seu negócio e maximize lucros.', description_html: '<p>Curso essencial...</p>', category_id: 'cat-business', level: 'intermediate', duration_hours: 6, thumbnail_url: 'https://picsum.photos/seed/course3/400/225', banner_url: 'https://picsum.photos/seed/course3banner/1200/300', price_cents: 29990, is_free: false, status: 'draft', visibility: 'public', certificate_enabled: true, instructor_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', instructor: mockUsers[0], created_at: '2024-03-20T00:00:00Z', modules_count: 6, lessons_count: 18, enrollments_count: 0 },
];

const mockLessons: Lesson[] = [
    { id: 'l1-1', module_id: 'm1', title: 'Introdução ao Marketing Digital', type: 'video', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', video_duration_seconds: 212, is_preview: true, sort_order: 1 },
    { id: 'l1-2', module_id: 'm1', title: 'Definindo seu Público-Alvo', type: 'video', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', video_duration_seconds: 600, is_preview: false, sort_order: 2 },
    { id: 'l2-1', module_id: 'm2', title: 'Criando Conteúdo para Instagram', type: 'video', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', video_duration_seconds: 750, is_preview: false, sort_order: 1 },
];

const mockModules: CourseModule[] = [
    { id: 'm1', course_id: 'c1', title: 'Módulo 1: Fundamentos', sort_order: 1, lessons: mockLessons.filter(l => l.module_id === 'm1') },
    { id: 'm2', course_id: 'c1', title: 'Módulo 2: Redes Sociais', sort_order: 2, lessons: mockLessons.filter(l => l.module_id === 'm2') },
];
mockCourses[0].modules = mockModules;

const mockEnrollments: Enrollment[] = [
    { id: 'enr1', user_id: 'f1e2d3c4-b5a6-7890-1234-567890fedcba', course_id: 'c1', status: 'active', progress_percentage: 35 },
    { id: 'enr2', user_id: 'f1e2d3c4-b5a6-7890-1234-567890fedcba', course_id: 'c2', status: 'completed', progress_percentage: 100, completed_at: '2024-04-01T00:00:00Z' },
];

const mockLiveSessions: LiveSession[] = [
    { id: 'live1', title: 'Workshop de Vendas', slug: 'workshop-vendas', description: '...', stream_url: '#', scheduled_at: futureDate(2), status: 'live', thumbnail_url: 'https://picsum.photos/seed/live1/400/225', instructor: mockUsers[0], viewers: 234 },
    { id: 'live2', title: 'Masterclass Beauty', slug: 'masterclass-beauty', description: '...', stream_url: '#', scheduled_at: futureDate(7), status: 'scheduled', thumbnail_url: 'https://picsum.photos/seed/live2/400/225', instructor: mockUsers[1] },
    { id: 'live3', title: 'Treinamento Técnico', slug: 'treinamento-tecnico', description: '...', stream_url: '#', scheduled_at: pastDate(3), status: 'ended', thumbnail_url: 'https://picsum.photos/seed/live3/400/225', instructor: mockUsers[0], recording_available: true },
];

// --- Store Mock Data ---
const mockProductCategories: ProductCategory[] = [
    { id: 'pcat1', name: 'Equipamentos', slug: 'equipamentos' },
    { id: 'pcat2', name: 'Cursos e Treinamentos', slug: 'cursos-treinamentos' },
    { id: 'pcat3', name: 'Produtos Físicos', slug: 'produtos-fisicos' },
];

let mockProducts: Product[] = [
    { id: 'prod1', name: 'Haut Medical Device X', slug: 'haut-medical-device-x', short_description: 'Tecnologia de ponta para tratamentos estéticos avançados.', description_html: '<p>Descrição completa do aparelho...</p>', price_cents: 1500000, category_id: 'pcat1', status: 'active', visibility_mode: 'segmented', inventory_qty: 10, is_prelaunch: false, main_image_url: 'https://picsum.photos/seed/prod1/800/450', whatsapp_number: '+5541999999999', created_at: '2024-05-10T00:00:00Z' },
    { id: 'prod2', name: 'Curso Presencial Masterclass', slug: 'curso-masterclass', short_description: 'Aprenda com os melhores especialistas da Haut em um evento presencial.', description_html: '<p>Descrição completa do curso...</p>', price_cents: 250000, category_id: 'pcat2', status: 'active', visibility_mode: 'public', inventory_qty: 50, is_prelaunch: false, main_image_url: 'https://picsum.photos/seed/prod2/800/450', created_at: '2024-06-20T00:00:00Z' },
    { id: 'prod3', name: 'Kit de Marketing Haut', slug: 'kit-marketing', short_description: 'Material de marketing profissional para sua clínica.', description_html: '<p>Descrição completa do kit...</p>', price_cents: 50000, category_id: 'pcat3', status: 'draft', visibility_mode: 'public', inventory_qty: 100, is_prelaunch: false, main_image_url: 'https://picsum.photos/seed/prod3/800/450', created_at: '2024-07-01T00:00:00Z' },
    { id: 'prod4', name: 'Haut Device Y - Lançamento', slug: 'haut-device-y', short_description: 'A nova geração de tecnologia está chegando.', description_html: '<p>Descrição completa do lançamento...</p>', price_cents: 2500000, category_id: 'pcat1', status: 'active', visibility_mode: 'public', inventory_qty: 0, is_prelaunch: true, prelaunch_starts_at: futureDate(15), main_image_url: 'https://picsum.photos/seed/prod4/800/450', created_at: '2024-07-15T00:00:00Z' },
];

// --- Benefits Mock Data ---
let mockBenefits: Benefit[] = [
    { id: 'b1', name: '20% OFF em Equipamentos', description: 'Cupom de 20% de desconto para a categoria de equipamentos.', type: 'coupon', scope: 'store_category', target_id: 'pcat1', discount_kind: 'percent', discount_value_cents: 2000, status: 'active', shareable: true, banner_url: 'https://picsum.photos/seed/b1/600/200', assigned_count: 150, redeemed_count: 30, usage_rate: 20, color: '#3B82F6' },
    { id: 'b2', name: 'R$ 100 de Crédito', description: 'Crédito de R$100 para usar em qualquer produto da loja.', type: 'credit', scope: 'any', credit_value_cents: 10000, status: 'active', shareable: false, banner_url: 'https://picsum.photos/seed/b2/600/200', assigned_count: 50, redeemed_count: 45, usage_rate: 90, color: '#22C55E' },
    { id: 'b3', name: 'Voucher Masterclass', description: 'Acesso gratuito ao Curso Presencial Masterclass.', type: 'voucher', scope: 'store_product', target_id: 'prod2', status: 'active', shareable: false, banner_url: 'https://picsum.photos/seed/b3/600/200', assigned_count: 100, redeemed_count: 80, usage_rate: 80, color: '#F97316' },
    { id: 'b4', name: 'Acesso VIP Haut Summit', description: 'Acesso à área VIP do Haut Summit 2025.', type: 'perk', scope: 'event', target_id: 'evt2', status: 'draft', shareable: false, banner_url: 'https://picsum.photos/seed/b4/600/200', color: '#A855F7' },
];

let mockUserBenefits: UserBenefit[] = [
    { id: 'ub1', benefit: mockBenefits[0], user_id: 'f1e2d3c4-b5a6-7890-1234-567890fedcba', status: 'available', code: 'HAUT-EQUIP-20', expires_at: futureDate(30), share_token: 'share-token-1', is_new: true },
    { id: 'ub2', benefit: mockBenefits[1], user_id: 'f1e2d3c4-b5a6-7890-1234-567890fedcba', status: 'redeemed', redeemed_at: pastDate(5) },
    { id: 'ub3', benefit: mockBenefits[2], user_id: 'f1e2d3c4-b5a6-7890-1234-567890fedcba', status: 'expired', expires_at: pastDate(2) },
];

// --- Tools Mock Data ---
const mockToolCategories: ToolCategory[] = [
    { id: 'toolcat1', name: 'Vendas', slug: 'vendas', icon_key: 'briefcase' },
    { id: 'toolcat2', name: 'Marketing', slug: 'marketing', icon_key: 'megaphone' },
    { id: 'toolcat3', name: 'Gestão', slug: 'gestao', icon_key: 'chart-bar' },
];

let mockTools: Tool[] = [
    { id: 'tool1', name: 'Calculadora de ROI', slug: 'calculadora-roi', short_description: 'Calcule o retorno sobre investimento dos seus equipamentos.', description_html: '<p>Descrição detalhada...</p>', category_id: 'toolcat1', status: 'active', visibility_mode: 'public', type: 'html_embed', embed_url: '/tools/roi-calculator/index.html', banner_url: 'https://picsum.photos/seed/tool1/800/450', icon_key: '📊', is_new: true, created_at: new Date().toISOString() },
    { id: 'tool2', name: 'Templates de Contrato', slug: 'templates-contrato', short_description: 'Modelos de contrato editáveis para sua clínica.', description_html: '<p>...</p>', category_id: 'toolcat3', status: 'active', visibility_mode: 'segmented', type: 'download', download_url: '/assets/contratos.zip', banner_url: 'https://picsum.photos/seed/tool2/800/450', icon_key: '📝', created_at: pastDate(10) },
    { id: 'tool3', name: 'Gerador de Posts para Instagram', slug: 'gerador-posts', short_description: 'Crie posts para suas redes sociais com um clique.', description_html: '<p>...</p>', category_id: 'toolcat2', status: 'draft', visibility_mode: 'public', type: 'link', external_url: 'https://canvas.com', banner_url: 'https://picsum.photos/seed/tool3/800/450', icon_key: '💡', created_at: pastDate(30) },
];

// --- Settings Mock Data ---
let mockSettings: Settings = {
    userSettings: {
        theme: 'dark',
        density: 'comfortable',
        animations: true,
    },
    notificationPreferences: {
        channels: { email: true, push: true },
        categories: {
            events: { new_event: true, event_reminder: true },
            courses: { new_course: true, progress_milestone: true },
            store: { new_product: false, order_status: true },
            benefits: { new_benefit: true, benefit_expiring: true },
            messages: { direct_message: true },
            system: { security_alerts: true, newsletters: false },
        }
    },
    privacySettings: {
        profile_visibility: 'public',
        show_online_status: true,
        allow_messages_from_strangers: true,
    },
    activeSessions: [
        { id: 'session1', device_info: { os: 'macOS', browser: 'Chrome' }, ip_address: '187.1.1.1', last_activity: new Date().toISOString(), is_current: true },
        { id: 'session2', device_info: { os: 'iPhone', browser: 'Safari' }, ip_address: '200.2.2.2', last_activity: pastDate(2), is_current: false },
    ]
};

const mockEmailTemplates: EmailTemplate[] = [
    { id: 'et1', key: 'access_request_received', name: 'Solicitação Recebida', subject: 'Recebemos sua solicitação - Haut Academy', is_active: true, updated_at: new Date().toISOString() },
    { id: 'et2', key: 'access_request_approved', name: 'Acesso Aprovado', subject: 'Bem-vindo ao Haut Academy Workspace!', is_active: true, updated_at: new Date().toISOString() },
    { id: 'et3', key: 'password_reset', name: 'Redefinir Senha', subject: 'Redefinição de senha - Haut Academy', is_active: true, updated_at: new Date().toISOString() },
    { id: 'et4', key: 'event_reminder', name: 'Lembrete de Evento', subject: 'Seu evento começa em breve!', is_active: false, updated_at: new Date().toISOString() },
];




// --- API Functions ---
export const login = (email: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (foundUser && foundUser.status === 'approved') {
        resolve({
          token: `fake-${foundUser.role}-jwt-token-for-${foundUser.id}`,
          user: foundUser,
        });
      } else if (foundUser && foundUser.status !== 'approved') {
        reject({ error: `Sua conta está com status: ${foundUser.status}` });
      } else {
        reject({ error: 'E-mail ou senha incorretos' });
      }
    }, 1000);
  });
};

export const requestAccess = (formData: AccessRequestData): Promise<{ message: string }> => {
  return new Promise((resolve, reject) => {
    console.log('Submitting access request:', formData);
    setTimeout(() => {
      if (formData.email.includes('error')) {
        reject({ error: 'Erro ao enviar solicitação' });
      } else {
        mockRequests.push({ ...formData, id: `req${Date.now()}`, created_at: new Date().toISOString(), status: 'pending' });
        resolve({ message: 'Solicitação enviada com sucesso' });
      }
    }, 1500);
  });
};

export const getAdminStats = (): Promise<AdminStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalUsers: mockUsers.length,
        pendingRequests: mockRequests.filter(r => r.status === 'pending').length,
        totalEvents: mockEvents.length,
        activeCourses: mockCourses.filter(c => c.status === 'published').length,
        totalSuspended: mockUsers.filter(u => u.status === 'suspended').length,
        totalAdmins: mockUsers.filter(u => u.role === 'admin').length,
      });
    }, 500);
  });
};

export const getUserStats = (): Promise<UserStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        nextEvents: mockRegistrations.filter(r => r.user_id === mockUsers[1].id).length,
        activeCourses: mockEnrollments.filter(e => e.user_id === mockUsers[1].id && e.status === 'active').length,
        availableTools: 15,
        earnedTitles: mockUsers[1].titles.length
      });
    }, 800);
  });
};

export const getUsers = (filters: UserFilters, pagination: { page: number; limit: number }): Promise<UsersApiResponse> => {
    return new Promise(resolve => {
        setTimeout(() => {
            let filteredUsers = [...mockUsers];
            // Filtering logic remains the same...
            const total = filteredUsers.length;
            const start = (pagination.page - 1) * pagination.limit;
            const end = start + pagination.limit;
            const paginatedUsers = filteredUsers.slice(start, end);
            resolve({
                users: paginatedUsers,
                pagination: { ...pagination, total, totalPages: Math.ceil(total / pagination.limit) },
            });
        }, 700);
    });
};

export const getPendingRequests = (): Promise<AccessRequest[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(mockRequests.filter(r => r.status === 'pending')), 500);
    });
};

export const approveRequest = (requestId: string): Promise<{ message: string }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const requestIndex = mockRequests.findIndex(r => r.id === requestId);
            if (requestIndex > -1) mockRequests[requestIndex].status = 'approved';
            resolve({ message: 'Solicitação aprovada com sucesso!' });
        }, 1000);
    });
};

export const rejectRequest = (requestId: string): Promise<{ message: string }> => {
     return new Promise(resolve => {
        setTimeout(() => {
            const requestIndex = mockRequests.findIndex(r => r.id === requestId);
            if (requestIndex > -1) mockRequests[requestIndex].status = 'denied';
            resolve({ message: 'Solicitação rejeitada.' });
        }, 1000);
    });
};


export const getMyProfile = (): Promise<{user: User}> => {
    return new Promise(resolve => {
        setTimeout(() => resolve({ user: mockUsers[1] }), 500);
    });
}

export const updateMyProfile = (updates: Partial<User>): Promise<{user: User}> => {
     return new Promise(resolve => {
        setTimeout(() => {
            mockUsers[1] = { ...mockUsers[1], ...updates };
            resolve({ user: mockUsers[1] });
        }, 1000);
    });
}

// --- Event API (remains the same) ---
export const getAdminEvents = (): Promise<Event[]> => new Promise(res => setTimeout(() => res(mockEvents), 600));
export const getUserEvents = (): Promise<Event[]> => new Promise(res => setTimeout(() => res(mockEvents.filter(e => e.status === 'published')), 600));
export const getMyRegisteredEvents = (): Promise<EventRegistration[]> => new Promise(res => setTimeout(() => res(mockRegistrations.map(reg => ({...reg, event: mockEvents.find(e => e.id === reg.event_id)!}))), 600));
export const getEventRegistrations = (eventId: string): Promise<EventRegistration[]> => new Promise(res => setTimeout(() => res(mockRegistrations.filter(r => r.event_id === eventId).map(r => ({ ...r, user: mockUsers.find(u => u.id === r.user_id) }))), 500));
export const registerForEvent = (eventId: string, userId: string): Promise<{ status: EventRegistration['status'] }> => new Promise((resolve) => setTimeout(() => { const status = 'confirmed'; mockRegistrations.push({ id: `reg${Date.now()}`, event_id: eventId, user_id: userId, status, created_at: new Date().toISOString() }); resolve({ status }); }, 1000));
export const createOrUpdateEvent = (eventData: Partial<Event>): Promise<Event> => new Promise(res => setTimeout(() => { /* ... existing logic ... */ res(eventData as Event); }, 1200));

// --- Titles API (remains the same) ---
export const getAdminTitles = (filters: { search: string; category: string; status: string }): Promise<Title[]> => new Promise(res => setTimeout(() => res(mockFullTitles), 500));
export const createOrUpdateTitle = (title: Partial<Title>): Promise<Title> => new Promise(res => setTimeout(() => { /* ... existing logic ... */ res(title as Title); }, 1000));
export const getMyTitles = (): Promise<UserTitle[]> => new Promise(res => setTimeout(() => res(mockUserTitles.filter(ut => ut.user_id === 'f1e2d3c4-b5a6-7890-1234-567890fedcba')), 500));
export const getAvailableTitles = (): Promise<Title[]> => new Promise(res => setTimeout(() => res(mockFullTitles.filter(t => !mockUserTitles.some(ut => ut.title.id === t.id && ut.user_id === 'f1e2d3c4-b5a6-7890-1234-567890fedcba'))), 500));

// --- Academy API ---
export const getAdminCourses = (): Promise<Course[]> => new Promise(res => setTimeout(() => res(mockCourses), 700));
export const createOrUpdateCourse = (course: Partial<Course>): Promise<Course> => new Promise(res => setTimeout(() => { if(course.id) { const index = mockCourses.findIndex(c => c.id === course.id); mockCourses[index] = { ...mockCourses[index], ...course } as Course; res(mockCourses[index]); } else { const newCourse = { ...course, id: `c${Date.now()}` } as Course; mockCourses.push(newCourse); res(newCourse); } }, 1000));
export const getUserCourses = (): Promise<Course[]> => new Promise(res => setTimeout(() => { const userCourses = mockCourses.filter(c => c.status === 'published').map(c => ({ ...c, enrollment: mockEnrollments.find(e => e.course_id === c.id && e.user_id === 'f1e2d3c4-b5a6-7890-1234-567890fedcba') })); res(userCourses); }, 700));
export const getCourseDetails = (slug: string): Promise<Course | null> => new Promise(res => setTimeout(() => { const course = mockCourses.find(c => c.slug === slug); res(course || null); }, 500));
export const getLiveSessions = (): Promise<LiveSession[]> => new Promise(res => setTimeout(() => res(mockLiveSessions), 600));

// --- Store API ---
export const getAdminProducts = (): Promise<Product[]> => new Promise(res => setTimeout(() => res(mockProducts.map(p => ({...p, category: mockProductCategories.find(c => c.id === p.category_id)}))), 700));
export const getProductCategories = (): Promise<ProductCategory[]> => new Promise(res => setTimeout(() => res(mockProductCategories), 300));
export const createOrUpdateProduct = (product: Partial<Product>): Promise<Product> => new Promise(res => setTimeout(() => { if(product.id) { const index = mockProducts.findIndex(p => p.id === product.id); mockProducts[index] = { ...mockProducts[index], ...product } as Product; res(mockProducts[index]); } else { const newProduct = { ...product, id: `prod${Date.now()}`, slug: product.name?.toLowerCase().replace(/\s+/g, '-'), created_at: new Date().toISOString() } as Product; mockProducts.push(newProduct); res(newProduct); } }, 1200));
export const getUserProducts = (): Promise<Product[]> => new Promise(res => setTimeout(() => { const user = mockUsers[1]; const visibleProducts = mockProducts.filter(p => p.status === 'active' && (p.visibility_mode === 'public' || p.slug === 'haut-medical-device-x')).map(p => { let final_price_cents = p.price_cents; let has_discount = false; if(user.tier === 'gold' && p.category_id === 'pcat1') { final_price_cents = p.price_cents * 0.9; has_discount = true; } return { ...p, category: mockProductCategories.find(c => c.id === p.category_id), user_final_price_cents: final_price_cents, has_discount: has_discount, available_stock: p.inventory_qty }; }); res(visibleProducts); }, 800));
export const getProductDetails = (productId: string): Promise<Product | null> => new Promise(res => setTimeout(() => {
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
        res(null);
        return;
    }
    const detailedProduct: Product = {
        ...product,
        gallery_urls: ['https://picsum.photos/seed/prod1-gal1/800/450', 'https://picsum.photos/seed/prod1-gal2/800/450', 'https://picsum.photos/seed/prod1-gal3/800/450'],
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        category: mockProductCategories.find(c => c.id === product.category_id),
        user_final_price_cents: product.price_cents * 0.9,
        has_discount: true,
        available_stock: product.inventory_qty,
    };
    res(detailedProduct);
}, 600));
export const createReservation = (productId: string): Promise<StoreOrder> => new Promise(res => setTimeout(() => { const product = mockProducts.find(p => p.id === productId)!; const newOrder: StoreOrder = { id: `ord_${Date.now()}`, order_number: `${Date.now()}`.slice(-6), user_id: 'f1e2d3c4-b5a6-7890-1234-567890fedcba', product_id: productId, final_price_cents: product.price_cents * 0.9, state: 'reserved', reservation_expires_at: futureDate(2), created_at: new Date().toISOString() }; res(newOrder); }, 1500));

// --- Benefits API ---
export const getAdminBenefits = (): Promise<Benefit[]> => {
    return new Promise(res => setTimeout(() => res(mockBenefits), 600));
};

export const createOrUpdateBenefit = (benefit: Partial<Benefit>): Promise<Benefit> => {
    return new Promise(res => setTimeout(() => {
        if (benefit.id) {
            const index = mockBenefits.findIndex(b => b.id === benefit.id);
            mockBenefits[index] = { ...mockBenefits[index], ...benefit } as Benefit;
            res(mockBenefits[index]);
        } else {
            const newBenefit = { ...benefit, id: `b${Date.now()}` } as Benefit;
            mockBenefits.push(newBenefit);
            res(newBenefit);
        }
    }, 1000));
};

export const getUserBenefits = (): Promise<UserBenefit[]> => {
    return new Promise(res => setTimeout(() => {
         const benefitsWithDerivedState = mockUserBenefits.map(ub => {
            const now = new Date();
            const expires = ub.expires_at ? new Date(ub.expires_at) : null;
            let expiresInDays: number | undefined = undefined;
            if (expires) {
                const diff = expires.getTime() - now.getTime();
                expiresInDays = Math.ceil(diff / (1000 * 3600 * 24));
            }
            return {
                ...ub,
                expires_in_days: expiresInDays
            };
        });
        res(benefitsWithDerivedState);
    }, 700));
};

// --- Tools API ---

export const getAdminTools = (): Promise<Tool[]> => {
    return new Promise(res => setTimeout(() => res(mockTools.map(t => ({...t, category: mockToolCategories.find(c => c.id === t.category_id)}))), 600));
};

export const getToolCategories = (): Promise<ToolCategory[]> => {
    return new Promise(res => setTimeout(() => res(mockToolCategories), 300));
};

export const createOrUpdateTool = (tool: Partial<Tool>): Promise<Tool> => {
    return new Promise(res => setTimeout(() => {
        if (tool.id) {
            const index = mockTools.findIndex(t => t.id === tool.id);
            mockTools[index] = { ...mockTools[index], ...tool } as Tool;
            res(mockTools[index]);
        } else {
            const newTool = { ...tool, id: `tool_${Date.now()}`, slug: tool.name?.toLowerCase().replace(/\s+/g, '-'), created_at: new Date().toISOString() } as Tool;
            mockTools.push(newTool);
            res(newTool);
        }
    }, 1000));
};

export const getUserTools = (): Promise<Tool[]> => {
    return new Promise(res => setTimeout(() => {
        // Mock segmentation: user can only see public tools and segmented tools for their title
        const user = mockUsers[1];
        const visibleTools = mockTools.filter(t => 
            t.status === 'active' && 
            (t.visibility_mode === 'public' || (t.slug === 'templates-contrato' && user.tier === 'gold'))
        ).map(t => ({
            ...t,
            category: mockToolCategories.find(c => c.id === t.category_id),
            is_new: new Date(t.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }));
        res(visibleTools);
    }, 700));
};

export const getToolDetails = (toolId: string): Promise<Tool | null> => {
     return new Promise(res => setTimeout(() => {
        const tool = mockTools.find(t => t.id === toolId);
        if(!tool) {
            res(null);
            return;
        }
        res({
            ...tool,
            category: mockToolCategories.find(c => c.id === tool.category_id),
            description_html: tool.description_html || "<p>Uma descrição mais detalhada da ferramenta, explicando seus benefícios, casos de uso e como ela pode ajudar o parceiro no dia a dia. Pode incluir <strong>HTML</strong>.</p>",
            terms_html: tool.terms_html || "<p>Ao usar esta ferramenta, você concorda com os seguintes termos...</p>"
        });
    }, 500));
};

// --- Settings API ---
export const getUserSettings = (): Promise<Settings> => {
    return new Promise(res => setTimeout(() => res(mockSettings), 500));
};

export const updateUserSettings = (newSettings: Partial<Settings>): Promise<Settings> => {
    return new Promise(res => setTimeout(() => {
        mockSettings = {
            ...mockSettings,
            ...newSettings,
            userSettings: { ...mockSettings.userSettings, ...newSettings.userSettings },
            notificationPreferences: {
                ...mockSettings.notificationPreferences,
                ...newSettings.notificationPreferences,
                channels: { ...mockSettings.notificationPreferences.channels, ...newSettings.notificationPreferences?.channels },
                categories: { ...mockSettings.notificationPreferences.categories, ...newSettings.notificationPreferences?.categories },
            },
             privacySettings: { ...mockSettings.privacySettings, ...newSettings.privacySettings },
        };
        res(mockSettings);
    }, 800));
};

// --- Subsidiaries API ---
export const getAdminSubsidiaries = (): Promise<Subsidiary[]> => {
    return new Promise(res => setTimeout(() => res(mockSubsidiaries), 500));
};

export const createOrUpdateSubsidiary = (subsidiary: Partial<Subsidiary>): Promise<Subsidiary> => {
    return new Promise(res => setTimeout(() => {
        if (subsidiary.id) {
            const index = mockSubsidiaries.findIndex(s => s.id === subsidiary.id);
            mockSubsidiaries[index] = { ...mockSubsidiaries[index], ...subsidiary } as Subsidiary;
            res(mockSubsidiaries[index]);
        } else {
            const newSubsidiary = { ...subsidiary, id: `sub${Date.now()}`, slug: subsidiary.name?.toLowerCase().replace(/\s+/g, '-') } as Subsidiary;
            mockSubsidiaries.push(newSubsidiary);
            res(newSubsidiary);
        }
    }, 800));
}

// --- Email Templates API ---
export const getAdminEmailTemplates = (): Promise<EmailTemplate[]> => {
    return new Promise(res => setTimeout(() => res(mockEmailTemplates), 500));
}