import type { Offer } from "../types/types";

export const SimpleCard = ({ offer }: { offer: Offer }) => {
  return (
    <div className="elements w-full flex flex-col gap-2 bg-white">
      <div className="aspect-video max-w-full p-2 ">
        {offer.image && (
          <img
            src={offer.image}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>
      <div className="flex flex-col gap-1 px-4 pb-6">
        <div className="flex gap-1 items-center">
          <p className="text-xl font-semibold text-neutral-900 tracking-tight leading-none">
            {offer.title}
          </p>
        </div>
        <div className="mb-3">
          <p className="tracking-wide text-sm leading-relaxed text-neutral-600 text-pretty">
            {offer.description}
          </p>
        </div>
      </div>
    </div>
  );
};
