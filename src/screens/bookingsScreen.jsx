import React, { useState, useContext } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList, Image, Modal } from "react-native";
import Text from "../components/text";
import { BookingContext } from "../contexts/bookingsContext";

// Sample dealsData array
const dealsData = [
    { id: 1, title: 'Villa, De Retreat', rating: 4.85, price: '1200$', image: require("../images/sample.png") },
    { id: 2, title: 'Bungalow', rating: 4.90, price: '1500$', image: require("../images/sample2.jpg") },
    { id: 3, title: 'Mountain Cabin', rating: 4.75, price: '950$', image: require("../images/sample3.jpg") },
    { id: 4, title: 'City Apartment', rating: 4.80, price: '1300$', image: require("../images/sample4.jpg") },
    { id: 5, title: 'Countryside', rating: 4.70, price: '1100$', image: require("../images/sample5.jpg") },
    { id: 6, title: 'Lakeside Lodge', rating: 4.95, price: '1400$', image: require("../images/sample3.jpg") },
    { id: 7, title: 'Desert Oasis', rating: 4.65, price: '1600$', image: require("../images/sample2.jpg") },
    { id: 8, title: 'Forest Haven', rating: 4.85, price: '1250$', image: require("../images/sample1.png") },
    { id: 9, title: 'PentHouse', rating: 4.90, price: '2000$', image: require("../images/sample5.jpg") },
    { id: 10, title: 'Cozy Cabin', rating: 4.80, price: '1000$', image: require("../images/sample4.jpg") },
];

