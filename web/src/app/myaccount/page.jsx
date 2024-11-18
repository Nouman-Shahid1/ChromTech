import Profile from "../../components/Profile/Profile";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import Icon from "../../assets/images/Icon.png";
import City from "../../assets/images/city.png";
import Shop from "../../assets/images/shop.png";
import Services from "../../assets/images/services.png";
import Amenities from "../../assets/images/amenities.png";

export default function Dashboard() {
  return (
    <>
      <div className="bg-[#fafbff] h-screen overflow-auto sm:p-0 px-1 md:px-8 lg:px-6 xl:px-8 2xl:px-12 py-4 md:py-5 lg:py-7 xl:py-10 2xl:py-12">
        <div className="px-2">
          <Profile />
        </div>
        <div className="md:px-0 max-w-screen-2xl">
          <div className="flex flex-wrap gap-4 lg:gap-0 w-full  mt-8 px-6">
            <DashboardCard
              details={{
                name: "Orders",
                src: Icon,
                url:"/myaccount/",
              }}
            />
            <DashboardCard
              details={{
                name: "Company Orders",
                src: Amenities,
                
                url:"/myaccount/",
              }}
            />
            <div className="flex flex-wrap gap-4 lg:gap-0 w-full md:mt-8">
              <DashboardCard
                details={{
                  name: "Quick Orders",
                  src: Services,
                  url:"/myaccount/",
                }}
              />
              <DashboardCard
                details={{
                  name: "Users",
                  src: Services,
                  url:"/myaccount/",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
