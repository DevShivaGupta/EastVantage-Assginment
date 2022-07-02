import "./App.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
function App() {
  const noData = {
    fullname: "",
    email: "",
  };
  const [Refresh, SetRefresh] = useState(true);
  const [Data, SetData] = useState(noData);
  const flag = useRef(true);

  useEffect(() => {
    const url = "https://randomuser.me/api";
    const getData = async (url) => {
      try {
        const result = await axios.get(url);
        if (result) {
          let user = result.data.results[0];
          let fullname =
            user.name.title + " " + user.name.first + " " + user.name.last;
          let email = user.email;
          persistData(fullname, email);
          SetData({ fullname: fullname, email: email });
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (flag.current) {
      flag.current = false;
      getData(url);
    }
  }, [Refresh]);

  const RefreshPage = () => {
    flag.current = true;
    SetRefresh(!Refresh);
  };
  const persistData = (name, email) => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  return (
    <div className="App">
      <h2>{Data.fullname}</h2>
      <h2>{Data.email}</h2>
      <button onClick={RefreshPage}>Refresh</button>
    </div>
  );
}

export default App;
