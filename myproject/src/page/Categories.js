// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const API_URL = "http://127.0.0.1:8000/api/categories/";

//   // Fetch all categories
//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   // Add category to selected list
//   const handleAddToSelected = (category) => {
//     const existingCategory = selectedCategories.find((item) => item.id === category.id);
//     if (existingCategory) {
//       setSelectedCategories(
//         selectedCategories.map((item) =>
//           item.id === category.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setSelectedCategories([...selectedCategories, { ...category, quantity: 1 }]);
//     }
//   };

//   // Handle selected categories submission
//   const handleSubmitCategories = async () => {
//     const selectedData = selectedCategories.map((item) => ({
//       category: item.id,
//       quantity: item.quantity,
//     }));

//     try {
//       await axios.post("http://127.0.0.1:8000/api/submit-categories/", { categories: selectedData });
//       alert("Categories submitted successfully!");
//       setSelectedCategories([]);
//     } catch (error) {
//       console.error("Error submitting categories:", error);
//       alert("Error submitting categories. Please try again.");
//     }
//   };

//   // Fetch categories on component mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Category Management</h2>
//       <div className="row">
//         {/* Left Column: Category List */}
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h5 className="card-title text-center">Category List</h5>
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Description</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {categories.map((category) => (
//                     <tr key={category.id}>
//                       <td>{category.id}</td>
//                       <td>{category.name}</td>
//                       <td>{category.description || "N/A"}</td>
//                       <td>
//                         <button
//                           className="btn btn-sm btn-success"
//                           onClick={() => handleAddToSelected(category)}
//                         >
//                           Add
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {categories.length === 0 && (
//                 <p className="text-center">No categories available.</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Selected Categories */}
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h5 className="card-title text-center">Selected Categories</h5>
//               <ul className="list-group">
//                 {selectedCategories.map((item) => (
//                   <li
//                     className="list-group-item d-flex justify-content-between align-items-center"
//                     key={item.id}
//                   >
//                     {item.name} (x{item.quantity})
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() =>
//                         setSelectedCategories(
//                           selectedCategories.filter((cat) => cat.id !== item.id)
//                         )
//                       }
//                     >
//                       Remove
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//               {selectedCategories.length > 0 && (
//                 <button
//                   className="btn btn-primary mt-3"
//                   onClick={handleSubmitCategories}
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Category;
