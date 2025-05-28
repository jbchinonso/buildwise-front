import React from "react";
import { ActiveSystemSettingsTabs } from "./ui";

const SettingsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <ActiveSystemSettingsTabs />
      {children}
    </>
  );
};

export default SettingsLayout;
