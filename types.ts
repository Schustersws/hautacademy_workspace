export interface Title {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  short_description?: string;
  color: string;
  background_color?: string;
  icon_key?: string;
  icon_url?: string;
  badge_style?: 'solid' | 'outline' | 'gradient';
  category: 'partnership' | 'achievement' | 'certification' | 'special';
  priority?: number;
  is_active: boolean;
  is_visible?: boolean;
  users_count?: number; // for admin card
  expires_after_days?: number | null;
  requires_approval?: boolean;
}

export interface UserTitle {
    id: string; // This is the ID of the user_titles relation
    user_id: string;
    title: Title;
    granted_at: string;
    expires_at?: string | null;
    status?: 'active' | 'expired'; // This is a derived property for the user view
}


export interface Tag {
  id:string;
  name: string;
  color: string;
}

export interface Subsidiary {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  brand_color?: string;
  accent_color?: string;
  is_active?: boolean;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  address?: string;
  role: 'admin' | 'user';
  status: 'pending' | 'approved' | 'suspended' | 'denied';
  avatar_url?: string;
  banner_url?: string;
  business_name?: string;
  business_category?: string;
  bio?: string;
  instagram_url?: string;
  linkedin_url?: string;
  website_url?: string;
  subsidiary_id?: string;
  subsidiary?: Subsidiary;
  tier?: 'gold' | 'silver' | 'bronze' | '';
  vertical?: 'medical' | 'beauty' | 'tech' | 'clinics' | '';
  last_login_at?: string;
  created_at: string;
  show_email?: boolean;
  show_phone?: boolean;
  show_address?: boolean;
  show_business?: boolean;
  show_social?: boolean;
  titles: UserTitle[];
  tags: { tag: Tag }[];
  mfa_enabled?: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AccessRequestData {
  full_name: string;
  email: string;
  phone: string;
  organization: string;
  role_requested: string;
  segment: string;
  invitation_code: string;
  terms_accepted: boolean;
}

export interface AccessRequest extends AccessRequestData {
    id: string;
    created_at: string;
    status: 'pending' | 'approved' | 'denied';
}


export interface AdminStats {
  pendingRequests: number;
  totalUsers: number;
  totalEvents: number;
  activeCourses: number;
  totalSuspended?: number;
  totalAdmins?: number;
}

export interface UserStats {
  nextEvents: number;
  activeCourses: number;
  availableTools: number;
  earnedTitles: number;
}

export interface UserFilters {
  search: string;
  status: 'all' | 'approved' | 'pending' | 'suspended' | 'denied';
  role: 'all' | 'admin' | 'user';
  subsidiary: string; // 'all' or subsidiary_id
  tier: 'all' | 'gold' | 'silver' | 'bronze';
  // In a real app, this would be a title ID
  hasTitle: string;
  dateFrom: string;
  dateTo: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UsersApiResponse {
  users: User[];
  pagination: Pagination;
}

// --- Event Types ---

export interface EventSegment {
    type: 'title' | 'tag' | 'program' | 'subsidiary' | 'user';
    id: string;
    name: string; // For display purposes
}

export interface Event {
    id: string;
    title: string;
    slug: string;
    description: string;
    event_type: 'online' | 'presencial' | 'hybrid';
    start_date: string;
    end_date?: string;
    location?: string;
    meet_link?: string;
    map_url?: string;
    image_url?: string;
    video_url?: string;
    max_attendees?: number;
    status: 'draft' | 'published' | 'cancelled' | 'completed';
    visibility_mode: 'public' | 'segmented';
    consultant_name?: string;
    consultant_whatsapp?: string;
    whatsapp_message?: string;
    created_by: string;
    created_at: string;
    
    // For display and logic
    is_prelaunch?: boolean;
    prelaunch_opens_at?: string;
    registered_count?: number;
    available_seats?: number;
    user_registration_status?: EventRegistration['status'];
    segments?: EventSegment[];
}

export interface EventRegistration {
    id: string;
    event_id: string;
    user_id: string;
    status: 'interested' | 'registered' | 'confirmed' | 'attended' | 'cancelled' | 'pending';
    notes?: string;
    created_at: string;
    user?: Pick<User, 'id' | 'full_name' | 'email' | 'avatar_url' | 'business_name'>;
    event?: Event;
}

export interface EventFilters {
    search: string;
    status: 'all' | 'draft' | 'published' | 'cancelled' | 'completed';
    type: 'all' | 'online' | 'presencial' | 'hybrid';
    date: 'all' | 'today' | 'week' | 'month';
}

// --- Academy / LMS Types ---

export interface Course {
    id: string;
    title: string;
    slug: string;
    subtitle: string;
    description_html: string;
    category_id: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration_hours: number;
    thumbnail_url: string;
    banner_url: string;
    preview_video_url?: string;
    price_cents: number;
    is_free: boolean;
    status: 'draft' | 'published' | 'archived';
    visibility: 'public' | 'segmented' | 'private';
    certificate_enabled: boolean;
    instructor_id: string;
    instructor?: Pick<User, 'id' | 'full_name' | 'avatar_url'>;
    created_at: string;
    
    // For display
    modules_count?: number;
    lessons_count?: number;
    enrollments_count?: number;
    
