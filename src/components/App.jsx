import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const App = () => {
  const API = '18941965-072e6ae370689f800c64fac36';
  const orientation = 'horizontal';
  const per_page = 10;
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imageData, setImageData] = useState([]);

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
  }, [imageData]);

  const handleOnChange = e => {
    setQuery(e.target.value);
    setPage(1);
  };

  const fetchImages = () => {
    const URL = `https://pixabay.com/api/?key=${API}&q=${encodeURIComponent(
      query
    )}&page=${page}&per_page=${per_page}&orientation=${orientation}`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        if (data.hits.length === 0) {
          Notiflix.Notify.failure('No images matching your search query');
        }
        setImageData(prevImageData => [...prevImageData, ...data.hits]);
        setPage(prevPage => prevPage + 1);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    setPage(1);
    setImageData([]);
    if (!query) {
      Notiflix.Notify.failure('Please enter a search query.');
      return;
    }
    fetchImages();
    e.target.reset();
  };

  const loadMoreImages = e => {
    e.preventDefault();
    fetchImages();
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
        {imageData &&
          imageData.map((value, index) => {
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
