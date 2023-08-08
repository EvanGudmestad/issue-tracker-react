import { UserListItem } from "./UserListItem";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { FaSearch } from "react-icons/fa";

export function UserList({ auth, showError }) {
  const [users, setUsers] = useState(null);
  const [sortValue, setSortValue] = useState("newest");
  const [keywords, setKeywords] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/api/users/list`, {
      headers: { authorization: `Bearer ${auth?.token}` },
    })
      .then((res) => {
        //  console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        const resError = err?.response?.data?.error;

        if (resError) {
          if (typeof resError === "string") {
            //  showError(resError);
          } else if (resError.details) {
            let joiError = "";
            //joi validation
            _.map(resError.details, (x) => (joiError += x.message + "\n"));
            //showError(joiError);
          }
        }
      });
  }, [auth]);

  const onSubmitSearch = async (evt) => {
    evt.preventDefault();
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/list`,
        {
          headers: { authorization: `Bearer ${auth?.token}` },
          params: {
            sortBy: sortValue,
            keywords: keywords,
            minAge: minAge,
            maxAge: maxAge,
            role: roleFilter
          },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container" id="listContainer">
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            aria-label="Keywords"
            aria-describedby="button-search"
            value={keywords}
            placeholder="Search Users by Keywords"
            onChange={(evt) => setKeywords(evt.target.value)}
          />
        </div>
        <div className="col">
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control ms-3"
              id="minAgeInput"
              placeholder="Min Age"
              value={minAge}
              onChange={(evt) => setMinAge(evt.target.value)}
            />
            <input
              type="number"
              className="form-control"
              id="maxAgeInput"
              placeholder="Max Age"
              value={maxAge}
              onChange={(evt) => setMaxAge(evt.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label" htmlFor="selSort">
            Sort By:
          </label>
          <select
            id="selSort"
            className="form-select form-select-md"
            aria-label=".form-select-sm example"
            value={sortValue}
            onChange={(evt) => setSortValue(evt.target.value)}
          >
            <option value="givenName">Given Name</option>
            <option value="familyName">Family Name</option>
            <option value="role">Role</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div className="form-outline mb-4 col-3">
          <label className="form-label" htmlFor="roleInput">
            Role
          </label>
          <select
            className="form-select"
            id="selClassification"
            value={roleFilter}
            onChange={(evt) => setRoleFilter(evt.target.value)}
          >
            <option value="">Filter by Role</option>
            <option value="developer">Developer</option>
            <option value="quality analyst">Quality Analyst</option>
            <option value="business analyst">Business Analyst</option>
            <option value="product manager">Product Manager</option>
            <option value="technical manager">Technical Manager</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <label htmlFor="btnSubmit">Search:</label>
          <br />
          <button
            id="btnSubmit"
            type="submit"
            className="btn btn-secondary"
            onClick={(evt) => onSubmitSearch(evt)}
          >
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="row">
        {_.map(users, (user, index) => (
          <UserListItem user={user} auth={auth} key={user._id} index={index} />
        ))}
      </div>
    </div>
  );
}
