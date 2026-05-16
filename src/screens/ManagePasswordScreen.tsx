import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePasswordStore } from '../store/passwordStore';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';
import { RootStackParamList, SavedWebsite, SavedNote } from '../types';

type Nav = StackNavigationProp<RootStackParamList>;
type Tab = 'websites' | 'notes';

function EmptyTab({ icon, label }: { icon: string; label: string }) {
  const COLORS = useColors();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingTop: 80 }}>
      <Icon name={icon} size={64} color={COLORS.border} />
      <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.base, color: COLORS.textLight }}>{label}</Text>
    </View>
  );
}

function WebsiteCard({ item, onDelete }: { item: SavedWebsite; onDelete: () => void }) {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  return (
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <Icon name="globe-outline" size={22} color={COLORS.primary} />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSub}>{item.url}</Text>
        <Text style={styles.cardSub}>{item.username}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Icon name="trash-outline" size={20} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );
}

function NoteCard({ item, onDelete }: { item: SavedNote; onDelete: () => void }) {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  return (
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <Icon name="document-text-outline" size={22} color={COLORS.primary} />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSub} numberOfLines={2}>{item.content}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Icon name="trash-outline" size={20} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );
}

export default function ManagePasswordScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const navigation = useNavigation<Nav>();
  const [tab, setTab] = useState<Tab>('websites');
  const { websites, notes, removeWebsite, removeNote } = usePasswordStore();

  const confirmDelete = (id: string, type: Tab) => {
    Alert.alert('Delete', 'Are you sure you want to delete this?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => type === 'websites' ? removeWebsite(id) : removeNote(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'websites' && styles.tabBtnActive]}
          onPress={() => setTab('websites')}>
          <Text style={[styles.tabText, tab === 'websites' && styles.tabTextActive]}>Websites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'notes' && styles.tabBtnActive]}
          onPress={() => setTab('notes')}>
          <Text style={[styles.tabText, tab === 'notes' && styles.tabTextActive]}>Notes</Text>
        </TouchableOpacity>
      </View>

      {tab === 'websites' ? (
        websites.length === 0
          ? <EmptyTab icon="globe-outline" label="No Saved Website" />
          : <FlatList
              data={websites}
              keyExtractor={i => i.id}
              renderItem={({ item }) => (
                <WebsiteCard item={item} onDelete={() => confirmDelete(item.id, 'websites')} />
              )}
              contentContainerStyle={styles.list}
            />
      ) : (
        notes.length === 0
          ? <EmptyTab icon="document-text-outline" label="No Saved Notes" />
          : <FlatList
              data={notes}
              keyExtractor={i => i.id}
              renderItem={({ item }) => (
                <NoteCard item={item} onDelete={() => confirmDelete(item.id, 'notes')} />
              )}
              contentContainerStyle={styles.list}
            />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateEntry', { type: tab === 'websites' ? 'website' : 'note' })}>
        <Icon name="add" size={30} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.backgroundGray },
    tabBar: {
      flexDirection: 'row', margin: 16,
      backgroundColor: C.backgroundGray,
      borderRadius: 30, padding: 4,
      borderWidth: 1, borderColor: C.border,
    },
    tabBtn: {
      flex: 1, height: 42, borderRadius: 28,
      alignItems: 'center', justifyContent: 'center',
    },
    tabBtnActive: { backgroundColor: C.primary },
    tabText: {
      fontFamily: FONTS.semiBold, fontSize: SIZES.base, color: C.textSecondary,
    },
    tabTextActive: { color: C.white },
    list: { padding: 16, gap: 10 },
    card: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: C.background, borderRadius: 14,
      padding: 16, borderWidth: 1, borderColor: C.border,
    },
    cardIcon: {
      width: 44, height: 44, borderRadius: 10,
      backgroundColor: C.primaryLight,
      alignItems: 'center', justifyContent: 'center', marginRight: 14,
    },
    cardInfo: { flex: 1 },
    cardTitle: { fontFamily: FONTS.semiBold, fontSize: SIZES.base, color: C.textPrimary },
    cardSub: {
      fontFamily: FONTS.regular, fontSize: SIZES.sm,
      color: C.textSecondary, marginTop: 2,
    },
    fab: {
      position: 'absolute', right: 20, bottom: 24,
      width: 60, height: 60, borderRadius: 30,
      backgroundColor: C.primary,
      alignItems: 'center', justifyContent: 'center',
      elevation: 6,
    },
  });
}
