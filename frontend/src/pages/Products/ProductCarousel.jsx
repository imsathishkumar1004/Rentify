import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '25%',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '10%',
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '5%',
        }
      },
    ]
  };

  return (
    <div className="mb-4">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="w-full">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="px-4">
                <div className="border rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={image}
                    alt={name}
                    className="w-full object-cover h-64"
                  />

                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{name}</h2>
                    <p className=" mb-2 text-black font-extrabold">₹ {price}</p>
                    <p className="text-black font-extrabold">{description.substring(0, 50)}...</p>

                    <div className="flex justify-between mt-4">
                      <div>
                        <h3 className="flex items-center mb-2 text-sm">
                          <FaStore className="mr-1" /> Brand: {brand}
                        </h3>
                        <h3 className="flex items-center mb-2 text-sm">
                          <FaClock className="mr-1" /> Added: {moment(createdAt).fromNow()}
                        </h3>
                      </div>
                      <div>
                        <h3 className="flex items-center mb-2 text-sm">
                          <FaShoppingCart className="mr-1" /> Quantity: {quantity}
                        </h3>
                        <h3 className="flex items-center mb-2 text-sm">
                          <FaBox className="mr-1" /> In Stock: {countInStock}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
