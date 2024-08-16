export interface CountriesState {
  countries: string[];
}

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string | undefined;
  agreement: string;
  picture?: string | ArrayBuffer | null | undefined | FileList;
  country: string | undefined;
}

export interface FormsState {
  forms: FormData[];
}
