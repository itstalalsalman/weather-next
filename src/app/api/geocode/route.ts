import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "City name required" }, { status: 400 });
  }

  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1`,
    { cache: "no-store" }
  );

  if (!geoRes.ok) {
    return NextResponse.json({ error: "Geocoding failed" }, { status: geoRes.status });
  }

  const data = await geoRes.json();
  return NextResponse.json(data);
}
