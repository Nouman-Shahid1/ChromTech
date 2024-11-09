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
          <div className="flex flex-wrap  md:w-full mt-8 px-6">
            <DashboardCard
              details={{
                name: "Vials and Plates",
                src: Icon,
                url: "/admin/",
              }}
            />
            <DashboardCard
              details={{
                name: "LC",
                src: Amenities,
                url: "/admin/",
              }}
            />
            <div className="flex flex-wrap w-full md:mt-8">
              <DashboardCard
                details={{
                  name: "GC",
                  src: Services,
                  url: "/admin/",
                }}
              />
              <DashboardCard
                details={{
                  name: "INSTRUMENTATION",
                  src: Services,
                  url: "/admin/",
                }}
              />
            </div>
            <div className="flex flex-wrap w-full md:mt-8">
              <DashboardCard
                details={{
                  name: "Sryingers",
                  src: Services,
                  url: "/admin/",
                }}
              />

              <DashboardCard
                details={{
                  name: "Sample Preparation",
                  src: Services,
                  url: "/admin/",
                }}
              />
            </div>
            <div className="flex flex-wrap w-full md:mt-8">
              <DashboardCard
                details={{
                  name: "Users",
                  src: Services,
                  url: "/admin/",
                }}
              />

              {/* <DashboardCard
                details={{
                  name: "Sample Preparation",
                  src: Services,
                  url:"/admin/",
                }}
                /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
