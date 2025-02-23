import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {FavoritesContext} from '../contextApi/FavoritesContext';

const FavoritesScreen = () => {
   const { favorites, toggleFavorite, isDarkMode, toggleDarkMode } = useContext(FavoritesContext);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleMode = () => {
    toggleDarkMode(prevMode => !prevMode);
  };

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkBackground : styles.lightBackground,
      ]}>
      {/* Header */}
      <View
        style={[
          styles.headerContainer,
          isDarkMode ? styles.darkHeader : styles.lightHeader,
        ]}>
          <Image
          source={
            isDarkMode
              ? require('../components/assets/images/github-white.png')
              : require('../components/assets/images/github.png')
          }
          style={styles.headIcon}
        />
        <Text
          style={[
            styles.headTxt,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}>
          Explorer
        </Text>
      </View>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite repositories</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View
              style={[
                styles.repoCard,
                isDarkMode ? styles.darkCard : styles.lightCard,
              ]}>
              <View style={styles.topRow}>
                <Image
                  source={{uri: item.owner.avatar_url}}
                  style={styles.repoAvatar}
                />
                <View style={styles.repoTextContainer}>
                  <Text
                    style={[
                      styles.repoName,
                      isDarkMode ? styles.darkText : styles.lightText,
                    ]}>
                    {item.name}
                  </Text>
                  <Text style={styles.repoOwner}>{item.owner.login}</Text>
                </View>
              </View>

              {/* Description */}
              <Text
                style={[
                  styles.repoDescription,
                  isDarkMode ? styles.darkText : styles.lightText,
                ]}>
                {item.description || 'No description'}
              </Text>

              <View style={styles.bottomRow}>
                <View style={styles.repoStats}>
                  <Text
                    style={[
                      styles.statText,
                      {color: isDarkMode ? '#fff' : '#000'},
                    ]}>
                    ⭐ {item.stargazers_count}
                  </Text>
                  <Text
                    style={[
                      styles.statText,
                      {color: isDarkMode ? '#fff' : '#000'},
                    ]}>
                    🍴 {item.forks_count}
                  </Text>
                  <Text style={styles.language}>{item.language || 'N/A'}</Text>
                </View>

                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                  <Image
                    source={
                      favorites.some(fav => fav.id === item.id)
                        ? require('../components/assets/images/icons/heart-filled.png')
                        : require('../components/assets/images/icons/heart-outline.png')
                    }
                    style={[
                      styles.favoriteIcon,
                      {tintColor: isDarkMode ? '#fff' : '#000'},
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      {/* Mode Toggle Button */}
      <TouchableOpacity style={styles.modeBtn} onPress={toggleMode}>
        <Text style={styles.modeBtnText}>{isDarkMode ? '☀️' : '🌙'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkBackground: {backgroundColor: '#121212'},
  lightBackground: {backgroundColor: '#f5f5f5'},
  headerContainer: {
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  darkHeader: {backgroundColor: '#222'},
  lightHeader: {backgroundColor: '#fff'},
  headIcon: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  darkText: {color: '#fff'},
  lightText: {color: '#000'},
  headTxt: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000',
    marginLeft: 15,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: '50%',
    fontSize: 16,
    color: '#555',
  },
  repoCard: {
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    marginVertical:20,
    borderRadius: 8,
    elevation: 3,
  },
  darkCard: {backgroundColor: '#222'},
  lightCard: {backgroundColor: '#fff'},
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  repoAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  repoTextContainer: {
    flexDirection: 'column',
  },
  repoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  repoOwner: {
    fontSize: 12,
    color: '#555',
  },
  repoDescription: {
    fontSize: 14,
    marginVertical: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  repoStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    marginRight: 10,
  },
  language: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#888',
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  favoriteIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  modeBtn: {
    position: 'absolute',
    bottom: '10%',
    right: 20,
    backgroundColor: '#000',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeBtnText: {
    fontSize: 24,
    color: '#fff',
  },
});
