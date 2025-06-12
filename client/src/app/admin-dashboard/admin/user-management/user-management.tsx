"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { StatsCards } from "./stats-cards";
import { UserTable } from "./user-table";
import { TypingAnimation } from "@/components/magicui/typing-animation";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  contact: string;
  avatar: string;
  joinDate: string;
  lastSeen: string;
  isOnline: boolean;
  loginCount: number;
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Albert Flores",
    email: "albertflores@gmail.com",
    status: "active",
    contact: "012345678",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Apr 19, 2020",
    lastSeen: "2 minutes ago",
    isOnline: true,
    loginCount: 245,
  },
  {
    id: "2",
    name: "Annette Black",
    email: "annetteblack@gmail.com",
    status: "active",
    contact: "023456789",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "May 2, 2020",
    lastSeen: "5 minutes ago",
    isOnline: true,
    loginCount: 189,
  },
  {
    id: "3",
    name: "Arlene McCoy",
    email: "mccoy.a@gmail.com",
    status: "inactive",
    contact: "034567890",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Jun 14, 2020",
    lastSeen: "2 hours ago",
    isOnline: false,
    loginCount: 67,
  },
  {
    id: "4",
    name: "Bessie Cooper",
    email: "bessco@outlook.com",
    status: "active",
    contact: "045678901",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Jan 30, 2020",
    lastSeen: "1 minute ago",
    isOnline: true,
    loginCount: 312,
  },
  {
    id: "5",
    name: "Brooklyn Simmons",
    email: "brooklyn_simmons@gmail.com",
    status: "inactive",
    contact: "056789012",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Feb 29, 2020",
    lastSeen: "1 day ago",
    isOnline: false,
    loginCount: 23,
  },
  {
    id: "6",
    name: "Cameron Williamson",
    email: "williamson.cam@outlook.com",
    status: "active",
    contact: "067890123",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Jun 8, 2020",
    lastSeen: "30 minutes ago",
    isOnline: false,
    loginCount: 156,
  },
  {
    id: "7",
    name: "Cody Fisher",
    email: "i.cody.fisher@gmail.com",
    status: "active",
    contact: "078901234",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Jul 11, 2020",
    lastSeen: "Just now",
    isOnline: true,
    loginCount: 445,
  },
  {
    id: "8",
    name: "Courtney Henry",
    email: "courtnerhenry@outlook.com",
    status: "inactive",
    contact: "089012345",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Apr 19, 2020",
    lastSeen: "3 days ago",
    isOnline: false,
    loginCount: 89,
  },
  {
    id: "9",
    name: "Devon Lane",
    email: "devon.lane@gmail.com",
    status: "active",
    contact: "090123456",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Mar 15, 2020",
    lastSeen: "10 minutes ago",
    isOnline: true,
    loginCount: 178,
  },
  {
    id: "10",
    name: "Dianne Russell",
    email: "dianne.russell@outlook.com",
    status: "inactive",
    contact: "001234567",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Aug 22, 2020",
    lastSeen: "5 hours ago",
    isOnline: false,
    loginCount: 134,
  },
];

export function EnhancedUserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === "active").length;
    const onlineUsers = users.filter((user) => user.isOnline).length;
    const newRegistrations = users.filter((user) => {
      const joinDate = new Date(user.joinDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return joinDate >= weekAgo;
    }).length;

    const avgActivityScore = Math.round(
      users.reduce((sum, user) => sum + user.loginCount, 0) / totalUsers
    );

    return {
      totalUsers,
      activeUsers,
      onlineUsers,
      newRegistrations,
      avgActivityScore,
      activePercentage: Math.round((activeUsers / totalUsers) * 100),
      onlinePercentage: Math.round((onlineUsers / totalUsers) * 100),
      newUsersPercentage: Math.round((newRegistrations / totalUsers) * 100),
      avgActivityPercentage: Math.min(
        Math.round((avgActivityScore / 500) * 100),
        100
      ), // Assuming 500 is max activity
    };
  }, [users]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleUpdateUser = (userId: string, updates: Partial<User>) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, ...updates } : user
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 w-auto">
      <div className="max-w-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <TypingAnimation className="text-4xl lg:text-5xl font-bold text-black">
            User Management Mindspeak Uniconfess
          </TypingAnimation>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg"
          >
            Comprehensive user analytics and management platform
          </motion.p>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* User Table */}
        <UserTable
          users={users}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
        />
      </div>
    </div>
  );
}
