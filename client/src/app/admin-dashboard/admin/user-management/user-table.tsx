"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Wifi,
  WifiOff,
  Trash2,
  Eye,
  FileSpreadsheet,
  Calendar,
  Mail,
  Phone,
  UserCheck,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Bell,
  UserX,
} from "lucide-react";
import { motion } from "framer-motion";

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

interface UserTableProps {
  users: User[];
  onRefresh: () => void;
  isRefreshing: boolean;
  onUpdateUser: (userId: string, updates: Partial<User>) => void;
  onDeleteUser: (userId: string) => void;
}

const ITEMS_PER_PAGE = 5;

export function UserTable({
  users,
  onRefresh,
  isRefreshing,
  onUpdateUser,
  onDeleteUser,
}: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === currentUsers.length
        ? []
        : currentUsers.map((user) => user.id)
    );
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) return;

    switch (action) {
      case "activate":
        selectedUsers.forEach((userId) => {
          onUpdateUser(userId, { status: "active" });
        });
        console.log(`${selectedUsers.length} user(s) activated successfully`);
        break;
      case "deactivate":
        selectedUsers.forEach((userId) => {
          onUpdateUser(userId, { status: "inactive" });
        });
        console.log(`${selectedUsers.length} user(s) deactivated successfully`);
        break;
      case "delete":
        if (
          confirm(
            `Are you sure you want to delete ${selectedUsers.length} user(s)? This action cannot be undone.`
          )
        ) {
          selectedUsers.forEach((userId) => {
            onDeleteUser(userId);
          });
          console.log(`${selectedUsers.length} user(s) deleted successfully`);
        }
        break;
    }
    setSelectedUsers([]);
  };

  const exportToExcel = () => {
    const data = filteredUsers.map((user) => ({
      Name: user.name,
      Email: user.email,
      Status: user.status,
      Contact: user.contact,
      "Join Date": user.joinDate,
      "Last Seen": user.lastSeen,
      "Login Count": user.loginCount,
    }));

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((user) => Object.values(user).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    console.log(`${filteredUsers.length} users exported to CSV file`);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-emerald-100 text-emerald-800 border-emerald-200",
      inactive: "bg-slate-100 text-slate-800 border-slate-200",
    };
    return variants[status as keyof typeof variants] || variants.inactive;
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sendNotification = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      console.log(`Notification sent to ${user.name} successfully`);
    }
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (
      user &&
      confirm(
        `Are you sure you want to delete ${user.name}? This action cannot be undone.`
      )
    ) {
      onDeleteUser(userId);
      console.log(`${user.name} has been deleted successfully`);
    }
  };

  const handleToggleStatus = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      const newStatus = user.status === "active" ? "inactive" : "active";
      onUpdateUser(userId, { status: newStatus });
      console.log(`${user.name} is now ${newStatus}`);
    }
  };

  return (
    <Card className="border-0 shadow-2xl bg-white">
      <CardHeader className="border-b rounded-2xl  border-gray-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
              User Management
            </CardTitle>
            <p className="text-slate-600">
              Manage users and monitor their activities
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              variant="outline"
              onClick={exportToExcel}
              className="hover:bg-green-50 hover:border-green-300 transition-all duration-300"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 rounded-2xl bg-white">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search confessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-80 text-gray-600 bg-white"
            />
          </div>

          <div className="w-full lg:w-[140px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-gray-50 text-gray-400">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-50 text-gray-400">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-blue-800">
                {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""}{" "}
                selected
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("activate")}
                  className="hover:bg-emerald-50 hover:border-emerald-300"
                >
                  <UserCheck className="h-4 w-4 mr-1" />
                  Activate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("deactivate")}
                  className="hover:bg-orange-50 hover:border-orange-300"
                >
                  <UserX className="h-4 w-4 mr-1" />
                  Deactivate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("delete")}
                  className="hover:bg-red-50 hover:border-red-300 text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">
                    <Checkbox
                      checked={
                        selectedUsers.length === currentUsers.length &&
                        currentUsers.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                      className="border-slate-300"
                    />
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-700">
                    Name
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-700">
                    Email
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-700">
                    Contact
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-700">
                    Last Seen
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-100 hover:bg-gray-50 transition-all duration-300 group"
                  >
                    <td className="p-4">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleSelectUser(user.id)}
                        className="border-slate-300"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12 ring-2 ring-white shadow-md group-hover:ring-blue-200 transition-all duration-300">
                            <AvatarImage
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {user.isOnline && (
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">
                            {user.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">{user.email}</td>
                    <td className="p-4">
                      <Badge
                        className={`${getStatusBadge(
                          user.status
                        )} font-medium border transition-all duration-300 cursor-pointer`}
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-600 font-mono">
                      {user.contact}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {user.isOnline ? (
                          <Wifi className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <WifiOff className="h-4 w-4 text-slate-400" />
                        )}
                        <span className="text-sm text-slate-600">
                          {user.lastSeen}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                              className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                            <DialogHeader className="border-b border-gray-100 pb-4">
                              <DialogTitle className="text-2xl font-bold text-slate-800">
                                User Profile
                              </DialogTitle>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-6 bg-white">
                                {/* User Header */}
                                <div className="flex items-center gap-4 p-6 bg-white rounded-lg">
                                  <Avatar className="h-16 w-16 ring-2 ring-blue-200">
                                    <AvatarImage
                                      src={
                                        selectedUser.avatar ||
                                        "/placeholder.svg"
                                      }
                                      alt={selectedUser.name}
                                    />
                                    <AvatarFallback className="bg-blue-500 text-white text-lg font-semibold">
                                      {selectedUser.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-800">
                                      {selectedUser.name}
                                    </h3>
                                    <p className="text-slate-600">
                                      {selectedUser.email}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <Badge
                                        className={`${getStatusBadge(
                                          selectedUser.status
                                        )} text-xs`}
                                      >
                                        {selectedUser.status}
                                      </Badge>
                                      {selectedUser.isOnline && (
                                        <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                                          Online
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* User Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {/* Contact Information */}
                                  <Card className="bg-white border border-gray-200">
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                                        <Phone className="h-5 w-5 text-blue-500" />
                                        Contact Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div>
                                        <label className="text-sm font-medium text-slate-500">
                                          Phone Number
                                        </label>
                                        <p className="text-slate-800 font-mono mt-1">
                                          {selectedUser.contact}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-slate-500">
                                          Email Address
                                        </label>
                                        <p className="text-slate-800 mt-1">
                                          {selectedUser.email}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Account Details */}
                                  <Card className="bg-white border border-gray-200">
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-blue-500" />
                                        Account Details
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div>
                                        <label className="text-sm font-medium text-slate-500">
                                          Join Date
                                        </label>
                                        <p className="text-slate-800 mt-1">
                                          {selectedUser.joinDate}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-slate-500">
                                          Last Seen
                                        </label>
                                        <div className="flex items-center gap-2 mt-1">
                                          {selectedUser.isOnline ? (
                                            <Wifi className="h-4 w-4 text-emerald-500" />
                                          ) : (
                                            <WifiOff className="h-4 w-4 text-slate-400" />
                                          )}
                                          <span className="text-slate-800">
                                            {selectedUser.lastSeen}
                                          </span>
                                        </div>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-slate-500">
                                          Total Logins
                                        </label>
                                        <p className="text-slate-800 mt-1">
                                          {selectedUser.loginCount}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Action Buttons */}
                                <Card className="bg-white border border-gray-200">
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-semibold text-slate-700">
                                      Account Actions
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex flex-wrap gap-3">
                                      <Button
                                        variant="outline"
                                        className="flex items-center gap-2"
                                        onClick={() =>
                                          handleToggleStatus(selectedUser.id)
                                        }
                                      >
                                        {selectedUser.status === "active" ? (
                                          <UserX className="h-4 w-4" />
                                        ) : (
                                          <UserCheck className="h-4 w-4" />
                                        )}
                                        {selectedUser.status === "active"
                                          ? "Deactivate"
                                          : "Activate"}
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="flex items-center gap-2"
                                        onClick={() =>
                                          sendNotification(selectedUser.id)
                                        }
                                      >
                                        <Mail className="h-4 w-4" />
                                        Send Message
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="flex items-center gap-2 text-red-600 hover:bg-red-50"
                                        onClick={() =>
                                          handleDeleteUser(selectedUser.id)
                                        }
                                      >
                                        <Trash2 className="h-4 w-4" />
                                        Delete Account
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-slate-100 transition-all duration-300"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-48">
                            <DropdownMenuItem
                              className="cursor-pointer hover:bg-blue-50"
                              onClick={() => handleToggleStatus(user.id)}
                            >
                              {user.status === "active" ? (
                                <UserX className="h-4 w-4 mr-2" />
                              ) : (
                                <UserCheck className="h-4 w-4 mr-2" />
                              )}
                              {user.status === "active"
                                ? "Deactivate"
                                : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer hover:bg-yellow-50"
                              onClick={() => sendNotification(user.id)}
                            >
                              <Bell className="h-4 w-4 mr-2" />
                              Send Notification
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 cursor-pointer hover:bg-red-50"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {currentUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-xl transition-all duration-300 border-slate-200 bg-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleSelectUser(user.id)}
                      className="border-slate-300"
                    />
                    <div className="relative">
                      <Avatar className="h-14 w-14 ring-2 ring-white shadow-lg">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">
                        {user.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        ID: {user.id}
                      </div>
                      <Badge
                        className={`${getStatusBadge(
                          user.status
                        )} text-xs mt-1 cursor-pointer`}
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status === "active" ? (
                          <UserX className="h-4 w-4 mr-2" />
                        ) : (
                          <UserCheck className="h-4 w-4 mr-2" />
                        )}
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => sendNotification(user.id)}
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Notify
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Email:</span>
                    <span className="text-slate-800">{user.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Contact:</span>
                    <span className="text-slate-800 font-mono">
                      {user.contact}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">
                      Last Seen:
                    </span>
                    <div className="flex items-center gap-2">
                      {user.isOnline ? (
                        <Wifi className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <WifiOff className="h-3 w-3 text-slate-400" />
                      )}
                      <span className="text-slate-800">{user.lastSeen}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 bg-white">
                      <DialogHeader className="border-b border-gray-100 pb-4">
                        <DialogTitle className="text-xl font-bold text-slate-800">
                          User Profile
                        </DialogTitle>
                      </DialogHeader>
                      {selectedUser && (
                        <div className="space-y-6 bg-white">
                          <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg">
                            <Avatar className="h-20 w-20 ring-4 ring-blue-200">
                              <AvatarImage
                                src={selectedUser.avatar || "/placeholder.svg"}
                                alt={selectedUser.name}
                              />
                              <AvatarFallback className="text-lg bg-blue-500 text-white">
                                {selectedUser.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                              <h3 className="text-xl font-bold text-slate-800">
                                {selectedUser.name}
                              </h3>
                              <p className="text-slate-600">
                                {selectedUser.email}
                              </p>
                              <p className="text-sm text-slate-500 font-mono">
                                ID: {selectedUser.id}
                              </p>
                              <Badge
                                className={`${getStatusBadge(
                                  selectedUser.status
                                )} text-xs mt-2`}
                              >
                                {selectedUser.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <Card className="bg-white border border-gray-200">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-semibold text-slate-700">
                                  Contact & Account
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-500">Phone:</span>
                                  <span className="font-mono">
                                    {selectedUser.contact}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">
                                    Join Date:
                                  </span>
                                  <span>{selectedUser.joinDate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">
                                    Last Seen:
                                  </span>
                                  <span>{selectedUser.lastSeen}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">
                                    Total Logins:
                                  </span>
                                  <span>{selectedUser.loginCount}</span>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-slate-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="hover:bg-blue-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 p-0 ${
                        currentPage === page
                          ? "bg-black text-white"
                          : "hover:bg-blue-50 hover:border-blue-300"
                      }`}
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="hover:bg-blue-50"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-slate-400 text-8xl mb-6">🔍</div>
            <div className="text-2xl font-semibold text-slate-600 mb-3">
              No users found
            </div>
            <div className="text-slate-500 mb-6">
              Try adjusting your search criteria or filters
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
