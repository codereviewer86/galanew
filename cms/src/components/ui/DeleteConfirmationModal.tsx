import React from 'react';
import { Modal } from './modal';
import Button from './button/Button';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  itemName,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[450px] m-4">
      <div className="relative w-full p-6 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full dark:bg-red-900/20">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h4 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white/90">
            {title}
          </h4>
          <p className="text-center text-gray-500 dark:text-gray-400">
            {message || (
              <>
                {itemName ? (
                  <>
                    Are you sure you want to delete <span className="font-medium text-gray-800 dark:text-white/90">"{itemName}"</span>?
                  </>
                ) : (
                  "Are you sure you want to delete this item?"
                )}
              </>
            )}
          </p>
          <p className="mt-2 text-sm text-center text-gray-400 dark:text-gray-500">
            This action cannot be undone.
          </p>
        </div>
        <div className="flex items-center gap-3 justify-center">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onClose} 
            className="min-w-[100px]"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button 
            size="sm" 
            onClick={onConfirm}
            className="min-w-[100px] !bg-red-500 hover:!bg-red-600 !text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
