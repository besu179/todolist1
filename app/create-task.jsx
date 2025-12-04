import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/Button';
import CustomInputText from '../components/InputText';
import CustomText from '../components/Text';
import { useTasks } from './TasksContext';

export default function CreateTask() {
  const router = useRouter();
  const { addTask } = useTasks();

  const [category, setCategory] = useState('shopping');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('11:00 AM');

  const categories = [
    { id: 'personal', label: 'personal' },
    { id: 'work', label: 'work' },
    { id: 'shopping', label: 'shopping' }
  ];

  const getCurrentDate = () => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${date.getDate()} ${months[date.getMonth()]}, ${days[date.getDay()]}`;
  };

  const onCreate = () => {
    if (!name.trim()) return;
    const timeString = `${startTime} - ${endTime}`;
    addTask({
      title: name.trim(),
      description: description.trim(),
      category,
      time: timeString,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <CustomText style={styles.backButton}>←</CustomText>
        </TouchableOpacity>
        <CustomText variant="h2" style={styles.headerTitle}>Create New Task</CustomText>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <CustomText style={styles.label}>Task Name</CustomText>
          <CustomInputText
            placeholder="Task Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <CustomText style={styles.label}>Category</CustomText>
          <View style={styles.categoryContainer}>
            {categories.map((cat, idx) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryButton,
                  category === cat.id && styles.categoryButtonActive,
                  idx !== categories.length - 1 && { marginRight: 10 }
                ]}
                onPress={() => setCategory(cat.id)}
              >
                <CustomText style={[
                  styles.categoryText,
                  category === cat.id && styles.categoryTextActive
                ]}>
                  {cat.label}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <CustomText style={styles.label}>Date & Time</CustomText>
          <CustomInputText
            value={getCurrentDate()}
            editable={false}
          />
        </View>

        <View style={styles.timeContainer}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <CustomText style={styles.label}>Start time</CustomText>
            <CustomInputText
              placeholder="09:00 AM"
              value={startTime}
              onChangeText={setStartTime}
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
            <CustomText style={styles.label}>End time</CustomText>
            <CustomInputText
              placeholder="11:00 AM"
              value={endTime}
              onChangeText={setEndTime}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <CustomText style={styles.label}>Description</CustomText>
          <CustomInputText
            style={styles.descriptionInput}
            placeholder="Description"
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>

      <CustomButton title="Create Task" onPress={onCreate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7faff",
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 8,
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
    color: "#2563eb",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: "#222",
  },
  form: {
    flex: 1,
    paddingBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: "#374151",
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  categoryButtonActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  categoryText: {
    fontSize: 14,
    color: "#6b7280",
    textTransform: 'capitalize',
  },
  categoryTextActive: {
    color: "#fff",
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 12,
  }
});
