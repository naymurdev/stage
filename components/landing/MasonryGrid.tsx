"use client";

import Image from "next/image";

interface MasonryItem {
  id: number;
  image: string;
}

// Multiple images from public assets - all same size
const sampleItems: MasonryItem[] = [
  { id: 1, image: "/backgrounds/mac-asset-1.jpeg" },
  { id: 2, image: "/backgrounds/mac-assest-2.jpg" },
  { id: 3, image: "/backgrounds/mac-asset-3.jpg" },
  { id: 4, image: "/backgrounds/mac-asset-4.jpg" },
  { id: 5, image: "/backgrounds/mac-asset-5.jpg" },
  { id: 6, image: "/backgrounds/mac-asset-6.jpeg" },
  { id: 7, image: "/backgrounds/mac-asset-7.png" },
  { id: 8, image: "/backgrounds/mac-asset-8.jpg" },
  { id: 9, image: "/backgrounds/mac-asset-9.jpg" },
  { id: 10, image: "/backgrounds/mac-asset-10.jpg" },
];

export function MasonryGrid() {
  return (
    <section className="w-full py-24 px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleItems.map((item) => (
            <div
              key={item.id}
              className="relative bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border group aspect-video"
            >
              <Image
                src={item.image}
                alt={`Gallery image ${item.id}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
