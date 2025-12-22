import { NotificationForm } from "./ui";

const UserManagement = () => {
  return (
    <section className="flex flex-col flex-1 w-full">
      <div className="flex p-4 border rounded-2xl bg-white flex-[25%] max-h-fit max-w-fit">
        <p>Agent role management</p>
      </div>

      <NotificationForm />
    </section>
  );
};

export default UserManagement;
