'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)' },
};

const INITIAL_BOOKINGS = [
  {
    id: 'TG-884920',
    title: 'Ocean Paradise Overwater Villa',
    destination: 'Maldives',
    type: 'hotel',
    checkIn: '2026-09-10',
    checkOut: '2026-09-15',
    nights: 5,
    guests: 2,
    totalPriceINR: 60000,
    status: 'Confirmed',
    bookedAt: '2026-08-18',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
    bookingRef: 'MAL-OP-2026',
    customerName: 'Alex Morgan',
    customerEmail: 'alex.morgan@travelgo.com',
    customerPhone: '+91 98765 43210'
  }
];

export function BookingProvider({ children }) {
  const [currency, setCurrency] = useState('INR');
  const [searchQuery, setSearchQuery] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
  });
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [favorites, setFavorites] = useState(['paris', 'ocean-paradise']);
  const [bookingModalState, setBookingModalState] = useState({
    isOpen: false,
    item: null,
    type: 'hotel',
  });
  const [toasts, setToasts] = useState([]);
  const [user, setUser] = useState({
    isLoggedIn: true,
    name: 'Alex Morgan',
    email: 'alex.traveler@travelgo.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    membership: 'TravelGo Elite Club',
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedBookings = localStorage.getItem('travelgo_bookings');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
      const savedCurrency = localStorage.getItem('travelgo_currency');
      if (savedCurrency && CURRENCIES[savedCurrency]) {
        setCurrency(savedCurrency);
      }
      const savedFavs = localStorage.getItem('travelgo_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
    } catch (e) {
      console.error('Failed to restore from storage:', e);
    }
  }, []);

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('travelgo_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings:', e);
    }
  }, [bookings]);

  // Sync currency
  const handleSetCurrency = (curr) => {
    setCurrency(curr);
    try {
      localStorage.setItem('travelgo_currency', curr);
    } catch (e) {}
    addToast({
      title: 'Currency Changed',
      message: `Display currency updated to ${CURRENCIES[curr]?.label || curr}`,
      type: 'info',
    });
  };

  // Price conversion helper
  const formatPrice = (inrAmount) => {
    const info = CURRENCIES[currency] || CURRENCIES.INR;
    const converted = inrAmount * info.rate;
    
    if (currency === 'INR') {
      return `${info.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${info.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  };

  const getRawConvertedPrice = (inrAmount) => {
    const info = CURRENCIES[currency] || CURRENCIES.INR;
    return Math.round(inrAmount * info.rate);
  };

  // Add toast
  const addToast = ({ title, message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add booking
  const addBooking = (newBooking) => {
    const bookingWithId = {
      ...newBooking,
      id: `TG-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Confirmed',
      bookedAt: new Date().toISOString().split('T')[0],
    };
    setBookings((prev) => [bookingWithId, ...prev]);
    addToast({
      title: '🎉 Booking Confirmed!',
      message: `Reservation confirmed for ${newBooking.title}. Ref: ${bookingWithId.id}`,
      type: 'success',
      duration: 6000,
    });
    return bookingWithId;
  };

  // Cancel booking
  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
    addToast({
      title: 'Booking Cancelled',
      message: `Booking #${bookingId} has been cancelled.`,
      type: 'info',
    });
  };

  // Toggle favorite
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('travelgo_favorites', JSON.stringify(updated));
      } catch (e) {}
      addToast({
        title: exists ? 'Removed from Wishlist' : 'Saved to Wishlist',
        message: exists ? 'Item removed from your favorites' : 'Item added to your favorites ❤️',
        type: 'info',
      });
      return updated;
    });
  };

  // Modal controls
  const openBookingModal = (item, type = 'hotel') => {
    setBookingModalState({
      isOpen: true,
      item,
      type,
    });
  };

  const closeBookingModal = () => {
    setBookingModalState({
      isOpen: false,
      item: null,
      type: 'hotel',
    });
  };

  const loginUser = (name, email) => {
    setUser({
      isLoggedIn: true,
      name: name || 'Traveler',
      email: email || 'traveler@travelgo.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      membership: 'TravelGo Elite Club',
    });
    addToast({
      title: 'Welcome Back!',
      message: `Signed in as ${name || 'Traveler'}`,
      type: 'success',
    });
  };

  const logoutUser = () => {
    setUser({
      isLoggedIn: false,
      name: '',
      email: '',
      avatar: '',
      membership: '',
    });
    addToast({
      title: 'Signed Out',
      message: 'You have been safely logged out.',
      type: 'info',
    });
  };

  return (
    <BookingContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        currencies: CURRENCIES,
        formatPrice,
        getRawConvertedPrice,
        searchQuery,
        setSearchQuery,
        bookings,
        addBooking,
        cancelBooking,
        favorites,
        toggleFavorite,
        bookingModalState,
        openBookingModal,
        closeBookingModal,
        toasts,
        addToast,
        removeToast,
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
