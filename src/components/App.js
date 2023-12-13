import { fetchImages } from './api';
import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from './Loader';
import { Button } from './Button';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchImages(query, page);
        if (hits.length === 0) {
          return toast.error('No images found.');
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        toast.error('Failed to fetch images. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== '' || page !== 1) {
      fetchImageData();
    }
  }, [query, page]);

  const handleSubmit = newQuery => {
    if (newQuery.trim() === '') {
      toast.error('Can not be empty');
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage.page + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery items={images} />}

      {loadMore && !isLoading && images.length > 0 && (
        <Button onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      <Toaster />
    </div>
  );
};
