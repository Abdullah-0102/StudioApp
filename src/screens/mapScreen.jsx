import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Platform, Alert, TouchableOpacity, TextInput, Image, ScrollView, Modal } from "react-native";
import Text from "../components/text";
import MapView, { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const GOOGLE_API_KEY = 'AIzaSyDMOtPK_TUmWOFdI99eDzqWjhVnmkUyLsQ'; 
var dealsData = [
    {
        id: 1,
        title: 'Villa, De Retreat',
        rating: 4.85,
        price: '1200$',
        image: require("../images/sample.png"),
        image2: require("../images/sample.png"),
        category: ['Room', 'Hotel'],
    },
    {
        id: 2,
        title: 'Bungalow',
        rating: 4.90,
        price: '1500$',
        image: require("../images/sample2.jpg"),
        image2: require("../images/sample2.jpg"),
        category: ['Trip', 'Leisure'],
    },
    {
        id: 3,
        title: 'Mountain Cabin',
        rating: 4.75,
        price: '950$',
        image: require("../images/sample3.jpg"),
        image2: require("../images/sample3.jpg"),
        category: ['Room', 'Luxury'],
    },
    {
        id: 4,
        title: 'City Apartment',
        rating: 4.80,
        price: '1300$',
        image: require("../images/sample4.jpg"),
        image2: require("../images/sample4.jpg"),
        category: ['Vacation', 'Leisure'],
    },
    {
        id: 5,
        title: 'Countryside',
        rating: 4.70,
        price: '1100$',
        image: require("../images/sample5.jpg"),
        image2: require("../images/sample5.jpg"),
        category: ['Leisure', 'Trip'],
    },
    {
        id: 6,
        title: 'Lakeside Lodge',
        rating: 4.95,
        price: '1400$',
        image: require("../images/sample3.jpg"),
        image2: require("../images/sample3.jpg"),
        category: ['Room', 'Leisure'],
    },
    {
        id: 7,
        title: 'Desert Oasis',
        rating: 4.65,
        price: '1600$',
        image: require("../images/sample2.jpg"),
        image2: require("../images/sample2.jpg"),
        category: ['Vacation', 'Hotel'],
    },
    {
        id: 8,
        title: 'Forest Haven',
        rating: 4.85,
        price: '1250$',
        image: require("../images/sample1.png"),
        image2: require("../images/sample1.png"),
        category: ['Leisure', 'Lodge'],
    },
    {
        id: 9,
        title: 'PentHouse',
        rating: 4.90,
        price: '2000$',
        image: require("../images/sample5.jpg"),
        image2: require("../images/sample5.jpg"),
        category: ['Room', 'Hotel'],
    },
    {
        id: 10,
        title: 'Cozy Cabin',
        rating: 4.80,
        price: '1000$',
        image: require("../images/sample4.jpg"),
        image2: require("../images/sample4.jpg"),
        category: ['Affordable', 'Trip'],
    },
];


const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [searchLocation, setSearchLocation] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [markerCoordinate, setMarkerCoordinate] = useState(null);
    const [error, setError] = useState(null); // State to track errors
    const [showDetailsModal, setShowDetailsModal] = useState(true); // State to control modal visibility

    const navigation = useNavigation();

    const handleLocationChange = async (text) => {
        setSearchLocation(text);
        setError(null); // Reset error state when user starts typing

        if (text.length > 2) {
            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
                    {
                        params: {
                            input: text,
                            key: GOOGLE_API_KEY,
                            types: 'geocode',
                            language: 'en'
                        }
                    }
                );

                if (response.data.status === 'OK') {
                    if (response.data.predictions.length === 0) {
                        setError("No locations found");
                    } else {
                        setPredictions(response.data.predictions);
                    }
                } else {
                    setError(response.data.error_message || "Failed to fetch predictions");
                    setPredictions([]);
                }
            } catch (error) {
                setError("An error occurred while fetching locations");
                console.error(error);
            }
        } 
        else {
            setPredictions([]);
        }
    };

    const handleSelectPrediction = async (placeId) => {
        console.log("Item clicked:", placeId); // Debugging line
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/place/details/json`,
                {
                    params: {
                        place_id: placeId,
                        key: GOOGLE_API_KEY
                    }
                }
            );

            if (response.data.status === 'OK') {
                const { lat, lng } = response.data.result.geometry.location;
                const newLocation = {
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                };
                setSelectedLocation(newLocation);
                setMarkerCoordinate(newLocation);
                setSearchLocation('');
                setPredictions([]);
            } else {
                setError(response.data.error_message || "Failed to fetch place details");
            }
        } catch (error) {
            setError("An error occurred while fetching place details");
            console.error(error);
        }
    };

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            return result === RESULTS.GRANTED;
        }
        return true;
    };

    useEffect(() => {
        const getCurrentLocation = async () => {
            const hasPermission = await requestLocationPermission();
            if (!hasPermission) {
                Alert.alert("Permission denied", "Location permission is required to use this feature.");
                return;
            }

            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const initialLocation = {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    };
                    setLocation(initialLocation);
                    setSelectedLocation(initialLocation);
                },
                (error) => {
                    console.log(error);
                    Alert.alert("Error getting location", error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 60000,
                    maximumAge: 10000,
                }
            );
        };

        getCurrentLocation();
    }, []);

    useEffect(() => {
        console.log("Selected Location Updated:", selectedLocation);
        console.log("Marker Coordinate Updated:", markerCoordinate);
    }, [selectedLocation, markerCoordinate]);

    if (!location && !selectedLocation) {
        return <View style={styles.container} />; // Show an empty view or a loading indicator while fetching location
    }

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
                    placeholderTextColor="#a3a3a3" 
                    value={searchLocation}
                    onChangeText={(text) => handleLocationChange(text)}
                    onFocus={() => {
                        setIsFocused(true);
                        setShowDetailsModal(false); 
                    }}
                    onBlur={() => setIsFocused(false)}
                />
            </TouchableOpacity>

            {isFocused && predictions.length > 0 && (
                <View
                    style={styles.suggestionList}
                >
                    {predictions.map((item, index) => (
                        <TouchableOpacity
                            key={item.place_id}
                            style={[styles.suggestion, { 
                                backgroundColor: 'gray',
                                borderBottomWidth: index !== predictions.length - 1 ? 1 : 0, 
                                borderBottomColor: 'white' 
                            }]}
                            onPress={() => {
                                handleSelectPrediction(item.place_id);
                                console.log("Suggestion pressed:", item.place_id); 
                            }}
                        >
                            <Text style={styles.suggestionText}>{item.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {isFocused && error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            <MapView
                style={styles.map}
                initialRegion={selectedLocation || location}
                region={selectedLocation || location}
                showsUserLocation={true}
                showsMyLocationButton={false}
                followsUserLocation={true}
                showsCompass={true}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
            >
                {markerCoordinate && (
                    <Marker
                        coordinate={markerCoordinate}
                        title="Selected Location"
                    />
                )}
            </MapView>

             {/* Modal for recommended studios */}
            {showDetailsModal && (
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.topBar} />
                    <View style={styles.detailsModalContent}>
                        <Text style={styles.detailsModalTitle}>Recommended Studios</Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.scrollViewContainer}
                        >
                            {dealsData.map(deal => (
                                <TouchableOpacity
                                    key={deal.id}
                                    style={styles.cardContainer}
                                    onPress={() => {
                                        navigation.navigate('StudioDetails', { deal: deal }); // Navigate to details screen with item data
                                    }}
                                >
                                    <Image
                                        source={deal.image}
                                        style={styles.cardImage}
                                    />
                                    <Text style={styles.cardTitle}>{deal.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        position: 'relative',
    },
    locationBar: {
        flexDirection: "row",
        alignItems: "center",
        position: 'absolute',
        top: 55,
        left: 20,
        right: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
        zIndex: 1,
    },
    focusedLocationBar: {
        borderColor: "#F3592C",
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
    suggestionList: {
        position: 'absolute',
        top: 106,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        zIndex: 2,
        maxHeight: 200, // Adjust as needed
    },
    suggestion: {
        padding: 10,
    },
    suggestionText: {
        fontSize: 16,
    },
    errorContainer: {
        position: 'absolute',
        top: 106,
        left: 20,
        right: 20,
        backgroundColor: '#ffdddd',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#cc0000',
        padding: 10,
        zIndex: 2,
    },
    errorText: {
        color: '#cc0000',
        fontSize: 16,
    },
    map: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },


    // MODAL STYLINGS
    modalBackground: {
        justifyContent: "flex-end",
    },
    modalContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    topBar: {
        height: 4,
        width: 50,
        backgroundColor: '#D3D3D3',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    detailsModalContent: {
        width: '100%',
    },
    detailsModalTitle: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        marginBottom: 15,
    },
    scrollViewContainer: {
        flexDirection: 'row',
    },
    cardContainer: {
        marginRight: 15,
        position: 'relative',
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    cardTitle: {
        position: 'absolute',
        bottom: 3,
        left: 4,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 5,
        fontSize: 10,
    },
});

export default MapScreen;
