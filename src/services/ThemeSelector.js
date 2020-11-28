import { ThemeProvider } from "@react-navigation/native";
import { ThemeContext } from "../../theme-context";
import React from 'react';

const { default: AsyncStorage } = require("@react-native-community/async-storage")

const LIGHTMODE = 'light';
const DARKMODE = 'dark';

class ThemeSelector {

    darkModeEnabled = undefined;

    getDarkModeEnabled = () => this.darkModeEnabled;

    loadDarkModeEnabled = async () => {
        let selectedTheme = await AsyncStorage.getItem('Theme');
        console.log('Saved theme', selectedTheme);
        return (this.darkModeEnabled = selectedTheme === DARKMODE);
    }

    setDarkModeEnabled = async (enabled) => {
        try {
            this.darkModeEnabled = enabled === true;
            let modeString = this.darkModeEnabled ? DARKMODE : LIGHTMODE;
            console.log('Set theme to', modeString);
            await AsyncStorage.setItem('Theme', modeString);
        } catch (e) {
            console.log('Error', e);
        }
    }
}

export default new ThemeSelector();