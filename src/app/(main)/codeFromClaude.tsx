// // 1. First, install dependencies
// // npm install firebase uuid

// // 2. Firebase config (lib/firebase.js)
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   // Your Firebase config object
//   apiKey: 'your-api-key',
//   authDomain: 'your-project.firebaseapp.com',
//   projectId: 'your-project-id',
//   storageBucket: 'your-project-id.appspot.com',
//   messagingSenderId: '123456789',
//   appId: 'your-app-id',
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// export const auth = getAuth(app);

// // 3. Firebase utilities (lib/firebaseUtils.js)
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
//   orderBy,
//   query,
// } from 'firebase/firestore';
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   deleteObject,
// } from 'firebase/storage';
// import { v4 as uuidv4 } from 'uuid';
// import { db, storage } from './firebase';

// // Upload multiple images
// export const uploadImages = async (files) => {
//   const uploadPromises = files.map(async (file) => {
//     const imageRef = ref(storage, `portfolio/${uuidv4()}-${file.name}`);
//     const snapshot = await uploadBytes(imageRef, file);
//     return getDownloadURL(snapshot.ref);
//   });

//   return Promise.all(uploadPromises);
// };

// // Add new project
// export const addProject = async (projectData, imageFiles) => {
//   try {
//     const imageUrls = await uploadImages(imageFiles);

//     const docRef = await addDoc(collection(db, 'projects'), {
//       ...projectData,
//       images: imageUrls,
//       createdAt: new Date(),
//     });

//     return docRef.id;
//   } catch (error) {
//     console.error('Error adding project:', error);
//     throw error;
//   }
// };

// // Get all projects
// export const getProjects = async () => {
//   try {
//     const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
//     const querySnapshot = await getDocs(q);

//     return querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   } catch (error) {
//     console.error('Error getting projects:', error);
//     return [];
//   }
// };

// // Delete project
// export const deleteProject = async (projectId, imageUrls) => {
//   try {
//     // Delete images from storage
//     await Promise.all(
//       imageUrls.map((url) => {
//         const imageRef = ref(storage, url);
//         return deleteObject(imageRef);
//       })
//     );

//     // Delete document
//     await deleteDoc(doc(db, 'projects', projectId));
//   } catch (error) {
//     console.error('Error deleting project:', error);
//     throw error;
//   }
// };

// // 4. Simple Auth Hook (hooks/useAuth.js)
// import { useState, useEffect } from 'react';
// import {
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from 'firebase/auth';
// import { auth } from '../lib/firebase';

// export const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const login = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = () => {
//     return signOut(auth);
//   };

//   return { user, loading, login, logout };
// };

// // 5. Admin Login Page (pages/admin/login.js)
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '../../hooks/useAuth';

// export default function AdminLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       router.push('/admin');
//     } catch (error) {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8">
//         <form
//           className="mt-8 space-y-6"
//           onSubmit={handleSubmit}
//         >
//           <h2 className="text-center text-3xl font-bold">Admin Login</h2>
//           {error && <p className="text-red-500 text-center">{error}</p>}

//           <div>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // 6. Admin Dashboard (pages/admin/index.js)
// import { useState, useEffect } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import { getProjects, deleteProject } from '../../lib/firebaseUtils';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function AdminDashboard() {
//   const { user, loading, logout } = useAuth();
//   const [projects, setProjects] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/admin/login');
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       const projectList = await getProjects();
//       setProjects(projectList);
//     };

//     if (user) {
//       fetchProjects();
//     }
//   }, [user]);

//   const handleDelete = async (project) => {
//     if (confirm('Are you sure you want to delete this project?')) {
//       try {
//         await deleteProject(project.id, project.images);
//         setProjects(projects.filter((p) => p.id !== project.id));
//       } catch (error) {
//         alert('Error deleting project');
//       }
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Portfolio Admin</h1>
//           <div className="space-x-4">
//             <Link href="/admin/add-project">
//               <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//                 Add New Project
//               </button>
//             </Link>
//             <button
//               onClick={logout}
//               className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project) => (
//             <div
//               key={project.id}
//               className="bg-white rounded-lg shadow-md p-6"
//             >
//               {project.images && project.images[0] && (
//                 <div className="relative h-48 mb-4">
//                   <Image
//                     src={project.images[0]}
//                     alt={project.title}
//                     fill
//                     className="object-cover rounded-md"
//                   />
//                 </div>
//               )}
//               <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
//               <p className="text-gray-600 mb-4 line-clamp-3">
//                 {project.description}
//               </p>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleDelete(project)}
//                   className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // 7. Add Project Form (pages/admin/add-project.js)
// import { useState } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import { addProject } from '../../lib/firebaseUtils';
// import { useRouter } from 'next/router';

// export default function AddProject() {
//   const { user, loading } = useAuth();
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState([]);
//   const [submitting, setSubmitting] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/admin/login');
//     }
//   }, [user, loading, router]);

//   const handleImageChange = (e) => {
//     setImages(Array.from(e.target.files));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !description || images.length === 0) {
//       alert('Please fill all fields and select at least one image');
//       return;
//     }

//     setSubmitting(true);
//     try {
//       await addProject({ title, description }, images);
//       router.push('/admin');
//     } catch (error) {
//       alert('Error adding project');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8">Add New Project</h1>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-lg shadow-md p-6"
//         >
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Project Title
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={4}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Images
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             {images.length > 0 && (
//               <p className="text-sm text-gray-600 mt-2">
//                 {images.length} image(s) selected
//               </p>
//             )}
//           </div>

//           <div className="flex space-x-4">
//             <button
//               type="submit"
//               disabled={submitting}
//               className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
//             >
//               {submitting ? 'Adding...' : 'Add Project'}
//             </button>
//             <button
//               type="button"
//               onClick={() => router.push('/admin')}
//               className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// // 8. Public Portfolio Display (pages/index.js)
// import { useEffect, useState } from 'react';
// import { getProjects } from '../lib/firebaseUtils';
// import Image from 'next/image';

// export default function Portfolio() {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const projectList = await getProjects();
//         setProjects(projectList);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div>Loading portfolio...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <header className="bg-gray-50 py-16">
//         <div className="max-w-6xl mx-auto px-4 text-center">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Designer Portfolio
//           </h1>
//           <p className="text-xl text-gray-600">
//             A collection of creative works
//           </p>
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto px-4 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projects.map((project) => (
//             <div
//               key={project.id}
//               className="group"
//             >
//               {project.images && project.images[0] && (
//                 <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
//                   <Image
//                     src={project.images[0]}
//                     alt={project.title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//               )}
//               <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
//               <p className="text-gray-600">{project.description}</p>
//             </div>
//           ))}
//         </div>

//         {projects.length === 0 && (
//           <div className="text-center py-16">
//             <p className="text-gray-500">No projects available yet.</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
