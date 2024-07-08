export type Mode = 'light' | 'dark';

export type Language = 'fr' | 'en';

export interface UserProfilState {
  uid: string;
  email: string;
  profilImage?: string;
  mode: Mode;
  language: Language;
}
