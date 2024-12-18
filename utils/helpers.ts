import { Currency, IProviderCapability } from "@/types";
import { countryListAlpha2 } from "./data";

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  // Format for "March 19, 2024 10:30AM"
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export async function measureInternetSpeed(): Promise<number> {
  const testFileUrl = "https://testfile.xyz/file/download/5MB.zip";
  const fileSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes

  const startTime = performance.now();

  // Fetch the test file and calculate the time taken
  await fetch(testFileUrl);
  const endTime = performance.now();

  const timeTakenInSeconds = (endTime - startTime) / 1000; // Convert milliseconds to seconds

  // Calculate speed in MB/s
  const speedInMBps = fileSizeInBytes / (1024 * 1024) / timeTakenInSeconds; // Convert bytes to MB

  // Convert MB/s to Mbps (1 MB = 8 Mb)
  const speedInMbps = speedInMBps * 8;

  return speedInMbps;
}

/**
 * Shortens a text to a specified length and adds "..." if the text exceeds that length.
 *
 * @param text - The string to shorten.
 * @param maxLength - The maximum length of the returned string, including "..." if added.
 * @returns The shortened string with "..." if it exceeds the specified length.
 */
export function shortenText(
  text: string | undefined,
  maxLength: number
): string {
  // Check if the text is undefined or null
  if (!text) {
    return ""; // Return an empty string or handle it as needed
  }

  if (text.length <= maxLength) {
    return text; // Return the original text if it's within the limit.
  }

  // Shorten the text and append "..."
  const shortened = text.substring(0, maxLength - 3); // Leave space for "..."
  return shortened + "...";
}

export const getCountryName = (code: string): string | undefined => {
  return countryListAlpha2[code];
};

export function formatCurrency(
  amount: string | number,
  currency: Currency
): string {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  switch (currency) {
    case "GBP":
      return `£${numericAmount.toFixed(2)}`;
    case "USD":
      return `$${numericAmount.toFixed(2)}`;
    case "EUR":
      return `€${numericAmount.toFixed(2)}`;
    default:
      throw new Error(`Unsupported currency: ${currency}`);
  }
}
