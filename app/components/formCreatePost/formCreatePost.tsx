
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createPost, resetCreatePost } from '../../redux/slices/createPostSlice';
// import { TextField, Button, CircularProgress, Input } from '@mui/material';
// import { AppDispatch, RootState } from '@/app/redux/store';
// import axios from 'axios';

// const cloudinary_url = 'https://api.cloudinary.com/v1_1/dnwpj75xg/image/upload';
// const cloudinary_code = 'rsulligy';

// const CreatePostForm = () => {
//     const dispatch: AppDispatch = useDispatch();
//     const { loading, success, error } = useSelector((state: RootState) => state.createPost);

//     const [formData, setFormData] = useState({
//         title: '',
//         user: '',
//         description: '',
//         image: null as File | null, // Estado para el archivo de imagen
//     });
//     const [imageUrl, setImageUrl] = useState<string | null>(null); // Estado para almacenar la URL de la imagen
//     const [uploading, setUploading] = useState(false); // Estado para manejar la carga de la imagen

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files.length > 0) {
//             setFormData({
//                 ...formData,
//                 image: e.target.files[0], // Guardar el archivo de imagen
//             });
//         }
//     };

//     const uploadImageToCloudinary = async (image: File) => {
//         const formData = new FormData();
//         formData.append('file', image);
//         formData.append('upload_preset', cloudinary_code);

//         try {
//             setUploading(true);
//             const res = await axios.post(cloudinary_url, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             setImageUrl(res.data.secure_url); // Guardar la URL de la imagen en el estado
//             setUploading(false);
//         } catch (error) {
//             console.error('Error al subir la imagen:', error);
//             setUploading(false);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (formData.image) {
//             // Subir la imagen primero si hay un archivo seleccionado
//             await uploadImageToCloudinary(formData.image);
//         }

//         // Crear el post después de que la imagen haya sido subida
//         const postData = {
//             ...formData,
//             imageUrl, // Incluir la URL de la imagen en el post
//         };
//         dispatch(createPost(postData));
//     };

//     useEffect(() => {
//         if (success) {
//             alert('Post creado exitosamente!');
//             setFormData({
//                 title: '',
//                 user: '',
//                 description: '',
//                 image: null,
//             });
//             setImageUrl(null);
//             dispatch(resetCreatePost());
//         }
//     }, [success, dispatch]);

//     return (
//         <form onSubmit={handleSubmit}>
//             <TextField
//                 label="Title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//             />
//             <TextField
//                 label="User"
//                 name="user"
//                 value={formData.user}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//             />
//             <TextField
//                 label="Description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//                 multiline
//                 rows={4}
//             />

//             {/* Input para cargar imagen */}
//             <Input
//                 type="file"
//                 onChange={handleFileChange}
//                 fullWidth
//             />

//             {/* Mostrar progreso de carga de la imagen */}
//             {uploading && <p>Subiendo imagen...</p>}

//             {/* Mostrar error si hay */}
//             {error && <p style={{ color: 'red' }}>{error}</p>}

//             <Button type="submit" variant="contained" color="primary" disabled={loading || uploading}>
//                 {loading ? <CircularProgress size={24} /> : 'Create Post'}
//             </Button>
//         </form>
//     );
// };

// export default CreatePostForm;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, resetCreatePost } from '../../redux/slices/createPostSlice';
import { TextField, Button, CircularProgress, Input } from '@mui/material';
import { AppDispatch, RootState } from '@/app/redux/store';
import axios from 'axios';

const cloudinary_url = 'https://api.cloudinary.com/v1_1/dnwpj75xg/image/upload';
const cloudinary_code = 'rsulligy';

const CreatePostForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loading, success, error } = useSelector((state: RootState) => state.createPost);

    const [formData, setFormData] = useState({
        title: '',
        user: '',
        description: '',
        image: null as File | null, // Archivo de la imagen
    });
    const [uploading, setUploading] = useState(false); // Estado de carga
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({
                ...formData,
                image: e.target.files[0],
            });
        }
    };

    const uploadImageToCloudinary = async (image: File) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', cloudinary_code);

        try {
            setUploading(true);
            const res = await axios.post(cloudinary_url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setImageUrl(res.data.secure_url);
            setUploading(false);
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (formData.image) {
            await uploadImageToCloudinary(formData.image);
        }
    
        if (imageUrl || !formData.image) {
            const postData = {
                title: formData.title,
                user: formData.user,
                description: formData.description,
                imageUrl: imageUrl || '',
            };
    
            dispatch(createPost(postData));
        }
    };
    

    useEffect(() => {
        if (success) {
            alert('Post creado exitosamente!');
            setFormData({
                title: '',
                user: '',
                description: '',
                image: null,
            });
            setImageUrl(null);
            dispatch(resetCreatePost());
        }
    }, [success, dispatch]);

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="User"
                name="user"
                value={formData.user}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />

            {/* Input para seleccionar la imagen */}
            <Input
                type="file"
                onChange={handleFileChange}
                fullWidth
            />

            {/* Mostrar indicador de carga de la imagen */}
            {uploading && <p>Subiendo imagen...</p>}

            {/* Mostrar error si hay */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Button type="submit" variant="contained" color="primary" disabled={loading || uploading}>
                {loading ? <CircularProgress size={24} /> : 'Create Post'}
            </Button>
        </form>
    );
};

export default CreatePostForm;
