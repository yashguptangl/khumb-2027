export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'OPERATIONS_MANAGER'
  | 'SUPPORT_AGENT'
  | 'PILGRIM'
  | 'HOTEL_OWNER'
  | 'DHARAMSHALA_MANAGER'
  | 'RESTAURANT_OWNER'
  | 'TAXI_OPERATOR'
  | 'TRANSPORT_MANAGER'
  | 'SHOP_OWNER'
  | 'TOUR_GUIDE'
  | 'ACTIVITY_PROVIDER'
  | 'CONTENT_MANAGER';

export type VerificationStatus = 'OFFICIALLY_CONFIRMED' | 'PROVISIONAL' | 'AWAITING_CONFIRMATION' | 'UPDATED' | 'CANCELLED';

export interface Destination {
  id: string;
  nameEn: string;
  nameHi: string;
  category: 'TEMPLE' | 'GHAT' | 'ASHRAM' | 'NATURE' | 'HISTORICAL';
  descriptionEn: string;
  descriptionHi: string;
  significanceEn: string;
  significanceHi: string;
  whyVisitEn: string;
  whyVisitHi: string;
  address: string;
  latitude: number;
  longitude: number;
  distanceFromHarKiPauriKm: number;
  timings: string;
  entryFee: string;
  ropewayInfo?: string;
  bestTimeToVisit: string;
  tags: string[];
  imageUrl: string;
  isVerified: boolean;
  featured: boolean;
}

export interface SnanEvent {
  id: string;
  date: string; // YYYY-MM-DD
  occasionEn: string;
  occasionHi: string;
  tithi: string;
  isAmritSnan: boolean;
  muhuratStartTime: string;
  muhuratEndTime: string;
  sunrise: string;
  sunset: string;
  status: VerificationStatus;
  sourceAuthority: string;
  sourceUrl?: string;
  lastUpdated: string;
  descriptionEn: string;
  descriptionHi: string;
}

export interface AccommodationListing {
  id: string;
  businessId: string;
  name: string;
  type: 'HOTEL' | 'LUXURY_HOTEL' | 'BUDGET_HOTEL' | 'DHARAMSHALA' | 'ASHRAM' | 'GUEST_HOUSE' | 'TENT_CAMP';
  stayType: 'PAID' | 'DONATION_BASED' | 'FREE';
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  address: string;
  latitude: number;
  longitude: number;
  distanceKm?: number;
  imageUrl: string;
  amenities: string[];
  isVerified: boolean;
  phone: string;
  roomsAvailable: number;
}

export interface RestaurantListing {
  id: string;
  businessId: string;
  name: string;
  category: 'SATVIK' | 'VEGETARIAN' | 'BHOJANALAYA' | 'STREET_FOOD' | 'SWEETS' | 'CAFE';
  address: string;
  latitude: number;
  longitude: number;
  distanceKm?: number;
  imageUrl: string;
  avgPriceForTwo: number;
  rating: number;
  reviewCount: number;
  timings: string;
  menu: { name: string; price: number; isSatvik: boolean }[];
  isVerified: boolean;
}

export interface TransportListing {
  id: string;
  businessId: string;
  operatorName: string;
  vehicleType: 'E_RICKSHAW' | 'AUTO' | 'TAXI_HATCHBACK' | 'TAXI_SEDAN' | 'TAXI_SUV' | 'TEMPO_TRAVELLER';
  baseFare: number;
  perKmRate: number;
  serviceArea: string;
  phone: string;
  driverName: string;
  isVerified: boolean;
}

export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'QUOTED' | 'AVAILABILITY_CONFIRMED' | 'BOOKED' | 'COMPLETED' | 'CANCELLED';

export interface BookingEnquiry {
  id: string;
  category: 'HOTEL' | 'DHARAMSHALA' | 'TAXI' | 'TOUR_GUIDE';
  listingId: string;
  listingName: string;
  customerName: string;
  customerPhone: string;
  date: string;
  guestsCount: number;
  requirements: string;
  quotedPrice?: number;
  status: EnquiryStatus;
  timeline: { time: string; note: string }[];
  commissionDue?: number;
  createdAt: string;
}

export interface OfficialAnnouncement {
  id: string;
  titleEn: string;
  titleHi: string;
  category: 'TRAFFIC' | 'SNAN_UPDATE' | 'GHAT_ACCESS' | 'SAFETY' | 'WEATHER' | 'MEDICAL';
  authority: string;
  publishedAt: string;
  contentEn: string;
  contentHi: string;
  isUrgent: boolean;
  sourceUrl?: string;
}
