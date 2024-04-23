import { useState } from 'react';
import { INITIAL_VALUES } from '../constants/initial-values';

export const App = () => {
  const [data, setData] = useState(INITIAL_VALUES);

  const getData = async () => {
    const query = `https://pixabay.com/api/?key=${
      data.key
    }&q=${encodeURIComponent(data.q)}&image_type=${
      data.image_type
    }&orientation=${data.orientation}&safesearch=${data.safesearch}&per_page=${
      data.per_page
    }&page=${data.page}`;

    try {
      const response = await fetch(query);
      const images = await response.json();
      setData(images);
    } catch (error) {}
  };

  const handleOnChange = e => {
    // setData({ q: e.target.value });
    setData(prev => ({
      ...prev,
      q: e.target.value,
    }));
  };
  const handleOnSubmit = e => {
    e.preventDefault();
    getData();
  };
  return (
    <>
      <header className="searchbar">
        <form onSubmit={handleOnSubmit} className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleOnChange}
          />
        </form>
      </header>
      <ul className="gallery">
        {data.hits &&
          data.hits.map((value, index) => {
            return (
              <li key={index} className="gallery-item">
                <a href={value.largeImageURL}>
                  <img src={value.largeImageURL} alt="" />
                </a>
              </li>
            );
          })}
      </ul>
      <button className="loadMore">Load More images</button>
      <p>{data.q}</p>
    </>
  );
};
