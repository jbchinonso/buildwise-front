import { permanentRedirect } from "next/navigation";

const SystemSettings = () => {
  permanentRedirect("/admin/settings/user-management");
};

export default SystemSettings;
