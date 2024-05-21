'use client'

import {useEffect} from 'react';

import DashboardHome from "@/components/dashboard-board";
import Navbar from "@/components/navbar";
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

const DashboardPage = () => {
    
    // if the user has a specified id, then the user is an admin
    const user = useUser(); 
    useEffect(() => {
        try {
            const res = axios.post('/api/role', {
                role: 'admin',
            });   
        } catch (error) {
            console.error(error);
        }
    }, [])

    return (
        <div className="w-full h-full space-y-10">
            <Navbar />
            <DashboardHome />
        </div>
    );
}

export default DashboardPage;