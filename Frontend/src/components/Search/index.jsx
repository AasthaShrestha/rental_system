// import styles from "./style.module.css";
// const SearchOption= ({ setSearch }) => {
// 	return (
// 		<input
// 			type="text"
// 			className={styles.search}
// 			placeholder="Search"
// 			onChange={({ currentTarget: input }) => setSearch(input.value)}
// 		/>
// 	);
// };

// export default SearchOption;


import styles from "./styles.module.css";

const SearchOption = ({ setSearch }) => {
	return (
		<input
			type="text"
			className={styles.search}
			placeholder="Search"
			onChange={({ currentTarget: input }) => setSearch(input.value)}
		/>
	);
};

export default SearchOption;
