import React, { useEffect, useMemo } from 'react';
import { Car } from 'lucide-react';
import { carRentals } from '../data/travelData';

interface CarRentalSelectorProps {
  details: {
    company: string;
    category: string;
    days: number;
  };
  onUpdate: (field: string, value: string | number) => void;
  onCostUpdate: (cost: { cashPrice: number; pointsSavings: number }) => void;
  points: number;
}

export default function CarRentalSelector({ details, onUpdate, onCostUpdate, points }: CarRentalSelectorProps) {
  const costs = useMemo(() => {
    if (!details?.company || details.days <= 0) return { cashPrice: 0, pointsSavings: 0 };

    const rental = carRentals.find(r => r.company === details.company);
    if (!rental) return { cashPrice: 0, pointsSavings: 0 };

    // Base calculation
    const categoryMultiplier = rental.categories[details.category as keyof typeof rental.categories] || 1;
    const dailyRate = rental.basePrice * categoryMultiplier;
    const baseRental = dailyRate * details.days;

    // Calculate total
    const cashPrice = baseRental;

    // Calculate points savings (max 50% of rental cost can be covered by points)
    const pointsSavings = Math.min(points * 0.008, cashPrice * 0.5);

    return { 
      cashPrice: Math.round(cashPrice * 100) / 100,
      pointsSavings: Math.round(pointsSavings * 100) / 100
    };
  }, [details, points]);

  useEffect(() => {
    onCostUpdate(costs);
  }, [costs, onCostUpdate]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Car className="w-5 h-5 text-hilton-blue" />
        <h2 className="text-xl font-semibold text-hilton-blue">Car Rental</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Rental Company
          </label>
          <select
            className="hilton-select w-full"
            value={details.company}
            onChange={(e) => onUpdate('company', e.target.value)}
          >
            <option value="">Select Company</option>
            {carRentals.map((rental) => (
              <option key={rental.company} value={rental.company}>
                {rental.company}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Car Category
          </label>
          <select
            className="hilton-select w-full"
            value={details.category}
            onChange={(e) => onUpdate('category', e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="economy">Economy</option>
            <option value="midsize">Midsize</option>
            <option value="luxury">Luxury</option>
            <option value="suv">SUV</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Rental Days
          </label>
          <input
            type="number"
            min="0"
            className="hilton-input w-full"
            value={details.days}
            onChange={(e) => onUpdate('days', Number(e.target.value))}
          />
        </div>
      </div>

      {details.company && details.category && details.days > 0 && (
        <div className="mt-6 bg-hilton-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-hilton-gray-600 mb-1">Total Cost</p>
              <p className="text-2xl font-bold text-hilton-gray-900">
                ${costs.cashPrice.toFixed(2)}
              </p>
              <p className="text-xs text-hilton-gray-500 mt-1">
                Base rental cost
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-hilton-gray-600 mb-1">Points Value</p>
              <p className="text-2xl font-bold text-purple-600">
                ${costs.pointsSavings.toFixed(2)}
              </p>
              <p className="text-xs text-hilton-gray-500 mt-1">
                Using Hilton Points
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-hilton-gray-600 mb-1">Final Cost</p>
              <p className="text-2xl font-bold text-green-600">
                ${(costs.cashPrice - costs.pointsSavings).toFixed(2)}
              </p>
              <p className="text-xs text-hilton-gray-500 mt-1">
                After points savings
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}