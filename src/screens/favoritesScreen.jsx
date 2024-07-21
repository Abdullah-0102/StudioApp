import React from "react";
import { Image, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import Text from '../components/text';
import { useFavorites } from "../contexts/favoritesContext";

const FavoritesScreen = () => {
    const { favorites, toggleFavorite } = useFavorites();

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

    const favoriteItems = dealsData.filter(item => favorites[item.id]);

    const handleFavoriteToggle = (id) => {
        toggleFavorite(id);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Favorites ({favoriteItems.length})
            </Text>
            <ScrollView contentContainerStyle={styles.parentcontainer}>
                {favoriteItems.map(item => (
                    <View key={item.id} style={styles.itemContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.dealImage}
                                resizeMode="cover"
                                source={item.image}
                            />
                            <TouchableOpacity
                                style={styles.favoriteIconContainer}
                                onPress={() => handleFavoriteToggle(item.id)}
                            >
                                <Image
                                    style={[styles.favoriteIcon, { tintColor: favorites[item.id] ? '#F3592C' : '#C0C0C0' }]}
                                    source={require("../images/favourites.png")} 
                                />
                            </TouchableOpacity>
                            <Text style={styles.dealTitle}>{item.title}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
        padding: 20,
        paddingTop: 35,
    },
    title: {
        fontSize: 18,
        marginBottom: 30,
        textAlign: "center",
        fontFamily: 'Inter-SemiBold',
        color: 'black',
    },
    parentcontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingBottom: '20%',
    },
    itemContainer: {
        width: '43%',
        margin: 10,
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 150,
    },
    dealImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    favoriteIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    favoriteIcon: {
        width: 24,
        height: 24,
    },
    dealTitle: {
        position: 'absolute',
        bottom: 6,
        left: 5,
        fontSize: 12,
        fontFamily: 'Inter-SemiBold',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 5,
        borderRadius: 5,
    },
});

export default FavoritesScreen;
