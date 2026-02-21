import type { ILibrary } from "@mytypes/library";

export default function Card({ name, building, floor_count, capacity, image, id, fullness }: ILibrary) {

  if(!image || image.trim().length === 0){
    image = `static/${id}.png`
  }

  return (
    <div className="flex max-w-3xl rounded-2xl overflow-hidden shadow-lg bg-light-blue m-5">
      <div className="flex-1 p-6 flex flex-col justify-center">
        <h2 className="text-3xl font-semibold mb-4">{name}</h2>
        <div className="text-lg space-y-1">
          <p>Capacity: {fullness == null ? 0 : fullness}/{capacity}</p>
          <p>Building: {building}</p>
          <p>Floor Count: {floor_count}</p>
        </div>
      </div>
      <img
        className="w-80 object-cover"
        src={image || "https://umanitoba.ca/libraries/sites/libraries/files/styles/3x2_900w/public/2020-11/dafoe-library.JPG?itok=77qX113_"}
        alt={name}
      />
    </div>
  );
}