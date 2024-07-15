import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

const MapScreen = () => {
    const [location, setLocation] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleLocationChange = (text) => {
        setLocation(text);
        console.log(text);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.locationBar, isFocused && styles.focusedLocationBar]}>
                <Image
                    style={styles.locationIcon}
                    resizeMode="cover"
                    source={require("../images/location-icon.png")}
                />
                <TextInput
                    style={styles.locationTextInput}
                    placeholder="Going to?"
                    placeholderTextColor="#000" // Set the placeholder text color to black
                    value={location}
                    onChangeText={(text) => handleLocationChange(text)} // Changed from onChange to onChangeText
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    },
    locationBar: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    focusedLocationBar: {
        borderColor: "#F3592C", // Border color when focused
    },
    locationIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    locationTextInput: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },
});

export default MapScreen;
