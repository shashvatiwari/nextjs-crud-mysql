import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react"; 
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid"; 
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline"; 

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
        } else {
          const response = await fetch("/api/auth/check-auth", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();

          if (!response.ok) {
            router.push("/login");
          } else {
            setUser(data.user);
            setisAdmin(data.user.isAdmin);
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();

        if (response.ok) {
          setItems(data.items);
        } else {
          console.error("Failed to fetch items:", data.error);
        }
      } catch (error) {
        console.error("An error occurred while fetching items:", error);
      }
    };

    checkAuthentication();
    fetchItems();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setItems(items.filter((item) => item.id !== id));
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("An error occurred while deleting the item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav style={{ backgroundColor: '#4379F2' }} className="shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {user && (
                <span className="text-white font-semibold text-lg">
                  Hello! {user.name}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4">
            {isAdmin ? (
              <Link
                href="/addProduct"
                className="text-white hover:bg-blue-700 bg-blue-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Add Product
              </Link>
            ) : null}

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-person-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                    {/* <ChevronDownIcon className="w-5 h-5 ml-1" /> */}
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/profile" className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          } block px-4 py-2 text-sm`}>
                              View Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                            } block w-full text-left px-4 py-2 text-sm`}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Products</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="mt-2 text-gray-600">Quantity: {item.quantity}</p>
                  {isAdmin && (
                    <div className="mt-4 flex justify-end space-x-4">
                      <Link
                        href={`/editProduct/${item.id}`}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                      >
                        <PencilAltIcon className="h-6 w-6" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
