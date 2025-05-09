import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import SortableHeader from "@/Components/SortableHeader";
import SuccessAlert from "@/Components/SuccesAlert";

export default function Index({ auth, projects, queryParams = null, success }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      // Jika ada nilai (value) yang dimasukkan, tambahkan ke queryParams
      queryParams[name] = value;
    } else {
      // Jika tidak ada nilai (misalnya input dikosongkan), hapus key dari queryParams
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    // Jika tombol yang ditekan adalah 'Enter', maka lakukan pencarian
    if (e.key === "Enter") {
      // Update queryParams dengan nilai input jika tombol 'Enter' ditekan
      searchFieldChanged(name, e.target.value);
    }
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_order === "asc") {
        queryParams.sort_order = "desc";
      } else {
        queryParams.sort_order = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_order = "asc";
    }
    router.get(route("project.index"), queryParams);
  };

  const deleteProject = (e, project) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this project?")) {
      router.delete(route("project.destroy", project.id), {
        preserveScroll: true,
        onSuccess: () => {
          // Tidak perlu router.get() lagi
        },
      });
    }
  };



  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Projects
          </h2>
          <Link
            href={route("project.create")}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all shadow-sm bg-emerald-500 rounded-xl hover:bg-emerald-600 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add New
          </Link>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <SuccessAlert success={success} />

          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto ">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:text-gray-300 dark:bg-gray-700">
                    <tr>
                      <SortableHeader
                        label="ID"
                        sortKey="id"
                        currentSortField={queryParams.sort_field}
                        currentSortOrder={queryParams.sort_order}
                        onSort={sortChanged}
                      />
                      <th className="px-6 py-2">Image</th>

                      <SortableHeader
                        label="Name"
                        sortKey="name"
                        currentSortField={queryParams.sort_field}
                        currentSortOrder={queryParams.sort_order}
                        onSort={sortChanged}
                      />

                      <SortableHeader
                        label="Status"
                        sortKey="status"
                        currentSortField={queryParams.sort_field}
                        currentSortOrder={queryParams.sort_order}
                        onSort={sortChanged}
                        extraClasses="min-w-40"
                      />

                      <SortableHeader
                        label="Create Date"
                        sortKey="created_at"
                        currentSortField={queryParams.sort_field}
                        currentSortOrder={queryParams.sort_order}
                        onSort={sortChanged}
                      />

                      <SortableHeader
                        label="Due Date"
                        sortKey="due_date"
                        currentSortField={queryParams.sort_field}
                        currentSortOrder={queryParams.sort_order}
                        onSort={sortChanged}
                      />

                      <th className="px-6 py-2">Created By</th>
                      <th className="px-6 py-2">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:text-gray-300 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-2"></th>
                      <th className="px-6 py-2"></th>
                      <th className="px-6 py-2">
                        <TextInput
                          className="w-full "
                          defaultValue={queryParams.name}
                          placeholder="Project Name"
                          onBlur={(e) =>
                            // Saat kehilangan fokus, kita kirim data ke fungsi `searchFieldChanged`
                            // untuk cari proyek berdasarkan nama yang sudah diketik
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) =>
                            // Saat tombol dipencet, kita kirim nama field 'name' dan event key-nya
                            onKeyPress("name", e)
                          }
                        />
                      </th>
                      <th className="px-6 py-2">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className="px-6 py-2"></th>
                      <th className="px-6 py-2"></th>
                      <th className="px-6 py-2"></th>
                      <th className="px-6 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {projects.data.map((project) => (
                      <tr
                        key={project.id}
                        className="h-10 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="px-6 py-2 font-medium text-gray-900 dark:text-gray-100">
                          {project.id}
                        </td>
                        <td className="px-6 py-2">
                          <img
                            src={project.image_path}
                            alt={project.name}
                            className="object-cover w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                          />
                        </td>
                        <td className="px-6 py-2 font-medium text-gray-900 dark:text-gray-100 hover:underline">
                          <Link href={route("project.show", project.id)}>
                            {project.name}
                          </Link>
                        </td>
                        <td className="px-6 py-2">
                          <span
                            className={
                              "px-3 py-1 rounded-full text-xs font-medium " +
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            }
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td className="px-6 py-2 text-gray-600 dark:text-gray-400">
                          {project.created_at}
                        </td>
                        <td className="px-6 py-2 text-gray-600 dark:text-gray-400">
                          {project.due_date}
                        </td>
                        <td className="px-6 py-2 text-gray-600 dark:text-gray-400">
                          {project.createdBy.name}
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex items-center gap-3">
                            <Link
                              href={route("project.edit", project.id)}
                              className="text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              <Pencil size={18} />
                            </Link>
                            <button onClick={(e) => deleteProject(e, project)}
                              className="text-gray-600 transition-colors dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                            >
                              <Trash2 size={18} />
                            </button>
                            <Link className="text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                              <MoreHorizontal size={18} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
