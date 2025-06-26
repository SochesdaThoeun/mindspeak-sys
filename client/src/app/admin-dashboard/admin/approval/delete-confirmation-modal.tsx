"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isBulk?: boolean;
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isBulk = false,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-red-600">
            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            Delete {isBulk ? "Posts" : "Post"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-red-800">
                  {isBulk ? "Delete Multiple Posts" : "Delete Post"}
                </p>
                <p className="text-sm text-red-700">
                  {isBulk 
                    ? "Are you sure you want to delete the selected posts? This action cannot be undone and will permanently remove all selected posts from the system."
                    : "Are you sure you want to delete this post? This action cannot be undone and will permanently remove the post from the system."
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-amber-800">
                  What will happen:
                </p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• The post will be permanently removed</li>
                  <li>• All associated comments and likes will be deleted</li>
                  <li>• This action cannot be reversed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Deleting...
              </div>
            ) : (
              <>
                <Trash className="h-4 w-4 mr-2" />
                {isBulk ? "Delete Posts" : "Delete Post"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 