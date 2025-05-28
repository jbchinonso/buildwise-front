import { redirect } from "next/navigation";

const SystemSettings = () => {
  return redirect("/admin/settings/user-management");
};

export default SystemSettings;
