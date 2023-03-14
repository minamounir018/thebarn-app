import { StatusBar, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import ScheduleScreen from './pages/ScheduleScreen';
import ProfileScreen from './pages/ProfileScreen';
import SettingsScreen from './pages/SettingsScreen';
import ScanScreen from './pages/ScanScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function TabNavigator({ navigation }) {

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Profile') {
          iconName = 'user-alt';
        } else if (route.name === 'Scan') {
          iconName = 'camera';
        } else if (route.name === 'Schedule') {
          iconName = 'calendar-alt';
        } else if (route.name === 'Settings') {
          iconName = 'sliders-h';
        }

        return (
          <View style={route.name === 'Scan' ? { backgroundColor: 'white', borderColor: '#7C0A02', borderRadius: 50, borderWidth: 2, position: 'absolute', bottom: 20 } : {}}>
            {route.name === 'Scan' ? (
              <Image
                resizeMode={'cover'}
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={require("./assets/logo.png")}
              />
            ) : (
              <Icon name={iconName} size={size - 2} color={color} />
            )}
          </View>
        )
      },
      tabBarActiveTintColor: '#7C0A02',
      tabBarInactiveTintColor: '#666666',
      tabBarShowLabel: false
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Scan");
          },
        })}
        name="Scan" component={ProfileScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={"dark-content"}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="main" component={TabNavigator} />
        <Stack.Screen
          options={{
            presentation: 'modal'
          }}
          name="Scan" component={ScanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


