"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBookingService,
  deleteBooking,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestDetail(formDate) {
  console.log("calling profile update ... ");
  const nationalID = formDate.get("nationalID");
  const session = await auth();
  if (!session) throw new Error("you must login");

  const [nationality, countryFlag] = formDate.get("nationality").split("%");

  const updateData = { nationality, countryFlag, nationalID };
  updateGuest(session.user.id, updateData);
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = auth();
  if (!session) {
    throw new Error("you must login");
  }

  deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateBookingDetails(formData) {
  const session = await auth();
  console.clear();
  if (!session) {
    throw new Error("you must login");
  }
  const data = {
    numGusts: Number(formData.get("numGusts")),
    observations: formData.get("observations"),
  };
  const bookingId = Number(formData.get("id"));
  console.log("data");

  console.log(data);
  updateBooking(bookingId, data);
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  console.clear();
  const session = await auth();
  if (!session) {
    throw new Error("you must login");
  }
  // const newFormData = Object.entries(formData.entries());
  const newFormData = Object.fromEntries(formData.entries());
  const newBookingData = {
    ...bookingData,
    ...newFormData,
    gustId: session.user.id,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
  };
  // console.log(newFormData);
  console.log(newBookingData);
  createBookingService(newBookingData);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  revalidatePath("/account/reservations");
  redirect("/cabins/thankyou");
}
