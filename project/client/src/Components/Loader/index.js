import { useEffect, useState } from 'react';
import { Oval, Dna, Puff, Rings, TailSpin, ThreeDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux'
import './loader.css';

function BasicExample() {
  const currentLoaderState = useSelector((state) => state.loader.loader_state);

  const [loaderState, setLoaderState] = useState(currentLoaderState);

  useEffect(() => {
    setLoaderState(currentLoaderState)
  }, [currentLoaderState]);

  return (
    <>
      {
        loaderState === true ? (
            <div className='loader'>
            <TailSpin
              height="80"
              width="80"
              color="#FFFFFF"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
        </div>
        ) : null
      }
    </>
  );
}

export default BasicExample;