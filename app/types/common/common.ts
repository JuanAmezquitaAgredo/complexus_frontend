export interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    placeholder: string;
    boderColor?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonProps{
    type?: string;
    onClick?: () => void;
    label: string;
    backgroundColor?: string;
}

export interface ButtonGradientProps{
    label: string;
    onClick: () => void;
}

export interface UserLogin {
    email: string;
    password: string;
}