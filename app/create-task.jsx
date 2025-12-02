import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/Button';
import CustomInputText from '../components/InputText';
import CustomText from '../components/Text';
import { Colors } from '../constants/Colors';
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
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    fontSize: 24,
    marginRight: 15,
    color: Colors.text.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.text.primary,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    color: Colors.text.secondary,
  },
  categoryTextActive: {
    color: Colors.white,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});
