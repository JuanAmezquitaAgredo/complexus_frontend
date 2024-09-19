// app/api/login/route.ts
import { NextResponse } from 'next/server';

// Datos de usuarios actualizados
const users = [
  {
    id: "d8e3",
    name: "Juan",
    email: "jagredo03@gmail.com",
    password: "abc.123",
    phone: "1376980852",
    tower: "123",
    apto: "3",
    rol_id: "1",
    residential_id: "3eg32",
    lastName: "Amezquita"
  },
  // Puedes añadir más usuarios aquí si es necesario
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Buscar usuario
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: 'dummyToken123', // Puedes generar un token real aquí si es necesario
        phone: user.phone,
        tower: user.tower,
        apto: user.apto,
        role: user.rol_id,
        residential_id: user.residential_id,
        lastName: user.lastName
      });
    } else {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
