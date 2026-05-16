import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { usePasswordStore } from '../store/passwordStore';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';
import { RootStackParamList } from '../types';

type Route = RouteProp<RootStackParamList, 'CreateEntry'>;

export default function CreateEntryScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const navigation = useNavigation();
  const { params } = useRoute<Route>();
  const isWebsite = params.type === 'website';
  const { addWebsite, addNote } = usePasswordStore();

  const [title, setTitle]       = useState('');
  const [url, setUrl]           = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent]   = useState('');
  const [showPw, setShowPw]     = useState(false);

  const canSubmit = title.trim().length > 0 && (isWebsite ? password.trim().length > 0 : content.trim().length > 0);

  const handleDone = () => {
    if (!canSubmit) return;
    if (isWebsite) {
      addWebsite({ title: title.trim(), url: url.trim(), username: username.trim(), password: password.trim() });
      Toast.show({ type: 'success', text1: 'Website Saved!' });
    } else {
      addNote({ title: title.trim(), content: content.trim() });
      Toast.show({ type: 'success', text1: 'Note Saved!' });
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          <Text style={styles.fieldLabel}>Title</Text>
          <TextInput
            style={styles.input} value={title} onChangeText={setTitle}
            placeholder="Title" placeholderTextColor={COLORS.textLight}
            returnKeyType="next"
          />

          {isWebsite ? (
            <>
              <Text style={styles.fieldLabel}>Website URL</Text>
              <TextInput
                style={styles.input} value={url} onChangeText={setUrl}
                placeholder="https://example.com"
                placeholderTextColor={COLORS.textLight}
                autoCapitalize="none" keyboardType="url" returnKeyType="next"
              />
              <Text style={styles.fieldLabel}>Username / Email</Text>
              <TextInput
                style={styles.input} value={username} onChangeText={setUsername}
                placeholder="your@email.com"
                placeholderTextColor={COLORS.textLight}
                autoCapitalize="none" returnKeyType="next"
              />
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.pwRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]} value={password} onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor={COLORS.textLight}
                  secureTextEntry={!showPw} returnKeyType="done"
                  onSubmitEditing={handleDone}
                />
                <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPw(v => !v)}>
                  <Text style={styles.eyeText}>{showPw ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.fieldLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]} value={content} onChangeText={setContent}
                placeholder="Description"
                placeholderTextColor={COLORS.textLight}
                multiline numberOfLines={4} returnKeyType="done"
              />
            </>
          )}
        </ScrollView>

        <TouchableOpacity
          style={[styles.doneBtn, !canSubmit && styles.doneBtnDisabled]}
          onPress={handleDone} disabled={!canSubmit}>
          <Text style={styles.doneBtnText}>Done</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    scroll: { padding: 20, paddingBottom: 20 },
    fieldLabel: {
      fontFamily: FONTS.bold, fontSize: SIZES.base,
      color: C.textPrimary, marginBottom: 6, marginTop: 20,
    },
    input: {
      fontFamily: FONTS.regular, fontSize: SIZES.base,
      color: C.textPrimary, borderBottomWidth: 1,
      borderBottomColor: C.border, paddingVertical: 10,
    },
    textArea: { minHeight: 80, textAlignVertical: 'top' },
    pwRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    eyeBtn: {
      paddingHorizontal: 10, paddingVertical: 10,
    },
    eyeText: {
      fontFamily: FONTS.semiBold, fontSize: SIZES.sm, color: C.primary,
    },
    doneBtn: {
      marginHorizontal: 20, marginBottom: 16, height: 56,
      borderRadius: 28, backgroundColor: C.primary,
      alignItems: 'center', justifyContent: 'center',
    },
    doneBtnDisabled: { backgroundColor: C.textLight },
    doneBtnText: { fontFamily: FONTS.bold, fontSize: SIZES.base, color: C.white },
  });
}
