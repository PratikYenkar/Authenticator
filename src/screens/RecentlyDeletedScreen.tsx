import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { useAccountStore } from '../store/accountStore';
import { getServiceColor, getServiceInitial } from '../utils/serviceLogos';
import { COLORS, SIZES } from '../constants/theme';
import { DeletedAccount } from '../types';

function daysAgo(ts: number): string {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

export default function RecentlyDeletedScreen() {
  const recentlyDeleted = useAccountStore(s => s.recentlyDeleted);
  const restoreAccount = useAccountStore(s => s.restoreAccount);
  const permanentDelete = useAccountStore(s => s.permanentDelete);

  const handleRestore = useCallback(
    (id: string, issuer: string) => {
      restoreAccount(id);
      Toast.show({ type: 'success', text1: 'Account Restored', text2: issuer });
    },
    [restoreAccount],
  );

  const handleDelete = useCallback(
    (id: string, issuer: string) => {
      Alert.alert(
        'Permanently Delete',
        `Are you sure you want to permanently delete ${issuer}? This cannot be undone.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              permanentDelete(id);
              Toast.show({ type: 'info', text1: 'Account Deleted Permanently' });
            },
          },
        ],
      );
    },
    [permanentDelete],
  );

  const renderItem = ({ item }: { item: DeletedAccount }) => {
    const color = getServiceColor(item.issuer);
    const initial = getServiceInitial(item.issuer);

    return (
      <View style={styles.row}>
        <View style={[styles.logo, { backgroundColor: color }]}>
          <Text style={styles.logoText}>{initial}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.issuer}>{item.issuer}</Text>
          <Text style={styles.sub}>{item.username || item.accountName}</Text>
          <View style={styles.whenRow}>
            <Icon name="time-outline" size={12} color={COLORS.textLight} />
            <Text style={styles.when}> {daysAgo(item.deletedAt)}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.btn, styles.restoreBtn]}
            onPress={() => handleRestore(item.id, item.issuer)}>
            <Icon name="refresh-outline" size={14} color={COLORS.primary} />
            <Text style={styles.restoreText}> Restore</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.deleteBtn]}
            onPress={() => handleDelete(item.id, item.issuer)}>
            <Icon name="trash-outline" size={14} color={COLORS.danger} />
            <Text style={styles.deleteText}> Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      {/* Info Banner */}
      <View style={styles.banner}>
        <Icon name="information-circle-outline" size={18} color={COLORS.textSecondary} />
        <Text style={styles.bannerText}>
          Accounts are permanently deleted after 30 days.
        </Text>
      </View>

      <FlatList
        data={recentlyDeleted}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: COLORS.separator }} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="shield-checkmark-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyText}>No recently deleted accounts</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundGray,
    padding: 12,
    margin: 12,
    borderRadius: 8,
    gap: 8,
  },
  bannerText: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  issuer: {
    fontSize: SIZES.base,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  sub: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  whenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  when: {
    fontSize: SIZES.xs,
    color: COLORS.textLight,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1.5,
  },
  restoreBtn: {
    borderColor: COLORS.primary,
  },
  restoreText: {
    color: COLORS.primary,
    fontSize: SIZES.sm,
    fontWeight: '600',
  },
  deleteBtn: {
    borderColor: COLORS.danger,
  },
  deleteText: {
    color: COLORS.danger,
    fontSize: SIZES.sm,
    fontWeight: '600',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: SIZES.base,
    color: COLORS.textSecondary,
    marginTop: 16,
  },
});
