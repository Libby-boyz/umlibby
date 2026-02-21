import type { ILibrary } from "@mytypes/library";

export default function Card({ name, building, floor_count, capacity, image }: ILibrary) {
  return (
    <div className="max-w rounded-2xl overflow-hidden shadow-lg bg-light-blue m-5">
      <div className="p-4">
        <h2 className="text-3xl font-semibold mb-2">{name}</h2>
          <div className="text-lg font-medium">
            <p className="">Capacity: {capacity}</p>
            <p className="">Building: {building}</p>
            <p className="">Floor Count: {floor_count}</p>
          </div>
      </div>
    </div>
  );
}