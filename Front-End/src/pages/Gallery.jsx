/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import '../styles/Gallery.css';

function Gallery() {
  const [activeTab, setActiveTab] = useState('events');
  const [galleryData, setGalleryData] = useState({ results: [], totalFolders: 0 });
  const [subfolders, setSubfolders] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(null);

  const limit = 2;
  const [page, setPage] = useState(1);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

  // FETCH THE GALLERY FOLDER AND IT'S SUBFOLDERS
  useEffect(() => {
    const fetchGalleryStructure = async () => {
      try {
        const res = await fetch(`${backendApiUrl}/gallery/folder?name=Gallery`);
        const data = await res.json();        

        if (data.folderId && data.subfolders.length > 0) {
          setSubfolders(data.subfolders);
          setActiveTab(data.subfolders[0].name);
          setCurrentFolderId(data.subfolders[0].id);
          fetchImages(data.subfolders[0].id, 1, true);
        } else {
          console.error('No subfolders found');
        }
      } catch (error) {
        console.error('Error fetching gallery structure:', error);
      }
    };

    fetchGalleryStructure();
  }, []);

  // FETCH IMAGES WHEN TAB CHANGES
  useEffect(() => {
    if (subfolders.length > 0) {
      const folder = subfolders.find((f) => f.name === activeTab);
      if (folder) {
        setCurrentFolderId(folder.id);
        setPage(1);
        fetchImages(folder.id, 1, true);
      }
    }
  }, [activeTab]);

  // FETCH IMAGES FROM SELECTED SUBFOLDER
  const fetchImages = async (folderId, page, reset = false) => {
    try {
      const res = await fetch(`${backendApiUrl}/gallery/images?folderId=${folderId}&page=${page}&limit=${limit}`);
      const data = await res.json();
      
      if (reset) {
        setGalleryData(data);
      } else {
        setGalleryData(prev => ({
          totalFolders: data.totalFolders,
          results: [...prev.results, ...data.results]
        }));
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const loadMoreImages = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(currentFolderId, nextPage);
  };

  const openLightbox = (images, index) => {
    setLightboxImages(images.map(img => ({ src: img.url })));
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="gallery container">
      <Helmet>
        <title>Gallery | One World Foundation</title>
        <meta name="description" content="Explore our photo gallery showcasing the events, classes, and community efforts organized by One World Foundation in Sri Lanka." />
        <meta name="keywords" content="One World Foundation Gallery, Event Photos, Education Programs, Sri Lanka NGO, Ahungalla School" />
        <link rel="canonical" href="https://owf.lk/gallery/" />
      </Helmet>

      {/* TAB BUTTONS */}
      <div className="gallery-tabs">
        {subfolders.map((folder) => (
          <button
            key={folder.id}
            className={activeTab === folder.name ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(folder.name)}
          >
            {folder.name}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="gallery-content">
        {!galleryData?.results || galleryData.results.length === 0 ? (
          <p>No images available</p>
        ) : (
          galleryData.results.map((folder) => (
            <div key={folder.folderName} className="folder-block">
              <h3>{folder.folderName}</h3>
              <div className="image-gallery">
                {folder.images.length === 0 ? (
                  <p>No images in this folder</p>
                ) : (
                  folder.images.map((image, index) => (
                    <img
                      key={image.id}
                      src={image.url}
                      alt={image.name}
                      loading="lazy"
                      className="gallery-image"
                      onClick={() => openLightbox(folder.images, index)}
                      onError={(e) => (e.target.src = '/image-error.png')}
                    />
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* LOAD MORE BUTTON */}
      {galleryData.totalFolders > page * limit && (
        <div className="load-more">
          <button onClick={loadMoreImages}>Load More</button>
        </div>
      )}

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImages}
          index={lightboxIndex}
        />
      )}
    </main>
  );
}

export default Gallery;
