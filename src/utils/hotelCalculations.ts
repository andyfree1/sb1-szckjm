import { HOTEL_FEES, TAX_RATES } from '../constants/hotelRates';

export function calculateHotelCosts(
  basePrice: number,
  checkIn: string,
  checkOut: string,
  rooms: number,
  points: string
): { cashPrice: number; pointsSavings: number } {
  if (!checkIn || !checkOut) return { cashPrice: 0, pointsSavings: 0 };
  
  const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
  if (nights <= 0) return { cashPrice: 0, pointsSavings: 0 };

  const roomCost = basePrice * nights * rooms;
  
  // Calculate fees
  const fees = (
    HOTEL_FEES.serviceFee +
    HOTEL_FEES.amenityFee
  ) * nights * rooms;

  // Calculate taxes
  const roomTax = roomCost * TAX_RATES.roomTax;
  const occupancyTax = roomCost * TAX_RATES.occupancyTax;
  const tourismLevy = roomCost * TAX_RATES.tourismLevy;

  const totalCost = roomCost + fees + roomTax + occupancyTax + tourismLevy;
  const pointsSavings = Math.min(Number(points || 0) * 0.005, totalCost * 0.8);

  return {
    cashPrice: Math.round(totalCost * 100) / 100,
    pointsSavings: Math.round(pointsSavings * 100) / 100
  };
}