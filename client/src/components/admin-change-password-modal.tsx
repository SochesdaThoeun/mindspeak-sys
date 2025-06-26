"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Key, Lock, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAppDispatch } from "@/store/hooks";
import { updateAdminPassword } from "@/store/slices/adminSlice";
import { useToast } from "@/hooks/use-toast";

interface AdminChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminChangePasswordModal({ isOpen, onClose }: AdminChangePasswordModalProps) {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    old_password: false,
    new_password: false,
    new_password_confirmation: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.old_password) {
      newErrors.old_password = "Current password is required";
    }

    if (!formData.new_password) {
      newErrors.new_password = "New password is required";
    } else if (formData.new_password.length < 8) {
      newErrors.new_password = "New password must be at least 8 characters";
    }

    if (!formData.new_password_confirmation) {
      newErrors.new_password_confirmation = "Password confirmation is required";
    } else if (formData.new_password !== formData.new_password_confirmation) {
      newErrors.new_password_confirmation = "Passwords do not match";
    }

    if (formData.old_password && formData.new_password && formData.old_password === formData.new_password) {
      newErrors.new_password = "New password must be different from current password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await dispatch(updateAdminPassword(formData)).unwrap();
      
      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated.",
        variant: "default",
      });
      
      // Reset form and close modal
      setFormData({
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
      setErrors({});
      onClose();
      
    } catch (error: unknown) {
      console.error("Password update error:", error);
      
      const errorMessage = typeof error === 'string' ? error : error instanceof Error ? error.message : 'Unknown error';
      
      // Handle validation errors from server
      if (errorMessage.includes("old password")) {
        setErrors({ old_password: "Current password is incorrect" });
      } else if (errorMessage.includes("different")) {
        setErrors({ new_password: "New password must be different from current password" });
      } else if (errorMessage.includes("confirmation")) {
        setErrors({ new_password_confirmation: "Password confirmation does not match" });
      } else {
        toast({
          title: "Error",
          description: errorMessage || "Failed to update password. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    });
    setErrors({});
    setShowPasswords({
      old_password: false,
      new_password: false,
      new_password_confirmation: false,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-white/20 dark:border-gray-800/50">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#1d2b7d]/10 dark:bg-blue-900/20 rounded-lg">
              <Shield className="h-5 w-5 text-[#1d2b7d] dark:text-blue-400" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Change Password
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                Update your admin account password
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="old_password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Password
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Key className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                id="old_password"
                name="old_password"
                type={showPasswords.old_password ? "text" : "password"}
                value={formData.old_password}
                onChange={(e) => handleInputChange("old_password", e.target.value)}
                placeholder="Enter your current password"
                className={`pl-10 pr-10 ${errors.old_password ? "border-red-500 focus:border-red-500" : ""}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("old_password")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                disabled={isLoading}
              >
                {showPasswords.old_password ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.old_password && (
              <p className="text-sm text-red-500">{errors.old_password}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="new_password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                id="new_password"
                name="new_password"
                type={showPasswords.new_password ? "text" : "password"}
                value={formData.new_password}
                onChange={(e) => handleInputChange("new_password", e.target.value)}
                placeholder="Enter your new password"
                className={`pl-10 pr-10 ${errors.new_password ? "border-red-500 focus:border-red-500" : ""}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new_password")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                disabled={isLoading}
              >
                {showPasswords.new_password ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.new_password && (
              <p className="text-sm text-red-500">{errors.new_password}</p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <Label htmlFor="new_password_confirmation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm New Password
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                id="new_password_confirmation"
                name="new_password_confirmation"
                type={showPasswords.new_password_confirmation ? "text" : "password"}
                value={formData.new_password_confirmation}
                onChange={(e) => handleInputChange("new_password_confirmation", e.target.value)}
                placeholder="Confirm your new password"
                className={`pl-10 pr-10 ${errors.new_password_confirmation ? "border-red-500 focus:border-red-500" : ""}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new_password_confirmation")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                disabled={isLoading}
              >
                {showPasswords.new_password_confirmation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.new_password_confirmation && (
              <p className="text-sm text-red-500">{errors.new_password_confirmation}</p>
            )}
          </div>

          {/* Password Requirements */}
          <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <Shield className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-sm text-blue-700 dark:text-blue-300">
              Password must be at least 8 characters long and different from your current password.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#1d2b7d] hover:bg-[#1d2b7d]/90 text-white"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Updating...
                </div>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
} 