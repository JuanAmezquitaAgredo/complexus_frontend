import Swal from 'sweetalert2';

interface AlertComponentProps {
    title: string;
    text: string;
    icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
    confirmButtonText?: string;
}

const showAlert = ({
    title,
    text,
    icon = 'info',
    confirmButtonText = 'OK'
}: AlertComponentProps) => {
    return Swal.fire({
        title,
        text,
        icon,
        confirmButtonText
    });
};

export default showAlert;
