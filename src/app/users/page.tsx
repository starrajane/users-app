'use client';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

//Define the User type for TypeScript (full structure from JSONPlaceholder)
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

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  //Get users (reads data/users.json)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  //Validation function
  const validateForm = () => {
    const newErrors = {
      name: '',
      username: '',
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    };
    let isValid = true;

    //Name
    if (!newUser.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    } else if (newUser.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
      isValid = false;
    }

    //Username
    if (!newUser.username.trim()) {
      newErrors.username = 'Username is required.';
      isValid = false;
    } else if (newUser.username.trim().length < 2) {
      newErrors.username = 'Username must be at least 2 characters.';
      isValid = false;
    }

    //Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newUser.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!emailRegex.test(newUser.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    //Address Street
    if (!newUser.address.street.trim()) {
      newErrors.address.street = 'Street is required.';
      isValid = false;
    } else if (newUser.address.street.trim().length < 2) {
      newErrors.address.street = 'Street must be at least 2 characters.';
      isValid = false;
    }

    //Address City
    if (!newUser.address.city.trim()) {
      newErrors.address.city = 'City is required.';
      isValid = false;
    } else if (newUser.address.city.trim().length < 2) {
      newErrors.address.city = 'City must be at least 2 characters.';
      isValid = false;
    }

    //Address Zipcode
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!newUser.address.zipcode.trim()) {
      newErrors.address.zipcode = 'Zipcode is required.';
      isValid = false;
    } else if (!zipRegex.test(newUser.address.zipcode)) {
      newErrors.address.zipcode = 'Please enter a valid zipcode (e.g., 12345 or 12345-6789).';
      isValid = false;
    }

    //Address Latitude
    if (!newUser.address.geo.lat.trim()) {
      newErrors.address.geo.lat = 'Latitude is required.';
      isValid = false;
    } else if (isNaN(Number(newUser.address.geo.lat))) {
      newErrors.address.geo.lat = 'Latitude must be a valid number.';
      isValid = false;
    }

    //Address Longitude
    if (!newUser.address.geo.lng.trim()) {
      newErrors.address.geo.lng = 'Longitude is required.';
      isValid = false;
    } else if (isNaN(Number(newUser.address.geo.lng))) {
      newErrors.address.geo.lng = 'Longitude must be a valid number.';
      isValid = false;
    }

    //Phone
    if (!newUser.phone.trim()) {
      newErrors.phone = 'Phone is required.';
      isValid = false;
    } else if (newUser.phone.trim().length < 10) {
      newErrors.phone = 'Phone must be at least 10 characters.';
      isValid = false;
    }

    //Website
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!newUser.website.trim()) {
      newErrors.website = 'Website is required.';
      isValid = false;
    } else if (!urlRegex.test(newUser.website)) {
      newErrors.website = 'Please enter a valid website URL.';
      isValid = false;
    }

    //Company Name
    if (!newUser.company.name.trim()) {
      newErrors.company.name = 'Company name is required.';
      isValid = false;
    } else if (newUser.company.name.trim().length < 2) {
      newErrors.company.name = 'Company name must be at least 2 characters.';
      isValid = false;
    }

    //Company CatchPhrase
    if (!newUser.company.catchPhrase.trim()) {
      newErrors.company.catchPhrase = 'Catch phrase is required.';
      isValid = false;
    } else if (newUser.company.catchPhrase.trim().length < 5) {
      newErrors.company.catchPhrase = 'Catch phrase must be at least 5 characters.';
      isValid = false;
    }

    //Company BS
    if (!newUser.company.bs.trim()) {
      newErrors.company.bs = 'BS is required.';
      isValid = false;
    } else if (newUser.company.bs.trim().length < 5) {
      newErrors.company.bs = 'BS must be at least 5 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  //Handle form submission (writes to data/users.json)
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUser.name.trim(),
          username: newUser.username.trim(),
          email: newUser.email.trim(),
          address: {
            street: newUser.address.street.trim(),
            suite: newUser.address.suite.trim(),
            city: newUser.address.city.trim(),
            zipcode: newUser.address.zipcode.trim(),
            geo: {
              lat: newUser.address.geo.lat.trim(),
              lng: newUser.address.geo.lng.trim(),
            },
          },
          phone: newUser.phone.trim(),
          website: newUser.website.trim(),
          company: {
            name: newUser.company.name.trim(),
            catchPhrase: newUser.company.catchPhrase.trim(),
            bs: newUser.company.bs.trim(),
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }

      const newUserData = await response.json();
      setUsers((prev) => [...prev, newUserData]); //Update UI with new user

      //Reset form and close modal
      setNewUser({
        name: '',
        username: '',
        email: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: '',
          },
        },
        phone: '',
        website: '',
        company: {
          name: '',
          catchPhrase: '',
          bs: '',
        },
      });
      setErrors({
        name: '',
        username: '',
        email: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: '',
          },
        },
        phone: '',
        website: '',
        company: {
          name: '',
          catchPhrase: '',
          bs: '',
        },
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container mx-auto p-4">Loading users...</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Header row */}
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Users List</h1>
            <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
            + Create User
            </button>
        </div>

      {/* Users List as Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">{user.name}</CardTitle>
              <CardDescription>{user.company.name}</CardDescription>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Modal for Create User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto">
           
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
              aria-label="Close">
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Create User</h2>
            <form onSubmit={handleCreateUser}>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name <span className="italic">(First Name, Last Name)</span></label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Username */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className={`w-full px-3 py-2 border rounded ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Address Fields */}
              <fieldset className="mb-4">
                <legend className="text-sm font-medium mb-2">Address</legend>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Street</label>
                  <input
                    type="text"
                    value={newUser.address.street}
                    onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, street: e.target.value } })}
                    className={`w-full px-3 py-2 border rounded ${errors.address.street ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address.street && <p className="text-red-500 text-sm mt-1">{errors.address.street}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Suite</label>
                  <input
                    type="text"
                    value={newUser.address.suite}
                    onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, suite: e.target.value } })}
                    className="w-full px-3 py-2 border rounded border-gray-300"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">City</label>
                  <input
                    type="text"
                    value={newUser.address.city}
                    onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, city: e.target.value } })}
                    className={`w-full px-3 py-2 border rounded ${errors.address.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address.city && <p className="text-red-500 text-sm mt-1">{errors.address.city}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Zipcode</label>
                  <input
                    type="text"
                    value={newUser.address.zipcode}
                    onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, zipcode: e.target.value } })}
                    className={`w-full px-3 py-2 border rounded ${errors.address.zipcode ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address.zipcode && <p className="text-red-500 text-sm mt-1">{errors.address.zipcode}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Latitude</label>
                  <input
                    type="text"
                    value={newUser.address.geo.lat}
                    onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, geo: { ...newUser.address.geo, lat: e.target.value } } })}
                    className={`w-full px-3 py-2 border rounded ${errors.address.geo.lat ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address.geo.lat && <p className="text-red-500 text-sm mt-1">{errors.address.geo.lat}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Longitude</label>
                  <input
                    type="text"
                    value={newUser.address.geo.lng}
                    onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, geo: { ...newUser.address.geo, lng: e.target.value } } })}
                    className={`w-full px-3 py-2 border rounded ${errors.address.geo.lng ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address.geo.lng && <p className="text-red-500 text-sm mt-1">{errors.address.geo.lng}</p>}
                </div>
              </fieldset>

               {/* Phone */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className={`w-full px-3 py-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Website */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Website</label>
                <input
                  type="text"
                  value={newUser.website}
                  onChange={(e) => setNewUser({ ...newUser, website: e.target.value })}
                  className={`w-full px-3 py-2 border rounded ${errors.website ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
              </div>

              {/* Company Fields */}
              <fieldset className="mb-4">
                <legend className="text-sm font-medium mb-2">Company</legend>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Name</label>
                  <input
                    type="text"
                    value={newUser.company.name}
                    onChange={(e) => setNewUser({ ...newUser, company: { ...newUser.company, name: e.target.value } })}
                    className={`w-full px-3 py-2 border rounded ${errors.company.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.company.name && <p className="text-red-500 text-sm mt-1">{errors.company.name}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">Catch Phrase</label>
                  <input
                    type="text"
                    value={newUser.company.catchPhrase}
                    onChange={(e) => setNewUser({ ...newUser, company: { ...newUser.company, catchPhrase: e.target.value } })}
                    className={`w-full px-3 py-2 border rounded ${errors.company.catchPhrase ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.company.catchPhrase && <p className="text-red-500 text-sm mt-1">{errors.company.catchPhrase}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">BS</label>
                  <input
                    type="text"
                    value={newUser.company.bs}
                    onChange={(e) => setNewUser({ ...newUser, company: { ...newUser.company, bs: e.target.value } })}
                    className={`w-full px-3 py-2 border rounded ${errors.company.bs ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.company.bs && <p className="text-red-500 text-sm mt-1">{errors.company.bs}</p>}
                </div>
              </fieldset>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setErrors({
                      name: '',
                      username: '',
                      email: '',
                      address: {
                        street: '',
                        suite: '',
                        city: '',
                        zipcode: '',
                        geo: {
                          lat: '',
                          lng: '',
                        },
                      },
                      phone: '',
                      website: '',
                      company: {
                        name: '',
                        catchPhrase: '',
                        bs: '',
                      },
                    });
                  }}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={submitting}
                >
                  {submitting ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}