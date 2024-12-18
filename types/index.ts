export interface IResponse<T = any> {
  data: T; // The data returned from the API
  success: boolean; // A flag indicating the success of the request
  message?: string; // An optional message for additional information
}

export type Currency = "GBP" | "USD" | "EUR";

export interface ITransaction {
  id: string;
  currency: Currency;
  amount: string; // Keeping amount as string since it's a monetary value in the data
  status: "successful" | "failed" | "pending"; // Assuming limited statuses
  reference: string;
  created_at: string; // ISO 8601 datetime format
  updated_at: string; // ISO 8601 datetime format
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string; // Consider removing this if sensitive data shouldn't be stored in state
  created_at: string;
  updated_at: string;
  verified: boolean;
  country?: string;
}

export interface CreateUserParams {
  email: string; // User's email address
  first_name: string; // User's first name
  last_name: string; // User's last name
  phone: string; // User's phone number
  password: string; // User's password
  country: string; // User's country
}

export interface LoginUserParams {
  email: string; // User's email address
  password: string;
}

export interface IPlan {
  size: string;
  price: string;
  validity: string;
  coverage: string;
  speed: string;
}

// Type for Local eSIMs
export interface ILocalEsim {
  name: string; // Name of the country
  flagUrl: string; // URL of the flag image
  priceRange: string; // Price range (e.g., "$10 - $50/GB")
}

// Type for Regional eSIMs
export interface IRegionalEsim {
  name: string; // Name of the continent
  backgroundColor: string; // Background color for the continent icon or placeholder
  priceRange: string;
  coverage: string;
  color: string;
}

export interface IProvider {
  id: string;
  name: string;
  api_key: string;
  api_endpoint: string;
  created_at: string;
  updated_at: string;
}

export interface IESIM {
  id: string;
  name: string | null;
  iccid: string | null;
  activation_code: string;
  status: "assigned" | "inactive" | "active";
  expiry_date: string;
  created_at: string;
  updated_at: string;
  provider: IProvider;
}

export interface IProviderCapability {
  id: string;
  created_at: string;
  updated_at: string;
  capability: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
  provider: {
    id: string;
    name: string;
    api_key: string;
    api_endpoint: string;
    created_at: string;
    updated_at: string;
  };
}
