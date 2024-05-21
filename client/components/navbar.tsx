'use client'

import React, { useEffect, useState } from "react";

import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";
import { UserButton } from "@clerk/nextjs";
import useThemeStore from "@/store/theme-store";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {

    const user = useUser();

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
        <div className="w-full flex justify-between items-center">
            <MobileSidebar darkMode={darkMode} setDarkMode={setDarkMode}/>      
            <div className="">
                <h1 className="text-xl lg:text-xl font-semibold">CheatCode</h1>
            </div>
            {user?.user?.publicMetadata.role === 'admin' ? <Link href={'/addproblem'}>
                <Button className="text-sm font-semibold rounded-lg" variant={"outline"}>
                    Add Problem
                </Button>
            </Link> : null}
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