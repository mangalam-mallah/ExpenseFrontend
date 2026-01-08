import { UserDto } from '@/Dto/UserDto';
import { fetchUserInfo } from '@/api/user.service';
import { Camera, ChevronRight, Mail, Phone, User } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, label, value }) => (
  <View style={styles.profileItem}>
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <View style={styles.itemContent}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
    <ChevronRight color="#94A3B8" size={20} />
  </View>
);

const Profile = () => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mapServerToDto = (data: any): UserDto => ({
    userId: data.user_id ?? data.userId,
    firstName: data.first_name ?? data.firstName,
    lastName: data.last_name ?? data.lastName,
    phoneNumber: data.phone_number ?? data.phoneNumber,
    email: data.email,
    profilePic: data.profile_pic ?? data.profilePic,
  });

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchUserInfo();

        if (!mounted) return;
        setUser(mapServerToDto(data));
      } catch (err: any) {
        console.warn("Failed to load profile", err);
        if (mounted) {
          setError(err?.message ?? "Failed to load profile");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadProfile();
    return () => { mounted = false; };
  }, []);

  const formatPhoneNumber = (phone?: number): string => {
    if (!phone) return '-';
    const phoneStr = phone.toString();
    return phoneStr;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={user?.profilePic ? { uri: user.profilePic } : require('../images/NoDp.png')}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Camera color="#6366F1" size={18} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.subtitle}>Personal Profile</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.card}>
            <ProfileItem
              icon={<User color="#6366F1" size={20} />}
              label="Full Name"
              value={`${user?.firstName} ${user?.lastName}`}
            />
            <ProfileItem
              icon={<Phone color="#6366F1" size={20} />}
              label="Phone Number"
              value={formatPhoneNumber(user?.phoneNumber)}
            />
            <ProfileItem
              icon={<Mail color="#6366F1" size={20} />}
              label="Email Address"
              value={user?.email ?? '-'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E2E8F0',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  itemContent: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '600',
  },
});

export default Profile;