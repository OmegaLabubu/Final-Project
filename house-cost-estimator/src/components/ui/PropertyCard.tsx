"use client";

import { MapPin, Bed, Bath, Square, DollarSign } from "lucide-react";

interface Property {
  id?: string;
  listing_id?: string;
  photo?: string;
  description?: string;
  address?: {
    line?: string;
    city?: string;
    state?: string;
    postal_code?: string;
  };
  price?: number;
  beds?: number;
  baths?: number;
  sqft?: number;
  latitude?: number;
  longitude?: number;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const address = property.address;
  const fullAddress = [address?.line, address?.city, address?.state].filter(Boolean).join(", ");

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
      {property.photo ? (
        <div className="relative h-48 bg-zinc-200 dark:bg-zinc-800">
          <img
            src={property.photo}
            alt={property.description || "Property"}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-48 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
          <MapPin className="h-8 w-8 text-zinc-400" />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
            {property.price ? `$${property.price.toLocaleString()}` : "Contact for price"}
          </h3>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 flex items-center gap-1">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{fullAddress || "Address not available"}</span>
        </p>

        {property.description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-3 line-clamp-2">
            {property.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          {property.beds && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.beds} beds</span>
            </div>
          )}
          {property.baths && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.baths} baths</span>
            </div>
          )}
          {property.sqft && (
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
