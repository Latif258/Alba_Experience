import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
    return (
        <main className="min-h-screen flex flex-col pt-24">
            <Navigation />

            <section className="flex-1 py-12 px-6">
                <div className="max-w-3xl mx-auto space-y-12">

                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight">Terms & FAQ</h1>
                        <p className="text-muted-foreground text-lg italic">Essential Information & Common Questions</p>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-card border border-border rounded-lg p-6 md:p-10 shadow-sm">
                            <h2 className="text-2xl font-light mb-6 tracking-wide">Frequently Asked Questions</h2>
                            <Accordion type="single" collapsible className="w-full">

                                {/* QA 1 */}
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-left">How long will it take to receive our product?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        We may however choose to share some highlights as and when progress is made in the interim, that is within the post production process. This will be via a drop box link, in which case, files are most likely to be retouched images that come with your package. Highlights of retouched pictures will be shared with clients within 3-6 working days to be used on socials. All things being equal, full deliverables will be delivered within six to eight weeks. Please do well to bear in mind that express services can be requested and will come with extra charges. In situations where clients fail to pick up their final proofs at our office, and instead, request doorstep delivery, payment will have to be made for such services.
                                    </AccordionContent>
                                </AccordionItem>

                                {/* QA 2 */}
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-left">Do you touch up all images on our flash drive?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        Certainly. Every image delivered is post processed with our aesthetic and intricate basic post product style. This comes in the form of cropping, colour correction, exposure/ brightness adjustment, selective white and black processing, clarity adjustments, tone mapping to mention but a few. Quite a number of photographers only process selected images, if not any, from your wedding. This means you may have not too picturesque and flawed photos. However, high-end retouched images per wedding is a maximum of 60 images, relative to the chosen package(R#), where R# indicates the number of retouched images edited and presented to our clients. Retouching means the focus of our editing is moved from the general look of your photograph to the various elements within the picture. Explaining further, this means that certain flaws are noticed on the subjects within the image such as messed up hair. Furthermore, additional photographs, filters and colour grading can be added to the photograph as and when needed, to produce an outstanding image. It's as though this is the ideal and perfect picture used for wall frames, album covers, and social media blog posts.
                                    </AccordionContent>
                                </AccordionItem>

                                {/* QA 3 */}
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-left">Will our pictures be featured online?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        Well, yes and no. Images captured by us do not automatically feature on our socials and blogs. Not all captured photos are featured, as we reserve the right to curate and feature certain images on our socials, per our discretion. Both clients and creators have equal rights to images to share and duplicate them. This is as a result of a provision under the copyright law which is deemed as shared ownership. Full copyright to images can however be requested by a client at a fee. Alba will subsequently and consequently have no right to share, reproduce or commercialise such images without explicit client approval. We however see sharing your photos on our socials as an avenue to communicate our prowess and mastery in our chosen field of service all the while showing captivating and breathtaking moments of your memories. Time, effort and dedication is put into capturing such moments, and showcasing such detailed and dexterous works of beauty is the nectar that attracts our clientele, most especially you. We therefore reserve the right to showcase images we curate with or without the consent of our clients as a shared owner.
                                    </AccordionContent>
                                </AccordionItem>

                                {/* QA 4 */}
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="text-left">How many Photographers will be at the event?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed">
                                        This is based on the package a client chooses. However, if the guests expected exceeds 150 and the client goes for the basic package, we strongly advice client hire an additional from our team to reduce the stress of a single shooter to achieve a more comprehensive story.
                                    </AccordionContent>
                                </AccordionItem>

                                {/* QA 5 */}
                                <AccordionItem value="item-5">
                                    <AccordionTrigger className="text-left">When do I meet the photographer?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed">
                                        Once bookings is complete, you will be assigned to a lead photographer(s) for your event. You can meet them at our office or anywhere convenient.
                                    </AccordionContent>
                                </AccordionItem>

                                {/* QA 6 */}
                                <AccordionItem value="item-6">
                                    <AccordionTrigger className="text-left">Who will shoot my event?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed">
                                        Alba is a Photography agency that is made up of a league of Professional Photographers. Therefore, whoever will be assigned to shoot your event is highly equipped to take stunning photos just as you see in our portfolio.
                                    </AccordionContent>
                                </AccordionItem>

                                {/* QA 7 */}
                                <AccordionItem value="item-7">
                                    <AccordionTrigger className="text-left">Where will you be coming from?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        We are an agency based in Accra. However, we open to traveling to anywhere we are booked. This will mean the client will have to cater for our transportation and accommodation if the event is outside Accra. Tema and Kasoa are considered not to be part of Accra and services rendered in such locations will come at an extra cost. Services outside Accra and Ghana will require that we are there 24hours before the start of the event to enable us rest and prepare adequately for the busy day ahead. Clients therefore will have to hear from our photographers their preferred means of travel and support them in every means possible to make their journey convenient since they will be carrying expensive gears.
                                    </AccordionContent>
                                </AccordionItem>

                            </Accordion>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    )
}
