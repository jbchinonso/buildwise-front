import { getBankDetails } from "@/lib/services/bank.service";
import { BankModal, ChangePasswordModal, InviteLink } from "../ui";
import { Button } from "@/components/ui";
import { NotificationSettings } from "@/components/dashboard";

const Settings = async () => {
  const { data: bank = [] } = await getBankDetails();
  return (
    <>
      <div className="w-full flex supports-[grid]:grid md:grid-cols-2 flex-wrap justify-between gap-4 gap-x-20">
        <ChangePasswordModal />
        <BankModal bank={bank || []} />
        <InviteLink />
        <NotificationSettings />
      </div>
      <div className="w-full flex my-10 gap-4 items-center">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          // onClick={() => setIsEditing(false)}
        >
          Deactivate Account
        </Button>

        <form action="">
          <Button type="submit" size="sm">
            Sign out
          </Button>
        </form>
      </div>
    </>
  );
};

export default Settings;
