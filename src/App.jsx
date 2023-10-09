import { CreateGalleryFotos } from 'components/Gallery/ImageGallery';
import { HederFormSearch } from 'components/Search/Searchbar';
import { useEffect, useState } from 'react';
import { fetchGallery } from './services/axios';
import { ButtonLoadMore } from 'components/Button/ButtonLoadMore';
import { Modal } from 'components/Modal/Modal';
import { Loading } from 'components/Loader/Loader';

export const App = () => {
  const [hits, setHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [word, setWord] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [modal, setModal] = useState({ isOpen: false, largeImageURL: null });

  const perPage = 12;

  useEffect(() => {
    if (!word) return;
    const getGallery = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGallery(word, page);
        setTotalPage(Math.ceil(data.totalHits / perPage));
        setHits([...(hits ?? []), ...data.hits]);
      } catch (error) {
        error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getGallery();
  }, [word, page]);

  const onPageIncrement = () => {
    setPage(page + 1);
  };

  const onFindPhotos = choosedWord => {
    setWord(choosedWord);
    setPage(1);
    setHits('');
  };

  const onOpenModal = newlargeImageURL => {
    console.log(newlargeImageURL);
    setModal({ isOpen: true, largeImageURL: newlargeImageURL });
  };

  const onCloseModal = () => {
    setModal({ isOpen: false, largeImageURL: null });
  };

  return (
    <div>
      <HederFormSearch findPhotos={onFindPhotos} />
      {isLoading && <Loading />}
      <CreateGalleryFotos hits={hits} showModal={onOpenModal} />
      {page !== totalPage && <ButtonLoadMore nextPage={onPageIncrement} />}
      {modal.isOpen && (
        <Modal open={modal.largeImageURL} onClose={onCloseModal} />
      )}
    </div>
  );
};
