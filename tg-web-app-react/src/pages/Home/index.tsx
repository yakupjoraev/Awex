import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <main className="center-container">
      <div className="wrapper flex justify-center items-center">
        <ul>
          <li>
            <Link className="second-btn" to="/sign-in">
              Войти
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Home;
