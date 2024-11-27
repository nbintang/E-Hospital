
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
interface MapInputProps {
  location: { lat: number; lng: number };
  onLocationChange: (lat: number, lng: number) => void;
}

// Convert JSX Icon to an HTML string
const createCustomMarkerIcon = () =>
  L.divIcon({
    className: '', // Add any custom class for styling if needed
    html: `<div style="transform: translate(-50%, -100%); color: #ff6347; font-size: 24px;">
             ${renderToStaticMarkup(<MapPin />)}
           </div>`,
    iconSize: [30, 30], // Adjust size as needed
    iconAnchor: [15, 30], // Anchor to the bottom center
  });


interface MapInputProps {
    location: { lat: number; lng: number };
    onLocationChange: (lat: number, lng: number) => void;
  }
  
  export default function MapInput({ location, onLocationChange }: MapInputProps) {
    function LocationMarker() {
      useMapEvents({
        click(e) {
          onLocationChange(e.latlng.lat, e.latlng.lng);
        },
      });
      if (!location.lat || !location.lng) return null;

      return <Marker position={location} icon={createCustomMarkerIcon()} />;
    }
  
    return (
      <MapContainer
        center={location}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', zIndex: 0,  }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <LocationMarker />
      </MapContainer>
    );
  }