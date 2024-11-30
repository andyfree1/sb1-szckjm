import React from 'react';
import { ExternalLink, Wifi, UtensilsCrossed, Car, Waves, Dumbbell, Star } from 'lucide-react';
import { getAmenityUrl } from '../utils/urlHelpers';
import { HiltonProperty } from '../types';

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="w-5 h-5" />,
  'Restaurant': <UtensilsCrossed className="w-5 h-5" />,
  'Valet Parking': <Car className="w-5 h-5" />,
  'Pool': <Waves className="w-5 h-5" />,
  'Fitness Center': <Dumbbell className="w-5 h-5" />
};

interface HotelAmenitiesProps {
  property: HiltonProperty;
}

export function HotelAmenities({ property }: HotelAmenitiesProps) {
  return (
    <div className="mt-6">
      <h3 className="font-medium text-hilton-gray-700 mb-4">Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {property.amenities.map((amenity, index) => (
          <a
            key={`${property.id}-${amenity}-${index}`}
            href={getAmenityUrl(property, amenity)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-hilton-gray-50 hover:bg-hilton-gray-100 transition-colors group"
          >
            <span className="text-hilton-blue">
              {amenityIcons[amenity] || <Star className="w-5 h-5" />}
            </span>
            <span className="text-hilton-gray-700 font-medium group-hover:text-hilton-blue transition-colors">
              {amenity}
            </span>
            <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-50" />
          </a>
        ))}
      </div>
    </div>
  );
}