    // For user context
    enrollment?: Enrollment;

    modules?: CourseModule[];
}

export interface CourseCategory {
    id: string;
    name: string;
    slug: string;
}

export interface CourseModule {
    id: string;
    course_id: string;
    title: string;
    sort_order: number;
    lessons: Lesson[];
}

export interface Lesson {
    id: string;
    module_id: string;
    title: string;
    type: 'video' | 'html' | 'file' | 'quiz';
    video_url?: string;
    video_duration_seconds?: number;
    html_content?: string;
    is_preview: boolean;
    sort_order: number;
}

export interface Enrollment {
    id: string;
    user_id: string;
    course_id: string;
    status: 'active' | 'completed';
    progress_percentage: number;
    completed_at?: string;
}

export interface LiveSession {
    id: string;
    title: string;
    slug: string;
    description: string;
    stream_url: string;
    scheduled_at: string;
    status: 'scheduled' | 'live' | 'ended' | 'cancelled';
    thumbnail_url: string;
    instructor?: Pick<User, 'id' | 'full_name' | 'avatar_url'>;
    viewers?: number;
    recording_available?: boolean;
}

// --- Store Types ---
export interface ProductCategory {
    id: string;
    name: string;
    slug: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    short_description: string;
    description_html: string;
    price_cents: number;
    category_id: string;
    category?: ProductCategory;
    status: 'draft' | 'active' | 'archived';
    visibility_mode: 'public' | 'segmented';
    inventory_qty: number;
    is_prelaunch: boolean;
    prelaunch_starts_at?: string;
    prelaunch_countdown?: boolean;
    main_image_url?: string;
    gallery_urls?: string[];
    video_url?: string;
    whatsapp_number?: string;
    whatsapp_template?: string;
    hide_when_unavailable?: boolean;
    created_at: string;
    
    // For user context
    user_final_price_cents?: number;
    has_discount?: boolean;
    available_stock?: number;
}

export interface StoreOrder {
    id: string;
    order_number: string;
    user_id: string;
    product_id: string;
    final_price_cents: number;
    state: 'pending' | 'reserved' | 'contacted' | 'confirmed' | 'cancelled' | 'expired';
    reservation_expires_at: string;
    created_at: string;
}

// --- Benefits Types ---

export interface Benefit {
  id: string;
  name: string;
  description: string;
  type: 'coupon' | 'credit' | 'perk' | 'voucher';
  scope: 'any' | 'store_product' | 'store_category' | 'event' | 'course';
  target_id?: string;
  discount_kind?: 'percent' | 'amount';
  discount_value_cents?: number;
  credit_value_cents?: number;
  status: 'draft' | 'active' | 'archived';
  shareable: boolean;
  ends_at?: string;
  banner_url?: string;
  color?: string;
  
  // For admin view
  assigned_count?: number;
  redeemed_count?: number;
  usage_rate?: number;
}

export interface UserBenefit {
    id: string;
    benefit: Benefit;
    user_id: string;
    status: 'available' | 'redeemed' | 'expired' | 'revoked';
    code?: string;
    expires_at?: string;
    redeemed_at?: string;
    share_token?: string;

    // Derived for UI
    is_new?: boolean;
    expires_in_days?: number;
}

// --- Tools Types ---

export interface ToolCategory {
  id: string;
  name: string;
  slug: string;
  icon_key: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description_html: string;
  category_id: string;
  category?: ToolCategory;
  status: 'draft' | 'active' | 'archived';
  visibility_mode: 'public' | 'segmented';
  type: 'link' | 'download' | 'html_embed' | 'video' | 'automation';
  
  // Content URLs
  external_url?: string;
  download_url?: string;
  embed_url?: string;
  video_url?: string;

  // Visuals
  banner_url?: string;
  icon_key: string;
  
  // Metadata
  requires_ack?: boolean;
  terms_html?: string;
  tutorial_url?: string;
  created_at: string;

  // For UI logic
  is_new?: boolean;
  is_updated?: boolean;
}

// --- Settings Types ---
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  density: 'comfortable' | 'compact';
  animations: boolean;
}

export interface NotificationPreferences {
  channels: {
    email: boolean;
    push: boolean;
  };
  categories: {
    events: { new_event: boolean; event_reminder: boolean; };
    courses: { new_course: boolean; progress_milestone: boolean; };
    store: { new_product: boolean; order_status: boolean; };
    benefits: { new_benefit: boolean; benefit_expiring: boolean; };
    messages: { direct_message: boolean };
    system: { security_alerts: boolean; newsletters: boolean; };
  };
}

export interface PrivacySettings {
    profile_visibility: 'public' | 'private';
    show_online_status: boolean;
    allow_messages_from_strangers: boolean;
}

export interface ActiveSession {
  id: string;
  device_info: { os: string; browser: string; };
  ip_address: string;
  last_activity: string;
  is_current: boolean;
}

export interface Settings {
    userSettings: UserSettings;
    notificationPreferences: NotificationPreferences;
    activeSessions: ActiveSession[];
    privacySettings: PrivacySettings;
}

export interface EmailTemplate {
    id: string;
    key: string;
    name: string;
    subject: string;
    body_html?: string;
    is_active: boolean;
    updated_at: string;
}