import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

async function CabinList({ filter }) {
  const cabins = await getCabins();

  if (cabins.length === 0) return null;

  let filterCabins;
  if (filter === "all") filterCabins = cabins;

  if (filter === "small")
    filterCabins = cabins.filter((cabin) => cabin.maxCapacity <= 2);

  if (filter === "medium")
    filterCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 2 && cabin.maxCapacity <= 5,
    );

  if (filter === "large")
    filterCabins = cabins.filter((cabin) => cabin.maxCapacity >= 6);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filterCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
