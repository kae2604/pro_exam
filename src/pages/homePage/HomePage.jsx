import Hero from "@components/home/hero";
import BrandsList from "@components/home/brandsList";
import NewArrivalsHome from "@components/home/newArrivalsHome";
import TopRatingHome from "@components/home/topRatingHome";
import Categories from "@components/home/categories";
import ReviewsHome from "@components/home/reviewsHome";

const HomePage = () => {

    return (
        <div>
            <Hero/>
            <BrandsList/>
            <NewArrivalsHome/>
            <TopRatingHome/>
            <Categories/>
            <ReviewsHome/>
        </div>
    )
};

export default HomePage;





