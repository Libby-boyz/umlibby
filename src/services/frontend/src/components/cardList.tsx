import Card from "@components/card";
import type { ILibrary } from "@mytypes/library";

export type CardListProps = {
    cards: ILibrary[],
};

export default function CardList({ cards }: CardListProps) {
  return (

    <div className="flex h-full flex-col gap-8 overflow-y-auto ml-10 mr-10">
        <ul>
            {cards.map((card, index) => (
                <li key={index}>
                    <Card name={card.name} building={card.building} floor_count={card.floor_count} capacity={card.capacity} image={card.image} id={card.id} fullness={card.fullness} />
                </li>
            ))}
        </ul>
    </div>
  );
}