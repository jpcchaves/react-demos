import { useEffect, useState } from "react";
import http from "./http-common/http";
import Select from "react-select";

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

const App = () => {
	const [directorsPage, setDirectorsPage] =
		useState<IApiRespondePaginated<IDirector> | null>(null);
	const [directors, setDirectors] = useState<IDirector[]>([]);

	const [actorsPage, setActorsPage] =
		useState<IApiRespondePaginated<IDirector> | null>(null);
	const [actors, setActors] = useState<IDirector[]>([]);

	const [categories, setCategories] = useState<ICategories[]>([]);

	useEffect(() => {
		http
			.get("/v1/directors?size=1003")
			.then(({ data }: { data: IApiRespondePaginated<IDirector> }) => {
				setDirectorsPage(data);
				setDirectors(data?.content);
			})
			.catch((err) => console.log(err));

		http
			.get("/v1/actors?size=1003")
			.then(({ data }: { data: IApiRespondePaginated<IActor> }) => {
				setActorsPage(data);
				setActors(data?.content);
			})
			.catch((err) => console.log(err));

		http
			.get("/v1/categories")
			.then(({ data }: { data: ICategories[] }) => {
				setCategories(data);
			})
			.catch((err) => console.log(err));
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
		<>
			<h1>Selecione os Diretores do Filme</h1>
			<Select
				isMulti
				name="colors"
				options={makeDirectorAndActorOptions(directors || [])}
			/>
			<h1>Selecione os Atores do Filme</h1>
			<Select
				isMulti
				name="colors"
				options={makeDirectorAndActorOptions(actors || [])}
			/>
			<h1>Selecione as Categorias do Filme</h1>
			<Select
				isMulti
				name="colors"
				options={makeCategoriesOptions(categories || [])}
			/>
		</>
	);
};

export default App;
