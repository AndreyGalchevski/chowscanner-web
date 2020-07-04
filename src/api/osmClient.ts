const baseURL = "https://nominatim.openstreetmap.org";

export const findCoordinatesByAddress = async (address: string) => {
  const encodedAddress = encodeURIComponent(address);
  const response = await window.fetch(
    `${baseURL}/search?q=${encodedAddress}&format=geojson`,
    { method: "GET" }
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data.error || "Something went wrong. Try refreshing");
  }
};
