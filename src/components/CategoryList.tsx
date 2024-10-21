import React from 'react';
import { Category } from '../types';

interface CategoryListProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Categorías</h2>
      <ul className="space-y-2">
        <li>
          <button
            className={`w-full text-left p-2 rounded ${
              selectedCategory === null
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
            }`}
            onClick={() => onSelectCategory(null)}
          >
            Todas las categorías
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <button
              className={`w-full text-left p-2 rounded ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;