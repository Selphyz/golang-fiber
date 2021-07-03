import React from 'react';

export const Paginator = (props: { page: number; lastPage: number; pageChanged: (page: number) => void }) => {
  const next = () => {
    if (props.page < props.lastPage) {
      props.pageChanged(props.page + 1);
    }
  };
  const prev = () => {
    if (props.page > 1) {
      props.pageChanged(props.page - 1);
    }
  };
  return (
    <nav>
      <ul className='pagination-buttons'>
        <li>
          <span className='page-link' onClick={prev}>
            Previous
          </span>
        </li>
        <li>
          <span className='page-link' onClick={next}>
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Paginator;
