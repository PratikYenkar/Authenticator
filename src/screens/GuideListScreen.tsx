import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { GUIDES } from '../data/guideData';
import ServiceRow from '../components/ServiceRow';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';
import { GuideService, RootStackParamList } from '../types';

type Nav = StackNavigationProp<RootStackParamList>;

export default function GuideListScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      GUIDES.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const renderItem = ({ item }: { item: GuideService }) => (
    <ServiceRow
      service={item}
      onPress={() => navigation.navigate('GuideDetail', { service: item })}
    />
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.searchWrap}>
        <Icon name="search-outline" size={18} color={COLORS.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Search Here"
          placeholderTextColor={COLORS.textLight}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
      </View>

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: COLORS.separator, marginLeft: 70 }} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="search-outline" size={48} color={COLORS.textLight} />
            <Text style={styles.emptyText}>No services found for "{query}"</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: C.background,
    },
    searchWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: C.backgroundGray,
      borderRadius: 14,
      margin: 16,
      paddingHorizontal: 14,
      height: 50,
      borderWidth: 1,
      borderColor: C.border,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontFamily: FONTS.regular,
      fontSize: SIZES.base,
      color: C.textPrimary,
    },
    empty: {
      alignItems: 'center',
      paddingTop: 60,
    },
    emptyText: {
      fontFamily: FONTS.regular,
      fontSize: SIZES.base,
      color: C.textSecondary,
      marginTop: 12,
      textAlign: 'center',
    },
  });
}