const BookingsScreen = () => {
    const { bookings, pastBookings, removeBooking } = useContext(BookingContext);
    const [activeTab, setActiveTab] = useState('bookings');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedDetailsItem, setSelectedDetailsItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);
    const toggleDetailsModal = () => setShowDetailsModal(!showDetailsModal);

    const handleCancelBooking = () => {
        if (selectedItem) {
            // Remove the item from bookings and add it to past bookings
            removeBooking(selectedItem.id);
            toggleDeleteModal();
        }
    };

    const handleViewDetails = (item) => {
        setSelectedDetailsItem(item);
        toggleDetailsModal();
    };

    const renderContent = () => {
        if (activeTab === 'bookings') {
            return (
                <FlatList
                    data={bookings}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const deal = dealsData.find(deal => deal.id === item.id);
                        return (
                            <View style={styles.bookingItem}>
                                {deal && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedItem(item);
                                            toggleDeleteModal();
                                        }}
                                    >
                                        <View style={styles.bookingRow}>
                                            {/* Left side */}
                                            <View style={styles.bookingLeft}>
                                                <Image source={deal.image} style={styles.bookingImage} />
                                                <View style={styles.bookingDetails}>
                                                    <Text style={styles.bookingTitle}>{deal.title}</Text>
                                                    <Text style={styles.bookingDate}>7/21/2024</Text>
                                                </View>
                                            </View>
                                            {/* Right side */}
                                            <Text style={styles.bookingStatus}>Active</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    }}
                    ListEmptyComponent={() => (
                        <View style={styles.noBookingsParent}>
                            <Text style={styles.noBookings}>No bookings found</Text>
                        </View>
                    )}
                />
            );
        } else if (activeTab === 'pastBookings') {
            return (
                <FlatList
                    data={pastBookings}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const deal = dealsData.find(deal => deal.id === item.id);
                        return (
                            <View style={styles.bookingItem}>
                                {deal && (
                                    <TouchableOpacity
                                        onPress={() => handleViewDetails(item)}
                                    >
                                        <View style={styles.bookingRow}>
                                            {/* Left side */}
                                            <View style={styles.bookingLeft}>
                                                <Image source={deal.image} style={styles.bookingImage} />
                                                <View style={styles.bookingDetails}>
                                                    <Text style={styles.bookingTitle}>{deal.title}</Text>
                                                    <Text style={styles.bookingDate}>7/21/2024</Text>
                                                </View>
                                            </View>
                                            {/* Right side */}
                                            <Text style={styles.bookingStatus2}>Cancelled</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    }}
                    ListEmptyComponent={() => (
                        <View style={styles.noBookingsParent}>
                            <Text style={styles.noBookings}>No past bookings found</Text>
                        </View>
                    )}
                />
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => setActiveTab('bookings')}
                >
                    <Text style={[styles.tabText, activeTab === 'bookings' && styles.activeTabText]}>Bookings</Text>
                    {activeTab === 'bookings' && <View style={styles.activeTabIndicator} />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => setActiveTab('pastBookings')}
                >
                    <Text style={[styles.tabText, activeTab === 'pastBookings' && styles.activeTabText]}>Past Bookings</Text>
                    {activeTab === 'pastBookings' && <View style={styles.activeTabIndicator} />}
                </TouchableOpacity>
            </View>
            {renderContent()}
            

            {/* Modal for cancelling bookings */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showDeleteModal}
                onRequestClose={toggleDeleteModal}
            >
                {/* <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Cancel Booking</Text>
                        <Text style={styles.modalSubtitle}>Are you sure you want to cancel this booking?</Text>
                        <Text style={styles.redText}>This action cannot be undone.</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalButtonNo} onPress={toggleDeleteModal}>
                                <Text style={styles.modalButtonTextNo}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonYes} onPress={handleCancelBooking}>
                                <Text style={styles.modalButtonTextYes}>Yes, Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> */}

                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={styles.topBar} />
                        <View style={styles.detailsModalContent}>
                            <Text style={styles.detailsModalTitle}>Booking Details</Text>
                            {selectedItem && (
                                <View style={styles.detailsContainer}>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.detailsHeading}>Studio Name</Text>
                                        <Text style={styles.detailsInfo}>{selectedItem.title}</Text>
                                    </View>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.detailsHeading}>Booking Date & Time</Text>
                                        <View style={styles.dateTimeContainer}>
                                            <Text style={styles.detailsInfo}>7/21/2024</Text>
                                            <Text style={styles.detailsInfo}>15:30pm</Text>
                                        </View>
                                    </View>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.detailsHeading}>Payment Status</Text>
                                        <View style={styles.paymentStatus}>
                                            <Text style={styles.paymentText}>Done</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelBooking}>
                                <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.contactButton}>
                                <Image source={require('../images/support.png')} style={styles.contactIcon} />
                                <Text style={styles.contactButtonText}>Contact Support</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            {/* Modal for booking details */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showDetailsModal}
                onRequestClose={toggleDetailsModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={styles.topBar} />
                        <View style={styles.detailsModalContent}>
                            <Text style={styles.detailsModalTitle}>Booking Details</Text>
                            {selectedDetailsItem && (
                                <View style={styles.detailsContainer}>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.detailsHeading}>Studio Name</Text>
                                        <Text style={styles.detailsInfo}>{selectedDetailsItem.title}</Text>
                                    </View>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.detailsHeading}>Booking Date & Time</Text>
                                        <View style={styles.dateTimeContainer}>
                                            <Text style={styles.detailsInfo}>7/21/2024</Text>
                                            <Text style={styles.detailsInfo}>15:30pm</Text>
                                        </View>
                                    </View>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.detailsHeading}>Payment Status</Text>
                                        <View style={styles.paymentStatus}>
                                            <Text style={styles.paymentText}>Done</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                            <TouchableOpacity style={styles.contactButton}>
                                <Image source={require('../images/support.png')} style={styles.contactIcon} />
                                <Text style={styles.contactButtonText}>Contact Support</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
        paddingTop: 40,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    tab: {
        marginHorizontal: 20,
        alignItems: 'center',
    },
    tabText: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: '#8F8F8F',
    },
    activeTabText: {
        color: '#F3592C',
    },
    activeTabIndicator: {
        height: 2.5,
        backgroundColor: '#F3592C',
        width: '100%',
        marginTop: 8,
    },
    noBookingsParent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '60%',
    },
    noBookings: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    bookingItem: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
    },
    bookingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bookingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookingImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    bookingDetails: {
        marginLeft: 10,
    },
    bookingTitle: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: 'black',
    },
    bookingDate: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#8F8F8F',
    },
    bookingStatus: {
        fontSize: 12,
        fontFamily: 'Inter-SemiBold',
        color: 'green',
    },
    bookingStatus2: {
        fontSize: 12,
        fontFamily: 'Inter-SemiBold',
        color: '#F3592C',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: '100%',
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: 'black',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#333',
        marginBottom: 20,
    },
    redText: {
        color: 'red',
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButtonYes: {
        backgroundColor: '#F3592C',
        padding: 10,
        borderRadius: 5,
        width: '48%',
    },
    modalButtonNo: {
        backgroundColor: '#D3D3D3',
        padding: 10,
        borderRadius: 5,
        width: '48%',
    },
    modalButtonTextYes: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Inter-SemiBold',
    },
    modalButtonTextNo: {
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Inter-SemiBold',
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
        width: 60,
        backgroundColor: '#D3D3D3',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 10,
    },
    detailsModalContent: {
        width: '100%',
    },
    detailsModalTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: 'black',
        marginTop: 5,
        marginBottom: 35,
    },
    detailsContainer: {
        marginBottom: 20,
        marginHorizontal: 15,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    detailsHeading: {
        fontSize: 14, // Reduced font size
        color: '#8F8F8F',
        fontFamily: 'Inter-Medium',
    },
    detailsInfo: {
        fontSize: 14, // Reduced font size
        color: 'black',
    },
    dateTimeContainer: {
        alignItems: 'flex-end', // Align to the right
    },
    paymentStatus: {
        backgroundColor: 'rgba(0, 109, 24, 0.1)', // 10% opacity of #006D18
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1, // Adding border width
        borderColor: '#006D18', // Border color
        alignItems: 'center',
    },
    paymentText: {
        fontFamily: 'Inter-Medium',
        color: '#006D18', // Text color
    },
    contactButton: {
        backgroundColor: 'rgba(243, 89, 44, 0.1)', // 10% opacity of #F3592C
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'center',
        borderColor: '#F3592C', // Border color #F3592C
        borderWidth: 1, // Define border width
    },
    contactButtonText: {
        color: '#F3592C', // Text color #F3592C
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        marginLeft: 10, // Space between icon and text
    },
    cancelButton: {
        backgroundColor: '#F3592C', // 10% opacity of #F3592C
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'center',
        borderColor: '#F3592C', // Border color #F3592C
        borderWidth: 1, // Define border width
        marginBottom: 10,
    },
    cancelButtonText: {
        color: 'white', // Text color #F3592C
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        marginLeft: 10, // Space between icon and text
    },
    contactIcon: {
        width: 20,
        height: 20,
    },
});

export default BookingsScreen;
