import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);

    // Add a new booking to the current bookings
    const addBooking = (item) => {
        setBookings((prevBookings) => {
            const exists = prevBookings.some((booking) => booking.id === item.id);
            if (!exists) {
                return [...prevBookings, item];
            }
            return prevBookings;
        });
    };

    const removeBooking = (id) => {

        // PREVIOUS METHOD WITH NO CHECKING IF 2 IDENTICAL KEYS EXIST OR NOT
        
        // // Remove from current bookings
        // const updatedBookings = bookings.filter((booking) => booking.id !== id);
        // setBookings(updatedBookings);

        // // Add to past bookings
        // const bookingToAdd = bookings.find((booking) => booking.id === id);
        // if (bookingToAdd) {
        //     setPastBookings([...pastBookings, bookingToAdd]);
        // }

        const updatedBookings = bookings.filter((booking) => booking.id !== id);
        const bookingToAdd = bookings.find((booking) => booking.id === id);

        // Update state
        setBookings(updatedBookings);

        // Add to past bookings if it exists
        if (bookingToAdd) {
            setPastBookings((prevPastBookings) => {
                // Prevent adding duplicate past bookings
                if (!prevPastBookings.some((booking) => booking.id === bookingToAdd.id)) {
                    return [...prevPastBookings, bookingToAdd];
                }
                return prevPastBookings;
            });
        }
    };

    return (
        <BookingContext.Provider value={{ bookings, pastBookings, addBooking, removeBooking }}>
            {children}
        </BookingContext.Provider>
    );
};
