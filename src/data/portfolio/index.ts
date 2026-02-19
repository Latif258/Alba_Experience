import { weddingImages } from "./weddings";
import { corporateImages } from "./corporate";
import { eventsImages } from "./events";
import { portraitsImages } from "./portraits";
import { PortfolioImage } from "./types";

export const portfolioImages: PortfolioImage[] = [
    ...weddingImages,
    ...eventsImages,
    ...portraitsImages,
    ...corporateImages,
];

export * from "./types";
