import type { Library } from "@mytypes/library";

export default function Card({ name, building, floorCount, capacity, image }: Library) {
  return (
    <div className="max-w-xs rounded-2xl overflow-hidden shadow-lg bg-white">
      <img className="w-full h-40 object-cover" src={image} alt={name} />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          {name}
        </h2>
        <p className="text-sm">
            SOME TEXT
        </p>
        <p className="text-right text-sm mt-2">
          {floorCount}{building}{capacity}
        </p>
      </div>
    </div>
  );
}