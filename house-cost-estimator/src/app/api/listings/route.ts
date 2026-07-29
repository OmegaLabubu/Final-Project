import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const beds = searchParams.get("beds");
    const limit = searchParams.get("limit") || "20";

    const params = new URLSearchParams({
      limit,
      offset: "0",
      sort: "relevance",
    });

    if (location) params.set("location", location);
    if (minPrice) params.set("price_min", minPrice);
    if (maxPrice) params.set("price_max", maxPrice);
    if (beds) params.set("beds_min", beds);

    const res = await fetch(`https://realty-us.p.rapidapi.com/properties/v2/list?${params.toString()}`, {
      headers: {
        "X-RapidAPI-Key": process.env.REALTOR_API_KEY || "",
        "X-RapidAPI-Host": "realty-us.p.rapidapi.com",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Realtor API error:", res.status, errorText);
      return NextResponse.json({ properties: [], error: "Failed to fetch listings" }, { status: res.status });
    }

    const data = await res.json();
    const listings = data?.data?.home_search?.results || data?.results || [];

    const properties = listings.map((listing: any) => ({
      id: listing.listing_id || listing.mls_id || String(Math.random()),
      listing_id: listing.listing_id,
      photo: listing.primary_photo?.href || listing.photos?.[0]?.href || "",
      description: listing.description || "",
      address: listing.address || {},
      price: listing.list_price || listing.price,
      beds: listing.beds || listing.property?.beds,
      baths: listing.baths || listing.property?.baths,
      sqft: listing.sqft || listing.property?.sqft,
      latitude: listing.address?.lat || listing.latitude,
      longitude: listing.address?.lon || listing.longitude,
    }));

    return NextResponse.json({ properties });
  } catch (error: any) {
    console.error("Listings error:", error);
    return NextResponse.json({ properties: [], error: "Failed to fetch listings" }, { status: 500 });
  }
}
