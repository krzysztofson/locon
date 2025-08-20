import React, { useCallback, useEffect, useState } from "react";
import i18n from "./i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  I18nextProvider as Provider,
  useTranslation,
  Trans,
} from "react-i18next";

const LANGUAGE_STORAGE_KEY = "app.language";

export const I18nextWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ready, setReady] = useState(false);
  const [langVersion, setLangVersion] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const handler = () => setLangVersion((v) => v + 1);
    i18n.on("languageChanged", handler);
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored && stored !== i18n.language) {
          await i18n.changeLanguage(stored);
        }
      } catch (e) {
        console.warn("Failed to load stored language", e);
      } finally {
        if (isMounted) setReady(true);
      }
    })();
    return () => {
      isMounted = false;
      i18n.off("languageChanged", handler);
    };
  }, []);

  if (!ready) {
    // Simple fallback; could be replaced by a splash / loader
    return null;
  }

  return <Provider i18n={i18n}>{children}</Provider>;
};

// Hook returning t plus helper changeLanguage with dynamic load
export const useT = () => {
  const { t, i18n: i18nextInstance } = useTranslation();
  const changeLanguage = useCallback(async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
    } catch (e) {
      console.warn(
        "Remote i18n load failed, falling back to embedded resources",
        e
      );
      await i18n.changeLanguage(lng);
    } finally {
      try {
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
      } catch (storageErr) {
        console.warn("Failed to persist language", storageErr);
      }
    }
  }, []);
  return {
    t,
    changeLanguage,
    currentLanguage: i18nextInstance.language,
    Trans,
  };
};

export { Trans } from "react-i18next";
