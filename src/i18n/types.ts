/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-namespace */

import type { OmitIndexSignature, Simplify } from 'type-fest';

import type libuiTranslations from './translations/libui.json';

export declare namespace UserConfig {
  interface LanguageOptions {
    [key: string]: boolean;
  }
  interface Translations {
    [key: string]:
      | {
          [L in Language]?: string;
        }
      | Translations;
  }
}

export type LanguageOptions = {
  en: true;
  fr: true;
} & UserConfig.LanguageOptions;

export type Language = keyof { [L in keyof LanguageOptions as LanguageOptions[L] extends true ? L : never]: any };

export type Translations = Simplify<
  {
    libui: typeof libuiTranslations;
  } & OmitIndexSignature<UserConfig.Translations>
>;

export type ExtractTranslationKey<T extends { [key: string]: any }, Key = keyof T> = Key extends string
  ? T[Key] extends { [key: string]: any }
    ? T[Key] extends { [K in Language]?: string }
      ? Key
      : `${Key}.${ExtractTranslationKey<T[Key]>}`
    : `${Key}`
  : never;

export type TranslationNamespace = Extract<keyof Translations, string>;

export type TranslationKey<TNamespace> = TNamespace extends TranslationNamespace
  ? ExtractTranslationKey<Translations[TNamespace]>
  : ExtractTranslationKey<Translations>;

export interface TranslateFunction<TNamespace = undefined> {
  (key: TranslationKey<TNamespace>): string;
  (translations: { [L in Language]: string }): string;
}