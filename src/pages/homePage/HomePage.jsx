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






// import {useForm} from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup"
// import Button from '@mui/material/Button';
// import schema from "./validationSchema.js";
// import {Container} from "@mui/material";
// import Box from '@mui/material/Box';


// const {
//     register,
//     handleSubmit,
//     formState: { errors },
// } = useForm({
//     resolver: yupResolver(schema),
// })
// const onSubmit = (data) => console.log(data)



// <Container>
//     <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input {...register("firstName")} />
//             <p>{errors.firstName?.message}</p>
//
//             <input {...register("age")} />
//             <p>{errors.age?.message}</p>
//
//
//             <Button variant="contained" color="success" type="submit">
//                 Success
//             </Button>
//         </form>
//     </Box>
// </Container>