import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import { roleCapabilities } from "../../modules/auth/rbac";
import { useT } from "../../i18n/I18nextProvider";

export const SettingsScreen: React.FC = () => {
  const { logout, user, setRole } = useAuth();
  const navigation = useNavigation<any>();
  const { t, changeLanguage, currentLanguage } = useT();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [locationEnabled, setLocationEnabled] = React.useState(true);

  const handleLogout = () => {
    if (Platform.OS === "web") {
      const confirmed =
        typeof window !== "undefined"
          ? window.confirm(t("settings.logoutConfirm"))
          : true;
      if (confirmed) {
        logout().then(() => {
          navigation.reset({ index: 0, routes: [{ name: "Auth" }] });
        });
      }
      return;
    }
    Alert.alert(t("settings.logoutTitle"), t("settings.logoutConfirm"), [
      {
        text: t("settings.cancel"),
        style: "cancel",
      },
      {
        text: t("settings.confirmLogout"),
        style: "destructive",
        onPress: async () => {
          await logout();
          navigation.reset({ index: 0, routes: [{ name: "Auth" }] });
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userPhone}>{user.phone}</Text>
            <Text style={styles.userRole}>
              {t("settings.role")} {t(`settings.roles.${user.role}`)}
            </Text>
            <View style={styles.rolesRow}>
              {(["admin", "user", "viewer"] as const).map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.rolePill,
                    user.role === r && styles.rolePillActive,
                  ]}
                  onPress={() => setRole(r)}
                >
                  <Text
                    style={[
                      styles.rolePillText,
                      user.role === r && styles.rolePillTextActive,
                    ]}
                  >
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("settings.notifications")}</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{t("settings.push")}</Text>
              <Text style={styles.settingDescription}>
                {t("settings.pushDesc")}
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#E5E5E5", true: "#50C878" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("settings.location")}</Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("settings.language")}</Text>
            <View style={styles.rolesRow}>
              {["pl", "en", "de"].map((lng) => (
                <TouchableOpacity
                  key={lng}
                  style={[
                    styles.rolePill,
                    lng === currentLanguage && styles.rolePillActive,
                  ]}
                  onPress={() => {
                    changeLanguage(lng);
                  }}
                >
                  <Text
                    style={[
                      styles.rolePillText,
                      lng === currentLanguage && styles.rolePillTextActive,
                    ]}
                  >
                    {lng}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>
                {t("settings.locationServices")}
              </Text>
              <Text style={styles.settingDescription}>
                {t("settings.locationServicesDesc")}
              </Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: "#E5E5E5", true: "#50C878" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("settings.account")}</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuLabel}>{t("settings.userProfile")}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuLabel}>{t("settings.devices")}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuLabel}>{t("settings.permissions")}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("settings.support")}</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuLabel}>{t("settings.help")}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuLabel}>{t("settings.contact")}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuLabel}>{t("settings.privacy")}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>{t("settings.logout")}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>
            {t("settings.version", { version: "1.0.0" })}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    padding: 20,
  },
  userInfo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: "#2C5282",
    fontWeight: "600",
  },
  rolesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 8,
  },
  rolePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#E2E8F0",
  },
  rolePillActive: {
    backgroundColor: "#2C5282",
  },
  rolePillText: {
    color: "#2C5282",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  rolePillTextActive: {
    color: "#fff",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
  },
  settingItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#666666",
  },
  menuItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuLabel: {
    fontSize: 16,
    color: "#333333",
  },
  chevron: {
    fontSize: 20,
    color: "#CCCCCC",
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  version: {
    fontSize: 14,
    color: "#999999",
  },
});
