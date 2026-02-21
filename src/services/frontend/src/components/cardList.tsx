import Card from "@components/card";
import type { ILibrary } from "@mytypes/library";

export type CardListProps = {
    cards: ILibrary[],
};

export default function CardList({ cards }: CardListProps) {
  return (

    <div className="flexmin-h-screen flex flex-col items-center justify-center gap-8">
        <ul>
            {cards.map(card => (
                <li key={card.name}>
                    <Card name={card.name} building={card.building} floorCount={card.floorCount} capacity={card.capacity} image={card.image} />
                </li>
            ))}
        </ul>
    </div>
  );
}