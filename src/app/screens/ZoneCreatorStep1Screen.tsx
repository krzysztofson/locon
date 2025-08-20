import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useZoneCreatorStore } from "../../state/zoneCreatorStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ZonesStackParamList } from "../navigation/types";

type ZoneCreatorStep1NavigationProp = NativeStackNavigationProp<
  ZonesStackParamList,
  "ZoneCreatorStep1"
>;

const schema = z.object({
  name: z
    .string()
    .min(2, "Nazwa musi mieć co najmniej 2 znaki")
    .max(40, "Maksymalnie 40 znaków"),
});

type FormValues = z.infer<typeof schema>;

export const ZoneCreatorStep1Screen: React.FC = () => {
  const navigation = useNavigation<ZoneCreatorStep1NavigationProp>();
  const { setNameIcon, zoneDraft } = useZoneCreatorStore();
  const [selectedIcon, setSelectedIcon] = React.useState<string>(
    zoneDraft.icon || "🏠"
  );

  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: zoneDraft.name || "" },
    mode: "onChange",
  });

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
    "🎾",
    "🏓",
    "🏸",
    "🏒",
    "🏑",
    "🥊",
    "🚗",
    "🚕",
    "🚙",
    "🚌",
    "🚎",
    "🏍",
    "🚲",
    "🛴",
    "🛺",
    "🚁",
  ];

  const onSubmit = (data: FormValues) => {
    setNameIcon(data.name.trim(), selectedIcon);
    navigation.navigate("ZoneCreatorStep2", {
      name: data.name.trim(),
      icon: selectedIcon,
    });
  };

  const canContinue = formState.isValid;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.stepText}>Krok 1 z 4</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "25%" }]} />
        </View>

        <Text style={styles.title}>Nadaj nazwę strefie</Text>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange, onBlur } }: any) => (
              <TextInput
                style={[
                  styles.input,
                  formState.errors.name && styles.inputError,
                ]}
                placeholder="Wpisz nazwę"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholderTextColor="#999999"
              />
            )}
          />
          {formState.errors.name && (
            <Text style={styles.errorText}>
              {formState.errors.name.message}
            </Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Wybierz ikonę</Text>

        <View style={styles.iconsGrid}>
          {icons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.iconButton,
                selectedIcon === icon && styles.selectedIconButton,
              ]}
              onPress={() => setSelectedIcon(icon)}
            >
              <Text style={styles.iconText}>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !canContinue && styles.disabledButton]}
          onPress={handleSubmit(onSubmit)}
          disabled={!canContinue}
        >
          <Text
            style={[
              styles.nextButtonText,
              !canContinue && styles.disabledButtonText,
            ]}
          >
            Dalej
          </Text>
        </TouchableOpacity>
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
  stepText: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 2,
    marginBottom: 30,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2C5282",
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  inputError: {
    borderColor: "#E53E3E",
  },
  errorText: {
    color: "#E53E3E",
    fontSize: 12,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 20,
  },
  iconsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 40,
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
  nextButton: {
    backgroundColor: "#2C5282",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledButtonText: {
    color: "#999999",
  },
});
