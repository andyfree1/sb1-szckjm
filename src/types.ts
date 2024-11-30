export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface FlightClass {
  id: string;
  name: string;
  multiplier: number;
}

export interface CarRental {
  company: string;
  basePrice: number;
  categories: {
    economy: number;
    midsize: number;
    luxury: number;
    suv: number;
  };
}

export interface Entertainment {
  id: string;
  name: string;
  category: 'Show' | 'Concert' | 'Excursion' | 'Sports' | 'Other';
  basePrice: number;
  location: string;
  pointsEligible: boolean;
  maxPointsDiscount: number;
  description: string;
  bookingUrl?: string;
}

export interface HiltonBrand {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  pointsPerDollar: number;
}

export interface TravelData {
  hotelDetails: {
    brand: string;
    property: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    points: string;
  };
  flightDetails: {
    origin: string;
    destination: string;
    departDate: string;
    returnDate: string;
    flightClass: string;
    passengers: number;
    tripType: 'oneWay' | 'roundTrip';
    flightType: 'nonStop' | 'layover';
  };
  carRental: {
    company: string;
    category: string;
    days: number;
  };
  entertainment: {
    city: string;
    selectedEvents: string[];
    quantity: Record<string, number>;
  };
  costs: {
    hotel: { cashPrice: number; pointsSavings: number };
    flight: { cashPrice: number; pointsSavings: number };
    carRental: { cashPrice: number; pointsSavings: number };
    entertainment: { cashPrice: number; pointsSavings: number };
  };
  lastUpdated: string;
}