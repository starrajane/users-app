import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

//User interface for type safety
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

//Get path to the users JSON file
const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

//Read users from JSON file
const readUsers = (): User[] => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

//Write users to JSON file
const writeUsers = (users: User[]) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users file:', error);
    throw new Error('Failed to save users');
  }
};

//GET: Fetch all users
export async function GET() {
  const users = readUsers();
  return NextResponse.json(users);
}

//POST: Add a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, username, email, address, phone, website, company } = body;

    //Basic validation
    if (!name || !username || !email || !address?.street || !address?.city || !address?.zipcode || !address?.geo?.lat || !address?.geo?.lng || !phone || !website || !company?.name || !company?.catchPhrase || !company?.bs) {
      return NextResponse.json({ error: 'All required fields must be provided' }, { status: 400 });
    }
    if (name.length < 2 || username.length < 2 || company.name.length < 2) {
      return NextResponse.json({ error: 'Name, username, and company name must be at least 2 characters' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(address.zipcode)) {
      return NextResponse.json({ error: 'Invalid zipcode format' }, { status: 400 });
    }
    if (isNaN(Number(address.geo.lat)) || isNaN(Number(address.geo.lng))) {
      return NextResponse.json({ error: 'Latitude and longitude must be valid numbers' }, { status: 400 });
    }
    if (phone.length < 10) {
      return NextResponse.json({ error: 'Phone must be at least 10 characters' }, { status: 400 });
    }
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(website)) {
      return NextResponse.json({ error: 'Invalid website URL' }, { status: 400 });
    }
    if (company.catchPhrase.length < 5 || company.bs.length < 5) {
      return NextResponse.json({ error: 'Catch phrase and BS must be at least 5 characters' }, { status: 400 });
    }

    const users = readUsers();
    const newUser: User = {
      id: users.length + 1,  //ID is the number of entries in the JSON file + 1
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      address: {
        street: address.street.trim(),
        suite: address.suite.trim(),
        city: address.city.trim(),
        zipcode: address.zipcode.trim(),
        geo: {
          lat: address.geo.lat.trim(),
          lng: address.geo.lng.trim(),
        },
      },
      phone: phone.trim(),
      website: website.trim(),
      company: {
        name: company.name.trim(),
        catchPhrase: company.catchPhrase.trim(),
        bs: company.bs.trim(),
      },
    };

    users.push(newUser);
    writeUsers(users);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}