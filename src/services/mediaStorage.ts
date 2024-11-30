import { TravelData } from '../types';

const STORAGE_KEY = 'hilton_travel_data';
const MEDIA_FOLDER = 'Hilton Media/Projects/Travel/';

export function saveToHiltonMedia(data: TravelData): void {
  try {
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Save to Hilton Media folder structure
    const mediaData = {
      projectId: 'travel-calculator',
      version: '11.21.24',
      timestamp: new Date().toISOString(),
      data: data,
      path: `${MEDIA_FOLDER}data.json`
    };

    localStorage.setItem(`${MEDIA_FOLDER}data.json`, JSON.stringify(mediaData));
  } catch (error) {
    console.error('Error saving to Hilton Media:', error);
  }
}

export function loadFromHiltonMedia(): TravelData | null {
  try {
    // Try loading from Hilton Media folder first
    const mediaData = localStorage.getItem(`${MEDIA_FOLDER}data.json`);
    if (mediaData) {
      const parsed = JSON.parse(mediaData);
      return parsed.data;
    }

    // Fall back to regular storage
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from Hilton Media:', error);
    return null;
  }
}