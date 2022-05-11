import axios from 'axios';

export const createProduct = async (product, authtoken) =>
  await axios.post(process.env.REACT_APP_API + '/product', product, {
    headers: { authtoken },
  });

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const removeProduct = async (slug, authToken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: { authToken },
  });

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const updateProduct = async (slug, update, authToken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, update, {
    headers: { authToken },
  });
// sort, order, page, itemsPerPage
export const getProducts = async (sort, order, page, itemsPerPage) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
    itemsPerPage,
  });

export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);

export const productStar = async (productId, star, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: { authToken },
    }
  );

export const getRelated = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const getProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
