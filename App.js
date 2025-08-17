import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import TaskItem from "./components/TaskItem";
import { Ionicons } from "@expo/vector-icons";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showTutorial, setShowTutorial] = useState(true);

  // Add a new task
  const addTask = () => {
    if (task.trim().length === 0) return;
    LayoutAnimation.easeInEaseOut();
    setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
    setTask("");
  };

  // Toggle completion
  const toggleComplete = (id) => {
    LayoutAnimation.easeInEaseOut();
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // Delete task
  const deleteTask = (id) => {
    LayoutAnimation.easeInEaseOut();
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Gradient-like Header */}
      <View style={styles.header}>
        <Text style={styles.title}>✨ Task Manager</Text>
      </View>

      {/* Tutorial Modal */}
      <Modal visible={showTutorial} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>👋 Welcome!</Text>
            <Text style={styles.modalText}>Here’s how to use the app:</Text>
            <Text style={styles.modalStep}>➕ Add tasks using the box below</Text>
            <Text style={styles.modalStep}>✅ Tap tasks to mark complete</Text>
            <Text style={styles.modalStep}>❌ Delete tasks with the red button</Text>
            <Pressable style={styles.modalButton} onPress={() => setShowTutorial(false)}>
              <Text style={styles.modalButtonText}>Got it!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Input + Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task..."
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Ionicons name="add-circle" size={36} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={() => toggleComplete(item.id)} onDelete={() => deleteTask(item.id)} />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet. Add one!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#28a745",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
  },
  modalStep: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
