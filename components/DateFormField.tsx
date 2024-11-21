import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

interface DateFormFieldProps {
  label: string;
  startDate: (date: string) => void;
  endDate: (date: string) => void;
  startPlaceholder: string;
  endPlaceholder: string;
}

export default function DateFormField({
  label,
  startDate,
  endDate,
  startPlaceholder,
  endPlaceholder,
}: DateFormFieldProps) {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);

  const handleDateChange = (startOrEnd: string, date: any) => {
    if (date) {
      const parsedDate = dayjs(date).format("YYYY-MM-DD");
      if (startOrEnd === "start") {
        setSelectedStartDate(parsedDate);
        startDate(parsedDate);
      } else {
        setSelectedEndDate(parsedDate);
        endDate(parsedDate);
        setShowPicker(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dropdown}>
        <Pressable
          style={styles.toggle}
          onPress={() => setShowPicker(!showPicker)}
        >
          <Text
            style={[
              styles.toggleText,
              styles.toggleLeftText,
              selectedStartDate !== null && styles.textColor,
            ]}
          >
            {selectedStartDate ? selectedStartDate : startPlaceholder}
          </Text>
          <Text
            style={[
              styles.toggleText,
              styles.toggleRightText,
              selectedEndDate !== null && styles.textColor,
            ]}
          >
            {selectedEndDate ? selectedEndDate : endPlaceholder}
          </Text>
        </Pressable>
        <View style={[styles.picker, !showPicker && styles.pickerHidden]}>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              mode="range"
              startDate={
                selectedStartDate ? dayjs(selectedStartDate) : undefined
              }
              endDate={selectedEndDate ? dayjs(selectedEndDate) : undefined}
              onChange={({ startDate, endDate }) => {
                if (startDate) handleDateChange("start", startDate);
                if (endDate) handleDateChange("end", endDate);
              }}
              displayFullDays={true}
              selectedItemColor="#4CAF50"
              headerTextStyle={{ color: "#4CAF50" }}
              headerButtonColor="#4CAF50"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdown: {
    position: "relative",
  },
  toggle: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: -1,
  },
  toggleText: {
    paddingVertical: 12,
    color: "#999",
    flex: 1,
  },
  textColor: { color: "Black" },
  toggleLeftText: {
    paddingLeft: 16,
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  toggleRightText: {
    paddingRight: 16,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: "#ddd",
  },
  picker: {
    position: "absolute",
    top: "100%",
    left: 0,
    zIndex: 100,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    width: "100%",
    backgroundColor: "#4CAF504D",
  },
  pickerHidden: {
    display: "none",
  },
});
