import {
	Box,
	Container,
	Heading,
	Image,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Select from "react-select";
import http from "./http-common/http";

import animateScrollTo from "animated-scroll-to";

interface IApiRespondePaginated<T> {
	content: Array<T>;
	pageNo: number;
	pageSize: number;
	totalElements: number;
	totalPages: number;
	last: boolean;
}

interface IDirector {
	id?: number;
	firstName: string;
	lastName: string;
}
interface IActor {
	id?: number;
	firstName: string;
	lastName: string;
}
interface ICategories {
	id?: number;
	category: string;
}

interface IMoviesApiResponse {}

interface IMovies {
	name: string;
	rating: string;
	id?: string;
	posterUrl: string;
	shortDescription: string;
}

import { Base64Generator } from "./components/base64Generator";
import OptionsData from "./fake-options.json";

const App = () => {
	const [directorsPage, setDirectorsPage] =
		useState<IApiRespondePaginated<IDirector> | null>(null);
	const [directors, setDirectors] = useState<IDirector[]>([]);

	const [actorsPage, setActorsPage] =
		useState<IApiRespondePaginated<IDirector> | null>(null);
	const [actors, setActors] = useState<IDirector[]>([]);

	const [categories, setCategories] = useState<ICategories[]>([]);

	const [movies, setMovies] = useState<any>(null);

	const getDirectors = async () => {
		await http
			.get("/v1/directors?size=1003")
			.then(({ data }: { data: IApiRespondePaginated<IDirector> }) => {
				setDirectorsPage(data);
				setDirectors(data?.content);
			})
			.catch((err) => console.log(err));
	};

	const getActors = async () => {
		await http
			.get("/v1/actors?size=100")
			.then(({ data }: { data: IApiRespondePaginated<IActor> }) => {
				setActorsPage(data);
				setActors(data?.content);
			})
			.catch((err) => console.log(err));
	};

	const getCategories = async () => {
		await http
			.get("/v1/categories")
			.then(({ data }: { data: ICategories[] }) => {
				setCategories(data);
			})
			.catch((err) => console.log(err));
	};

	const getMovies = async () => {
		await http
			.get("/v1/movies?size=20")
			.then(({ data }) => {
				setMovies(data.content);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		Promise.all([getActors(), getDirectors(), getCategories(), getMovies()]);
	}, []);

	const makeDirectorAndActorOptions = (rawData: Array<IDirector | IActor>) => {
		return rawData.map(({ id, firstName, lastName }) => {
			return {
				value: id,
				label: `${firstName} ${lastName}`,
			};
		});
	};

	const makeCategoriesOptions = (rawData: Array<ICategories>) => {
		return rawData.map(({ id, category }) => {
			return {
				value: id,
				label: category,
			};
		});
	};

	return (
		<Container maxW="container.lg" className="cointainer-test">
			<SimpleGrid columns={1} mt={5}>
				<SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap={6}>
					<div>
						<h1>Selecione os Diretores do Filme</h1>
						<Select
							isMulti
							name="colors"
							options={makeDirectorAndActorOptions(directors || [])}
						/>
					</div>
					<div>
						<h1>Selecione os Atores do Filme</h1>
						<Select
							isMulti
							name="colors"
							options={makeDirectorAndActorOptions(actors || [])}
						/>
					</div>
					<div>
						<h1>Selecione as Categorias do Filme</h1>
						<Select
							isMulti
							name="colors"
							options={makeCategoriesOptions(categories || [])}
						/>
					</div>
				</SimpleGrid>

				<SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap={6} mt={10}>
					<div>
						<h1>Selecione os Diretores do Filme</h1>
						<Select isMulti name="colors" options={OptionsData.options || []} />
					</div>
				</SimpleGrid>
			</SimpleGrid>
			{makeMoviesList(movies)}

			<Container
				display="flex"
				h="container.lg"
				w="container.xl"
				bg={"red.300"}
			></Container>

			<Container display="flex" bg={"blue.300"} my="40">
				<Box
					onClick={() =>
						animateScrollTo(document.querySelector(".cointainer-test"))
					}
				>
					Scroll
				</Box>
			</Container>

			<Base64Generator />
		</Container>
	);
};

export default App;

const makeMoviesList = (movies: IMovies[]) => {
	return (
		<SimpleGrid columns={3} mt="12" gridGap={12}>
			{(movies || []).map(
				({ name, rating, posterUrl, shortDescription, id }) => (
					<Box
						key={id}
						display="flex"
						alignItems="center"
						justifyContent="center"
						flexDir="column"
						textAlign="justify"
					>
						<Image src={posterUrl} width={150} height={250} />
						<Heading size={"sm"}>
							{name} {rating}/5
						</Heading>
						<Text>{shortDescription}</Text>
					</Box>
				)
			)}
		</SimpleGrid>
	);
};
