import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ZonesStackParamList } from "../navigation/types";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  updateZoneAsync,
  deleteZoneAsync,
} from "../../state/slices/zonesThunks";
import { useToast } from "../contexts/ToastContext";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Min 2 znaki").max(40, "Max 40 znaków"),
  icon: z.string().min(1, "Wybierz ikonę").optional(),
  address: z.string().min(2, "Adres wymagany").optional(),
  radius: z.number().min(100).max(5000),
});

type FormValues = z.infer<typeof schema>;

type ZoneEditNavigationProp = NativeStackNavigationProp<
  ZonesStackParamList,
  "ZoneEdit"
>;
type ZoneEditRouteProp = RouteProp<ZonesStackParamList, "ZoneEdit">;

export const ZoneEditScreen: React.FC = () => {
  const navigation = useNavigation<ZoneEditNavigationProp>();
  const route = useRoute<ZoneEditRouteProp>();
  const { zoneId } = route.params;
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const zone = useAppSelector((s) =>
    s.zones.zones.find((z) => z.id === zoneId)
  );

  const defaultValues: FormValues = {
    name: zone?.name || "",
    icon: zone?.icon || "🏠",
    address: zone?.address || "",
    radius: zone?.coordinates?.radius || 250,
  } as any;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (zone) {
      setValue("name", zone.name);
      setValue("icon", zone.icon || "🏠");
      setValue("address", zone.address || "");
      setValue("radius", zone.coordinates?.radius || 250);
    }
  }, [zone]);

  const icons = [
    "🏠",
    "🏫",
    "🏢",
    "🏬",
    "🏥",
    "🏛",
    "⛪",
    "🕌",
    "🏟",
    "🏞",
    "🎡",
    "🎢",
    "🎠",
    "⚽",
    "🏀",
    "🏈",
  ];

  const radius = watch("radius");

  const onSubmit = (data: FormValues) => {
    if (!zone) return;
    dispatch(
      updateZoneAsync({
        ...zone,
        name: data.name,
        icon: data.icon || zone.icon || "🏠",
        address: data.address || "",
        coordinates: { ...zone.coordinates, radius: data.radius },
      }) as any
    )
      .unwrap()
      .then(() => {
        showToast("Zapisano zmiany", "success");
        navigation.goBack();
      })
      .catch((e: any) => showToast(e?.message || "Błąd zapisu", "error"));
  };

  const handleDelete = () => {
    if (!zone) return;
    const exec = () => {
      dispatch(deleteZoneAsync(zone.id) as any)
        .unwrap()
        .then(() => {
          showToast("Strefa usunięta", "success");
          navigation.navigate("ZonesList");
        })
        .catch((e: any) => showToast(e?.message || "Błąd usuwania", "error"));
    };
    if (Platform.OS === "web") {
      if (window.confirm("Czy na pewno chcesz usunąć strefę?")) exec();
    } else {
      exec();
    }
  };

  const adjustRadius = (delta: number) => {
    const current = watch("radius");
    const next = Math.min(5000, Math.max(100, current + delta));
    setValue("radius", next, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {!zone && (
        <View style={{ padding: 32 }}>
          <Text style={{ fontSize: 16 }}>Nie znaleziono strefy.</Text>
        </View>
      )}
      {zone && (
        <>
          <Text style={styles.header}>Edytuj strefę</Text>

          <Text style={styles.sectionTitle}>Nazwa strefy</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={value}
                onChangeText={onChange}
                placeholder="Wpisz nazwę"
              />
            )}
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}

          <Text style={styles.sectionTitle}>Ikona</Text>
          <Controller
            control={control}
            name="icon"
            render={({ field: { value, onChange } }) => (
              <View style={styles.iconsGrid}>
                {icons.map((ic) => (
                  <TouchableOpacity
                    key={ic}
                    style={[
                      styles.iconButton,
                      value === ic && styles.selectedIconButton,
                    ]}
                    onPress={() => onChange(ic)}
                  >
                    <Text style={styles.iconText}>{ic}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
          {errors.icon && (
            <Text style={styles.errorText}>{errors.icon.message}</Text>
          )}

          <Text style={styles.sectionTitle}>Adres</Text>
          <Controller
            control={control}
            name="address"
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[styles.input, errors.address && styles.inputError]}
                value={value}
                onChangeText={onChange}
                placeholder="Wpisz adres"
              />
            )}
          />
          {errors.address && (
            <Text style={styles.errorText}>{errors.address.message}</Text>
          )}

          <Text style={styles.sectionTitle}>Promień strefy</Text>
          <Controller
            control={control}
            name="radius"
            render={({ field: { value } }) => (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.radiusValue}>{value} m</Text>
                <View style={styles.radiusControls}>
                  {[-100, -50, -10, +10, +50, +100].map((step) => (
                    <TouchableOpacity
                      key={step}
                      style={styles.radiusButton}
                      onPress={() => adjustRadius(step)}
                      disabled={
                        (value <= 100 && step < 0) ||
                        (value >= 5000 && step > 0)
                      }
                    >
                      <Text style={styles.radiusButtonText}>
                        {step > 0 ? `+${step}` : step}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          />
          {errors.radius && (
            <Text style={styles.errorText}>{errors.radius.message}</Text>
          )}

          <TouchableOpacity
            style={[styles.saveButton, isSubmitting && styles.disabledButton]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Text style={styles.saveButtonText}>
              {isSubmitting ? "Zapisywanie..." : "Zapisz zmiany"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Usuń strefę</Text>
          </TouchableOpacity>
        </>
      )}
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
  header: { fontSize: 20, fontWeight: "700", color: "#222", marginBottom: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 15,
    marginTop: 20,
  },
  errorText: { color: "#E53E3E", fontSize: 12, marginTop: -8, marginBottom: 8 },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginBottom: 20,
  },
  inputError: { borderColor: "#E53E3E" },
  iconsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedIconButton: {
    borderColor: "#2C5282",
    backgroundColor: "#E6F3FF",
  },
  iconText: {
    fontSize: 24,
  },
  radiusValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C5282",
    marginBottom: 15,
  },
  radiusControls: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  radiusButton: {
    minWidth: 56,
    height: 40,
    backgroundColor: "#2C5282",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
  },
  radiusButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#2C5282",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  disabledButton: { opacity: 0.6 },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FF6B6B",
  },
  deleteButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
