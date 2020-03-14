import NextI18Next from 'next-i18next'
import { NextComponentType, NextPageContext } from "next";
import { useTranslation as originalUseTranslation } from "react-i18next";

export const nextI18next = new NextI18Next({
  localeSubpaths: {
    fi: 'fi',
    en: 'en',
    fa: 'fa'
  },
  defaultLanguage: 'fi',
  otherLanguages: ['en', 'fa'],
  defaultNS: 'common',
})

export const includeDefaultNamespaces = (namespaces: string[]) =>
  ["common", "_error"].concat(namespaces);

export const useTranslation = originalUseTranslation;
export const withTranslation = nextI18next.withTranslation;
export const appWithTranslation = nextI18next.appWithTranslation;
export const Trans = nextI18next.Trans;

export type I18nPage<P = {}> = NextComponentType<
  NextPageContext,
  { namespacesRequired: string[] },
  P & { namespacesRequired: string[] }
>;
