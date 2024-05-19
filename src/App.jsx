import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ErrorMessage from './components/error_message/ErrorMessage'
import ImageGallery from './components/image_gallery/ImageGallery'
import ImageModal from './components/image_modal/ImageModal'
import LoadMoreBtn from './components/load_more_btn/LoadMoreBtn'
import Loader from './components/loader/Loader'
import SearchBar from './components/search_bar/SearchBar'
import { Toaster } from 'react-hot-toast'


function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  
  const lastImageRef = useRef(null);


  useEffect(() => {
    if (query !== '') {
      const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query, page },
          headers: {
            Authorization: 'Client-ID 3zb_mbNHFZJaYMkgp6GZ997cdbHk5MllXUfJtSgzbbc'
          }
        });
        if (page === 1) {
          setImages(response.data.results);
        } else {
          setImages(prevImages => [...prevImages, ...response.data.results]);
        }
        if (page > 1) {
          lastImageRef.current.scrollIntoView({ behavior: 'smooth' });
          }
      } catch (error) {
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }
}, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };
    
 
  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onLoadMore={ loadMoreImages} loading={loading} />
      )}
      {modalOpen && (
        <ImageModal
          image={selectedImage}
          onClose={closeModal}
        />
      )}
      <div ref={lastImageRef} />
    </div>
  )
}

export default App