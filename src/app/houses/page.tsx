"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Search, MapPin, Loader2, SlidersHorizontal, X } from "lucide-react";
import PropertyCard from "@/components/ui/PropertyCard";

const PropertyMap = dynamic(() => import("@/components/ui/PropertyMap"), { ssr: false });

interface Property {
  id: string;
  listing_id?: string;
  photo?: string;
  description?: string;
  address?: { line?: string; city?: string; state?: string; postal_code?: string };
  price?: number;
  beds?: number;
  baths?: number;
  sqft?: number;
  latitude?: number;
  longitude?: number;
}

export default function HousesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", beds: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<"grid" | "map">("grid");
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.8283, -98.5795]);
  const [mapZoom, setMapZoom] = useState(4);

  const searchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (location) params.set("location", location);
      if (filters.minPrice) params.set("minPrice", filters.minPrice);
      if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
      if (filters.beds) params.set("beds", filters.beds);
      params.set("limit", "20");

      const res = await fetch(`/api/listings?${params.toString()}`);
      const data = await res.json();
      setProperties(data.properties || []);

      if (data.properties?.length > 0) {
        const first = data.properties[0];
        if (first.latitude && first.longitude) {
          setMapCenter([first.latitude, first.longitude]);
          setMapZoom(10);
        }
      }
    } catch {
      alert("Failed to search properties. Please check your API configuration.");
    } finally {
      setLoading(false);
    }
  }, [location, filters]);

  useEffect(() => {
  }, []);

  const handleMarkerClick = (index: number) => {
    const prop = properties[index];
    const el = document.getElementById(`property-${prop.id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const mapMarkers = properties
    .filter(p => p.latitude && p.longitude)
    .map(p => ({
      lat: p.latitude!,
      lng: p.longitude!,
      title: p.description || "",
      price: p.price,
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          House Finder
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Search properties with real-time MLS data
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchProperties()}
              placeholder="Enter city, state, or zip code..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
          <button
            onClick={searchProperties}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Search
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Min Price</label>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                placeholder="$0"
                className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Max Price</label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                placeholder="No limit"
                className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Bedrooms</label>
              <select
                value={filters.beds}
                onChange={(e) => setFilters(prev => ({ ...prev, beds: e.target.value }))}
                className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setView("grid")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "grid" ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"}`}
        >
          Grid View
        </button>
        <button
          onClick={() => setView("map")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "map" ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"}`}
        >
          Map View
        </button>
        <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-auto">
          {properties.length} properties found
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} id={`property-${property.id}`}>
              <PropertyCard property={property} />
            </div>
          ))}
          {properties.length === 0 && (
            <div className="col-span-full text-center py-20">
              <MapPin className="h-12 w-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
              <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-100 mb-2">No properties found</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[600px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <PropertyMap
              center={mapCenter}
              zoom={mapZoom}
              markers={mapMarkers}
              onMarkerClick={handleMarkerClick}
            />
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {properties.map((property) => (
              <div key={property.id}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
