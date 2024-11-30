import React, { useEffect, useMemo } from 'react';
import { Building2, Star, ExternalLink } from 'lucide-react';
import { hiltonBrands } from '../data/hiltonBrands';
import { expandedHiltonProperties } from '../data/hiltonProperties';
import { calculateHotelCosts } from '../utils/hotelCalculations';
import { getHotelUrl } from '../utils/urlHelpers';
import { HotelAmenities } from './HotelAmenities';

interface HotelSelectorProps {
  details: {
    brand: string;
    property: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    points: string;
  };
  onUpdate: (field: string, value: string | number) => void;
  onCostUpdate: (cost: { cashPrice: number; pointsSavings: number }) => void;
}

export default function HotelSelector({ details, onUpdate, onCostUpdate }: HotelSelectorProps) {
  const selectedProperty = details.property ? 
    expandedHiltonProperties.find(p => p.id === details.property) : null;

  const filteredProperties = details.brand ? 
    expandedHiltonProperties.filter(p => p.brandId === details.brand) : 
    expandedHiltonProperties;

  useEffect(() => {
    if (selectedProperty) {
      const costs = calculateHotelCosts(
        selectedProperty.basePrice,
        details.checkIn,
        details.checkOut,
        details.rooms,
        details.points
      );
      onCostUpdate(costs);
    } else {
      onCostUpdate({ cashPrice: 0, pointsSavings: 0 });
    }
  }, [selectedProperty, details.checkIn, details.checkOut, details.rooms, details.points]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-hilton-blue" />
        <h2 className="text-xl font-semibold text-hilton-blue">Hotel Selection</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Hilton Brand
          </label>
          <select
            className="hilton-select w-full"
            value={details.brand}
            onChange={(e) => onUpdate('brand', e.target.value)}
          >
            <option value="">All Brands</option>
            {Object.entries(
              hiltonBrands.reduce((acc, brand) => {
                if (!acc[brand.category]) acc[brand.category] = [];
                acc[brand.category].push(brand);
                return acc;
              }, {} as Record<string, typeof hiltonBrands>)
            ).map(([category, brands]) => (
              <optgroup key={category} label={category}>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Select Property
          </label>
          <select
            className="hilton-select w-full"
            value={details.property}
            onChange={(e) => onUpdate('property', e.target.value)}
          >
            <option value="">Select a Property</option>
            {Object.entries(
              filteredProperties.reduce((acc, property) => {
                if (!acc[property.region]) acc[property.region] = [];
                acc[property.region].push(property);
                return acc;
              }, {} as Record<string, typeof filteredProperties>)
            ).map(([region, properties]) => (
              <optgroup key={region} label={region}>
                {properties.map((property) => (
                  <option key={`${property.id}-${property.city}`} value={property.id}>
                    {property.name} - {property.city}, {property.state || property.country}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Check-in Date
          </label>
          <input
            type="date"
            className="hilton-input w-full"
            value={details.checkIn}
            onChange={(e) => onUpdate('checkIn', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Check-out Date
          </label>
          <input
            type="date"
            className="hilton-input w-full"
            value={details.checkOut}
            min={details.checkIn}
            onChange={(e) => onUpdate('checkOut', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Number of Rooms
          </label>
          <input
            type="number"
            min="1"
            className="hilton-input w-full"
            value={details.rooms}
            onChange={(e) => onUpdate('rooms', Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Hilton Honors Points
          </label>
          <input
            type="number"
            min="0"
            step="1000"
            className="hilton-input w-full"
            value={details.points}
            onChange={(e) => onUpdate('points', e.target.value)}
            placeholder="Enter points (optional)"
          />
        </div>
      </div>

      {selectedProperty && (
        <div className="mt-6 bg-gradient-to-br from-hilton-blue/5 to-hilton-blue/10 rounded-xl p-6">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-48 h-32 rounded-lg overflow-hidden">
                  <img
                    src={selectedProperty.images[0]}
                    alt={selectedProperty.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-hilton-blue" />
                    <h3 className="text-xl font-walbaum text-hilton-blue">
                      {selectedProperty.name}
                    </h3>
                  </div>
                  <p className="text-sm text-hilton-gray-600 mt-2">
                    {selectedProperty.address}, {selectedProperty.city}
                    {selectedProperty.state ? `, ${selectedProperty.state}` : ''}, {selectedProperty.country}
                  </p>
                </div>
              </div>
              <a
                href={getHotelUrl(selectedProperty)}
                target="_blank"
                rel="noopener noreferrer"
                className="hilton-button inline-flex items-center gap-2"
              >
                Visit Hotel Website
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-hilton-gray-600 mb-1">Total Cost</p>
                    <p className="text-2xl font-bold text-hilton-gray-900">
                      ${calculateHotelCosts(selectedProperty.basePrice, details.checkIn, details.checkOut, details.rooms, details.points).cashPrice.toFixed(2)}
                    </p>
                    <p className="text-xs text-hilton-gray-500 mt-1">
                      All taxes & fees included
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-hilton-gray-600 mb-1">Points Value</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ${calculateHotelCosts(selectedProperty.basePrice, details.checkIn, details.checkOut, details.rooms, details.points).pointsSavings.toFixed(2)}
                    </p>
                    <p className="text-xs text-hilton-gray-500 mt-1">
                      Using Hilton Points
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-hilton-gray-600 mb-1">Final Cost</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${(calculateHotelCosts(selectedProperty.basePrice, details.checkIn, details.checkOut, details.rooms, details.points).cashPrice - 
                         calculateHotelCosts(selectedProperty.basePrice, details.checkIn, details.checkOut, details.rooms, details.points).pointsSavings).toFixed(2)}
                    </p>
                    <p className="text-xs text-hilton-gray-500 mt-1">
                      After points savings
                    </p>
                  </div>
                </div>
              </div>

              <HotelAmenities property={selectedProperty} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}