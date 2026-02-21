import type { ILibrary } from "@mytypes/library";

export default function Card({ name, building, floor_count, capacity, image, id, fullness }: ILibrary) {
  

  // On load of the page, fetch the data from the backend
  // useEffect(() => {

  //     const load = async () => {
  //         await fetch(`${apiBaseUrl}/api/libraries/${id}/today/count`)
  //           .then((res) => {
  //             if(!res.ok) {
  //                 throw new Error("Network response was not ok");
  //             }
  //             return res.json();
  //           })
  //           .then((data) => {
  //             console.log("results:", data)
  //             setCurrent(data.count);
  //           })
  //           .catch((error) => {
  //             console.error("Error fetching data:", error);
  //           })
  //     }

  //     load();
  // }, []);
  
  return (
    <div className="max-w rounded-2xl overflow-hidden shadow-lg bg-light-blue m-5">
      <div className="p-4">
        <h2 className="text-3xl font-semibold mb-2">{name}</h2>
          <div className="text-lg font-medium">
            <p className="">Capacity: {fullness == null ? 0 : fullness}/{capacity}</p>
            <p className="">Building: {building}</p>
            <p className="">Floor Count: {floor_count}</p>
          </div>
      </div>
    </div>
  );
}