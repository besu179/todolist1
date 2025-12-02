import { Add01Icon, Notification01Icon, SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomCard from "../components/Card";
import CustomInputText from "../components/InputText";
import CustomText from "../components/Text";
import { useTasks } from "./TasksContext";

function Index() {
  const router = useRouter();
  const { tasks, removeTask } = useTasks();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "personal", "work", "shopping"];

  // Filter tasks based on search and category
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title?.toLowerCase().includes(search.toLowerCase()) ||
                           task.description?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "All" || task.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tasks, search, selectedCategory]);

  const renderTask = ({ item }) => (
    <CustomCard style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <View style={styles.taskInfo}>
          <CustomText variant="h2" style={styles.taskTitle}>{item.title}</CustomText>
          {item.time && (
            <CustomText variant="body" style={styles.taskTime}>{item.time}</CustomText>
          )}
        </View>
        <TouchableOpacity
          onPress={() => removeTask(item.id)}
          style={styles.deleteButton}
        >
          <CustomText style={styles.deleteText}>×</CustomText>
        </TouchableOpacity>
      </View>
      {item.description && (
        <CustomText variant="body" style={styles.taskDescription}>
          {item.description}
        </CustomText>
      )}
      {item.category && (
        <View style={[
          styles.categoryBadge,
          styles[`category${item.category.charAt(0).toUpperCase() + item.category.slice(1)}`] || {}
        ]}>
          <CustomText style={styles.categoryText}>{item.category}</CustomText>
        </View>
      )}
    </CustomCard>
  );

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.topRow}>
          <View style={styles.iconCircle}>
            <HugeiconsIcon
              icon={Notification01Icon}
              size={22}
              color="#2563eb"
              strokeWidth={1.5}
            />
          </View>
        </View>
        <CustomText style={styles.greeting} variant="H1">
          hello adanech
        </CustomText>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <HugeiconsIcon
            icon={SearchIcon}
            size={20}
            color={"#b0b0b0"}
            style={{ marginRight: 8 }}
          />
          <CustomInputText
            placeholder="search task"
            value={search}
            onChangeText={setSearch}
            style={styles.searchText}
          />
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryFilter,
              selectedCategory === category && styles.categoryFilterActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <CustomText
              style={[
                styles.categoryFilterText,
                selectedCategory === category && styles.categoryFilterTextActive,
              ]}
            >
              {category}
            </CustomText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tasks List */}
      <View style={styles.tasksContainer}>
        {filteredTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <CustomText variant="body" style={styles.emptyText}>
              {tasks.length === 0
                ? "No tasks yet. Create your first task!"
                : "No tasks match your search."}
            </CustomText>
          </View>
        ) : (
          <FlatList
            data={filteredTasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.tasksList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Create Task Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push("/create-task")}
      >
        <HugeiconsIcon
          icon={Add01Icon}
          size={24}
          color="#fff"
        />
        <CustomText style={styles.createButtonText}>Create Task</CustomText>
      </TouchableOpacity>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7faff",
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  topSection: {
    backgroundColor: "#2563eb",
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 18,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },

  greeting: {
    marginBottom: 18,
    textAlign: "center",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    paddingHorizontal: 18,
    height: 48,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    gap: 10,
    marginTop: -10,
    marginBottom: 20,
  },

  searchText: {
    color: "#6b7280",
    fontSize: 16,
    flex: 1,
    paddingVertical: 0,
    paddingLeft: 0,
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryContainer: {
    paddingHorizontal: 24,
    gap: 10,
  },
  categoryFilter: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  categoryFilterActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  categoryFilterText: {
    fontSize: 14,
    color: "#6b7280",
    textTransform: "capitalize",
  },
  categoryFilterTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  tasksContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  tasksList: {
    paddingBottom: 100,
  },
  taskCard: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    marginBottom: 4,
    color: "#1f2937",
  },
  taskTime: {
    color: "#6b7280",
    fontSize: 14,
  },
  taskDescription: {
    color: "#4b5563",
    marginBottom: 8,
    fontSize: 14,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    color: "#dc2626",
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryBadge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 4,
  },
  categoryPersonal: {
    backgroundColor: "#dbeafe",
  },
  categoryWork: {
    backgroundColor: "#fef3c7",
  },
  categoryShopping: {
    backgroundColor: "#e9d5ff",
  },
  categoryText: {
    fontSize: 12,
    color: "#4b5563",
    textTransform: "capitalize",
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    color: "#9ca3af",
    textAlign: "center",
  },
  createButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    left: 24,
    backgroundColor: "#2563eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    gap: 8,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
