'use client';
import Swal from 'sweetalert2';
import { SweetAlertResult } from 'sweetalert2';

interface ConfirmDialogOptions {
    title?: string;
    text?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
}

const ConfirmDialog = async ({
    title = 'Are you sure?',
    text = 'You won’t be able to revert this!',
    confirmButtonText = 'Yes, delete it!',
    cancelButtonText = 'Cancel',
}: ConfirmDialogOptions): Promise<SweetAlertResult> => {
    return Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText,
        cancelButtonText,
    });
};

export default ConfirmDialog;
