import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    SafeAreaView,
    Image,
} from "react-native";

type MenuItem = {
    id: number;
    name: string;
    price: string;
    course: "Starters" | "Main" | "Dessert";
    image?: string;
};

export default function App() {
    const [screen, setScreen] = useState<"Home" | "AddItem" | "Menu">("Home");
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [filterCourse, setFilterCourse] = useState<"All" | "Starters" | "Main" | "Dessert">("All");

    const [dishName, setDishName] = useState("");
    const [dishPrice, setDishPrice] = useState("");
    const [dishCourse, setDishCourse] = useState<"Starters" | "Main" | "Dessert">("Starters");
    const [dishImage, setDishImage] = useState("");

    const saveItem = () => {
        if (!dishName || !dishPrice || !dishCourse) return;

        setMenuItems([
            ...menuItems,
            {
                id: Date.now(),
                name: dishName,
                price: dishPrice,
                course: dishCourse,
                image: dishImage,
            },
        ]);

        setDishName("");
        setDishPrice("");
        setDishCourse("Starters");
        setDishImage("");
        setScreen("Home");
    };

    const filteredMenu = menuItems.filter((item) =>
        filterCourse === "All" ? true : item.course === filterCourse
    );

    const HomeScreen = () => (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Total Menu Items: {menuItems.length}</Text>

            <View style={styles.categories}>
                {(["Starters", "Main", "Dessert"] as const).map((c) => (
                    <TouchableOpacity
                        key={c}
                        style={[
                            styles.categoryButton,
                            filterCourse === c && screen === "Menu" && { backgroundColor: "#800000" },
                        ]}
                        onPress={() => {
                            setFilterCourse(c);
                            setScreen("Menu");
                        }}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                filterCourse === c && screen === "Menu" && { color: "#fff" },
                            ]}
                        >
                            {c}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.actionButton} onPress={() => setScreen("AddItem")}>
                <Text style={styles.actionText}>Add Item</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                    setFilterCourse("All");
                    setScreen("Menu");
                }}
            >
                <Text style={styles.actionText}>View Menu</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

    const AddItemScreen = () => (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Dish Name</Text>
            <TextInput
                style={styles.input}
                value={dishName}
                onChangeText={setDishName}
                placeholder="Enter dish name"
            />

            <Text style={styles.label}>Price</Text>
            <TextInput
                style={styles.input}
                value={dishPrice}
                onChangeText={setDishPrice}
                placeholder="Enter price"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Course</Text>
            <View style={styles.dropdown}>
                {(["Starters", "Main", "Dessert"] as const).map((c) => (
                    <TouchableOpacity
                        key={c}
                        style={[styles.dropdownItem, dishCourse === c && { backgroundColor: "#800000" }]}
                        onPress={() => setDishCourse(c)}
                    >
                        <Text style={[styles.dropdownText, dishCourse === c && { color: "#fff" }]}>
                            {c}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Image URL (optional)</Text>
            <TextInput
                style={styles.input}
                value={dishImage}
                onChangeText={setDishImage}
                placeholder="Paste image URL"
            />
            {dishImage ? <Image source={{ uri: dishImage }} style={styles.previewImage} /> : null}

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.saveButton} onPress={saveItem}>
                    <Text style={styles.buttonTextWhite}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                        setDishName("");
                        setDishPrice("");
                        setDishCourse("Starters");
                        setDishImage("");
                        setScreen("Home");
                    }}
                >
                    <Text style={styles.buttonTextMaroon}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    const MenuScreen = () => (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Menu Items: {filteredMenu.length}</Text>

            {filteredMenu.length === 0 ? (
                <Text style={{ textAlign: "center", marginTop: 20 }}>No items added yet</Text>
            ) : (
                <FlatList
                    data={filteredMenu}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.menuItem}>
                            {item.image ? <Image source={{ uri: item.image }} style={styles.menuImage} /> : null}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.menuText}>{item.name}</Text>
                                <Text style={styles.menuText}>R{item.price}</Text>
                                <Text style={styles.menuText}>{item.course}</Text>
                            </View>
                        </View>
                    )}
                />
            )}

            <TouchableOpacity style={styles.actionButton} onPress={() => setScreen("Home")}>
                <Text style={styles.actionText}>Back to Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

    return (
        <>
            {screen === "Home" && <HomeScreen />}
            {screen === "AddItem" && <AddItemScreen />}
            {screen === "Menu" && <MenuScreen />}
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", color: "#800000", marginBottom: 20, textAlign: "center" },
    categories: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
    categoryButton: { borderWidth: 2, borderColor: "#800000", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 15 },
    categoryText: { color: "#800000", fontWeight: "bold" },
    actionButton: {
        backgroundColor: "#800000",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 15,
        alignItems: "center",
        alignSelf: "center",
        minWidth: 160,
    },
    actionText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    label: { color: "#800000", fontWeight: "bold", marginTop: 15, marginBottom: 5 },
    input: { borderWidth: 1, borderColor: "#800000", borderRadius: 8, padding: 10 },
    dropdown: { flexDirection: "row", justifyContent: "space-between", marginTop: 5 },
    dropdownItem: { borderWidth: 1, borderColor: "#800000", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 15, alignItems: "center", flex: 1, marginHorizontal: 3 },
    dropdownText: { color: "#800000", fontWeight: "bold" },
    buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 25 },
    saveButton: { backgroundColor: "#800000", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, flex: 1, marginRight: 10, alignItems: "center" },
    cancelButton: { backgroundColor: "#fff", borderWidth: 2, borderColor: "#800000", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, flex: 1, marginLeft: 10, alignItems: "center" },
    buttonTextWhite: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    buttonTextMaroon: { color: "#800000", fontWeight: "bold", fontSize: 16 },
    menuItem: { flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#eee", paddingVertical: 12, paddingHorizontal: 5 },
    menuText: { color: "#800000", fontSize: 16 },
    menuImage: { width: 60, height: 60, borderRadius: 6, marginRight: 12 },
    previewImage: { width: 80, height: 80, borderRadius: 6, marginTop: 10, alignSelf: "center" },
});