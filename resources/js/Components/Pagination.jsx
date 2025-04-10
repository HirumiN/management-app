import { Link } from "@inertiajs/react";

export default function Pagination({links}){
  return (
    <nav className="flex items-center justify-center gap-1 px-4 py-3 sm:px-6" aria-label="Pagination">
      {links.map((link) => (
        <Link
        preserveScroll
          key={link.label}
          href={link.url || '#'}
          className={`
            inline-flex items-center px-3 py-2 text-sm font-medium rounded-md
            ${link.active
              ? 'bg-blue-600 text-white'
              : link.url
                ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }
          `}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </nav>
  );
}