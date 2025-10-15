# Christoffel-App

## Introduction
A simple *React Native app* for managing a restaurant menu locally.  
This app allows Christoffel to add menu items, view the menu and optionally include images for each dish. All data is stored locally in the app’s state — no backend is required.  
This app is perfect for small restaurants or cafes that want a *lightweight menu management tool* without setting up a database.  
It demonstrates the use of *React Native components, **state management, and **interactive UI* using a single-file approach (App.tsx).  

With this app, you can:  
- Quickly add new dishes with details  
- Filter dishes by course (Starters, Main, Dessert)  
- Include optional images for a visual menu  
- Navigate easily between Home, Add Item, and Menu screens  


## Features

- *Home Screen*
  - Shows *total menu items*
  - Buttons for *Add Item* and *View Menu*
  - Category buttons (*Starters, **Main, **Dessert*) to filter the menu

- *Add Item Screen*
  - Enter *Dish Name*
  - Enter *Price*
  - Select *Course* (Starters / Main / Dessert)
  - Optional *Image URL* with preview
  - *Save* and *Cancel* buttons

- *Menu Screen*
  - Shows a list of dishes with *name, price, course, and **image* (if provided)
  - *Back to Home* button
  - Can filter by selected category from Home screen

---

## Technologies Used
-React Native (Expo)
-TypeScript (TSX)
-Expo Router (for screen navigation)
-Android Emulator / Expo Go App

## How to Run the App
-Make sure the project folder (e.g., The-Christoffel-Menu) is open.
-Install Dependencies
-npm install
-npx expo start 

## Conclusion
The Christoffel Menu app is a simple yet functional mobile application built with React Native, Expo, and TypeScript. It allows users to navigate between screens to add and view menu items in a clean, user-friendly layout. The project demonstrates an understanding of screen navigation, component design, and responsive styling.


