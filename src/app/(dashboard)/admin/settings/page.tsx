import { redirect } from "next/navigation";

const SystemSettings = () => {
  redirect("/admin/settings/user-management");
};

export default SystemSettings;
