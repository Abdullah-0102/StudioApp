import Navigator from './src/navigation/MainNavigator';
import { FavoritesProvider } from './src/contexts/favoritesContext';
import { BookingProvider } from './src/contexts/bookingsContext';

export default function App() {
  return (
    <FavoritesProvider>
      <BookingProvider>
        <Navigator />
      </BookingProvider>
    </FavoritesProvider>
  );
}