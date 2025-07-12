import API_PATHS from "../../common/apiPaths/apiPaths";
import Button from "../ui/Button"; // adjust import path to your Button
import Slider from "react-slick";
import StarRating from "../ui/StartRating";
import TestimonialForm from "./TestimonialForm";
import { X } from "lucide-react";
import { useApiQuery } from "../../common/hooks/useApiQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const sliderSettings = {
  dots: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
  infinite: true,
  pauseOnHover: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const TestimonialCarousel = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: testimonials,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: API_PATHS.TESTIMONIALS.ENDPOINT,
    queryKey: API_PATHS.TESTIMONIALS.KEY,
  });

  if (isLoading)
    return (
      <div className="flex justify-center">
        <p>Loading...</p>
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center">
        <p>{isError.message}</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center">
        <p>{error.message}</p>
      </div>
    );

  return (
    <section className="lg:py-16 py-4 bg-base-200 lg:max-w-7xl text-base-content rounded-md">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">What Our Users Say</h2>

        {isLoading ? (
          <Loader className="animate-spin mx-auto" />
        ) : testimonials.length ? (
          // Carousel
          <Slider {...sliderSettings} className="mb-8">
            {testimonials.map((t) => (
              <div key={t._id} className="lg:px-6 px-2">
                <div className="bg-base-100 rounded-xl p-8 shadow-lg min-h-[230px] flex flex-col justify-center items-center space-y-2">
                  <img
                    src={t.avatarUrl}
                    alt={t.authorName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="font-bold italic">{t.authorName}</div>
                  <div className="italic leading-relaxed">
                    “{t.authorTitle}”
                  </div>
                  <div className="text-sm font-semibold flex items-center space-x-2">
                    <span className="font-bold italic opacity-25">Rating:</span>{" "}
                    <span>
                      <StarRating rating={t.rating} />
                    </span>
                  </div>
                  <div className="text-xs opacity-60">{t.content}</div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No testimonials yet — be the first!</p>
        )}

        {/* CTA Button */}
        <Button variant="outline" onClick={() => setOpen(true)}>
          Share your story
        </Button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <div className="bg-base-100 rounded-xl p-6 w-[90%] max-w-md relative">
            {/* Close */}
            <button
              className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
            <h3 className="text-xl font-bold mb-4">Leave a Testimonial</h3>

            <TestimonialForm
              editData={null}
              onSuccess={() => {
                queryClient.invalidateQueries(["public-testimonials"]); // refresh carousel
                setOpen(false);
              }}
              onCancel={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialCarousel;
