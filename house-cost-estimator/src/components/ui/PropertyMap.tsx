"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapMarker {
  lat: number;
  lng: number;
  title?: string;
  price?: number;
}

interface PropertyMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  onMarkerClick?: (index: number) => void;
}

export default function PropertyMap({ center = [39.8283, -98.5795], zoom = 4, markers = [], onMarkerClick }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(center, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    markers.forEach((marker, index) => {
      const markerIcon = L.divIcon({
        html: `<div style="background:#2563eb;color:white;padding:4px 8px;border-radius:8px;font-size:12px;font-weight:bold;white-space:nowrap;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.2)">${marker.price ? `$${(marker.price / 1000).toFixed(0)}k` : "$"}</div>`,
        className: "",
        iconSize: [80, 30],
        iconAnchor: [40, 30],
      });

      L.marker([marker.lat, marker.lng], { icon: markerIcon })
        .addTo(map)
        .on("click", () => onMarkerClick?.(index));
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView(center, zoom);
  }, [center, zoom]);

  return <div ref={mapRef} className="w-full h-full rounded-xl" style={{ minHeight: "400px" }} />;
}
