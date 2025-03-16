import { useEffect, useMemo, useRef, useState } from "react";
import { type UserTypes } from "./types/UserTypes";
import UsersList from "./components/UsersList";
import "./App.css";

function App() {
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [showColor, setShowColor] = useState<boolean>(false);
  const [sortByCountry, setSortByCountry] = useState<boolean>(false);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const originalUsers = useRef<UserTypes[]>([]);

  const toggleColor = () => {
    setShowColor(!showColor);
  };

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry);
  };

  const handleDelete = (email: string) => {
    const filteredButton = users.filter((user) => user.email !== email);
    setUsers(filteredButton);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  useEffect(() => {
    fetch(`https://randomuser.me/api?results=100`)
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const filterUser = useMemo(()=>{
    return filterCountry
    ? users.filter((user) => {
        return user.location.country
          .toLowerCase()
          .includes(filterCountry.toLowerCase());
      })
    : users
  },[users,sortByCountry])

  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? [...filterUser].sort((a, b) => {
          return a.location.country.localeCompare(b.location.country);
        })
      : filterUser;
  }, [filterCountry, sortByCountry]);

  return (
    <>
      <div>
        <h1>Prueba Tecnica</h1>
        <header>
          <button className="btn" onClick={toggleColor}>
            Colorear Files
          </button>
          <button className="btn" onClick={toggleSortByCountry}>
            {sortByCountry ? "no esta ordenado" : "Ordernar Por Pais"}
          </button>
          <button className="btn" onClick={handleReset}>
            Resetrear Los Eliminados
          </button>
          <input
            onChange={(e) => {
              setFilterCountry(e.target.value);
            }}
            type="text"
            placeholder="filtra por pasis"
          />
        </header>

        <main>
          <UsersList
            handleDelete={handleDelete}
            showColor={showColor}
            users={sortedUsers}
          />
        </main>
      </div>
    </>
  );
}

export default App;
