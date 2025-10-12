import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("latitude");
  const lon = searchParams.get("longitude");

  // Use BigDataCloud instead of Open-Meteo
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: true, message: "Reverse geocoding failed" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json({
    city: data.city || data.locality,
    country: data.countryName,
    principalSubdivision: data.principalSubdivision,
  });
}
