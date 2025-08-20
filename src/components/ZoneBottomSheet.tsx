import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Zone } from "../types";

interface ZoneBottomSheetProps {
  zone: Zone | null;
  isVisible: boolean;
  onClose: () => void;
  onEdit: (zone: Zone) => void;
  onToggleNotifications: (zone: Zone) => void;
  onDelete: (zone: Zone) => void;
}

export const ZoneBottomSheet: React.FC<ZoneBottomSheetProps> = ({
  zone,
  isVisible,
  onClose,
  onEdit,
  onToggleNotifications,
  onDelete,
}) => {
  if (!zone) return null;

  const hasNotifications = Object.values(zone.notificationsByDevice).some(
    (enabled) => enabled
  );

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        <View style={styles.bottomSheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Text style={styles.zoneIcon}>{zone.icon}</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.zoneName}>{zone.name}</Text>
              <Text style={styles.zoneRadius}>Promień: {zone.radius}m</Text>
            </View>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: zone.active ? "#4CAF50" : "#F44336" },
              ]}
            />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                onEdit(zone);
                onClose();
              }}
            >
              <Text style={styles.actionIcon}>✏️</Text>
              <Text style={styles.actionText}>Edytuj</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                onToggleNotifications(zone);
                onClose();
              }}
            >
              <Text style={styles.actionIcon}>
                {hasNotifications ? "🔕" : "🔔"}
              </Text>
              <Text style={styles.actionText}>
                {hasNotifications
                  ? "Wyłącz powiadomienia"
                  : "Włącz powiadomienia"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => {
                onDelete(zone);
                onClose();
              }}
            >
              <Text style={styles.actionIcon}>🗑️</Text>
              <Text style={[styles.actionText, styles.deleteText]}>Usuń</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 34,
    maxHeight: "50%",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  zoneIcon: {
    fontSize: 24,
  },
  titleContainer: {
    flex: 1,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  zoneRadius: {
    fontSize: 14,
    color: "#666",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  actions: {
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
  },
  deleteButton: {
    backgroundColor: "#FFEBEE",
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  deleteText: {
    color: "#F44336",
  },
});
