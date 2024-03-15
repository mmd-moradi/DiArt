import AccountBannerProfile from "@/components/Account/AccountBannerProfile/AccountBannerProfile"
import AccountProfile from "@/components/Account/AccountProfile/AccountProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getDArtsData, getUserData } from "@/app/api/_actions";
import AccountDArts from "@/components/Account/AccountDArts/AccountDArts";
import EmptyDiArt from "@/components/Account/EmptyDiArt/EmptyDiArt";
const AccountPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/")
    return
  }
  const userData = await getUserData(session);
  const createdDArts = await getDArtsData(userData?.createdArts)
  const purchasedDArts = await getDArtsData(userData?.purchasedArts)


  const getJoinedMonthAndYear = (date: Date | string | undefined) => {
    if (date) {
      const dateObj = new Date(date);
      const options: any = { year: "numeric", month: "long" };
      return dateObj.toLocaleString("en-US", options);
    }
    return "";
  };
  return (
    <div className="w-full flex flex-col items-start">
      <div className="w-full flex flex-col items-start">
        <div className="flex flex-col h-64 overflow-hidden w-full relative inset-0 md:h-[350px]">
          <AccountBannerProfile session={session} bannerUrl={userData?.bannerImage} />
        </div>
        <div className="flex flex-col items-start px-8 w-full md:px-16">
          <div className="flex justify-start items-center">
            <div className="-mt-14 mb-4 md:-mt-36 md:mb-6">
              <div className="relative z-10 w-24 h-24 overflow-hidden rounded-full border-4 border-gray-800 md:w-44 md:h-44 md:border-[6px]">
                <AccountProfile session={session} profileImgUrl={userData?.profileImage}  />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 w-full pb-8">
            <div className="flex flex-col items-start justify-center">
              <span className="text-2xl font-semibold leading-5 md:text-3xl">{userData?.userName}</span>
            </div>
            <div className="flex justify-start items-center gap-4">
              <span className="text-sm font-normal leading-5 md:text-base">{userData?.email}</span>
              <span className="text-sm font-normal leading-6 md:text-base">Joined {getJoinedMonthAndYear(userData?.createdAt!)}</span>
            </div>
          </div>
          <div className="flex flex-col items-start w-full border-t border-gray-800 py-8">
            <div className="flex justify-start">
              <span className="text-xl font-semibold leading-6">{userData?.createdArts?.length} created Arts</span>
            </div>
            {createdDArts ? (
              <div className="flex w-full justify-start items-center gap-2 mt-8 flex-wrap md:gap-8">
                {createdDArts.map((dArt, index) => (
                  <AccountDArts key={index} dArt={dArt} />
                ))}
              </div>
            ): (
              <EmptyDiArt />
            )}
          </div>
          <div className="flex flex-col items-start w-full border-t border-gray-800 py-8">
            <div className="flex justify-start">
              <span className="text-xl font-semibold leading-6">{userData?.purchasedArts?.length} purchased Arts</span>
            </div>
            {purchasedDArts && (
              <div className="flex w-full justify-start items-center gap-2 mt-8 flex-wrap md:gap-8 md:flex-nowrap">
                {purchasedDArts.map((dArt, index) => (
                  <AccountDArts key={index} dArt={dArt} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage