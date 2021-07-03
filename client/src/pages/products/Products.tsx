import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Paginator, Wrapper } from '../../components';
import { Product } from '../../model/Product';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`products?page=${page}`);
      setProducts(data.data);
      setLastPage(data.last_page);
    })();
  }, [page]);
  const del = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`roles/${id}`);
      setProducts(products.filter((p: Product) => p.id !== id));
    }
  };
  return (
    <Wrapper>
      <div className='pt-3 pb-2 mb-3 border-bottom'>
        <Link to='/roles/create' className='btn btn-outline-secondary'>
          Add Product
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped table-sm'>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: Product) => {
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <img src={p.image} width='50' />
                  </td>
                  <td>{p.title}</td>
                  <td>{p.description}</td>
                  <td>{p.price}</td>
                  <td>
                    <div className='btn-group mr-2'>
                      <Link to={`/products/${p.id}/edit`} className='btn btn-sm btn-outline-secondary'>
                        Edit
                      </Link>
                      <button className='btn btn-sm btn-outline-danger' onClick={() => del(p.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </Wrapper>
  );
};

export default Products;
