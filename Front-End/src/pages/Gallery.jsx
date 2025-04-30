/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import '../styles/Gallery.css';

function Gallery() {
  const [activeTab, setActiveTab] = useState('events');
  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [subfolders, setSubfolders] = useState([]);
  const [galleryFolderId, setGalleryFolderId] = useState(null);

  const count = 20;
  const [loadedImagesCount, setLoadedImagesCount] = useState(count);

  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

  // FETCH THE GALLERY FOLDER AND IT'S SUBFOLDERS
  useEffect(() => {
    const fetchGalleryStructure = async () => {
      try {
        const res = await fetch(`${backendApiUrl}/drive/folder?name=Gallery`);
        const data = await res.json();

        if (data.folderId && data.subfolders.length > 0) {
          setGalleryFolderId(data.folderId);
          setSubfolders(data.subfolders);
          setActiveTab(data.subfolders[0].name.toLowerCase());
          fetchImages(data.subfolders[0].id);
        } else {
          console.error('No subfolders found');
        }
      } catch (error) {
        console.error('Error fetching gallery structure:', error);
      }
    };

    fetchGalleryStructure();
  }, [galleryFolderId]);

  // FETCH IMAGES WHEN TAB CHANGES
  useEffect(() => {
    if (subfolders.length > 0) {
      const folder = subfolders.find((f) => f.name.toLowerCase() === activeTab.toLowerCase());
      if (folder) {
        fetchImages(folder.id);
        setLoadedImagesCount(count);
      }
    }
  }, [activeTab]);

  // FETCH IMAGES FROM SELECTED SUBFOLDER
  const fetchImages = async (folderId) => {
    try {
      const res = await fetch(`${backendApiUrl}/drive/images?folderId=${folderId}`);
      const data = await res.json();
      setAllImages(data);
      setImages(data.slice(0, loadedImagesCount));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const loadMoreImages = () => {
    const newCount = loadedImagesCount + count;
    setLoadedImagesCount(newCount);
    setImages(allImages.slice(0, newCount));
  };

  return (
    <div className="gallery container">
      {/* TAB BUTTONS */}
      <div className="gallery-tabs">
        {subfolders.map((folder) => (
          <button
            key={folder.id}
            className={activeTab === folder.name.toLowerCase() ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(folder.name.toLowerCase())}
          >
            {folder.name}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="gallery-content">
        <div className="image-gallery">
          {images.length === 0 ? (
            <p>No images available</p>
          ) : (
            images.map((image) => (
              <iframe
                key={image.id}
                src={image.url}
                width='100%'
                height='100%'
                allow='autoplay'
                title={`Image: ${image.name}`}
                className="gallery-image"></iframe>
            ))
          )}
        </div>

        {/* LOAD MORE BUTTON */}
        {allImages.length > images.length && (
          <div className="load-more">
            <button onClick={loadMoreImages}>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
