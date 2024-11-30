import { HiltonProperty } from '../types';
import { hiltonBrands } from '../data/hiltonBrands';

export function getHotelUrl(property: HiltonProperty): string {
  const brand = hiltonBrands.find(b => b.id === property.brandId);
  if (!brand) return '#';
  
  const brandSlug = brand.name.toLowerCase().replace(/\s+/g, '-');
  const locationSlug = `${property.city.toLowerCase()}-${property.state ? property.state.toLowerCase() + '-' : ''}${property.country.toLowerCase()}`;
  const propertySlug = property.id.toLowerCase();
  
  return `https://www.hilton.com/en/hotels/${brandSlug}/${locationSlug}/${propertySlug}/`;
}

export function getAmenityUrl(property: HiltonProperty, amenity: string): string {
  const baseUrl = getHotelUrl(property);
  if (baseUrl === '#') return '#';
  const amenitySlug = amenity.toLowerCase().replace(/\s+/g, '-');
  return `${baseUrl}amenities/#${amenitySlug}`;
}