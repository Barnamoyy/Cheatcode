'use client'

import React, { useEffect, useState } from "react";

import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";
import { UserButton } from "@clerk/nextjs";
import useThemeStore from "@/store/theme-store";

const Navbar = () => {

    const {darkMode, setDarkMode} = useThemeStore();

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if(theme === "dark"){
            setDarkMode();
        }
    }, [])

    useEffect(() => {
        if(darkMode){
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode])

    return (
        <div className="w-full px-4 py-2 lg:px-8 lg:py-4 flex justify-between items-center">
            <MobileSidebar darkMode={darkMode} setDarkMode={setDarkMode}/>      
            <div className="">
                <h1 className="text-xl lg:text-xl font-semibold">CheatCode</h1>
            </div>
            <div className="space-x-4 lg:space-x-8 hidden lg:block">
                <button onClick={() => setDarkMode()}>
                    {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                <UserButton />
            </div>
        </div>
    );
}

export default Navbar;