import React, { useState } from "react";
import { Alert } from "react-native";
import { Container } from "../../components/Container";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Text } from "../../components/Text";
import { useAuth } from "../../contexts/AuthContext";

export const LoginScreen: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const { sendOTP, verifyOTP } = useAuth();

  const formatPhoneNumber = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, "");

    // Add +48 prefix if not present
    if (cleaned.length > 0 && !cleaned.startsWith("48")) {
      return "+48 " + cleaned.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
    } else if (cleaned.startsWith("48")) {
      const withoutPrefix = cleaned.substring(2);
      return (
        "+48 " + withoutPrefix.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")
      );
    }

    return text;
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Remove spaces and check if it matches Polish phone number format
    const cleaned = phone.replace(/\s/g, "");
    const phoneRegex = /^\+48\d{9}$/;
    return phoneRegex.test(cleaned);
  };

  const handleSendOTP = async () => {
    if (!validatePhoneNumber(phone)) {
      Alert.alert(
        "Błąd",
        "Proszę wprowadzić poprawny numer telefonu w formacie +48 XXX XXX XXX"
      );
      return;
    }

    setLoading(true);
    try {
      await sendOTP(phone.replace(/\s/g, ""));
      setStep("otp");
      Alert.alert(
        "Kod wysłany",
        "Kod weryfikacyjny został wysłany na Twój numer telefonu"
      );
    } catch (error) {
      Alert.alert(
        "Błąd",
        error instanceof Error ? error.message : "Nie udało się wysłać kodu"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 4) {
      Alert.alert("Błąd", "Kod weryfikacyjny musi mieć 4 cyfry");
      return;
    }

    setLoading(true);
    try {
      await verifyOTP(phone.replace(/\s/g, ""), otp);
      // Navigation will be handled by AuthContext state change
    } catch (error) {
      Alert.alert(
        "Błąd",
        error instanceof Error
          ? error.message
          : "Nieprawidłowy kod weryfikacyjny"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhone(formatted);
  };

  return (
    <Container>
      <Card style={{ marginHorizontal: 20, marginTop: 100 }}>
        <Text variant="h1" style={{ textAlign: "center", marginBottom: 30 }}>
          Bezpieczna Rodzina
        </Text>

        {step === "phone" ? (
          <>
            <Text variant="h2" style={{ marginBottom: 20 }}>
              Zaloguj się
            </Text>
            <Text variant="body" style={{ marginBottom: 20, color: "#666" }}>
              Wprowadź swój numer telefonu, aby otrzymać kod weryfikacyjny
            </Text>

            <Input
              placeholder="+48 XXX XXX XXX"
              value={phone}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
              style={{ marginBottom: 20 }}
            />

            <Button
              title="Wyślij kod"
              onPress={handleSendOTP}
              loading={loading}
              disabled={!validatePhoneNumber(phone)}
            />
          </>
        ) : (
          <>
            <Text variant="h2" style={{ marginBottom: 20 }}>
              Wprowadź kod
            </Text>
            <Text variant="body" style={{ marginBottom: 20, color: "#666" }}>
              Kod weryfikacyjny został wysłany na numer {phone}
            </Text>

            <Input
              placeholder="1234"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={4}
              style={{ marginBottom: 20, textAlign: "center", fontSize: 18 }}
            />

            <Button
              title="Zweryfikuj kod"
              onPress={handleVerifyOTP}
              loading={loading}
              disabled={otp.length !== 4}
              style={{ marginBottom: 10 }}
            />

            <Button
              title="Wyślij kod ponownie"
              onPress={() => setStep("phone")}
              variant="secondary"
            />
          </>
        )}
      </Card>
    </Container>
  );
};
