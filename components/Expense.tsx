import { ExpenseDto } from '@/Dto/ExpenseDto';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ExpenseProps {
  props: ExpenseDto;
}

const Expense = ({ props }: ExpenseProps) => {
  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>🛒</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.merchant} numberOfLines={1}>
            {props.merchant}
          </Text>
          <Text style={styles.date}>{formatDate(props.createdAt)}</Text>
        </View>
      </View>

      <Text style={styles.amount}>
        ₹{props.amount.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,

    borderWidth: 1,
    borderColor: '#F1F3F5',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },

  icon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#ECFDF5', 
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  iconText: {
    fontSize: 22,
  },

  info: {
    flex: 1,
  },

  merchant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },

  date: {
    fontSize: 13,
    color: '#6B7280',
  },

  amount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#DC2626',
    letterSpacing: -0.3,
  },
});

export default Expense;
