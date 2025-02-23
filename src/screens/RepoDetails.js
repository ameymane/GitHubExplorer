import React, {useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {FavoritesContext} from '../contextApi/FavoritesContext';

const RepoDetails = ({route}) => {
  const {repository} = route.params;
  const {isDarkMode, toggleDarkMode} = useContext(FavoritesContext);

  const toggleMode = () => {
    toggleDarkMode(prevMode => !prevMode);
  };

  const updatedDate = repository.updated_at
    ? new Date(repository.updated_at).toLocaleDateString()
    : 'N/A';

  return (
    <View style={styles.parentContainer}>
      <ScrollView
        style={[
          styles.container,
          {backgroundColor: isDarkMode ? '#121212' : '#fafafa'},
        ]}>
        <View style={styles.header}>
          <Image
            source={{uri: repository.owner.avatar_url}}
            style={styles.avatar}
          />
          <View style={styles.headerText}>
            <Text
              style={[styles.repoName, {color: isDarkMode ? '#fff' : '#222'}]}>
              {repository.name}
            </Text>
            <Text
              style={[styles.ownerName, {color: isDarkMode ? '#ccc' : '#555'}]}>
              {repository.owner.login}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {color: isDarkMode ? '#fff' : '#333'},
            ]}>
            Description
          </Text>
          <Text
            style={[styles.description, {color: isDarkMode ? '#ddd' : '#444'}]}>
            {repository.description || 'No description provided.'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {color: isDarkMode ? '#fff' : '#333'},
            ]}>
            Statistics
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statBlock}>
              <Text
                style={[
                  styles.statValue,
                  {color: isDarkMode ? '#fff' : '#222'},
                ]}>
                ⭐ {repository.stargazers_count}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {color: isDarkMode ? '#ccc' : '#666'},
                ]}>
                Stars
              </Text>
            </View>
            <View style={styles.statBlock}>
              <Text
                style={[
                  styles.statValue,
                  {color: isDarkMode ? '#fff' : '#222'},
                ]}>
                🍴 {repository.forks_count}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {color: isDarkMode ? '#ccc' : '#666'},
                ]}>
                Forks
              </Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statBlock}>
              <Text
                style={[
                  styles.statValue,
                  {color: isDarkMode ? '#fff' : '#222'},
                ]}>
                👀 {repository.watchers_count || 'N/A'}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {color: isDarkMode ? '#ccc' : '#666'},
                ]}>
                Watchers
              </Text>
            </View>
            <View style={styles.statBlock}>
              <Text
                style={[
                  styles.statValue,
                  {color: isDarkMode ? '#fff' : '#222'},
                ]}>
                🐞 {repository.open_issues_count || 'N/A'}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {color: isDarkMode ? '#ccc' : '#666'},
                ]}>
                Open Issues
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {color: isDarkMode ? '#fff' : '#333'},
            ]}>
            Additional Details
          </Text>
          <Text style={[styles.detail, {color: isDarkMode ? '#ddd' : '#444'}]}>
            Language: {repository.language || 'N/A'}
          </Text>
          <Text style={[styles.detail, {color: isDarkMode ? '#ddd' : '#444'}]}>
            Last Updated: {updatedDate}
          </Text>
        </View>

        {repository.html_url && (
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                {color: isDarkMode ? '#fff' : '#333'},
              ]}>
              Repository Link
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(repository.html_url)}>
              <Text style={styles.link}>{repository.html_url}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.modeBtn,
          {backgroundColor: isDarkMode ? '#fff' : '#000'},
        ]}
        onPress={toggleMode}>
        <Text
          style={[styles.modeBtnText, {color: isDarkMode ? '#000' : '#fff'}]}>
          {isDarkMode ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RepoDetails;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 12,
  },
  headerText: {
    flexShrink: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  repoName: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  ownerName: {
    fontSize: 18,
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statBlock: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  detail: {
    fontSize: 16,
    marginBottom: 6,
  },
  link: {
    fontSize: 16,
    color: '#007aff',
    textDecorationLine: 'underline',
  },
  modeBtn: {
    position: 'absolute',
    bottom: 25,
    right: 0,
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeBtnText: {
    fontSize: 24,
  },
});
