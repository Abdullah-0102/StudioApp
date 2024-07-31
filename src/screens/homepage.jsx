import React, {useState, useContext} from "react";
import { Image, StyleSheet, View, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback, ScrollView } from "react-native";
import Text from "../components/text";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useFavorites } from "../contexts/favoritesContext";

import ProfileScreen from "./profileScreen";
import FavoritesScreen from "./favoritesScreen";
import BookingsScreen from "./bookingsScreen";

const Stack = createStackNavigator();


const Homepage = ({ route, navigation }) => {
    const { userName, profilePic, email, password } = route.params;
    const [activeSection, setActiveSection] = useState("Home");


    const handleMenuClick = (section) => {
        setActiveSection(section);
        
        switch (section) {
            case "Home":
                // Navigate to Home screen
                navigation.navigate('Home');
                break;
            case "Bookings":
                // Navigate to Bookings screen
                navigation.navigate('Bookings');
                break;
            case "Favorites":
                // Navigate to Favorites screen
                navigation.navigate('Favorites');
                break;
            case "Profile":
                // Navigate to Profile screen
                navigation.navigate('ProfileScreen', { userName, profilePic, email, password });
                break;
            default:
                break;
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} initialParams={{ userName, profilePic }} options={{ headerShown: false}}/>
                <Stack.Screen name="Bookings" component={BookingsScreen} options={{ headerShown: false}}/>
                <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false}}/>
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false}} />
            </Stack.Navigator>

            {/* Footer Menu */}
            <View style={styles.menuBar}>
                <View style={styles.menuItems}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleMenuClick("Home")}
                        >
                        <Image
                            style={[
                            styles.icon,
                            activeSection === "Home" && styles.activeIcon,
                            ]}
                            resizeMode="cover"
                            source={require("../images/home.png")}
                        />
                        <Text
                            style={[
                            styles.menuText,
                            activeSection === "Home" && styles.activeMenuText,
                            ]}
                        >
                            Home
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleMenuClick("Bookings")}
                        >
                        <Image
                            style={[
                            styles.icon,
                            activeSection === "Bookings" && styles.activeIcon,
                            ]}
                            resizeMode="cover"
                            source={require("../images/bookings.png")}
                        />
                        <Text
                            style={[
                            styles.menuText,
                            activeSection === "Bookings" && styles.activeMenuText,
                            ]}
                        >
                            Bookings
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleMenuClick("Favorites")}
                        >
                        <Image
                            style={[
                            styles.icon,
                            activeSection === "Favorites" && styles.activeIcon,
                            ]}
                            resizeMode="cover"
                            source={require("../images/favourites.png")}
                        />
                        <Text
                            style={[
                            styles.menuText,
                            activeSection === "Favorites" && styles.activeMenuText,
                            ]}
                        >
                            Favorites
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleMenuClick("Profile")}
                        >
                        <Image
                            style={[
                            styles.icon,
                            activeSection === "Profile" && styles.activeIcon,
                            ]}
                            resizeMode="cover"
                            source={require("../images/profile.png")}
                        />
                        <Text
                            style={[
                            styles.menuText,
                            activeSection === "Profile" && styles.activeMenuText,
                            ]}
                        >
                            Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const HomeScreen = ({ route }) => {
    const { userName, profilePic } = route.params;
    
    const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    // const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [peopleCount, setPeopleCount] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(String(peopleCount));    
    const [selectedTags, setSelectedTags] = useState([]);
    const [filteredDeals, setFilteredDeals] = useState([]); // New state for filtered deals
    const [location, setLocation] = useState("");
    const { favorites, toggleFavorite } = useFavorites(); // Use the context

    
    const navigation = useNavigation();

    const tagsData = [
        { id: 1, name: 'Room' },
        { id: 2, name: 'Hotel' },
        { id: 3, name: 'Lodge' },
        { id: 4, name: 'Trip' },
        { id: 5, name: 'Affordable' },
        { id: 6, name: 'Leisure' },
        { id: 7, name: 'Vacation' },  
        { id: 8, name: 'Luxury' }    
    ];
    

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
    
    
    


    const incrementCount = () => {
        setPeopleCount(prevCount => (prevCount < 10 ? prevCount + 1 : prevCount));
    };

    const decrementCount = () => {
        setPeopleCount(prevCount => (prevCount > 1 ? prevCount - 1 : prevCount));
    };

    const handleInputChange = (text) => {
        const num = parseInt(text, 10);
        if (!isNaN(num) && num >= 1 && num <= 10) {
            setPeopleCount(num);
            setInputValue(String(num));
        } else {
            setInputValue(text);
        }
    };

    const handleInputBlur = () => {
        setIsEditing(false);
        if (inputValue === '' || parseInt(inputValue, 10) < 1) {
            setPeopleCount(1);
            setInputValue('1');
        }
    };

    const showStartDatepicker = () => {
        setShowStartDatePicker(true);
    };

    const onStartDateChange = (event, selectedDate) => {
        setShowStartDatePicker(false);
        const currentDate = selectedDate || startDate;
        setStartDate(currentDate);
        // setEndDate(null); // Reset end date when start date changes
        // if (currentDate) {
        //     setShowEndDatePicker(true); // Automatically show end date picker after selecting start date
        // }
    };

    // const onEndDateChange = (event, selectedDate) => {
    //     setShowEndDatePicker(false);
    //     const currentDate = selectedDate || endDate;
    //     setEndDate(currentDate);
    // };

    // const formatDates = () => {
    //     if (startDate && endDate) {
    //         return `${moment(startDate).format('MMM DD')} - ${moment(endDate).format('MMM DD')}`;
    //     } else if (startDate) {
    //         return `${moment(startDate).format('MMM DD')}`;
    //     }
    //     return '';
    // };
    const formatDates = () => {
        if (startDate) {
            return `${moment(startDate).format('MMM DD')}`;
        } 
        return '';
    };

    const toggleSettingsModal = () => {
        setShowSettingsModal(!showSettingsModal);
    };

    const handleTagSelection = (tagName) => {
        const index = selectedTags.indexOf(tagName);
        if (index === -1) {
          setSelectedTags([...selectedTags, tagName]);
        } else {
          setSelectedTags(selectedTags.filter(tag => tag !== tagName));
        }
    };
    
    const handleCancel = () => {
        toggleSettingsModal();
        setSelectedTags([]);
        setFilteredDeals([]);
    };
    
    const handleApply = () => {
        console.log('Selected tags:', selectedTags);
        toggleSettingsModal();

        const filteredDeals = dealsData.filter(deal =>
            deal.category.some(category => selectedTags.includes(category))
        );
        setFilteredDeals(filteredDeals); // Store filtered deals in state
    };
    
    const isTagSelected = (tagName) => {
        return selectedTags.includes(tagName);
    };

    const handleLocationChange = (text) => {
        setLocation(text);
    };

    const handleLocationTap = () => {
        navigation.navigate('MapScreen');
    };
    
    // const toggleFavorite = (id, item) => {
    //     setFavorites(prevFavorites => {
    //         const newFavorites = { ...prevFavorites };
    //         if (newFavorites[id]) {
    //             delete newFavorites[id];
    //         } else {
    //             newFavorites[id] = true;
    //         }
    //         console.log(item);
    //         console.log('Favorite Items:', Object.keys(newFavorites));
    //         return newFavorites;
    //     });
    // };

    const handleBookNow = (item) => {
        navigation.navigate('StudioDetails', { deal: item }); // Navigate to details screen with item data
    };

    
  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Image
          style={styles.profilePic}
          resizeMode="cover"
          source={profilePic}
        />
        <View>
          <Text style={styles.helloText}>Hello,</Text>
          <Text style={styles.nameText}>{userName}</Text>
        </View>
      </View>


      <TouchableOpacity style={styles.datePicker} onPress={showStartDatepicker}>
        <Image
            style={styles.calendarIcon}
            resizeMode="cover"
            source={require("../images/calendar.png")}
        />
        <TextInput
            style={styles.dateTextInput}
            placeholder="Select dates"
            placeholderTextColor="#000" // Set the placeholder text color to black
            editable={false}
            value={formatDates()}
        />
       </TouchableOpacity>
       {showStartDatePicker && (
        <View style={styles.dateTimePickerContainer}>
            <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                minimumDate={new Date()}
                onChange={onStartDateChange}
            />
        </View>
        )}
            {/* <View style={styles.dateTimePickerContainer}>
                <DateTimePicker
                    value={endDate || new Date()}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    minimumDate={startDate || new Date()}
                    onChange={onEndDateChange}
                />
            </View> */}

        <View style={styles.parentContainer}>
            <View style={styles.peopleCountContainer}>
                <View style={styles.leftContainer}>
                    <Image
                        style={styles.personsIcon}
                        resizeMode="cover"
                        source={require("../images/persons.png")}
                    />
                    {isEditing ? (
                        <TextInput
                            style={styles.peopleCountInput}
                            value={inputValue}
                            onChangeText={handleInputChange}
                            onBlur={handleInputBlur}
                            keyboardType="numeric"
                            autoFocus
                        />
                    ) : (
                        <TouchableOpacity onPress={() => setIsEditing(true)}>
                            <Text style={styles.peopleCountText}>
                                {peopleCount} {peopleCount > 1 ? 'People' : 'Person'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={decrementCount}>
                        <Image
                            style={styles.iconButton1}
                            resizeMode="cover"
                            source={require("../images/minus.png")} // Add your minus sign image here
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.peopleCountInput}
                        value={String(peopleCount)}
                        editable={false}
                    />
                    <TouchableOpacity onPress={incrementCount}>
                        <Image
                            style={styles.iconButton2}
                            resizeMode="cover"
                            source={require("../images/plus.png")} // Add your plus sign image here
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
            style={styles.smallSquare}
            onPress={toggleSettingsModal}
            >
            <Image
                style={styles.settingsIcon}
                resizeMode="cover"
                source={require("../images/settings.png")}
            />
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.locationBar} onPress={handleLocationTap}>
            <Image
                style={styles.locationIcon}
                resizeMode="cover"
                source={require("../images/location-icon.png")}
            />
            <TextInput
                style={styles.locationTextInput}
                placeholder="Going to?"
                placeholderTextColor="#000" // Set the placeholder text color to black
                editable={false}
                value={location}
            />
       </TouchableOpacity>


        <Modal
        animationType="fade"
        transparent={true}
        visible={showSettingsModal}
        >
        <TouchableWithoutFeedback onPress={toggleSettingsModal}>
            <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Tags</Text>
                <View style={styles.tagsContainer}>
                    {tagsData.map(tag => (
                    <TouchableOpacity
                        key={tag.id}
                        style={[
                        styles.tagButton,
                        isTagSelected(tag.name) && styles.selectedTag,
                        ]}
                        onPress={() => handleTagSelection(tag.name)}
                    >
                        <Text style={styles.tagButtonText}>{tag.name}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                    style={styles.modalButton1}
                    onPress={handleCancel}
                    >
                    <Text style={styles.modalButtonText1}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.modalButton2}
                    onPress={handleApply}
                    >
                    <Text style={styles.modalButtonText2}>Apply</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
        </Modal>


        <View style={styles.horizontalRow} />
        <View style={styles.lastMinuteContainer}>
            <Text style={styles.lastMinuteText}>Last Minute Deals</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {(filteredDeals.length > 0 ? filteredDeals : dealsData).map((item) => (
                <View key={item.id} style={styles.dealCard}>
                    <Image
                        style={styles.dealImage}
                        resizeMode="cover"
                        source={item.image}
                    />
                    <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                        <Image
                            style={[styles.favoritesIcon, { tintColor: favorites[item.id] ? '#F3592C' : '#C0C0C0' }]}
                            resizeMode="cover"
                            source={require("../images/favourites.png")} // Add your favorites icon image here
                        />
                    </TouchableOpacity>
                    <View style={styles.dealInfo}>
                        <View style={styles.mainInfoContainer}>
                            <View style={styles.leftInfo}>
                                <Text style={styles.dealTitle}>{item.title}</Text>
                                <View style={styles.rating}>
                                    <Image
                                        style={styles.ratingIcon}
                                        resizeMode="cover"
                                        source={require("../images/star.png")}
                                    />
                                    <Text style={styles.ratingText}>{item.rating}</Text>
                                </View>
                                <Text style={styles.priceText}>{item.price}</Text>
                            </View>
                            <View style={styles.rightInfo}>
                                <View style={styles.categoriesContainer}>
                                    {item.category.map((category, index) => (
                                        <TouchableOpacity key={index} style={styles.categoryButton}>
                                            <Text style={styles.categoryText}>{category}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.bookNowButton} onPress={() => handleBookNow(item)}>
                        <Text style={styles.bookNowText}>Check Times</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#F0F8FF',
},
greeting: {
    flexDirection: "row",
    alignItems: 'flex-start',
    alignItems: "center",
    marginTop: 30,
    padding: 16,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  helloText: {
    fontSize: 12,
    marginLeft: 10,
    color: "#555",
  },
  nameText: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'Inter-SemiBold',
    color: "#000",
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    padding: 0,
    backgroundColor: 'white',
    width: '90%',  // Adjust width as per your preference
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  locationBar: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    padding: 0,
    backgroundColor: 'white',
    width: '90%',  // Adjust width as per your preference
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  calendarIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  dateTextInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  locationTextInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },

  parentContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  peopleCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'white',
    width: '82%', // Adjust width as per your preference
    borderRadius: 10,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 'auto', // Push contents to the right
  },
  peopleCountText: {
    fontSize: 14,
    color: "#000",
  },
  iconButton1: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  iconButton2: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  personsIcon: {
    width: 20,
    height: 16,
    marginHorizontal: 10,
  },
  peopleCountInput: {
    color: "#000",
    textAlign: 'center',
  },
  smallSquare: {
    width: 45,
    height: '80%',
    backgroundColor: '#FFA58B', // Light orange background color
    borderWidth: 1,
    borderColor: '#F3592C', // Dark orange border color
    borderRadius: 5,
    marginLeft: 10, // Adjust spacing as needed
    paddingTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 20,
    height: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: '20%',
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  modalContent: {
    backgroundColor: "#F0F8FF",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '50%',
    // marginBottom: '20%',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
    textAlign: "left",
    color: '#000',
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    // justifyContent: "center",
  },
  tagButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  selectedTag: {
    borderColor: "#F3592C",
    color: "#F3592C",
    backgroundColor: 'rgba(243, 89, 44, 0.2)',
},
  tagButtonText: {
    fontSize: 14,
    color: "#000",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 20,
},
modalButton1: {
    width: '45%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
},
modalButton2: {
    paddingHorizontal: 20,
    width: '45%',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#F3592C",
},
modalButtonText1: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#000000",
    textAlign: "center",
},
modalButtonText2: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#fff",
    textAlign: "center",
  },

  horizontalRow: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 30,  
    marginBottom: 20,  
    marginHorizontal: 20,
  }, 
  lastMinuteContainer: {
    marginBottom: 10,
},
lastMinuteText: {
    color: 'black',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    textAlign: 'center',
},

  dealCard: {
    height: 230,
    width: 200, // Adjust width of each item as needed
    marginLeft: 10,
    marginRight: 10, // Adjust spacing between items
    backgroundColor: '#ffffff', // Set this to the same color as the background
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, // for Android
    },
    favoritesIcon: {
        position: 'absolute', // Position it absolutely within the parent
        top: -90, // Adjust as needed
        right: 10, // Adjust as needed
        width: 24, // Adjust size as needed
        height: 24, // Adjust size as needed
    },
    dealImage: {
        width: "100%",
        height: 100,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    dealInfo: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: 8,
        marginLeft: 5,
    },
    mainInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    leftInfo: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1,
        marginRight: 5,
    },
    dealTitle: {
        fontSize: 12,
        color: 'black',
        fontFamily: 'Inter-SemiBold',
        marginBottom: 4,
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: 'black',
        borderRadius: 10,
        marginTop: 4,
        paddingHorizontal: 7,
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
    priceText: {
        fontSize: 13,
        fontFamily: 'Inter-Regular',
        color: "grey",
        marginTop: 5,
    },
    rightInfo: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        flex: 1,
        marginRight: 3,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
    },
    categoryButton: {
        backgroundColor: 'rgba(243, 89, 44, 0.27)',
        borderColor: '#F3592C',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginLeft: 3,
        marginBottom: 3, // Spacing between tags
    },
    categoryText: {
        color: '#F3592C',
        fontSize: 10,
        textAlign: 'center',
    },
    bookNowButton: {
        backgroundColor: '#F3592C',
        padding: 5,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
    },
    bookNowText: {
        color: 'white',
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center',
    },



  menuBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  menuItems: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  menuItem: {
    alignItems: "center",
  },
  icon: {
    width: 28,
    height: 24,
  },
  activeIcon: {
    width: 28,
    height: 24,
    tintColor: "#F3592C",
  },
  menuText: {
    fontSize: 12,
    color: "#555",
  },
  activeMenuText: {
    fontSize: 12,
    color: "#F3592C",
    fontFamily: 'Inter-SemiBold',
  },
});

export default Homepage;
