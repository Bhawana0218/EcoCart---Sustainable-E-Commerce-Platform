

import React from "react";
import { Tag, Layers, Box, Star, Edit2 } from "lucide-react";
export default function ProductTable({ products = [], search = "", onEdit, onDelete }) {

  const onDragEnd = (result) => {
  if (!result.destination) return; 
  const items = Array.from(products); 
  const [reorderedItem] = items.splice(result.source.index, 1); 
  items.splice(result.destination.index, 0, reorderedItem);
  setProducts(items); 
  
  }
  const filteredProducts = products.filter((p) =>
  p.aiClassification?.primary_category
    ?.toLowerCase()
    .includes(search.toLowerCase())
);
  return (
    <div className="overflow-x-auto shadow-2xl rounded-xl bg-gray-900 p-4">
      <table className="min-w-full border border-gray-700 table-auto rounded">
        {/* Table Head */}

         <thead className="bg-gray-800 text-gray-200 text-left font-bold uppercase">
           <tr>
             <th className="p-4 border-b border-gray-700">
           <div className="flex items-center gap-2">
                <Box size={16} className="text-blue-400" /> Name
               </div>
            </th>
             <th className="p-4 border-b border-gray-700">
               <div className="flex items-center gap-2">
                <Tag size={16} className="text-green-400" /> Primary Category
               </div>
             </th>
             <th className="p-4 border-b border-gray-700">
               <div className="flex items-center gap-2">
                 <Layers size={16} className="text-yellow-400" /> Sub Category
               </div>
             </th>
             <th className="p-4 border-b border-gray-700">
               <div className="flex items-center gap-2">
                 <Star size={16} className="text-pink-400" /> Sustainability Filters
               </div>
             </th>
             <th className="p-4 border-b border-gray-700">
               <div className="flex items-center gap-2">
                 <Edit2 size={16} className="text-pink-400" /> Actions
               </div>
             </th>
          </tr>
         </thead>

        {/* Table Body */}
        {/* <DragDropContext onDragEnd={onDragEnd}> */}
  {/* <Droppable droppableId="productsTable"> */}
        <tbody>
          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-gray-400 p-4">
                No products found.
              </td>
            </tr>
          )}
          {filteredProducts.map((p) => (
            <tr
              key={p._id}
              className="transition-all duration-300 hover:bg-gray-800 cursor-pointer"
            >
              <td className="p-4 border-b border-gray-700 text-gray-100">{p.name}</td>
              <td className="p-4 border-b border-gray-700 text-gray-200">{p.aiClassification.primary_category}</td>
              <td className="p-4 border-b border-gray-700 text-gray-200">{p.aiClassification.sub_category}</td>
              <td className="p-4 border-b border-gray-700 text-gray-200">

    {p.aiClassification?.sustainability_filters?.length ? (
  <div className="flex flex-wrap gap-1">
    {p.aiClassification.sustainability_filters.map((filter, i) => (
      <span
        key={i}
        className="text-sm bg-green-800 text-green-100 px-2 py-1 rounded-full"
      >
        {filter}
      </span>
    ))}
  </div>
) : (
  <span className="text-gray-400">None</span>
)}

                </td>
              <td className="p-4 border-b border-gray-700 flex gap-2">
                <button
                  onClick={() => onEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {/* </Droppable> */}
{/* </DragDropContext> */}
      </table>
    </div>
  );
}