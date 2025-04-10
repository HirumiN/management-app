import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";

export default function Index({ auth, projects }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:text-gray-300 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Create Date</th>
                    <th className="px-6 py-4">Due Date</th>
                    <th className="px-6 py-4">Created By</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {projects.data.map((project) => (
                    <tr
                      key={project.id}
                      className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                        {project.id}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={project.image_path}
                          alt={project.name}
                          className="object-cover w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                        {project.name}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={"px-3 py-1 rounded-full text-xs font-medium " + PROJECT_STATUS_CLASS_MAP[project.status]}
                        >
                          {PROJECT_STATUS_TEXT_MAP[project.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {project.created_at}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {project.due_date}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {project.createdBy.name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Link
                            href={route("project.edit", project.id)}
                            className="text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <Pencil size={18} />
                          </Link>
                          <Link
                            href={route("project.destroy", project.id)}
                            className="text-gray-600 transition-colors dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          >
                            <Trash2 size={18} />
                          </Link>
                          <Link className="text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                            <MoreHorizontal size={18} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={projects.meta.links}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
