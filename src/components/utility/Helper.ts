interface User {
  name: string;
  email: string;
  token: string;
}

export type SearchInputSchema = {
  search: string;
  type: string;
  parking: boolean;
  furnished: boolean;
  offer: boolean;
  sort: string;
  limit: number;
};

export const getLocalStorageUser = (): User[] | null => {
  const data: User[] | null = JSON.parse(
    localStorage.getItem("accessToken") || "null"
  );

  return data ? data : null;
};

export const getToken = (): string | any => {
  const data: User[] | null = JSON.parse(
    localStorage.getItem("accessToken") || "null"
  );
  if (data) {
    return data[0].token;
  }
  return "";
};

export const setLocalStorageUser = (data: User) => {
  const input: User[] = [data];
  localStorage.setItem("accessToken", JSON.stringify(input));
};

export type ListingSchema = {
  name: string;
  description: string;
  address: string;
  contact: string;
  bed: string;
  baths: string;
  type: string;
  regular_price: string;
  parking: boolean;
  furnished: boolean;
  offer: boolean;
  image_urls: null | string;
  list_id: string;
  date_added: string;
};

export function convertToFormattedDate(dateString: string) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedDate;
}

export type FormValuesSchema = {
  name: string;
  description: string;
  address: string;
  contact: string;
  bed: string;
  baths: string;
  type: string;
  price: string;
  parking: boolean;
  furnished: boolean;
  offer: boolean;
  files?: null | any[];
  email: "";
};
