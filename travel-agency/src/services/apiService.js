import { packages, destinations } from "../data/packages";

export async function fetchPackages()        { return packages; }
export async function fetchPackageById(id)   { return packages.find((p) => p.id === parseInt(id)); }
export async function fetchDestinations()    { return destinations; }
export async function submitBooking(data)    { console.log("Booking:", data); return { success: true, bookingId: `WL-${Date.now()}` }; }
export async function submitContact(data)    { console.log("Contact:", data); return { success: true }; }
