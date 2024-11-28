// import { useEffect, useState } from "react";
// import axios from "axios";
// import Table from "../../components/Table/index.jsx";
// import Sort from "../../components/Sort/index.jsx";
// import Search from "../../components/Search/index.jsx";
// import Genre from "../../components/Genre/index.jsx";
// import Pagination from "../../components/Pagination/index.jsx";
// import "../../styles/Search.css";

// const base_url = process.env.REACT_APP_API_URL;

// function Search() {
// 	const [obj, setObj] = useState({});
// 	const [sort, setSort] = useState({ sort: "rating", order: "desc" });
// 	const [filterGenre, setFilterGenre] = useState([]);
// 	const [page, setPage] = useState(1);
// 	const [search, setSearch] = useState("");

// 	useEffect(() => {
// 		const getAllMovies = async () => {
// 			try {
// 				const url = `${base_url}?page=${page}&sort=${sort.sort},${
// 					sort.order
// 				}&genre=${filterGenre.toString()}&search=${search}`;
// 				const { data } = await axios.get(url);
// 				setObj(data);
// 			} catch (err) {
// 				console.log(err);
// 			}
// 		};

// 		getAllMovies();
// 	}, [sort, filterGenre, page, search]);

// 	return (
// 		<div className="wrapper">
// 			<div className="container">
// 				<div className="head">
// 					<img src="./images/logo.png" alt="logo" className="logo" />
// 					<Search setSearch={(search) => setSearch(search)} />
// 				</div>
// 				<div className="body">
// 					<div className="table_container">
// 						<Table movies={obj.movies ? obj.movies : []} />
// 						<Pagination
// 							page={page}
// 							limit={obj.limit ? obj.limit : 0}
// 							total={obj.total ? obj.total : 0}
// 							setPage={(page) => setPage(page)}
// 						/>
// 					</div>
// 					<div className="filter_container">
// 						<Sort sort={sort} setSort={(sort) => setSort(sort)} />
// 						<Genre
// 							filterGenre={filterGenre}
// 							genres={obj.genres ? obj.genres : []}
// 							setFilterGenre={(genre) => setFilterGenre(genre)}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Search;

import { useState } from "react";
import Table from "../../components/Table/index.jsx";
import Sort from "../../components/Sort/index.jsx";
import SearchOption from "../../components/Search/index.jsx";
import Genre from "../../components/Genre/index.jsx";
import Pagination from "../../components/Pagination/index.jsx";
import "../../styles/Search.css";

const mockMovies = [
	{
		id: 1,
		name: "Inception",
		year: 2010,
		rating: 8.8,
		genre: ["Sci-Fi", "Thriller"],
		img: "./images/inception.jpg",
	},
	{
		id: 2,
		name: "Interstellar",
		year: 2014,
		rating: 8.6,
		genre: ["Sci-Fi", "Drama"],
		img: "./images/interstellar.jpg",
	},
];

const mockGenres = ["Sci-Fi", "Drama", "Thriller", "Comedy", "Action"];

function Search() {
	const [sort, setSort] = useState({ sort: "rating", order: "desc" });
	const [filterGenre, setFilterGenre] = useState([]);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");

	const filteredMovies = mockMovies
		.filter((movie) =>
			filterGenre.length
				? movie.genre.some((g) => filterGenre.includes(g))
				: true
		)
		.filter((movie) =>
			search ? movie.name.toLowerCase().includes(search.toLowerCase()) : true
		);

	return (
		<div className="wrapper">
			<div className="container">
				<div className="head">
					<img src="./images/logo.png" alt="logo" className="logo" />
					<SearchOption setSearch={(search) => setSearch(search)} />
				</div>
				<div className="body">
					<div className="table_container">
						<Table movies={filteredMovies} />
						<Pagination
							page={page}
							totalPages={2} // Mock total pages
							setPage={(page) => setPage(page)}
						/>
					</div>
					<div className="filter_container">
						<Sort sort={sort} setSort={(sort) => setSort(sort)} />
						<Genre
							filterGenre={filterGenre}
							genres={mockGenres}
							setFilterGenre={(genre) => setFilterGenre(genre)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Search;
