import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TaskTable from "../Task/TaskTable";

export default function show({ project, auth, queryParams, tasks }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {`Project : ${project.name}`}
        </h2>
      }
    >
      <Head title={`Project : ${project.name}`} />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white border-none shadow-lg rounded-xl dark:bg-gray-800">
            <div className="relative">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
              <img
                src={project.image_path || "/placeholder.svg"}
                alt={project.name}
                className="w-full h-[300px] object-cover transition-all duration-500 hover:scale-105"
              />
              <div className="absolute z-20 top-4 right-4">
                <span
                  className={
                    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium " +
                    PROJECT_STATUS_CLASS_MAP[project.status]
                  }
                >
                  {PROJECT_STATUS_TEXT_MAP[project.status]}
                </span>
              </div>
            </div>

            <div className="relative z-20 p-6 mx-4 -mt-16 bg-white shadow-sm dark:bg-gray-700 rounded-t-xl">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {project.name}
              </h1>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>
                    Crreated at:{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {project.created_at}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>
                    Created by:{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {project.createdBy.name}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="4"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                  <span>
                    Due:{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {project.due_date}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>
                    Updated by:{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {project.updatedBy.name}
                    </span>
                  </span>
                </div>
              </div>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white border-none shadow-lg rounded-xl dark:bg-gray-800">
            <TaskTable tasks={tasks} queryParams={queryParams} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
