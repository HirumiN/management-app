import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    image: "",
    name: "",
    description: "",
    due_date: "",
    status: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("project.store"), {
      data: {
        image: data.image,
        name: data.name,
        description: data.description,
        due_date: data.due_date,
        status: data.status,
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Create New Project
        </h2>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <form
              action=""
              className="p-6 space-y-6 bg-white shadow-md sm:p-10 dark:bg-gray-800 rounded-2xl"
              onSubmit={onSubmit}
            >
              <div>
                <InputLabel
                  htmlFor="project_image_path"
                  value="Project Image"
                />
                <TextInput
                  id="project_image_path"
                  name="image"
                  type="file"
                  className="block w-full mt-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-900 focus:border-emerald-500 focus:ring focus:ring-emerald-200 dark:focus:border-emerald-400"
                  onChange={(e) => setData("image", e.target.files[0])}

                />
                <InputError message={errors.image} className="mt-2 text-sm" />
              </div>

              <div>
                <InputLabel htmlFor="project_name" value="Project Name" />
                <TextInput
                  id="project_name"
                  name="name"
                  type="text"
                  className="block w-full mt-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-900 focus:border-emerald-500 focus:ring focus:ring-emerald-200 dark:focus:border-emerald-400"
                  value={data.name}
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                  required
                />
                <InputError message={errors.name} className="mt-2 text-sm" />
              </div>

              <div>
                <InputLabel
                  htmlFor="project_description"
                  value="Project Description"
                />
                <TextAreaInput
                  id="project_description"
                  name="description"
                  className="block w-full mt-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-900 focus:border-emerald-500 focus:ring focus:ring-emerald-200 dark:focus:border-emerald-400"
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError
                  message={errors.description}
                  className="mt-2 text-sm"
                />
              </div>

              <div>
                <InputLabel
                  htmlFor="project_due_date"
                  value="Project Due Date"
                />
                <TextInput
                  id="project_due_date"
                  name="due_date"
                  type="date"
                  value={data.due_date}
                  onChange={(e) => setData("due_date", e.target.value)}
                  className="block w-full py-2 pr-3 text-sm bg-white border border-gray-300 rounded-lg shadow-sm appearance-none dark:border-gray-700 dark:bg-gray-900 focus:border-emerald-500 focus:ring focus:ring-emerald-200 dark:focus:border-emerald-400"
                />

                <InputError
                  message={errors.due_date}
                  className="mt-2 text-sm"
                />
              </div>

              <div>
                <InputLabel htmlFor="project_status" value="Project Status" />
                <SelectInput
                  id="project_status"
                  name="status"
                  className="block w-full mt-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-900 focus:border-emerald-500 focus:ring focus:ring-emerald-200 dark:focus:border-emerald-400"
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2 text-sm" />
              </div>

              <div className="flex items-center justify-end pt-4 space-x-3">
                <Link
                  href={route("project.index")}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  disabled={processing}
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
