import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table/index.jsx";
import Sort from "../../components/Sort/index.jsx";
import Pagination from "../../components/Pagination/index.jsx";
import SearchOption from "../../components/Search/index.jsx";
import SubCategory from "../../components/subCategory/index.jsx";

// const base_url = process.env.REACT_APP_SEARCH_URL

function Search() {
  const [posts, setPosts] = useState({});
  const [sort, setSort] = useState({ sort: "price", order: "desc" });
  const [filterCategory, setFilterCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllposts = async () => {
      try {
        const url = `${"http://localhost:4001/api/posts/searchSection"}?page=${page}&sort=${
          sort.sort
        },${
          sort.order
        }&subCategory=${filterCategory.toString()}&search=${search}`;
        const { data } = await axios.get(url);
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllposts();
  }, [sort, filterCategory, page, search]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto p-6">
        {/* Header with Search */}
        <div className="flex justify-between items-center mb-8">
          <img src="./logo.png" alt="logo" className="h-12" />
          <SearchOption setSearch={(search) => setSearch(search)} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content: Table and Pagination */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
            <Table rooms={posts.rooms ? posts.rooms : []} />
            <Pagination
              page={page}
              limit={posts.limit ? posts.limit : 0}
              total={posts.total ? posts.total : 0}
              setPage={(page) => setPage(page)}
            />
          </div>

          {/* Sidebar: Sort and Filters */}
          <div className="w-full lg:w-64 bg-white rounded-lg shadow-lg p-6">
            <Sort sort={sort} setSort={(sort) => setSort(sort)} />
            <SubCategory
              filterCategory={filterCategory}
              subCategory={posts.subCategory ? posts.subCategory : []}
              setFilterCategory={(subCategory) =>
                setFilterCategory(subCategory)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
