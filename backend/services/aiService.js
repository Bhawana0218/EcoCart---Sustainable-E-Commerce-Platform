

export const classifyProduct = async (productData) => {
  const prompt = `Mock AI prompt for product classification.`;

   let category = 'Home Essentials';
   let subCategory = "Eco Products";

   if (
     productData.name.toLowerCase().includes("box") ||
     (productData.description && productData.description.toLowerCase().includes("food"))
   ) {
     category = "Food Packaging";
     subCategory = "Reusable Containers";
   }

   if (productData.material && productData.material.toLowerCase().includes("bamboo")) {
     category = "Food Packaging";
     subCategory = "Eco Containers";
   }

   const output = {
     primary_category: category,
     sub_category: subCategory,
     seo_tags: [
       "eco friendly product",
       "sustainable product",
       "green alternative",
       "eco marketplace",
       "environment friendly",
     ],
     sustainability_filters: ["plastic-free", "reusable", "biodegradable"],
   };

   return {
    prompt,
    output: JSON.stringify(output)
   
   };
};
