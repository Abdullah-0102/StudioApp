import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Platform, Alert, TouchableOpacity, TextInput, Image, ScrollView, Modal} from "react-native";
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
        coordinates: { latitude: 33.6995, longitude: 73.0363 }
    },
    {
        id: 2,
        title: 'Bungalow',
        rating: 4.90,
        price: '1500$',
        image: require("../images/sample2.jpg"),
        image2: require("../images/sample2.jpg"),
        category: ['Trip', 'Leisure'],
        coordinates: { latitude: 34.6995, longitude: 72.0363 }
    },
    {
        id: 3,
        title: 'Mountain Cabin',
        rating: 4.75,
        price: '950$',
        image: require("../images/sample3.jpg"),
        image2: require("../images/sample3.jpg"),
        category: ['Room', 'Luxury'],
        coordinates: { latitude: 35.6995, longitude: 71.0363 }
    },
    {
        id: 4,
        title: 'City Apartment',
        rating: 4.80,
        price: '1300$',
        image: require("../images/sample4.jpg"),
        image2: require("../images/sample4.jpg"),
        category: ['Vacation', 'Leisure'],
        coordinates: { latitude: 36.6995, longitude: 70.0363 }
    },
    {
        id: 5,
        title: 'Countryside',
        rating: 4.70,
        price: '1100$',
        image: require("../images/sample5.jpg"),
        image2: require("../images/sample5.jpg"),
        category: ['Leisure', 'Trip'],
        coordinates: { latitude: 32.6995, longitude: 74.0363 }
    },
    {
        id: 6,
        title: 'Lakeside Lodge',
        rating: 4.95,
        price: '1400$',
        image: require("../images/sample3.jpg"),
        image2: require("../images/sample3.jpg"),
        category: ['Room', 'Leisure'],
        coordinates: { latitude: 31.6995, longitude: 75.0363 }
    },
    {
        id: 7,
        title: 'Desert Oasis',
        rating: 4.65,
        price: '1600$',
        image: require("../images/sample2.jpg"),
        image2: require("../images/sample2.jpg"),
        category: ['Vacation', 'Hotel'],
        coordinates: { latitude: 30.6995, longitude: 76.0363 }
    },
    {
        id: 8,
        title: 'Forest Haven',
        rating: 4.85,
        price: '1250$',
        image: require("../images/sample1.png"),
        image2: require("../images/sample1.png"),
        category: ['Leisure', 'Lodge'],
        coordinates: { latitude: 38.6995, longitude: 77.0363 }
    },
    {
        id: 9,
        title: 'PentHouse',
        rating: 4.90,
        price: '2000$',
        image: require("../images/sample5.jpg"),
        image2: require("../images/sample5.jpg"),
        category: ['Room', 'Hotel'],
        coordinates: { latitude: 37.6995, longitude: 78.0363 }
    },
    {
        id: 10,
        title: 'Cozy Cabin',
        rating: 4.80,
        price: '1000$',
        image: require("../images/sample4.jpg"),
        image2: require("../images/sample4.jpg"),
        category: ['Affordable', 'Trip'],
        coordinates: { latitude: 40.79725, longitude: 79.0363 }
    },
];


const MapScreen = () => {
    const [location, setLocation] = useState({
        latitude: 33.6844,
        longitude: 73.0479,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }); // Default location (e.g., Islamabad, Pakistan)
    const [searchLocation, setSearchLocation] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [markerCoordinate, setMarkerCoordinate] = useState(null);
    const [error, setError] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(true); 
    const [selectedDeal, setSelectedDeal] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); 

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
                // Alert.alert("Permission denied", "Location permission is required to use this feature.");
                setErrorMessage("Location permission is required to use this feature.");
                setShowErrorModal(true);
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
                    setErrorMessage("Please turn on your location services in order to fetch your current location, and reflect it on Map !");
                    setShowErrorModal(true);
                    // Alert.alert("Error getting location", "Please turn on your location services.");
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


    const handleMarkerPress = (deal) => {
        setSelectedDeal(deal);
    };
    
    const handleDetailPress = (deal) => {
        if (deal) {
          navigation.navigate('StudioDetails', { deal: deal });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.smallContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../images/back-arrow.png")} style={styles.backArrow} />
                </TouchableOpacity>
            </View>
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
                        // setShowDetailsModal(false); 
                    }}
                    onBlur={() => setIsFocused(false)}
                />
            </TouchableOpacity>

            {isFocused && predictions.length > 0 && (
                <View style={styles.suggestionList}>
                {predictions.map((item, index) => (
                    <TouchableOpacity
                        key={item.place_id}
                        style={[styles.suggestion, { 
                            borderBottomWidth: index !== predictions.length - 1 ? 1 : 0, 
                            borderBottomColor: '#D3D3D3' 
                        }]}
                        onPress={() => {
                            handleSelectPrediction(item.place_id);
                            console.log("Suggestion pressed:", item.place_id); 
                        }}
                    >
                        <Image 
                            source={require('../images/location.png')} // Update the path to your location icon
                            style={styles.icon}
                        />
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
                showsCompass={false}
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

                {dealsData.map((deal) => (
                    <Marker
                        key={deal.id}
                        coordinate={deal.coordinates}
                        title={deal.title}
                        description={deal.price}
                        pinColor="#F3592C" 
                        onPress={() => handleMarkerPress(deal)}
                    />
                ))}
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
                                        navigation.navigate('StudioDetails', { deal: deal });
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

            <Modal
                visible={showErrorModal}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContainer1}>
                        <Text style={styles.modalTitle1}>LOCATION ERROR</Text>
                        <Text style={styles.modalMessage1}>{errorMessage}</Text>
                        <TouchableOpacity 
                            onPress={() => setShowErrorModal(false)} 
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        position: 'relative',
    },
    backArrow: {
        width: 25,
        height: 25,
        tintColor: 'black',
        position: 'absolute',
        // top: 15,
        // left: 30,
        // right: 20,
        // paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
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
    smallContainer: {
        flexDirection: "row",
        alignItems: "center",
        position: 'absolute',
        top: 20,
        left: 10,
        right: 20,
        paddingHorizontal: 10,
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
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        zIndex: 2,
        maxHeight: 350, 
    },
    suggestion: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 11.5,  
        height: 15, 
        marginRight: 10, 
    },
    suggestionText: {
        color: 'black',
        fontSize: 12,
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

    detailView: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      },
      detailText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      detailLink: {
        color: 'blue',
        marginTop: 10,
        textAlign: 'center',
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

    // Location Error Modals styling
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer1: {
        width: "100%",
        backgroundColor: "#F0F8FF",
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: "center",
    },
    modalTitle1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    modalMessage1: {
        fontSize: 16,
        marginBottom: 40,
        textAlign: "center",
        color: 'black',
    },
    closeButton: {
        backgroundColor: '#F3592C',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default MapScreen;
