export interface CountriesState {
  countries: string[];
}

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string | undefined;
  confirmPassword: string;
  gender: string | undefined;
  agreement: boolean | string;
  image?: FileList | undefined | null | string | ArrayBuffer;
  country: string | undefined;
}

export interface FormsState {
  forms: FormData[];
}
