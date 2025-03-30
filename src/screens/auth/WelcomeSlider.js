import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../constants/colors';
import {Brand} from '../../constants/brand';

const slides = [
  {
    id: '1',
    title: 'Fast & Reliable',
    description: 'Quick responses to all your legal queries',
    image: 'https://loremflickr.com/800/600',
  },
  {
    id: '2',
    title: 'Expert Advice',
    description: 'Get legal advice from top professionals',
    image: 'https://loremflickr.com/800/601',
  },
  {
    id: '3',
    title: 'Secure & Confidential',
    description: 'Your privacy is our priority',
    image: 'https://loremflickr.com/800/602',
  },
];

const WelcomeSlider = ({navigation}) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({index: currentIndex + 1});
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleGetStarted = () => {
    navigation.navigate('JoinUs'); // Navigate to home screen
  };

  return (
    <FlatList
      ref={flatListRef}
      data={slides}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <View style={styles.slide}>
          <Image source={{uri: item.image}} style={styles.image} />
          <View
            style={[
              styles.textContainer,
              {backgroundColor: isDarkMode ? '#222' : '#fff'},
            ]}>
            <Text
              style={[
                styles.description,
                {color: isDarkMode ? Colors.darkText : Colors.lightText},
              ]}>
              Welcome to {Brand.name}
            </Text>
            <Text
              style={[
                styles.title,
                {color: isDarkMode ? Colors.darkText : Colors.lightText},
              ]}>
              {item.title}
            </Text>
            <Text
              style={[
                styles.description,
                {color: isDarkMode ? Colors.darkText : Colors.lightText},
              ]}>
              {item.description}
            </Text>

            <View style={styles.buttonWrapper}>
              <View style={styles.dotsContainer}>
                {slides.map((_, i) => (
                  <View
                    key={i}
                    style={[styles.dot, currentIndex === i && styles.activeDot]}
                  />
                ))}
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={
                  index === slides.length - 1 ? handleGetStarted : handleNext
                }>
                <Text style={styles.buttonText}>
                  {index === slides.length - 1 ? 'Get Started' : 'Next'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      onMomentumScrollEnd={event => {
        const index = Math.round(event.nativeEvent.contentOffset.x / wp(100)); // Using wp(100) for full width
        setCurrentIndex(index);
      }}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    width: wp(100), // 100% of the screen width
    alignItems: 'center',
  },
  image: {
    width: wp(100), // 100% of the screen width
    height: hp(65), // 65% of the screen height
    resizeMode: 'cover',
  },
  textContainer: {
    width: '100%',
    padding: wp(6), // Responsive padding
    borderTopLeftRadius: wp(6), // Responsive border radius
    borderTopRightRadius: wp(6), // Responsive border radius
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    elevation: 5,
    alignItems: 'flex-start',
    height: hp(38), // 38% of the screen height
  },
  title: {
    fontSize: wp(9), // Responsive font size
    fontWeight: 'bold',
    textAlign: 'left',
    paddingVertical: hp('0.4%'),
  },
  description: {
    fontSize: wp(4), // Responsive font size
    textAlign: 'left',
    marginTop: hp(1), // Responsive margin
  },
  dotsContainer: {
    flexDirection: 'row',
    marginVertical: hp(2), // Responsive margin
    justifyContent: 'flex-start', // Align dots to the left
  },
  dot: {
    width: wp(2), // Responsive dot size
    height: wp(2), // Responsive dot size
    borderRadius: wp(1), // Half the width/height for a perfect circle
    backgroundColor: '#ccc',
    marginHorizontal: wp(1), // Responsive margin
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: wp(3), // Responsive size for active dot
    height: wp(3), // Responsive size for active dot
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Make sure dots and button are on opposite sides
    width: '100%',
    position: 'absolute',
    bottom: hp(4), // Responsive bottom padding
    paddingLeft: wp(5), // Responsive left padding
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: hp(2), // Responsive padding
    paddingHorizontal: wp(10), // Responsive padding
    borderRadius: wp(6), // Responsive border radius
  },
  buttonText: {
    color: 'white',
    fontSize: wp(4.5), // Responsive font size
  },
});

export default WelcomeSlider;
