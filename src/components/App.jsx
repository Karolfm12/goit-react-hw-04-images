import { useEffect, useState } from 'react';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { INITIAL_VALUES } from '../constants/initial-values';

export const App = () => {
  const [data, setData] = useState(INITIAL_VALUES);

  useEffect(() => {
    const lightbox = new simpleLightbox('.gallery a', {
      captions: true,
      captionSelector: 'img',
      captionType: 'attr',
      captionsData: 'alt',
      captionDelay: 250,
    });
    return () => {
      lightbox.destroy();
    };
  }, []);

  useEffect(() => {
    const lightbox = new simpleLightbox('.gallery a', {
      captions: true,
      captionSelector: 'img',
      captionType: 'attr',
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();
  }, [data]);

  const handleOnChange = e => {
    setData(prev => ({
      ...prev,
      q: e.target.value,
    }));
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    setData(prev => ({
      ...prev,
      page: 1,
    }));
    getData();
  };

  const loadMoreImages = () => {
    setData(prev => ({
      ...prev,
      page: prev.page + 1,
      imageData: [...prev.imageData, ...data.hits],
    }));
    getData();
  };

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
      console.log(images);
      setData(images);
    } catch (error) {}
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
      <button className="loadMore" onClick={loadMoreImages}>
        Load More images
      </button>
    </>
  );
};
