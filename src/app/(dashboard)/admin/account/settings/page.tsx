import { getNotificationSettings } from "@/lib/services";
import { SettingsForm } from "./SettingsForm";

const Settings = async() => {
  // const res = await getNotificationSettings()
  return <SettingsForm />;
};

export default Settings;
