
export interface Location {
  id: string;
  name: string;
  chineseName: string;
  lat: number;
  lng: number;
  description: string;
  tradeExports?: string[]; // Items China brought
  tradeImports?: string[]; // Items China received
}

export interface Voyage {
  id: number;
  title: string;
  chineseTitle: string;
  years: string;
  summary: string;
  path: string[]; // List of Location IDs
  color: string;
}

export interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  label: string;
}

export interface LabelData {
  lat: number;
  lng: number;
  text: string;
  id: string;
}

export interface MovingShipData {
  lat: number;
  lng: number;
  color: string;
}
