
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
})

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

      return <Marker position={location} />;
    }
  
    return (
      <MapContainer
        center={location}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <LocationMarker />
      </MapContainer>
    );
  }