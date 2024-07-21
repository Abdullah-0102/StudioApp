import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Text from '../components/text';

import { useNavigation } from '@react-navigation/native';
import { useFavorites } from "../contexts/favoritesContext";
import { BookingContext } from "../contexts/bookingsContext";

const StudioDetailsScreen = ({ route }) => {
    const { deal } = route.params;
    console.log('Deal: ' + deal);

    const navigation = useNavigation();
    const { favorites, toggleFavorite } = useFavorites(); 
    const { addBooking } = useContext(BookingContext);
    const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);


    const handleBookNow = (item) => {
        // Step 1: Display the modal
        setIsBookingModalVisible(true);
    
        // Step 2: Add booking
        addBooking(item);
        console.log(item);
    
        // Step 3: Navigate back after a short delay (e.g., 100ms) to ensure the modal is displayed first
        setTimeout(() => {
            navigation.goBack();
        }, 1000);
    
        // Step 4: Hide the modal after 3 seconds
        setTimeout(() => {
            setIsBookingModalVisible(false);
        }, 3000);
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../images/back-arrow.png")} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Studio Details</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.imageContainer}
                >
                    <Image source={deal.image} style={styles.image} />
                    <Image source={deal.image2} style={styles.image2} />
                </ScrollView>
                <View style={styles.detailsContainer}>
                    <Text style={styles.dealTitle}>{deal.title}</Text>
                    <View style={styles.ratingContainer}>
                        <Image
                            style={styles.ratingIcon}
                            resizeMode="cover"
                            source={require("../images/star.png")}
                        />
                        <Text style={styles.ratingText}>{deal.rating}</Text>
                    </View>
                </View>
                <View style={styles.additionalDetailsContainer}>
                    <View style={styles.infoRow}>
                        <Image
                            style={styles.infoIcon}
                            resizeMode="cover"
                            source={require("../images/beds.png")}
                        />
                        <Text style={styles.infoText}>
                            2 bedrooms
                        </Text>
                    </View>
                    <View style={[styles.infoRow, styles.infoRowMarginTop]}>
                        <Image
                            style={styles.infoIcon1}
                            resizeMode="cover"
                            source={require("../images/location.png")}
                        />
                        <Text style={styles.infoText}>
                            4th Floor, Kaneeru Villa, Orchid Magu Malé, 20212
                        </Text>
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>
                        Description
                    </Text>
                    <Text style={styles.descriptionText}>
                     This modern studio apartment offers a cozy and comfortable living space with sleek, 
                     contemporary furnishings. Located in the heart of the city, it features an open floor plan,
                     large windows that provide plenty of natural light, and a fully equipped kitchen. 
                     Ideal for both short-term stays and long-term living.
                    </Text>
                </View>
                <View style={styles.purchaseContainer}>
                    <TouchableOpacity style={styles.buyButton} onPress={() => handleBookNow(deal)}>
                        <Text style={styles.buyButtonText}>Book for {deal.price}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavorite(deal.id)}>
                        <Image
                            style={[styles.favoritesIcon, { tintColor: favorites[deal.id] ? '#F3592C' : '#C0C0C0' }]}
                            resizeMode="cover"
                            source={require("../images/favourites.png")}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>



            {/* Booking Confirmation model */}
            <Modal
                visible={isBookingModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsBookingModalVisible(false)}
            >
                <View style={styles.modalBookingBackground}>
                    <View style={styles.modalBookingContainer}>
                        <Image source={require("../images/tick-1.png")} style={styles.tickImage} />
                        <Text style={styles.modalBookingText}>Item booked!</Text>
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginTop: 10,
    },
    backArrow: {
        width: 22,
        height: 22,
        tintColor: 'black',
    },
    headerTitle: {
        flex: 1,
        fontSize: 17,
        color: 'black',
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center',
    },
    scrollView: {
        padding: 20,
    },
    imageContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 280,
        resizeMode: 'cover',
        marginRight: 10,
        borderRadius: 10,
    },
    image2: {
        width: 200,
        height: 280,
        resizeMode: 'cover',
        marginRight: 10,
        borderRadius: 10,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 5,
        marginBottom: 10,
    },
    dealTitle: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Inter-SemiBold',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: 'black',
        borderRadius: 10,
        marginTop: 4,
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    ratingIcon: {
        width: 12,
        height: 12,
        marginRight: 4,
    },
    ratingText: {
        fontSize: 12,
        color: 'yellow',
    },
    additionalDetailsContainer: {
        width: 311,
        marginTop: 5,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoRowMarginTop: {
        marginTop: 7,
    },
    infoIcon: {
        width: 32,
        height: 15,
    },
    infoIcon1: {
        width: 13,
        height: 17,
    },
    infoText: {
        color: '#707070',
        fontSize: 12.5,
        marginLeft: 10,
    },
    descriptionContainer: {
        marginTop: 20,
    },
    descriptionTitle: {
        color: 'black',
        fontSize: 15,
        fontFamily: 'Inter-SemiBold',
    },
    descriptionText: {
        color: '#404040',
        fontSize: 13,
        marginTop: 8,
        fontFamily: 'Inter-Regular',
    },
    purchaseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    buyButton: {
        flex: 1,
        backgroundColor: '#F3592C',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
        marginRight: 10,
    },
    buyButtonText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Inter-SemiBold',
    },
    favoritesIcon: {
        width: 25,
        height: 25,
    },

    modalBookingBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalBookingContainer: {
        width: 200,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBookingText: {
        color: 'black', // Set text color to black
        fontSize: 16,   // You can adjust the font size as needed
        textAlign: 'center',
    },
    tickImage: {
        width: 40, // Adjust size as needed
        height: 40, // Adjust size as needed
        marginBottom: 10,
    },
});

export default StudioDetailsScreen;
